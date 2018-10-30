var BLANK = '　';
var HIRA = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', 'ん', 'わ', 'ら', 'や', 'ま', 'は', 'な', 'た', 'さ', 'か', 'あ'],
    ['ｉ', '　', 'ゐ', 'り', '　', 'み', 'ひ', 'に', 'ち', 'し', 'き', 'い'],
    ['ｕ', '　', '　', 'る', 'ゆ', 'む', 'ふ', 'ぬ', 'つ', 'す', 'く', 'う'],
    ['ｅ', '　', 'ゑ', 'れ', '　', 'め', 'へ', 'ね', 'て', 'せ', 'け', 'え'],
    ['ｏ', '　', 'を', 'ろ', 'よ', 'も', 'ほ', 'の', 'と', 'そ', 'こ', 'お']
];

var ADDITIONAL_HIRA = [
    ['ｇ', 'ｚ', 'ｄ', 'ｂ', 'ｐ'],
    ['が', 'ざ', 'だ', 'ば', 'ぱ'],
    ['ぎ', 'じ', 'ぢ', 'び', 'ぴ'],
    ['ぐ', 'ず', 'づ', 'ぶ', 'ぷ'],
    ['げ', 'ぜ', 'で', 'べ', 'ぺ'],
    ['ご', 'ぞ', 'ど', 'ぼ', 'ぽ']
];

var YOON_HIRA = [
    ['　', '　', '　', 'りゃ', '　', 'みゃ', 'ひゃ', 'にゃ', 'ちゃ', 'しゃ', 'きゃ', '　', 'ぎゃ', 'じゃ', 'ぢゃ', 'びゃ', 'ぴゃ'],
    ['　', '　', '　', 'りゅ', '　', 'みゅ', 'ひゅ', 'にゅ', 'ちゅ', 'しゅ', 'きゅ', '　', 'ぎゅ', 'じゅ', 'ぢゅ', 'びゅ', 'ぴゅ'],
    ['　', '　', '　', 'りょ', '　', 'みょ', 'ひょ', 'にょ', 'ちょ', 'しょ', 'きょ', '　', 'ぎょ', 'じょ', 'ぢょ', 'びょ', 'ぴょ']
];

var ROMAJI = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', ['nn', 'n'], 'wa', 'ra', 'ya', 'ma', 'ha', 'na', 'ta', 'sa', 'ka', 'a'],
    ['ｉ', '　', 'wi', 'ri', '　', 'mi', 'hi', 'ni', 'chi', 'shi', 'ki', 'i'],
    ['ｕ', '　', '　', 'ru', 'yu', 'mu', 'fu', 'nu', 'tsu', 'su', 'ku', 'u'],
    ['ｅ', '　', 'we', 're', '　', 'me', 'he', 'ne', 'te', 'se', 'ke', 'e'],
    ['ｏ', '　', 'wo', 'ro', 'yo', 'mo', 'ho', 'no', 'to', 'so', 'ko', 'o']
];

var ADDITIONAL_ROMAJI = [
    ['ｇ', 'ｚ', 'ｄ', 'ｂ', 'ｐ'],
    ['ga', 'za', 'da', 'ba', 'pa'],
    ['gi', 'ji', ['di', 'dji'], 'bi', 'pi'],
    ['gu', 'zu', ['du', 'dzu'], 'bu', 'pu'],
    ['ge', 'ze', 'de', 'be', 'pe'],
    ['go', 'zo', 'do', 'bo', 'po']
];

var YOON_ROMAJI = [
    ['　', '　', '　', 'rya', '　', 'mya', 'hya', 'nya', ['cha', 'chya'], ['sha', 'shya'], 'kya', '　', 'gya', ['ja', 'jya'], 'dya', 'bya', 'pya'],
    ['　', '　', '　', 'ryu', '　', 'myu', 'hyu', 'nyu', ['chu', 'chyu'], ['shu', 'shyu'], 'kyu', '　', 'gyu', ['ju', 'jyu'], 'dyu', 'byu', 'pyu'],
    ['　', '　', '　', 'ryo', '　', 'myo', 'hyo', 'nyo', ['cho', 'chyo'], ['sho', 'shyo'], 'kyo', '　', 'gyo', ['jo', 'jyo'], 'dyo', 'byo', 'pyo']
];

//----------------------------------------------------------------------------------------------------------------------
var KATA = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', 'ン', 'ワ', 'ラ', 'ヤ', 'マ', 'ハ', 'ナ', 'タ', 'サ', 'カ', 'ア'],
    ['ｉ', '　', 'ヰ', 'リ', '　', 'ミ', 'ヒ', 'ニ', 'チ', 'シ', 'キ', 'イ'],
    ['ｕ', '　', '　', 'ル', 'ユ', 'ム', 'フ', 'ヌ', 'ツ', 'ス', 'ク', 'ウ'],
    ['ｅ', '　', 'ヱ', 'レ', '　', 'メ', 'ヘ', 'ネ', 'テ', 'セ', 'ケ', 'エ'],
    ['ｏ', '　', 'ヲ', 'ロ', 'ヨ', 'モ', 'ホ', 'ノ', 'ト', 'ソ', 'コ', 'オ']
];

