var BLANK = '　';
var HIRA = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', 'ん', 'わ', 'ら', 'や', 'ま', 'は', 'な', 'た', 'さ', 'か', 'あ'],
    ['ｉ', '　', 'ゐ', 'り', '　', 'み', 'ひ', 'に', 'ち', 'し', 'き', 'い'],
    ['ｕ', '　', '　', 'る', 'ゆ', 'む', 'ふ', 'ぬ', 'つ', 'す', 'く', 'う'],
    ['ｅ', '　', 'ゑ', 'れ', '　', 'め', 'へ', 'ね', 'て', 'せ', 'け', 'え'],
    ['ｏ', '　', 'を', 'ろ', 'よ', 'も', 'ほ', 'の', 'と', 'そ', 'こ', 'お']
];
var HIRA_I = HIRA.length - 1;
var HIRA_J = HIRA[0].length - 1;

var ROMAJI = [
    ['　', 'ｎ', 'ｗ', 'ｒ', 'ｙ', 'ｍ', 'ｈ', 'ｎ', 'ｔ', 'ｓ', 'ｋ', '　'],
    ['ａ', 'nn', 'wa', 'ra', 'ya', 'ma', 'ha', 'na', 'ta', 'sa', 'ka', 'a'],
    ['ｉ', '　', 'wi', 'ri', '　', 'mi', 'hi', 'ni', 'chi', 'shi', 'ki', 'i'],
    ['ｕ', '　', '　', 'ru', 'yu', 'mu', 'fu', 'nu', 'tsu', 'su', 'ku', 'u'],
    ['ｅ', '　', 'we', 're', '　', 'me', 'he', 'ne', 'te', 'se', 'ke', 'e'],
    ['ｏ', '　', 'wo', 'ro', 'yo', 'mo', 'ho', 'no', 'to', 'so', 'ko', 'o']
];

var FONTS = [
    '128px sans-serif',
    '128px MS Gothic'
];

var randomFont = function () {
    var index = Math.floor(Math.random() * FONTS.length);
    return FONTS[index];
};

var Hira = function (consonant, vowel) {
    this.text = HIRA[vowel][consonant];
    this.romaji = ROMAJI[vowel][consonant];
};

var randomHira = function () {
    var result;

    do {
        var i = Math.floor(Math.random() * HIRA_I) + 1;
        var j = Math.floor(Math.random() * HIRA_J) + 1;

        result = new Hira(j, i);
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

    document.getElementById('answer').value = '';
    document.getElementById('answer').focus();
};

var prepend = function (container, content) {
    var el = container;
    var elChild = document.createElement('div');
    elChild.innerHTML = content;

    el.insertBefore(elChild, el.firstChild);
};

var createResultInfoBox = function (result, answer) {
    var resultsContainer = document.getElementById('results');
    var color = result ? 'lightgreen' : 'orangered';
    var hira = currentHira.text;
    var roma = '"' + currentHira.romaji + '"';
    var desc = result || !answer ? roma : roma + ' (not "' + answer + '")';

    prepend(
        resultsContainer,
        `<div class="result-box" style="background-color: ${color}">${hira}<div class="desc">${desc}</div></div>`
    );
};

document.addEventListener('DOMContentLoaded', function () {
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
        createResultInfoBox(answer === currentHira.romaji, answer);
        generateNewHira(ctx);
    };
});

// var op = {};
// for (var i = 0; i < 1000000; ++i) {
//     generateNewHira($0.getContext('2d'));
//     var text = currentHira.text;
//     op[text] = (op[text] || 0) + 1;
// }
