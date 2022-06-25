class WeaponWish {
    constructor(STATE) {
        this.STATE = STATE;
    }

    isLegendary() {
        return Math.random() < WEAPON_LEGENDARY_CHANCE[this.STATE.weaponLegendaryPity];
    }

    isLegendaryBanner() {
        return this.STATE.weaponLegendaryGuaranteed || Math.random() < 0.75;
    }

    isRare() {
        return Math.random() < WEAPON_RARE_CHANCE[Math.min(this.STATE.weaponRarePity, 9)];
    }

    giveItem(type, index) {
        switch (type) {
            case 'banner legendary':
                ++this.STATE['weaponBannerLegendary' + index];
                this.STATE.starglitterCount += 10;
                break;
                break;
            case 'standard legendary':
                ++this.STATE.weaponStandardLegendary;
                this.STATE.starglitterCount += 10;
                break;
            case 'banner rare':
                ++this.STATE['weaponBannerRare' + Math.floor(Math.random() * 5 + 1)];
                this.STATE.starglitterCount += 2;
                break;
            case 'standard rare':
                ++this.STATE.weaponStandardRare;
                this.STATE.starglitterCount += 2;
                break;
            case 'character rare':
                ++this.STATE.characterRare;
                this.STATE.starglitterCount += 2;
                break;
            case 'common':
                ++this.STATE.weaponCommon2;
        }
    }

    doWish() {
        this.STATE.primogemsCount -= 160;
        ++this.STATE.weaponLegendaryPity;
        ++this.STATE.weaponRarePity;

        if (this.isLegendary()) {
            if (this.STATE.weaponEpitomizedPath === 2) {
                this.giveItem('banner legendary', 1);
                this.STATE.weaponEpitomizedPath = 0;
                this.STATE.weaponLegendaryGuaranteed = false;
            } else if (this.isLegendaryBanner()) {
                if (Math.random() < 0.5) {
                    this.giveItem('banner legendary', 1);
                    this.STATE.weaponEpitomizedPath = 0;
                    this.STATE.weaponLegendaryGuaranteed = false;
                } else {
                    this.giveItem('banner legendary', 2);
                    ++this.STATE.weaponEpitomizedPath;
                    this.STATE.weaponLegendaryGuaranteed = false;
                }
            } else {
                this.giveItem('standard legendary');
                ++this.STATE.weaponEpitomizedPath;
                this.STATE.weaponLegendaryGuaranteed = true;
            }
            this.STATE.weaponLegendaryPity = 0;
        } else if (this.isRare()) {
            if (this.STATE.weaponRareGuaranteed) {
                this.giveItem('banner rare');
                this.STATE.weaponRareGuaranteed = false;
            } else {
                if (Math.random() < 0.5) {
                    // weapon
                    if (Math.random() < 0.5) {
                        // win 50/50
                        this.giveItem('banner rare');
                    } else {
                        // lose 50/50
                        this.giveItem('standard rare');
                        this.STATE.weaponRareGuaranteed = true;
                    }
                } else {
                    // character
                    this.giveItem('character rare');
                    this.STATE.weaponRareGuaranteed = true;
                }
            }
            this.STATE.weaponRarePity = 0;
        } else {
            this.giveItem('common');
        }

        ++this.STATE.weaponPullCount;
    }
}