var ADDITIONAL_KATA = [
    ['ｇ', 'ｚ', 'ｄ', 'ｂ', 'ｐ'],
    ['ガ', 'ザ', 'ダ', 'バ', 'パ'],
    ['ギ', 'ジ', 'ヂ', 'ビ', 'ピ'],
    ['グ', 'ズ', 'ヅ', 'ブ', 'プ'],
    ['ゲ', 'ゼ', 'デ', 'ベ', 'ペ'],
    ['ゴ', 'ゾ', 'ド', 'ボ', 'ポ']
];

var YOON_KATA = [
    ['　', '　', '　', 'リャ', '　', 'ミャ', 'ヒャ', 'ニャ', 'チャ', 'シャ', 'キャ', '　', 'ギャ', 'ジャ', 'ヂャ', 'ビャ', 'ピャ'],
    ['　', '　', '　', 'リュ', '　', 'ミュ', 'ヒュ', 'ニュ', 'チュ', 'シュ', 'キュ', '　', 'ギュ', 'ジュ', 'ヂュ', 'ビュ', 'ピュ'],
    ['　', '　', '　', 'リョ', '　', 'ミョ', 'ヒョ', 'ニョ', 'チョ', 'ショ', 'キョ', '　', 'ギョ', 'ジョ', 'ヂョ', 'ビョ', 'ピョ']
];
//----------------------------------------------------------------------------------------------------------------------

var setKanaSet = function () {
    if (this.checked) {
        localStorage.setItem('kanaset', this.value);
    }
};

if (+localStorage.getItem('withAdditional')) {
    HIRA = HIRA.map(function (value, index) {
        return value.concat(ADDITIONAL_HIRA[index]);
    });
    KATA = KATA.map(function (value, index) {
        return value.concat(ADDITIONAL_KATA[index]);
    });
    ROMAJI = ROMAJI.map(function (value, index) {
        return value.concat(ADDITIONAL_ROMAJI[index]);
    });

    if (+localStorage.getItem('withandyoon')) {
        HIRA = HIRA.concat(YOON_HIRA);
        KATA = KATA.concat(YOON_KATA);
        ROMAJI = ROMAJI.concat(YOON_ROMAJI);
    }
}

var getAllHira = function() {
    var HIRA_LIST = [];
    for (var i = 1; i < HIRA.length; ++i) {
        for (var j = 1; j < HIRA[0].length; ++j) {
            if (HIRA[i][j] !== BLANK) {
               HIRA_LIST.push(new Hira(j, i));
            }
        }
    }
    return HIRA_LIST;
};
var getAllKata = function() {
    var KATA_LIST = [];
    for (var i = 1; i < KATA.length; ++i) {
        for (var j = 1; j < KATA[0].length; ++j) {
            if (KATA[i][j] !== BLANK) {
                KATA_LIST.push(new Kata(j, i));
            }
        }
    }
    return KATA_LIST;
};

var HIRA_I = HIRA.length - 1;
var HIRA_J = HIRA[0].length - 1;

var FONTS = [
    '128px sans-serif',
    '128px "MS Gothic"',
    '128px "Hosohuwafont"',
    '128px "JK Gothic M"',
    // '128px "KaoriGel"', bug ダ (da)
    '128px "Mikiyu Font NEW-PENJI"',
    '128px "SanaFon"',
    '128px "SanafonYu"'
];

var randomFont = function () {
    var index = 0;
    if (+localStorage.getItem('shitfonts')) {
        index = Math.floor(Math.random() * (FONTS.length - 1)) + 1;
    }

    return FONTS[index];
};

var START_DATETIME = new Date();

class Kana {
    constructor (consonant, vowel) {
        var romaji = ROMAJI[vowel][consonant];

        if (!Array.isArray(romaji)) {
            romaji = [romaji]
        }

        this.romaji = romaji;
    }

    checkRomaji(answer) {
        if (answer === this.romaji[0]) {
            return true;
        }
        for (var i = 1; i < this.romaji.length; ++i) {
            if (answer === this.romaji[i]) {
                return null;
            }
        }
        return false;
    }

    getDefaultRomaji() {
        return this.romaji[0];
    }
    
    equal(kana) {
        return this.getDefaultRomaji() === kana.getDefaultRomaji();
    }
}

class Hira extends Kana {
    constructor (consonant, vowel) {
        super(consonant, vowel);
        this.text = HIRA[vowel][consonant];
        
    }
}

class Kata extends Kana {
    constructor (consonant, vowel) {
        super(consonant, vowel);
        this.text = KATA[vowel][consonant];
    }
}

var KANA_LIST = null;
if (+localStorage.getItem('speedrun')) {
   KANA_LIST = [];
   switch (localStorage.getItem('kanaset') || 'hira') {
      case 'hira':
         KANA_LIST = getAllHira();
         break;
      case 'kata':
         KANA_LIST = getAllKata();
         break;
      case 'both':
         KANA_LIST = getAllHira().concat(getAllKata());
         break;
   }
   KANA_LIST = (arr => arr.sort(() => Math.random() - 0.5))(KANA_LIST)
}

