class WeaponWish {
    static isLegendary() {
        return Math.random() < WEAPON_LEGENDARY_CHANCE[STATE.weaponLegendaryPity];
    }

    static isLegendaryBanner() {
        return STATE.weaponLegendaryGuaranteed || Math.random() < 0.75;
    }

    static isRare() {
        return Math.random() < WEAPON_RARE_CHANCE[Math.min(STATE.weaponRarePity, 9)];
    }

    static giveItem(type, index) {
        switch (type) {
            case 'banner legendary':
                ++STATE['weaponBannerLegendary' + index];
                STATE.starglitterCount += 10;
                break;
                break;
            case 'standard legendary':
                ++STATE.weaponStandardLegendary;
                STATE.starglitterCount += 10;
                break;
            case 'banner rare':
                ++STATE['weaponBannerRare' + Math.floor(Math.random() * 5 + 1)];
                STATE.starglitterCount += 2;
                break;
            case 'standard rare':
                ++STATE.weaponStandardRare;
                STATE.starglitterCount += 2;
                break;
            case 'character rare':
                ++STATE.characterRare;
                STATE.starglitterCount += 2;
                break;
            case 'common':
                ++STATE.weaponCommon2;
        }
    }

    static doWish() {
        STATE.primogemsCount -= 160;
        ++STATE.weaponLegendaryPity;
        ++STATE.weaponRarePity;

        if (WeaponWish.isLegendary()) {
            if (STATE.weaponEpitomizedPath === 2) {
                WeaponWish.giveItem('banner legendary', 1);
                STATE.weaponEpitomizedPath = 0;
                STATE.weaponLegendaryGuaranteed = false;
            } else if (WeaponWish.isLegendaryBanner()) {
                if (Math.random() < 0.5) {
                    WeaponWish.giveItem('banner legendary', 1);
                    STATE.weaponEpitomizedPath = 0;
                    STATE.weaponLegendaryGuaranteed = false;
                } else {
                    WeaponWish.giveItem('banner legendary', 2);
                    ++STATE.weaponEpitomizedPath;
                    STATE.weaponLegendaryGuaranteed = false;
                }
            } else {
                WeaponWish.giveItem('standard legendary');
                ++STATE.weaponEpitomizedPath;
                STATE.weaponLegendaryGuaranteed = true;
            }
            STATE.weaponLegendaryPity = 0;
        } else if (WeaponWish.isRare()) {
            if (STATE.weaponRareGuaranteed) {
                WeaponWish.giveItem('banner rare');
                STATE.weaponRareGuaranteed = false;
            } else {
                if (Math.random() < 0.5) {
                    // weapon
                    if (Math.random() < 0.5) {
                        // win 50/50
                        WeaponWish.giveItem('banner rare');
                    } else {
                        // lose 50/50
                        WeaponWish.giveItem('standard rare');
                        STATE.weaponRareGuaranteed = true;
                    }
                } else {
                    // character
                    WeaponWish.giveItem('character rare');
                    STATE.weaponRareGuaranteed = true;
                }
            }
            STATE.weaponRarePity = 0;
        } else {
            WeaponWish.giveItem('common');
        }

        ++STATE.weaponPullCount;
    }
}
