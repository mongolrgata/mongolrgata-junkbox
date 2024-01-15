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

function loadSettings() {
    reset();

    STATE.legendaryPity = STATE.wishUntilCharacterLegendaryPity;
    STATE.weaponLegendaryPity = STATE.wishUntilWeaponLegendaryPity;
    STATE.legendaryGuaranteed = STATE.wishUntilCharacterLegendaryGuaranteed;
    STATE.weaponLegendaryGuaranteed = STATE.wishUntilWeaponLegendaryGuaranteed;
    STATE.bannerRare1 = STATE.constellationRare1 + 1;
    STATE.bannerRare2 = STATE.constellationRare2 + 1;
    STATE.bannerRare3 = STATE.constellationRare3 + 1;
    STATE.primogemsCount = STATE.allPrimogemsCount;
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

function wishAllIn() {
    wishAllStats(
        STATE.allPrimogemsCount,
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
        operation: 'wishUntil',
        arguments: [C, rareC, R, N],
        DEFAULT_STATE: STATE
    });
}

function wishAllStats(pC, N) {
    toggleScreen(true);

    reset();
    worker.postMessage({
        operation: 'wishAll',
        arguments: [pC, N],
        DEFAULT_STATE: STATE
    });
}

function progressMessage(progress) {
    document.getElementById('progress').innerHTML = 'IN PROGRESS (' + progress + ')';
}

function clustersMessage(clusters) {
    const getRange = function (i) {
        if (steps === 1) {
            return `${i * steps}`;
        }
        return `${i * steps}-${i * steps + steps - 1}`;
    };

    const steps = STATE.wishUntilSteps;
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
}

function stateMessage(state) {
    for (let key in state) {
        if (state.hasOwnProperty(key)) {
            if (STATE.hasOwnProperty(key)) {
                STATE[key] = state[key];
            }
        }
    }

    const clusters = state.bannerLegendaryRates;
    mainChart = drawStats(mainChart, document.getElementById('mainChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = '' + i;
            }
            return result;
        })()
    );

    let s = 0;
    for (let i = clusters.length - 1; i >= 0; --i) {
        s += clusters[i] || 0;
        clusters[i] = s;
    }
    for (let i = 0; i < clusters.length; ++i) {
        clusters[i] = Math.floor(clusters[i] * 1000 / s) / 10;
    }
    additionalChart = drawStats(additionalChart, document.getElementById('additionalChart').getContext('2d'), clusters,
        (function () {
            const result = new Array(clusters.length);
            for (let i = 0; i < result.length; ++i) {
                result[i] = '' + i;
            }
            return result;
        })()
    );

    toggleScreen(false);
}

let clusters;
let mainChart;
let additionalChart;
worker.onmessage = function (event) {
    if (event.data.progress) {
        progressMessage(event.data.progress);
    }
    if (event.data.clusters) {
        clustersMessage(event.data.clusters);
    }
    if (event.data.state) {
        stateMessage(event.data.state);
    }
};
