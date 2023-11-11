const eventWish = new EventWish(STATE);
const weaponWish = new WeaponWish(STATE);

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
    for (let key in STATE) {
        STATE[key] = 'reset';
    }
    save();
}

function wish(N) {
    for (let i = 0; i < N; ++i) {
        switch (STATE.selectedBanner) {
            case 'event-banner':
                eventWish.doWish();
                break;
            case 'weapon-banner':
                weaponWish.doWish();
                break;
        }
    }
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
            scales: {
                y: {
                    ticks: {
                        display: false
                    }
                }
            },
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
        STATE.wishUntilRareC,
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
}

const worker = new Worker('scripts/worker.js');

function wishUntilStats(C, rareC, R, N) {
    toggleScreen(true);

    reset();
    worker.postMessage({
        arguments: [C, rareC, R, N],
        DEFAULT_STATE: STATE
    });
}

let clusters;
let mainChart;
let additionalChart;
worker.onmessage = function (event) {
    const getRange = function (i) {
        if (steps === 1) {
            return `${i * steps}`;
        }
        return `${i * steps}-${i * steps + steps - 1}`;
    };

    if (event.data.progress) {
        document.getElementById('progress').innerHTML = 'IN PROGRESS (' + event.data.progress + ')';
        return;
    }

    const steps = STATE.wishUntilSteps;
    clusters = event.data.clusters;
    mainChart = drawStats(mainChart, document.getElementById('mainChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = getRange(i);
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
        clusters[i] = Math.floor(clusters[i] * 1000 / s) / 10;
    }
    additionalChart = drawStats(additionalChart, document.getElementById('additionalChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = getRange(i);
            }
            return result;
        })()
    );

    toggleScreen(false);
};