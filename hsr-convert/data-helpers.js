const G_STATE = {
    '_50': false,
    '_100': true
};

function getBaseSRS() {
    return JSON.parse(LZString.decompressFromUTF16(cleanSRSData));
}

function convertAchiev(pomJSON, srsJSON) {
    const pomAchiev = pomJSON.default.achievements;
    for (let i = 0; i < pomAchiev.length; ++i) {
        if (pomAchiev[i].checked) {
            const achievName = getNameFromPomMoe(pomAchiev[i].category, pomAchiev[i].id);
            const {category, id} = getAchievIDsSRS(achievName);
            const completeState = srsJSON.data.stores['1_achieve'].completeState;

            if (!completeState[category]) {
                completeState[category] = {};
            }

            completeState[category][id] = true;
        }
    }
}

function getNameFromPomMoe(category, id) {
    const achiev = POM_MOE_ACHIEV[category].achievements;
    for (let i = 0; i < achiev.length; ++i) {
        if (achiev[i].id === id) {
            return achiev[i].name;
        }
    }
}

function fixTitleSRS(title) {
    return title.replace(/<nobr>|<\/nobr>/g, '');
}

function fixNamePomMoe(name) {
    switch (name) {
        case 'Deja Vu':
            return 'Déjà Vu';
        case 'Go Now, A— SAM':
            return 'Go, Bla— SAM';
        default:
            return name;
    }
}

function getAchievIDsSRS(name) {
    for (let category in SRS_ACHIEV) {
        if (SRS_ACHIEV.hasOwnProperty(category)) {
            for (let i = 0; i < SRS_ACHIEV[category].length; ++i) {
                if (fixTitleSRS(SRS_ACHIEV[category][i].title).toUpperCase() === fixNamePomMoe(name).toUpperCase()) {
                    return {
                        category: category,
                        id: SRS_ACHIEV[category][i].id
                    }
                }
            }
        }
    }
}

let rateUpChallengeResult = null;
function itemFromPomMoeToSRS(item, pullCount, itemCount) {
    if (typeof item.raw === 'string') {
        item.raw = JSON.parse(item.raw)
    }

    let result = 0; // DEFAULT: 0, WIN: 2, GUARANTEE: 3, LOSE: 4
    const itemId = +item.itemId;
    const gachaId = +item.bannerCode;
    const rarity = +item.rarity;
    if (['11', '12'].indexOf(item.raw.gacha_type) > -1 && rarity > 3) {
        const bannerConfig = WARP_DATA.config.banners[gachaId];
        if (rarity === 4) {
            if (bannerConfig.rateup4.indexOf(itemId) > -1) {
                if (guaranteedState4 === G_STATE._50) {
                    result = 2;
                } else {
                    result = 3;
                }
                guaranteedState4 = G_STATE._50;
            } else {
                result = 4;
                guaranteedState4 = G_STATE._100;
            }
        }
        if (rarity === 5) {
            if (bannerConfig.rateup === itemId) {
                if (guaranteedState5 === G_STATE._50) {
                    rateUpChallengeResult = true;
                    result = 2;
                } else {
                    result = 3;
                }
                guaranteedState5 = G_STATE._50;
            } else {
                rateUpChallengeResult = false;
                result = 4;
                guaranteedState5 = G_STATE._100;
            }
        }
    }

    return {
        uid: item.id,
        itemId: itemId,
        timestamp: +new Date(item.time + '+01:00'),
        gachaType: +item.raw.gacha_type,
        gachaId: gachaId,
        rarity: rarity,
        manual: false,
        pity4: pity4,
        pity5: pity5,
        pullNo: pullCount,
        result: result,
        anchorItemId: "0",
        sort: itemCount
    };
}

