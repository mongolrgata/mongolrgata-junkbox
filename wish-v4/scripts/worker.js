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

onmessage = function (event) {
    const [C, rareC, R, N] = event.data.arguments;
    DEFAULT_STATE = event.data.DEFAULT_STATE;
    DEFAULT_STATE.legendaryPity = DEFAULT_STATE.wishUntilCharacterLegendaryPity;
    DEFAULT_STATE.weaponLegendaryPity = DEFAULT_STATE.wishUntilWeaponLegendaryPity;
    DEFAULT_STATE.legendaryGuaranteed = DEFAULT_STATE.wishUntilCharacterLegendaryGuaranteed;
    DEFAULT_STATE.weaponLegendaryGuaranteed = DEFAULT_STATE.wishUntilWeaponLegendaryGuaranteed;
    DEFAULT_STATE.bannerRare1 = DEFAULT_STATE.constellationRare1 + 1;
    DEFAULT_STATE.bannerRare2 = DEFAULT_STATE.constellationRare2 + 1;
    DEFAULT_STATE.bannerRare3 = DEFAULT_STATE.constellationRare3 + 1;
    STATE = {...DEFAULT_STATE};

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
};
