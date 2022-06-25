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

let chart;
function drawStats(clusters) {
    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('canvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: (function () {
                const result = new Array(clusters.length);
                for (let i = 0; i < result.length; ++i) {
                    result[i] = `${i*10}-${i*10 + 9}`;
                }
                return result;
            })(),
            datasets: [{
                label: '',
                data: clusters
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

let clusters;
function wishUntilStats(C, R, N) {
    clusters = new Array(((C + 1)*90*2 + R*80*3) / 10 + 1).fill(0);
    for (let i = 0; i < N; ++i) {
        ++clusters[Math.ceil(wishUntilCR(C, R) / 10)];
        if (i%1000 === 0) {
            console.log(new Date().toLocaleTimeString(), i);
        }
    }
    drawStats(clusters);
}
