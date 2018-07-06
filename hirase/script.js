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
    ['　', '　', '　', 'りゃ', '　', 'みゃ', 'ひゃ', 'にゃ', 'ちゃ', 'しゃ', 'きゃ', '　', 'ぎゃ', 'じゃ', '　', 'びゃ', 'ぴゃ'],
    ['　', '　', '　', 'りゅ', '　', 'みゅ', 'ひゅ', 'にゅ', 'ちゅ', 'しゅ', 'きゅ', '　', 'ぎゅ', 'じゅ', '　', 'びゅ', 'ぴゅ'],
    ['　', '　', '　', 'りょ', '　', 'みょ', 'ひょ', 'にょ', 'ちょ', 'しょ', 'きょ', '　', 'ぎょ', 'じょ', '　', 'びょ', 'ぴょ']
];

var ROMAJI = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', 'nn', 'wa', 'ra', 'ya', 'ma', 'ha', 'na', 'ta', 'sa', 'ka', 'a'],
    ['ｉ', '　', 'wi', 'ri', '　', 'mi', 'hi', 'ni', 'chi', 'shi', 'ki', 'i'],
    ['ｕ', '　', '　', 'ru', 'yu', 'mu', 'fu', 'nu', 'tsu', 'su', 'ku', 'u'],
    ['ｅ', '　', 'we', 're', '　', 'me', 'he', 'ne', 'te', 'se', 'ke', 'e'],
    ['ｏ', '　', 'wo', 'ro', 'yo', 'mo', 'ho', 'no', 'to', 'so', 'ko', 'o']
];

var ADDITIONAL_ROMAJI = [
    ['ｇ', 'ｚ', 'ｄ', 'ｂ', 'ｐ'],
    ['ga', 'za', 'da', 'ba', 'pa'],
    ['gi', 'ji', 'ji', 'bi', 'pi'],
    ['gu', 'zu', 'zu', 'bu', 'pu'],
    ['ge', 'ze', 'de', 'be', 'pe'],
    ['go', 'zo', 'do', 'bo', 'po']
];

var YOON_ROMAJI = [
    ['　', '　', '　', 'rya', '　', 'mya', 'hya', 'nya', 'cha', 'sha', 'kya', '　', 'gya', 'ja', '　', 'bya', 'pya'],
    ['　', '　', '　', 'ryu', '　', 'myu', 'hyu', 'nyu', 'chu', 'shu', 'kyu', '　', 'gyu', 'ju', '　', 'byu', 'pyu'],
    ['　', '　', '　', 'ryo', '　', 'myo', 'hyo', 'nyo', 'cho', 'sho', 'kyo', '　', 'gyo', 'jo', '　', 'byo', 'pyo']
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
        ROMAJI = ROMAJI.concat(YOON_ROMAJI);
    }
}

var HIRA_I = HIRA.length - 1;
var HIRA_J = HIRA[0].length - 1;

var FONTS = [
    '128px sans-serif',
    '128px "MS Gothic"',
    '128px "Hosohuwafont"',
    '128px "JK Gothic M"',
    '128px "KaoriGel"',
    '128px "Mamelon"',
    '128px "Mikiyu Font NEW-PENJI"',
    '128px "SanaFon"',
    '128px "SanafonYu"'
];

var randomFont = function () {
    var index = Math.floor(Math.random() * FONTS.length);
    return FONTS[index];
};

var Hira = function (consonant, vowel) {
    this.text = HIRA[vowel][consonant];
    this.romaji = ROMAJI[vowel][consonant];
};

var Kata = function (consonant, vowel) {
    this.text = KATA[vowel][consonant];
    this.romaji = ROMAJI[vowel][consonant];
};

var randomHira = function () {
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
    } while (result.text === BLANK);

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

    // document.getElementById('answer').value = '';
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

    document.getElementById('answer').value = '';
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
    var color = result ? 'lightgreen' : 'orangered';
    var hira = currentHira.text;
    var font = ctx.font;
    var roma = '"' + currentHira.romaji + '"';
    var desc = result || !answer ? roma : roma + ' (not "' + answer + '")';

    //noinspection JSAnnotator
    prepend(
        resultsContainer,
        `<div class="result-box" style="background-color: ${color}; font: ${font}">
            ${hira}
            <div class="desc">${desc}</div>
        </div>`
    );
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

    var canvas = document.getElementById('hira');
    canvas.width = 256;
    canvas.height = 256;
    var ctx = canvas.getContext('2d');
    generateNewHira(ctx);
    canvas.onclick = function () {
        generateNewHira(ctx);
    };

    var checkButton = document.getElementById('check');
    var answerInput = document.getElementById('answer');
    checkButton.onclick = function () {
        var answer = (answerInput.value || '').trim().toLowerCase();
        createResultInfoBox(answer === currentHira.romaji, answer, ctx);
        generateNewHira(ctx);
    };
    answerInput.onkeypress = function (keyboardEvent) {
        switch (keyboardEvent.code) {
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

// var op = {};
// for (var i = 0; i < 1000000; ++i) {
//     generateNewHira($0.getContext('2d'));
//     var text = currentHira.text;
//     op[text] = (op[text] || 0) + 1;
// }
