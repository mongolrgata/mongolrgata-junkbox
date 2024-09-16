function beautyJSON(jsonString) {
    return JSON.stringify(JSON.parse(jsonString), null, 4);
}

let decodeData;
let pommoeData;
let cleanSRSData;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('decode-origin-file').onchange = function () {
        const reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function (event) {
            decodeData = event.target.result.slice(3); // slice 'srs' header
        };
    };

    document.getElementById('clean-srs-file').onchange = function () {
        const reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function (event) {
            cleanSRSData = event.target.result.slice(3); // slice 'srs' header
        };
    };

    document.getElementById('pom-moe-file').onchange = function () {
        const reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function (event) {
            pommoeData = event.target.result;
        };
    };
});

function decodeTest() {
    const result = LZString.decompressFromUTF16(decodeData);
    const correctJSON = document.getElementById('correct-json');
    try {
        document.getElementById('decode-result-json').innerHTML = beautyJSON(result);
        correctJSON.checked = true;
    } catch {
        document.getElementById('decode-result-json').innerHTML = 'ERROR';
        correctJSON.checked = false;
    }
}

function dataCheck() {
    for (let category in POM_MOE_ACHIEV) {
        if (POM_MOE_ACHIEV.hasOwnProperty(category)) {
            const achiev = POM_MOE_ACHIEV[category].achievements;
            for (let i = 0; i < achiev.length; ++i) {
                const name = achiev[i].name;
                if (!getAchievIDsSRS(name)) {
                    console.error(name);
                }
            }
        }
    }
}

function saveFile(json) {
    const n = new Date();
    const o = n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate();
    const l = JSON.stringify(json);
    const c = URL.createObjectURL(new Blob(["srs", LZString.compressToUTF16(l)], {
        type: "application/octet-stream"
    }));
    const u = document.createElement("a");
    u.style.display = "none";
    u.href = c;
    u.download = "starrailstation-backup_" + o + ".dat";
    document.body.appendChild(u);
    u.click();
    URL.revokeObjectURL(c);
}

function convert() {
    const pomJSON = JSON.parse(pommoeData);
    const result = getBaseSRS();

    convertAchiev(pomJSON, result);
    convertItems(pomJSON, result);
    saveFile(result);

    document.getElementById('convert-result-json').innerHTML = JSON.stringify(result, null, 4);
}
