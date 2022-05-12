const WEAPON_DATA = {
    "time": "2022-05-11T05:16:55+00:00",
    "pityAverage": {
        "legendary": 50.46767086172425,
        "rare": 6.666810790748265
    },
    "median": {
        "legendary": 64
    },
    "pityCount": {
        "legendary": [
            0,
            3312,
            3363,
            3462,
            3373,
            3373,
            3243,
            3194,
            3104,
            3153,
            2964,
            2830,
            2888,
            3032,
            2910,
            2930,
            2873,
            2935,
            2882,
            2752,
            2765,
            2851,
            2782,
            2847,
            2635,
            2855,
            2784,
            2661,
            2710,
            2641,
            2679,
            2574,
            2669,
            2556,
            2527,
            2696,
            2578,
            2607,
            2660,
            2629,
            2664,
            2578,
            2671,
            2573,
            2651,
            2666,
            2683,
            2647,
            2641,
            2656,
            2665,
            2627,
            2614,
            2949,
            3044,
            3332,
            3360,
            3219,
            3331,
            3334,
            3256,
            3408,
            3823,
            18460,
            30491,
            37214,
            38009,
            33581,
            25524,
            17007,
            9660,
            4660,
            1938,
            678,
            153,
            15,
            9,
            4,
            6,
            2,
            9,
            3,
            7,
            5,
            5,
            6,
            3,
            5,
            7,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "rare": [
            193640,
            181286,
            171023,
            160939,
            150370,
            141974,
            134993,
            1303115,
            658778,
            7689
        ]
    },
    "total": {
        "legendary": 397134,
        "rare": 3104185,
        "all": 21093947,
        "users": 515704
    },
    "countEachPity": [
        382059,
        372883,
        362513,
        351843,
        341317,
        331166,
        321307,
        311654,
        303376,
        295236,
        296651,
        295022,
        293004,
        290628,
        288406,
        286198,
        283999,
        281850,
        279814,
        277602,
        278457,
        276970,
        275463,
        273627,
        272173,
        270597,
        268766,
        267137,
        265346,
        263637,
        264215,
        263115,
        261754,
        260367,
        259000,
        257594,
        256268,
        254835,
        253255,
        251633,
        251835,
        250677,
        249350,
        248083,
        246690,
        245366,
        243844,
        242265,
        240849,
        239182,
        239154,
        237840,
        236422,
        234583,
        232835,
        230843,
        228513,
        226303,
        223891,
        221376,
        220099,
        217711,
        214810,
        197134,
        167267,
        130564,
        92896,
        59514,
        34088,
        17134,
        7504,
        2849,
        914,
        237,
        84,
        69,
        60,
        56,
        51,
        50,
        42,
        39,
        33,
        28,
        23,
        17,
        14,
        9,
        2,
        1
    ]
};

// WEAPON_DATA fix
WEAPON_DATA.total.legendary = WEAPON_DATA.pityCount.legendary.slice(0, 81).reduce((sum, value) => sum + value, 0);
WEAPON_DATA.pityCount.rare[8] += WEAPON_DATA.pityCount.rare.pop();
WEAPON_DATA.pityCount.rare[8] += WEAPON_DATA.total.rare - WEAPON_DATA.pityCount.rare.reduce((sum, value) => sum + value, 0);

const WEAPON_LEGENDARY_CHANCE = [0];
for (let i = 1, total = WEAPON_DATA.total.legendary; i <= 80; ++i) {
    WEAPON_LEGENDARY_CHANCE.push(WEAPON_DATA.pityCount.legendary[i] / total);
    total -= WEAPON_DATA.pityCount.legendary[i];
}

function _checkWeaponLegendaryChance() {
    let stats = new Array(81).fill(0);
    for (let legendaryCount = 0; legendaryCount < DATA.total.legendary; ++legendaryCount) {
        for (let i = 1; ; ++i) {
            if (Math.random() < WEAPON_LEGENDARY_CHANCE[i]) {
                ++stats[i];
                break;
            }
        }
    }
    console.log(stats);
}

const WEAPON_RARE_CHANCE = [0];
for (let i = 0, total = WEAPON_DATA.total.rare; i < 9; ++i) {
    WEAPON_RARE_CHANCE.push(WEAPON_DATA.pityCount.rare[i] / total);
    total -= WEAPON_DATA.pityCount.rare[i];
}

function _checkWeaponRareChance() {
    let stats = new Array(11).fill(0);
    for (let rareCount = 0; rareCount < WEAPON_DATA.total.rare; ++rareCount) {
        for (let i = 1; ; ++i) {
            if (Math.random() < WEAPON_RARE_CHANCE[i]) {
                ++stats[i];
                break;
            }
        }
    }
    console.log(stats);
}