var prevKanas = [];
var inPrevKanas = function(kana) {
    for (var i = 0; i < prevKanas.length; ++i) {
        if (kana.equal(prevKanas[i])) {
            return true;
        }
    }
    return false;
};

var randomHira = function () {
    if (KANA_LIST) {
       return KANA_LIST.pop();
    }
   
    var result;

    do {
        var i = Math.floor(Math.random() * HIRA_I) + 1;
        var j = Math.floor(Math.random() * HIRA_J) + 1;

        switch (localStorage.getItem('kanaset') || 'hira') {
            case 'hira':
                result = new Hira(j, i);
                break;
            case 'kata':
                result = new Kata(j, i);
                break;
            case 'both':
                result = Math.random() < 0.5 ? new Hira(j, i) : new Kata(j, i);
                break;
        }
    } while (result.text === BLANK || inPrevKanas(result));

    prevKanas.push(result);
    if (prevKanas.length > 10) {
        prevKanas = prevKanas.splice(1, 10);
    }
    return result;
};

var currentHira;
var generateNewHira = function (ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 256, 256);
    ctx.font = randomFont();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    currentHira = randomHira();
    ctx.fillText(currentHira.text, 128, 128);

    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
};

var redrawDefault = function (ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 256, 256);
    ctx.font = FONTS[0];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(currentHira.text, 128, 128);

    // document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
};

var prepend = function (container, content) {
    var el = container;
    var elChild = document.createElement('div');
    elChild.innerHTML = content;

    elChild.onclick = function () {
        var resultBox = this.getElementsByClassName('result-box')[0];
        var className = resultBox.className;
        if (className === 'result-box') {
            resultBox.className = 'result-box default-font';
        } else {
            resultBox.className = 'result-box';
        }
        document.getElementById('answer').focus();
    };

    el.insertBefore(elChild, el.firstChild);
};

var createResultInfoBox = function (result, answer, ctx) {
    var resultsContainer = document.getElementById('results');
    var color = result ? 'lightgreen' : (result === null? 'greenyellow' : 'orangered');
    var hira = currentHira.text;
    var font = ctx.font;
    var roma = '"' + currentHira.getDefaultRomaji() + '"';
    var desc = result || !answer ? roma : roma + ' (not "' + answer + '")';

    //noinspection JSAnnotator
    prepend(
        resultsContainer,
        `<div class="result-box" style="background-color: ${color}; font: ${font}">
            ${hira}
            <div class="desc">${desc}</div>
        </div>`
    );
    
    return currentHira.getDefaultRomaji();
};

document.addEventListener('DOMContentLoaded', function () {
    var additionalCheckbox = document.getElementById('additional');
    additionalCheckbox.checked = +localStorage.getItem('withAdditional');
    additionalCheckbox.onchange = function () {
        localStorage.setItem('withAdditional', +additionalCheckbox.checked);
    };

    var andyoonCheckbox = document.getElementById('andyoon');
    andyoonCheckbox.checked = +localStorage.getItem('withandyoon');
    andyoonCheckbox.onchange = function () {
        localStorage.setItem('withandyoon', +andyoonCheckbox.checked);
    };

    var shitfontsCheckbox = document.getElementById('shitfonts');
    shitfontsCheckbox.checked = +localStorage.getItem('shitfonts');
    shitfontsCheckbox.onchange = function () {
        localStorage.setItem('shitfonts', +shitfontsCheckbox.checked);
    };

    var speedrunCheckbox = document.getElementById('speedrun');
    speedrunCheckbox.checked = +localStorage.getItem('speedrun');
    speedrunCheckbox.onchange = function () {
        localStorage.setItem('speedrun', +speedrunCheckbox.checked);
    };

    var canvas = document.getElementById('hira');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');
    generateNewHira(ctx);
    canvas.onclick = function () {
        if (!+localStorage.getItem('speedrun')) {
           generateNewHira(ctx);
        }
    };

    var checkButton = document.getElementById('check');
    var answerInput = document.getElementById('answer');
    checkButton.onclick = function () {
        var answer = (answerInput.value || '').trim().toLowerCase();
        var result = currentHira.checkRomaji(answer);
        var correctRoma = createResultInfoBox(result, answer, ctx);
        
        if (+localStorage.getItem('speedrun') && result === false) {
           alert('SPEEDRUN FAILED (' + correctRoma + ')');
           location.reload();
        }

        if (+localStorage.getItem('speedrun') && !KANA_LIST.length) {
           var END_DATETIME = new Date();
           var diff = +END_DATETIME - +START_DATETIME;
           var sec = diff/1000;
           alert('SPEEDRUN COMPLETED (' + sec + ' sec)');
           location.reload();
        }

        generateNewHira(ctx);
    };
    answerInput.onkeypress = function (keyboardEvent) {
        switch (keyboardEvent.key) {
            case 'Enter':
                checkButton.click();
                break;
        }
    };

    var defaultFontButton = document.getElementById('default-font');
    defaultFontButton.onclick = function () {
        redrawDefault(ctx);
    };
});
