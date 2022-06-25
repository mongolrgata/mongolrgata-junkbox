class EventWish {
    constructor(STATE) {
        this.STATE = STATE;
    }

    isLegendary() {
        return Math.random() < LEGENDARY_CHANCE[this.STATE.legendaryPity];
    }

    isLegendaryBanner() {
        return this.STATE.legendaryGuaranteed || Math.random() < 0.5;
    }

    isRare() {
        return Math.random() < RARE_CHANCE[Math.min(this.STATE.rarePity, 10)];
    }

    giveItem(type) {
        switch (type) {
            case 'banner legendary':
                this.STATE.starglitterCount += ++this.STATE.bannerLegendary <= 1 ? 0 : 10;
                break;
            case 'standard legendary':
                ++this.STATE.standardLegendary;
                this.STATE.starglitterCount += 10;
                break;
            case 'banner rare':
                this.STATE.starglitterCount += ++STATE['bannerRare' + Math.floor(Math.random() * 3 + 1)] <= 7 ? 2 : 5;
                break;
            case 'standard rare':
                ++this.STATE.standardRare;
                this.STATE.starglitterCount += 2;
                break;
            case 'weapon rare':
                ++this.STATE.weaponRare;
                this.STATE.starglitterCount += 2;
                break;
            case 'common':
                ++this.STATE.weaponCommon;
                break;
        }
    }

    doWish() {
        this.STATE.primogemsCount -= 160;
        ++this.STATE.legendaryPity;
        ++this.STATE.rarePity;

        if (this.isLegendary()) {
            if (this.isLegendaryBanner()) {
                this.giveItem('banner legendary');
                this.STATE.legendaryGuaranteed = false;
            } else {
                this.giveItem('standard legendary');
                this.STATE.legendaryGuaranteed = true;
            }
            this.STATE.legendaryPity = 0;
        } else if (this.isRare()) {
            if (this.STATE.rareGuaranteed) {
                this.giveItem('banner rare');
                this.STATE.rareGuaranteed = false;
            } else {
                if (Math.random() < 0.5) {
                    // character
                    if (Math.random() < 0.5) {
                        // win 50/50
                        this.giveItem('banner rare');
                    } else {
                        // lose 50/50
                        this.giveItem('standard rare');
                        this.STATE.rareGuaranteed = true;
                    }
                } else {
                    // weapon
                    this.giveItem('weapon rare');
                    this.STATE.rareGuaranteed = true;
                }
            }
            this.STATE.rarePity = 0;
        } else {
            this.giveItem('common');
        }

        ++this.STATE.pullCount;
    }
}
