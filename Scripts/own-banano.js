const prefix = "ban_"
const node = "https://kaliumapi.appditto.com/api"
const util = window.blakejsUtil
const blake = window.blakejs
const uint5ToUint4 = (uint5) => {
  const length = (uint5.length / 4) * 5
  const uint4 = new Uint8Array(length)
  for (let i = 1; i <= length; i++) {
    const n = i - 1
    const m = i % 5
    const z = n - (i - m) / 5
    const right = uint5[z - 1] << (5 - m)
    const left = uint5[z] >> m
    uint4[n] = (left + right) % 16
  }
  return uint4
}
const letterList = '13456789abcdefghijkmnopqrstuwxyz'.split('');
const stringToUint5 = (string) => {
  const length = string.length;
  const stringArray = string.split('');
  const uint5 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint5[i] = letterList.indexOf(stringArray[i]);
  }
  return uint5;
};
const uint5ToString = (uint5) => {
  let string = '';
  for (let i = 0; i < uint5.length; i++) {
    string += letterList[uint5[i]];
  }
  return string;
};
const uint4ToUint8 = (uintValue) => {
  const length = uintValue.length / 2;
  const uint8 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8[i] = uintValue[i * 2] * 16 + uintValue[i * 2 + 1];
  }
  return uint8
}
const uint8ToUint4 = (uintValue) => {
  const uint4 = new Uint8Array(uintValue.length * 2);
  for (let i = 0; i < uintValue.length; i++) {
    uint4[i * 2] = (uintValue[i] / 16) | 0;
    uint4[i * 2 + 1] = uintValue[i] % 16;
  }
  return uint4;
};
const uint4ToUint5 = (uintValue) => {
  const length = (uintValue.length / 5) * 4;
  const uint5 = new Uint8Array(length);
  for (let i = 1; i <= length; i++) {
    const n = i - 1;
    const m = i % 4;
    const z = n + (i - m) / 4;
    const right = uintValue[z] << m;
    let left;
    if ((length - i) % 4 == 0) {
      left = uintValue[z - 1] << 4;
    } else {
      left = uintValue[z + 1] >> (4 - m);
    }
    uint5[n] = (left + right) % 32;
  }
  return uint5;
};
const hexToBytes = (hex) => {
  const ret = new Uint8Array(hex.length / 2);
  for (let i = 0; i < ret.length; i++) {
    ret[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
  }
  return ret;
};
const bytesToHex = (bytes) => {
  return Array.prototype.map.call(bytes, (x) => ('00' + x.toString(16)).slice(-2)).join('').toUpperCase();
};
const decToHex = (decValue, bytes = null) => {
  const dec = decValue.toString().split('');
  const sum = [];
  let hex = '';
  const hexArray = [];
  let i;
  let s;
  while (dec.length) {
    s = 1 * dec.shift();
    for (i = 0; s || i < sum.length; i++) {
      s += (sum[i] || 0) * 10;
      sum[i] = s % 16;
      s = (s - sum[i]) / 16;
    }
  }
  while (sum.length) {
    hexArray.push(sum.pop().toString(16));
  }
  hex = hexArray.join('');
  if (hex.length % 2 != 0) {
    hex = '0' + hex;
  }
  if (bytes > hex.length / 2) {
    const diff = bytes - hex.length / 2;
    for (let j = 0; j < diff; j++) {
      hex = '00' + hex;
    }
  }
  return hex;
};
const hexToUint8 = (hexValue) => {
  const length = (hexValue.length / 2) | 0;
  const uint8 = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8[i] = parseInt(hexValue.substr(i * 2, 2), 16);
  }
  return uint8;
};
const generateSecretKey = (seedBytes, accountIndex) => {
  const accountBytes = hexToUint8(decToHex(accountIndex, 4));
  const context = blake.blake2bInit(32);
  blake.blake2bUpdate(context, seedBytes);
  blake.blake2bUpdate(context, accountBytes);
  const newKey = blake.blake2bFinal(context);
  return newKey;
};
const arrayCrop = (array) => {
  const length = array.length - 1;
  const croppedArray = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    croppedArray[i] = array[i + 1];
  }
  return croppedArray;
};
const decodeString = (s) => {
  var b = [];
  s = unescape(encodeURIComponent(s));
  for (var i = s.length; i--;) {
    b[i] = s.charCodeAt(i);
  }
  return b;
}
const encodeHex = (arr) => {
  var h = '0123456789abcdef', s = '';
  for (var i = 0; i< arr.length; i++) {
    s += h[(arr[i]>>4)&15];
    s += h[arr[i]&15];
  }
  return s;
}
const uint4ToHex = (uint4) => {
   let hex = '';
  for (let i = 0; i < uint4.length; i++) {
    hex += uint4[i].toString(16).toUpperCase();
  }
  return hex;
};
const hexToUint4 = (hexValue) => {
  const uint4 = new Uint8Array(hexValue.length);
  for (let i = 0; i < hexValue.length; i++) {
    uint4[i] = parseInt(hexValue.substr(i, 1), 16);
  }
  return uint4;
};
const equalArrays = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) return false;
  }
  return true;
};
const getPublicKey = (acc) => {
  acc = acc.split("_")[1]
  const keyUint4 = arrayCrop(
    uint5ToUint4(stringToUint5(acc.substring(0, 52))),
  )
  const hashUint4 = uint5ToUint4(
    stringToUint5(acc.substring(52, 60)),
  )
  const keyArray = uint4ToUint8(keyUint4)
  const blakeHash = blake.blake2b(keyArray, null, 5).reverse()
  const left = hashUint4
  const right = uint8ToUint4(blakeHash)
  if (!equalArrays(left, right)) {
    const leftStr = uint5ToString(uint4ToUint5(left))
    const rightStr = uint5ToString(uint4ToUint5(right))
    throw Error(`Incorrect checksum ${leftStr} <> ${rightStr}`)
  }
  return uint4ToHex(keyUint4)
}
const getSuffix = (publicKey) => {
  const keyBytes = uint4ToUint8(hexToUint4(publicKey));
  const checksum = uint5ToString(
    uint4ToUint5(uint8ToUint4(blake.blake2b(keyBytes, null, 5).reverse())),
    );
  const account = uint5ToString(uint4ToUint5(hexToUint4(`0${publicKey}`)));
  return `${account}${checksum}`;
};
const privateKey = (seed, i=0) => {
  const seedBytes = hexToBytes(seed);
  const accountBytes = generateSecretKey(seedBytes, i);
  return bytesToHex(accountBytes);
};
const PrivateKeyPair = (p) => {
  return nacl.sign.keyPair.fromSecretKey(hexToBytes(p));
}
const getAdr = (p) => {
  return prefix+getSuffix(p)
}
const getSeedAdr = (s, i=0) => {
  const privKey = privateKey(s,i)
  const keypair = PrivateKeyPair(privKey);
  return getAdr(bytesToHex(keypair.publicKey));
};
const getPrivAdr = (privKey) => {
  const keypair = PrivateKeyPair(privKey);
  return getAdr(bytesToHex(keypair.publicKey));
};
const genSeed = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}
const signHash = (privKey, hash) => {
  const hashBytes = hexToBytes(hash)
  const privateKeyBytes = hexToBytes(privKey)
  const signed = nacl.sign.detached(hashBytes, privateKeyBytes);
  const signature = bytesToHex(signed);
  return signature
};
Big.NE = -30;
Big.PE = 39;
const nodeAPI = async (d) => {
  const res = await fetch(node, {
    method: "POST",
    body: JSON.stringify(d),
    headers: {
    "Content-type":"application/json; charset=UTF-8"
    }
  })
  return res.json()
}
const toRaw = (r) => {
  return Big('100000000000000000000000000000').times(Big(r))
}
const fromRaw = (r) => {
  return Big(r).times(Big('0.00000000000000000000000000001'))
}
const accInfo = async (a) => {
  return nodeAPI({
    action:'account_info',
    account:a
  })
}
const preamble = "0000000000000000000000000000000000000000000000000000000000000006";
const withdraw = async (priv, to, amnt, work=false) => {
  amnt = toRaw(amnt)
  var s = getPrivAdr(priv)
  var info = await accInfo(s)
  var bal = Big(info["balance"]).minus(amnt).toString()
  let padBal = parseInt(bal).toString(16);
  while (padBal.length < 32) {
    padBal = '0' + padBal;
  }
  if (bal.startsWith("-")) {
    return new Error("insufficient_funds")
  }
  var block = {
    account:getPublicKey(s),
    previous:genSeed(),
    representative:"0".repeat(64),
    balance:padBal,
    link:getPublicKey(to)
  }
  
  block.account = s, block.representative = getAdr(block.representative), block.balance = bal, block.destination, block.signature = signHash(priv, hash)
  return await nodeAPI({action:"process", block:block})
}