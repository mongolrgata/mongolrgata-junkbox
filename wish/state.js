let STATE = {};

[
    ['promogemsCount', 'promogems-count'],
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
    ['weaponCommon', 'weapon-common-value']
].map(([propertyName, id]) => {
    Object.defineProperty(STATE, propertyName, {
        enumerable: true,
        set(value) {
            document.getElementById(id).value = value;
        },
        get() {
            return +document.getElementById(id).value;
        }
    });
});

[
    ['legendaryGuaranted', 'legendary-guaranted-value'],
    ['rareGuaranted', 'rare-guaranted-value']
].map(([propertyName, id]) => {
    Object.defineProperty(STATE, propertyName, {
        enumerable: true,
        set(value) {
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
