let publicKey;
let privateKey;


// générer clés 
async function generateKeys() {

    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1,0,1]),
            hash: "SHA-256"
        },
        true,
        ["encrypt", "decrypt"]
    );

    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
}

generateKeys();


// convertir base64
function toBase64(buffer) {

    let binary = '';
    let bytes = new Uint8Array(buffer);

    for (let b of bytes)
        binary += String.fromCharCode(b);

    return btoa(binary);
}


// crypter
async function encrypt() {

    let text = document.getElementById("input").value;

    if (!text) return;

    let encoded = new TextEncoder().encode(text);

    let encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encoded
    );

    document.getElementById("output").innerText = toBase64(encrypted);
}