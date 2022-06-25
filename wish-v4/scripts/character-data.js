const DATA = {
    "time": "2022-05-09T03:02:34+00:00",
    "pityAverage": {
        "legendary": 60.31831631121384,
        "rare": 7.631075218449577
    },
    "median": {
        "legendary": 75
    },
    "pityCount": {
        "legendary": [
            0,
            5442,
            5638,
            5626,
            5436,
            5386,
            5406,
            5352,
            5365,
            5181,
            5294,
            5258,
            5183,
            5119,
            5212,
            5075,
            4934,
            5086,
            4823,
            4976,
            4821,
            4811,
            4867,
            4766,
            4747,
            4699,
            4819,
            4592,
            4572,
            4498,
            4485,
            4508,
            4409,
            4365,
            4400,
            4361,
            4292,
            4226,
            4266,
            4305,
            4027,
            4150,
            4242,
            4122,
            4124,
            4147,
            4090,
            3972,
            4080,
            3987,
            4001,
            3848,
            4049,
            3852,
            3980,
            4148,
            3927,
            4032,
            3949,
            3957,
            3894,
            3885,
            3860,
            3859,
            3919,
            3992,
            3986,
            3975,
            3889,
            3896,
            3953,
            3914,
            4014,
            3962,
            32896,
            56986,
            73595,
            78912,
            73666,
            61068,
            45070,
            29819,
            16918,
            8558,
            3830,
            1316,
            372,
            115,
            23,
            7,
            3,
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
            330818,
            313569,
            297172,
            282357,
            267673,
            253043,
            241900,
            228628,
            2357852,
            1822972
        ]
    },
    "total": {
        "legendary": 809437,
        "rare": 6418168,
        "all": 49206865,
        "users": 1011421
    },
    "countEachPity": [
        775682,
        752827,
        732213,
        714214,
        697047,
        681072,
        665679,
        650858,
        636096,
        621955,
        613256,
        603606,
        594454,
        585575,
        576789,
        568716,
        560611,
        552508,
        545232,
        537590,
        533311,
        527349,
        521422,
        515749,
        509923,
        504877,
        499498,
        494609,
        489752,
        485069,
        483743,
        480541,
        477208,
        474063,
        470645,
        467659,
        464972,
        461940,
        459253,
        456185,
        457123,
        455779,
        454527,
        452969,
        451559,
        450501,
        449305,
        448148,
        447177,
        445915,
        448967,
        449406,
        449385,
        449338,
        449318,
        449552,
        449593,
        449425,
        449190,
        448801,
        453415,
        454778,
        455882,
        456636,
        457185,
        458670,
        459598,
        460278,
        460795,
        461203,
        465497,
        466651,
        467587,
        468242,
        439257,
        386236,
        315104,
        238062,
        165499,
        105108,
        60601,
        30996,
        14166,
        5647,
        1832,
        517,
        148,
        33,
        10,
        3
    ]
};

// DATA fix
DATA.pityCount.rare[9] += DATA.total.rare - DATA.pityCount.rare.reduce((sum, value) => sum + value, 0);

const LEGENDARY_CHANCE = [0];
for (let i = 1, total = DATA.total.legendary; i <= 90; ++i) {
    LEGENDARY_CHANCE.push(DATA.pityCount.legendary[i] / total);
    total -= DATA.pityCount.legendary[i];
}

function _checkLegendaryChance() {
    let stats = new Array(91).fill(0);
    for (let legendaryCount = 0; legendaryCount < DATA.total.legendary; ++legendaryCount) {
        for (let i = 1; ; ++i) {
            if (Math.random() < LEGENDARY_CHANCE[i]) {
                ++stats[i];
                break;
            }
        }
    }
    console.log(stats);
}

const RARE_CHANCE = [0];
for (let i = 0, total = DATA.total.rare; i < 10; ++i) {
    RARE_CHANCE.push(DATA.pityCount.rare[i] / total);
    total -= DATA.pityCount.rare[i];
}

function _checkRareChance() {
    let stats = new Array(11).fill(0);
    for (let rareCount = 0; rareCount < DATA.total.rare; ++rareCount) {
        for (let i = 1; ; ++i) {
            if (Math.random() < RARE_CHANCE[i]) {
                ++stats[i];
                break;
            }
        }
    }
    console.log(stats);
}
