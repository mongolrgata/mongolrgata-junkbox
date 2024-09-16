const POM_MOE_ITEM_EXAMPLE = {
    "id": "1725988200001318230",
    "bannerCode": 2043,
    "itemId": "20013",
    "name": "passkey",
    "time": "2024-09-10 18:42:47",
    "type": "lightcone",
    "rarity": 3,
    "pity": 9,
    "guaranteed": 0,
    "raw": "{\"uid\":\"700140030\",\"gacha_id\":\"2043\",\"gacha_type\":\"11\",\"item_id\":\"20013\",\"count\":\"1\",\"time\":\"2024-09-10 18:42:47\",\"name\":\"Passkey\",\"lang\":\"en-us\",\"item_type\":\"Light Cone\",\"rank_type\":\"3\",\"id\":\"1725988200001318230\"}"
};

const SRS_ITEM_EXAMPLE = {
    "uid": "1725988200001318230",
    "itemId": 20013,
    "timestamp": 1725990167000,
    "gachaType": 11,
    "gachaId": 2043,
    "rarity": 3,
    "manual": false,
    "pity4": 6,
    "pity5": 60,
    "pullNo": 558,
    "result": 0,
    "anchorItemId": "0",
    "sort": 999999442
};

function getDefaultItemTypeStats(itemType) {
    return {
        "type": itemType,
        "lastItemId": "0",
        "pullCount3": 0,
        "pullCount4": 0,
        "pullCount5": 0,
        "avgPity4Char": [0, 0],
        "avgPity4LC": [0, 0],
        "avgPity4": [0, 0],
        "avgPity5": [0, 0],
        "pity4": 0,
        "pity5": 0,
        "guarantee5": false,
        "guarantee4": false,
        "rateupChallenges": 0,
        "rateupWins": 0,
        "advanceInfo": {}
    }
}

function getDefaultBannerStats(bannerId, itemType) {
    return {
        "id": bannerId,
        "type": itemType,
        "pullCount3": 0,
        "pullCount4": 0,
        "pullCount5": 0,
        "avgPity4Char": [0, 0],
        "avgPity4LC": [0, 0],
        "avgPity4": [0, 0],
        "avgPity5": [0, 0],
        "pity4": 0,
        "pity5": 0,
        "rateupWins": 0,
        "rateupChallenges": 0,
        "advanceInfo": {}
    }
}
