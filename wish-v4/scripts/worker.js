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

function wishUntilC(C) {
    while (STATE.bannerLegendary <= C) {
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

function wishUntilCR(C, R) {
    reset();
    wishUntilC(C);
    wishUntilR(R);
    if (STATE.useStarglitter) {
        exchangeStarglitter();
    }

    return Math.ceil(-STATE.primogemsCount / 160);
}

onmessage = function(event) {
    const [C, R, N] = event.data.arguments;
    DEFAULT_STATE = event.data.DEFAULT_STATE;
    DEFAULT_STATE.legendaryPity = DEFAULT_STATE.wishUntilCharacterLegendaryPity;
    DEFAULT_STATE.weaponLegendaryPity = DEFAULT_STATE.wishUntilWeaponLegendaryPity;
    DEFAULT_STATE.legendaryGuaranteed= DEFAULT_STATE.wishUntilCharacterLegendaryGuaranteed;
    DEFAULT_STATE.weaponLegendaryGuaranteed = DEFAULT_STATE.wishUntilWeaponLegendaryGuaranteed;
    DEFAULT_STATE.bannerRare1 = DEFAULT_STATE.constellationRare1 + 1;
    DEFAULT_STATE.bannerRare2 = DEFAULT_STATE.constellationRare2 + 1;
    DEFAULT_STATE.bannerRare3 = DEFAULT_STATE.constellationRare3 + 1;
    STATE = {...DEFAULT_STATE};

    eventWish = new EventWish(STATE);
    weaponWish = new WeaponWish(STATE);

    clusters = new Array(((C + 1)*90*2 + R*80*3) / 10 + 1).fill(0);
    for (let i = 0; i < N; ++i) {
        const wishCount = wishUntilCR(C, R);
        ++clusters[Math.floor(wishCount / 10)];
        if (i%1000 === 0) {
            postMessage({progress: i + '/' + N});
        }
    }

    postMessage({clusters: clusters});
};
