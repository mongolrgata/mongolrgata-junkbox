function selectBanner(type) {
    STATE.selectedBanner = type;
}

function exchangeStarglitter() {
    STATE.primogemsCount += Math.floor(STATE.starglitterCount / 5) * 160;
    STATE.starglitterCount %= 5;
}

function save() {
    localStorage.setItem('STATE', JSON.stringify(STATE));
}

function reset() {
    localStorage.removeItem('STATE');

    for (let key in STATE) {
        STATE[key] = 'reset';
    }
    // location.reload();
}

function wish(N) {
    for (let i = 0; i < N; ++i) {
        switch (STATE.selectedBanner) {
            case 'event-banner':
                EventWish.doWish();
                break;
            case 'weapon-banner':
                WeaponWish.doWish();
                break;
        }
    }
}

function wishUntilC(C) {
    while (STATE.bannerLegendary <= C) {
        EventWish.doWish();
    }
}

function wishUntilR(R) {
    while (STATE.weaponBannerLegendary1 < R) {
        WeaponWish.doWish();
    }
}

function wishUntilCR(C, R) {
    reset();
    wishUntilC(C);
    wishUntilR(R);
    exchangeStarglitter();

    return Math.ceil(-STATE.primogemsCount / 160);
}

function drawStats(chart, ctx, clusters, labels) {
    if (chart) {
        chart.destroy();
    }

    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                backgroundColor: '#ef7c1c',
                data: [...clusters]
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function wishUntil() {
    wishUntilStats(
        STATE.wishUntilC,
        STATE.wishUntilR,
        STATE.wishUntilSamples
    );
}

function toggleScreen(value) {
    const screen = document.getElementById('screen');

    if (value) {
        screen.classList.remove('invisible');
    } else {
        screen.classList.add('invisible');
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 0);
    });
}

let clusters;
let mainChart;
let additionalChart;
async function wishUntilStats(C, R, N) {
    await toggleScreen(true);

    clusters = new Array(((C + 1)*90*2 + R*80*3) / 10 + 1).fill(0);
    for (let i = 0; i < N; ++i) {
        ++clusters[Math.ceil(wishUntilCR(C, R) / 10)];
        if (i%1000 === 0) {
            console.log(new Date().toLocaleTimeString(), i);
        }
    }
    mainChart = drawStats(mainChart, document.getElementById('mainChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = `${i*10}-${i*10 + 9}`;
            }
            return result;
        })()
    );

    let s = 0;
    for (let i = 0; i < clusters.length; ++i) {
        s += clusters[i];
        clusters[i] = s;
    }
    for (let i = 0; i < clusters.length; ++i) {
        clusters[i] = clusters[i] * 100 / s;
    }
    additionalChart = drawStats(additionalChart, document.getElementById('additionalChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = `${i*10}-${i*10 + 9}`;
            }
            return result;
        })()
    );

    toggleScreen(false);
}
