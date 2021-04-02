"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
// initialize secp256k1 algorithm
const elliptic_1 = require("elliptic");
var ec = new elliptic_1.ec("secp256k1");
function createKeyPair() {
    // generate random private key
    let secret = ethers_1.ethers.utils.randomBytes(32);
    let secretHex = ethers_1.ethers.utils.hexlify(secret);
    // generate publickey object from secret key
    let pubkey = ec.keyFromPrivate(secret).getPublic();
    // get X and Y from pubkey Object
    var x = pubkey.getX();
    var y = pubkey.getY();
    // get final points in hex format
    var pub = { x: x.toString("hex"), y: y.toString("hex") };
    // generate keccak-256 from pubkeys
    let address_keccak = ethers_1.ethers.utils.keccak256("0x" + pub.x + pub.y);
    // get final address from keccak digest
    let address = "0x" + address_keccak.substring(address_keccak.length - 40);
    return { secretHex, pub, address };
}
for (let index = 0; index < 4; index++) {
    let pair = createKeyPair();
    console.log(pair);
}
//# sourceMappingURL=keys.js.map