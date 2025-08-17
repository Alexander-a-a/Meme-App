const axios = require('axios');


let _memes = [];
let _byId = new Map();
let _ready = false;

async function init(apiUrl) {
    if(_ready) return; // Only once
    const resp = await axios.get(apiUrl);
    console.log(resp.status);
    console.log(Object.keys(resp.data))
    const items = resp.data.memes;

    if(!Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid memes response from API");
    }



    _memes = items.map(m => {
    const id = String(m.id);
    const name = m.name ?? '';
    const url = m.url ?? m.image ?? '';
    const width = Number(m.width ?? 0);
    const height = Number(m.height ?? 0);
    return { id, name, url, width, height }
});

    _byId = new Map(_memes.map(m => [m.id, m]));
    _ready = true;
    console.log(`memeStore: loaded ${_memes.length} memes`);


}




function isReady() {
    return _ready;
}

function getAll() {
    return _memes.slice();
}

function getById(id) {
    return _byId.get(String(id));
}

function searchByName(q) {
    const s = String(q || '').trim().toLowerCase();
    if(!s) return getAll();
    return _memes.filter(m => (m.name || '').toLowerCase().includes(s)); 
}

module.exports = { init, isReady, getAll, getById, searchByName };