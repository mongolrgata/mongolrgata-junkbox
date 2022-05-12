class EventWish {
    static isLegendary() {
        return Math.random() < LEGENDARY_CHANCE[STATE.legendaryPity];
    }

    static isLegendaryBanner() {
        return STATE.legendaryGuaranteed || Math.random() < 0.5;
    }

    static isRare() {
        return Math.random() < RARE_CHANCE[Math.min(STATE.rarePity, 10)];
    }

    static giveItem(type) {
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
                let index = Math.floor(Math.random() * 3 + 1);
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

    static doWish() {
        STATE.primogemsCount -= 160;
        ++STATE.legendaryPity;
        ++STATE.rarePity;

        if (EventWish.isLegendary()) {
            if (EventWish.isLegendaryBanner()) {
                EventWish.giveItem('banner legendary');
                STATE.legendaryGuaranteed = false;
            } else {
                EventWish.giveItem('standard legendary');
                STATE.legendaryGuaranteed = true;
            }
            STATE.legendaryPity = 0;
        } else if (EventWish.isRare()) {
            if (STATE.rareGuaranteed) {
                EventWish.giveItem('banner rare');
                STATE.rareGuaranteed = false;
            } else {
                if (Math.random() < 0.5) {
                    // character
                    if (Math.random() < 0.5) {
                        // win 50/50
                        EventWish.giveItem('banner rare');
                    } else {
                        // lose 50/50
                        EventWish.giveItem('standard rare');
                        STATE.rareGuaranteed = true;
                    }
                } else {
                    // weapon
                    EventWish.giveItem('weapon rare');
                    STATE.rareGuaranteed = true;
                }
            }
            STATE.rarePity = 0;
        } else {
            EventWish.giveItem('common');
        }

        ++STATE.pullCount;
    }
}
