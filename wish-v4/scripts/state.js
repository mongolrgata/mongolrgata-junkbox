let STATE = {};

Object.defineProperty(STATE, 'selectedBanner', {
    enumerable: true,
    set(value) {
        if (value === 'reset') {
            value = 'event-banner';
        }
        document.getElementById('selected-banner').setAttribute('src', 'resources/' + value + '.webp');
        window._selectedBanner = value;
    },
    get() {
        return window._selectedBanner || 'event-banner';
    }
});

[
    ['primogemsCount', 'primogems-count'],
    ['starglitterCount', 'starglitter-count'],
    ['legendaryPity', 'legendary-pity-value'],
    ['rarePity', 'rare-pity-value'],

    ['pullCount', 'pull-count-value'],
    ['bannerLegendary', 'banner-legendary-value'],
    ['standardLegendary', 'standard-legendary-value'],
    ['bannerRare1', 'banner-rare1-value'],
    ['bannerRare2', 'banner-rare2-value'],
    ['bannerRare3', 'banner-rare3-value'],
    ['standardRare', 'standard-rare-value'],
    ['weaponRare', 'weapon-rare-value'],
    ['weaponCommon', 'weapon-common-value'],

    ['weaponPullCount', 'weapon-pull-count-value'],
    ['weaponLegendaryPity', 'weapon-legendary-pity-value'],
    ['weaponEpitomizedPath', 'epitomized-path-value'],
    ['weaponRarePity', 'weapon-rare-pity-value'],
    ['weaponBannerLegendary1', 'weapon-banner-legendary1-value'],
    ['weaponBannerLegendary2', 'weapon-banner-legendary2-value'],
    ['weaponStandardLegendary', 'weapon-standard-legendary-value'],
    ['weaponBannerRare1', 'weapon-banner-rare1-value'],
    ['weaponBannerRare2', 'weapon-banner-rare2-value'],
    ['weaponBannerRare3', 'weapon-banner-rare3-value'],
    ['weaponBannerRare4', 'weapon-banner-rare4-value'],
    ['weaponBannerRare5', 'weapon-banner-rare5-value'],
    ['weaponStandardRare', 'weapon-standard-rare-value'],
    ['characterRare', 'character-rare-value'],
    ['weaponCommon2', 'weapon-common2-value'],

    ['wishUntilC', 'wish-until-c-value', null],
    ['wishUntilR', 'wish-until-r-value', null],
    ['wishUntilSamples', 'wish-until-samples-value', null]
].map(([propertyName, id, resetValue]) => {
    Object.defineProperty(STATE, propertyName, {
        enumerable: true,
        set(value) {
            if (value === 'reset') {
                if (resetValue === null) {
                    return;
                }

                value = 0;
            }
            document.getElementById(id).value = value;
        },
        get() {
            return +document.getElementById(id).value;
        }
    });
});

[
    ['legendaryGuaranteed', 'legendary-guaranteed-value'],
    ['rareGuaranteed', 'rare-guaranteed-value'],
    ['weaponLegendaryGuaranteed', 'weapon-legendary-guaranteed-value'],
    ['weaponRareGuaranteed', 'weapon-rare-guaranteed-value']
].map(([propertyName, id]) => {
    Object.defineProperty(STATE, propertyName, {
        enumerable: true,
        set(value) {
            if (value === 'reset') {
                value = false;
            }
            document.getElementById(id).checked = value;
        },
        get() {
            return !!document.getElementById(id).checked;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let savedState = JSON.parse(localStorage.getItem('STATE'));

    if (savedState) {
        for (let key in savedState) {
            if (STATE.hasOwnProperty(key)) {
                STATE[key] = savedState[key];
            }
        }
    }
});
