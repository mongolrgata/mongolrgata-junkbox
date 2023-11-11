function generateCode(jsonText) {
    const PATH = 'https://pom.moe/_app//immutable/chunks/db.716410df.js';
    return `
const {d: currentDb} = await import('${PATH}');

function clearDb() {
    console.log('CLEAR BEGIN');

    const tables = currentDb.tables;

    for (const table of tables) {
        currentDb[table.name].clear();
    }
    
    console.log('CLEAR END');
}

function importDb() {
    console.log('IMPORT BEGIN');

    const data = ${jsonText}.default;

    for (let tableName in data) {
        currentDb[tableName].clear();
        for (let i = 0; i < data[tableName].length; ++i) {
            currentDb[tableName].add(data[tableName][i]);
        }
    }
    
    console.log('IMPORT END');
}

clearDb();
setTimeout(importDb, 3000);
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('file-in').onchange = function () {
        const reader = new FileReader();
        reader.readAsText(this.files[0]);
        reader.onload = function () {
            const textarea = document.getElementById('script-text');
            textarea.value = generateCode(reader.result);
        };
    };

    document.getElementById('copy').onclick = function () {
        const textarea = document.getElementById('script-text');
        const text = textarea.value;

        const type = 'text/plain';
        const blob = new Blob([text], {type});
        const data = [new ClipboardItem({[type]: blob})];

        navigator.clipboard.write(data);
    };
});