let pity4;
let pity5;
let guaranteedState4;
let guaranteedState5;
function convertItemsByType(pomJSON, srsJSON, type) {
    // pomJSON.default.standard
    // srs.data.stores.1_warp-v2.items_1
    let pullCount = 0;
    let itemCount = 1e9;
    const itemSource = pomJSON.default[type];
    if (!itemSource.length) {
        return
    }

    const itemDestination = srsJSON.data.stores['1_warp-v2'];
    const itemType = itemFromPomMoeToSRS(itemSource[0]).gachaType;
    const itemTypeKey = 'items_' + itemType;

    pity4 = 0;
    pity5 = 0;
    guaranteedState4 = G_STATE._50;
    guaranteedState5 = G_STATE._50;
    itemDestination.types[itemType] = getDefaultItemTypeStats(itemType);
    itemDestination[itemTypeKey] = [];
    for (let i = 0; i < itemSource.length; ++i) {
        ++pity4;
        ++pity5;
        const itemPM = itemSource[i];
        const bannerId = itemPM.bannerCode;
        if (!itemDestination.banners[bannerId]) {
            itemDestination.banners[bannerId] = getDefaultBannerStats(bannerId, itemType);
        }

        const itemSRS = itemFromPomMoeToSRS(itemPM, ++pullCount, --itemCount);
        itemDestination[itemTypeKey].unshift(itemSRS);
        ++itemDestination.types[itemType]['pullCount' + +itemSRS.rarity];

        ++itemDestination.banners[bannerId].pity4;
        ++itemDestination.banners[bannerId].pity5;

        if (itemPM.raw.rank_type === '4') {
            if (itemPM.raw.item_type === 'Character') {
                itemDestination.banners[bannerId].avgPity4Char[0] += pity4;
                ++itemDestination.banners[bannerId].avgPity4Char[1];

                itemDestination.types[itemType].avgPity4Char[0] += pity4;
                ++itemDestination.types[itemType].avgPity4Char[1];
            } else {
                itemDestination.banners[bannerId].avgPity4LC[0] += pity4;
                ++itemDestination.banners[bannerId].avgPity4LC[1];

                itemDestination.types[itemType].avgPity4LC[0] += pity4;
                ++itemDestination.types[itemType].avgPity4LC[1];
            }
            itemDestination.banners[bannerId].avgPity4[0] += pity4;
            ++itemDestination.banners[bannerId].avgPity4[1];

            itemDestination.types[itemType].avgPity4[0] += pity4;
            ++itemDestination.types[itemType].avgPity4[1];

            pity4 = 0;
            itemDestination.banners[bannerId].pity4 = pity4;
        }
        if (itemPM.raw.rank_type === '5') {
            if (rateUpChallengeResult !== null) {
                ++itemDestination.banners[bannerId].rateupChallenges;
                ++itemDestination.types[itemType].rateupChallenges;

                if (rateUpChallengeResult) {
                    ++itemDestination.banners[bannerId].rateupWins;
                    ++itemDestination.types[itemType].rateupWins;
                }

                rateUpChallengeResult = null;
            }

            itemDestination.banners[bannerId].avgPity5[0] += pity5;
            ++itemDestination.banners[bannerId].avgPity5[1];

            itemDestination.types[itemType].avgPity5[0] += pity5;
            ++itemDestination.types[itemType].avgPity5[1];

            pity5 = 0;
            itemDestination.banners[bannerId].pity5 = pity5;
        }

        ++itemDestination.banners[bannerId]['pullCount' + itemSRS.rarity];
        itemDestination.types[itemType].lastItemId = itemSRS.uid;
        itemDestination.types[itemType].pity4 = pity4;
        itemDestination.types[itemType].pity5 = pity5;
        itemDestination.types[itemType].guarantee4 = guaranteedState4;
        itemDestination.types[itemType].guarantee5 = guaranteedState5;
    }
}

function calcStats(warpData) {
    function calc(data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                const item = data[key];
                item.avgPity4Char = item.avgPity4Char[0] / (item.avgPity4Char[1] || 1);
                item.avgPity4LC = item.avgPity4LC[0] / (item.avgPity4LC[1] || 1);
                item.avgPity4 = item.avgPity4[0] / (item.avgPity4[1] || 1);
                item.avgPity5 = item.avgPity5[0] / (item.avgPity5[1] || 1);
            }
        }
    }

    calc(warpData.types);
    calc(warpData.banners);
}

function convertItems(pomJSON, srsJSON) {
    srsJSON.data.stores['1_warp-v2'] = {
        "types": {},
        "banners": {},
        "identities": {}
    };
    convertItemsByType(pomJSON, srsJSON, 'standard'); // "gacha_type": "1"
    convertItemsByType(pomJSON, srsJSON, 'beginner'); // "gacha_type": "2"
    convertItemsByType(pomJSON, srsJSON, 'character'); // "gacha_type": "11"
    convertItemsByType(pomJSON, srsJSON, 'lightcone'); // "gacha_type": "12"
    calcStats(srsJSON.data.stores['1_warp-v2']);
}
