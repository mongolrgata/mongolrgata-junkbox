importScripts('character-data.js', 'weapon-data.js', 'EventWish.js', 'WeaponWish.js');

let DEFAULT_STATE;
let STATE;
let eventWish;
let weaponWish;

function reset() {
    for (let key in STATE) {
        STATE[key] = DEFAULT_STATE[key];
    }
}

function wishUntilC(C, rareC) {
    while (STATE.bannerLegendary <= C || STATE.bannerRare1 <= rareC) {
        eventWish.doWish();
    }
}

function wishUntilR(R) {
    while (STATE.weaponBannerLegendary1 < R) {
        weaponWish.doWish();
    }
}

function exchangeStarglitter() {
    STATE.primogemsCount += Math.floor(STATE.starglitterCount / 5) * 160;
    STATE.starglitterCount %= 5;
}

function wishUntilCR(C, rareC, R) {
    reset();
    wishUntilC(C, rareC);
    wishUntilR(R);

    if (STATE.useStarglitter) {
        exchangeStarglitter();
    }

    return Math.ceil(-STATE.primogemsCount / 160);
}

function wishUntilCan(pC) {
    reset();
    STATE.primogemsCount = pC;

    while (STATE.primogemsCount >= 160) {
        eventWish.doWish();

        if (STATE.useStarglitter) {
            exchangeStarglitter();
        }
    }

    return STATE;
}

onmessage = function (event) {
    switch (event.data.operation) {
        case 'wishUntil':
            wishUntil(event);
            break;
        case 'wishAll':
            wishAll(event);
            break;
    }
};

function initState(defaultState) {
    DEFAULT_STATE = defaultState;
    DEFAULT_STATE.legendaryPity = DEFAULT_STATE.wishUntilCharacterLegendaryPity;
    DEFAULT_STATE.weaponLegendaryPity = DEFAULT_STATE.wishUntilWeaponLegendaryPity;
    DEFAULT_STATE.legendaryGuaranteed = DEFAULT_STATE.wishUntilCharacterLegendaryGuaranteed;
    DEFAULT_STATE.weaponLegendaryGuaranteed = DEFAULT_STATE.wishUntilWeaponLegendaryGuaranteed;
    DEFAULT_STATE.bannerRare1 = DEFAULT_STATE.constellationRare1 + 1;
    DEFAULT_STATE.bannerRare2 = DEFAULT_STATE.constellationRare2 + 1;
    DEFAULT_STATE.bannerRare3 = DEFAULT_STATE.constellationRare3 + 1;
    STATE = {...DEFAULT_STATE};
}

function wishUntil (event) {
    const [C, rareC, R, N] = event.data.arguments;
    initState(event.data.DEFAULT_STATE);

    eventWish = new EventWish(STATE);
    weaponWish = new WeaponWish(STATE);

    const steps = DEFAULT_STATE.wishUntilSteps;
    clusters = [];
    for (let i = 0; i < N; ++i) {
        const wishCount = wishUntilCR(C, rareC, R);
        const clusterIndex = Math.floor(wishCount / steps);
        if (!clusters[clusterIndex]) {
            clusters[clusterIndex] = 0;
        }
        ++clusters[clusterIndex];

        if (i % 1000 === 0) {
            postMessage({progress: i + '/' + N});
        }
    }

    const characterWishCountMax = ((C + 1) * 2 - DEFAULT_STATE.wishUntilCharacterLegendaryGuaranteed) * 90;
    const weaponWishCountMax = R * 80 * 3;
    const clusterCountMin = Math.floor((characterWishCountMax + weaponWishCountMax) / steps) + 1;
    const result = new Array(Math.max(clusters.length, clusterCountMin)).fill(0).map((v, i) => clusters[i] || 0);

    postMessage({clusters: result});
}

function wishAll(event) {
    const [pC, N] = event.data.arguments;
    initState(event.data.DEFAULT_STATE);
    const result = {
        pullCount: 0,
        bannerLegendary: 0,
        bannerRare1: -(DEFAULT_STATE.constellationRare1 + 1) * N,
        bannerRare2: -(DEFAULT_STATE.constellationRare2 + 1) * N,
        bannerRare3: -(DEFAULT_STATE.constellationRare3 + 1) * N
    };
    const rates = [];

    eventWish = new EventWish(STATE);

    for (let i = 0; i < N; ++i) {
        wishUntilCan(pC);

        for (let key in result) {
            if (result.hasOwnProperty(key)) {
                result[key] += STATE[key];
            }
        }

        const index = STATE.bannerLegendary;
        rates[index] = (rates[index] || 0) + 1;

        if (i % 1000 === 0) {
            postMessage({progress: i + '/' + N});
        }
    }

    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            result[key] = Math.trunc((result[key] * 100) / N) / 100;
        }
    }
    result.bannerLegendaryRates = rates;

    postMessage({state: result});
}
