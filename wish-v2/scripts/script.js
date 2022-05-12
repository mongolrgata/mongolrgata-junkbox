function selectBanner(type) {
    STATE.selectedBanner = type;
}

function exchangeStarglitter() {
    STATE.primogemsCount += Math.floor(STATE.starglitterCount / 5) * 160;
    STATE.starglitterCount %= 5;
}

function save() {
    localStorage.setItem('STATE', JSON.stringify(STATE));
}

function reset() {
    localStorage.removeItem('STATE');
    location.reload();
}

function wish(N) {
    for (let i = 0; i < N; ++i) {
        switch (STATE.selectedBanner) {
            case 'event-banner':
                EventWish.doWish();
                break;
            case 'weapon-banner':
                WeaponWish.doWish();
                break;
        }
    }
}

function wishUntilC(C) {
    while (STATE.bannerLegendary <= C) {
        EventWish.doWish();
    }
}

function wishUntilR(R) {
    while (STATE.weaponBannerLegendary1 < R) {
        WeaponWish.doWish();
    }
}
