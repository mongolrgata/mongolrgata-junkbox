function exchangeStarglitter() {
    STATE.promogemsCount += Math.floor(STATE.starglitterCount / 5) * 160;
    STATE.starglitterCount %= 5;
}

function save() {
    localStorage.setItem('STATE', JSON.stringify(STATE));
}

function reset() {
    localStorage.removeItem('STATE');
    location.reload();
}

function isLegendary() {
    return Math.random() < LEGENDARY_CHANCE[STATE.legendaryPity];
}

function isLegendaryBanner() {
    return STATE.legendaryGuaranted || Math.random() < 0.5;
}

function isRare() {
    return Math.random() < RARE_CHANCE[STATE.rarePity];
}

function giveItem(type) {
    console.log(type);

    switch (type) {
        case 'banner legendary':
            ++STATE.bannerLegendary;
            STATE.starglitterCount += 10;
            break;
        case 'standard legendary':
            ++STATE.standardLegendary;
            STATE.starglitterCount += 10;
            break;
        case 'banner rare':
            index = Math.floor(Math.random() * 3 + 1);
            STATE.starglitterCount += ++STATE['bannerRare' + index] <= 7 ? 2 : 10;
            break;
        case 'standard rare':
            ++STATE.standardRare;
            STATE.starglitterCount += 2;
            break;
        case 'weapon rare':
            ++STATE.weaponRare;
            STATE.starglitterCount += 2;
            break;
        case 'common':
            ++STATE.weaponCommon;
            break;
    }
}

function doWish() {
    STATE.promogemsCount -= 160;
    ++STATE.legendaryPity;
    ++STATE.rarePity;

    if (isLegendary()) {
        if (isLegendaryBanner()) {
            giveItem('banner legendary');
            STATE.legendaryGuaranted = false;
        } else {
            giveItem('standard legendary');
            STATE.legendaryGuaranted = true;
        }
        STATE.legendaryPity = 0;
    } else if (isRare()) {
        if (STATE.rareGuaranted) {
            giveItem('banner rare');
            STATE.rareGuaranted = false;
        } else {
            if (Math.random() < 0.5) {
                // character
                if (Math.random() < 0.5) {
                    // win 50/50
                    giveItem('banner rare');
                } else {
                    // lose 50/50
                    giveItem('standard rare');
                    STATE.rareGuaranted = true;
                }
            } else {
                // weapon
                giveItem('weapon rare');
                STATE.rareGuaranted = true;
            }
        }
        STATE.rarePity = 0;
    } else {
        giveItem('common');
    }

    ++STATE.pullCount;
}

function wish(N) {
    for (let i = 0; i < N; ++i) {
        doWish();
    }
}


function wishUntil(C) {
    while (STATE.bannerLegendary < C) {
        doWish();
    }
}
