 !function(r){"use strict";var e,t=1e6,n=1e6,i="[big.js] ",o=i+"Invalid ",s=o+"decimal places",c=i+"Division by zero",f={},u=void 0,h=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function l(r,e,t,n){var i=r.c;if(t===u&&(t=r.constructor.RM),0!==t&&1!==t&&2!==t&&3!==t)throw Error("[big.js] Invalid rounding mode");if(e<1)n=3===t&&(n||!!i[0])||0===e&&(1===t&&i[0]>=5||2===t&&(i[0]>5||5===i[0]&&(n||i[1]!==u))),i.length=1,n?(r.e=r.e-e+1,i[0]=1):i[0]=r.e=0;else if(e<i.length){if(n=1===t&&i[e]>=5||2===t&&(i[e]>5||5===i[e]&&(n||i[e+1]!==u||1&i[e-1]))||3===t&&(n||!!i[0]),i.length=e,n)for(;++i[--e]>9;)if(i[e]=0,0===e){++r.e,i.unshift(1);break}for(e=i.length;!i[--e];)i.pop()}return r}function a(r,e,t){var n=r.e,i=r.c.join(""),o=i.length;if(e)i=i.charAt(0)+(o>1?"."+i.slice(1):"")+(n<0?"e":"e+")+n;else if(n<0){for(;++n;)i="0"+i;i="0."+i}else if(n>0)if(++n>o)for(n-=o;n--;)i+="0";else n<o&&(i=i.slice(0,n)+"."+i.slice(n));else o>1&&(i=i.charAt(0)+"."+i.slice(1));return r.s<0&&t?"-"+i:i}f.abs=function(){var r=new this.constructor(this);return r.s=1,r},f.cmp=function(r){var e,t=this,n=t.c,i=(r=new t.constructor(r)).c,o=t.s,s=r.s,c=t.e,f=r.e;if(!n[0]||!i[0])return n[0]?o:i[0]?-s:0;if(o!=s)return o;if(e=o<0,c!=f)return c>f^e?1:-1;for(s=(c=n.length)<(f=i.length)?c:f,o=-1;++o<s;)if(n[o]!=i[o])return n[o]>i[o]^e?1:-1;return c==f?0:c>f^e?1:-1},f.div=function(r){var e=this,n=e.constructor,i=e.c,o=(r=new n(r)).c,f=e.s==r.s?1:-1,h=n.DP;if(h!==~~h||h<0||h>t)throw Error(s);if(!o[0])throw Error(c);if(!i[0])return r.s=f,r.c=[r.e=0],r;var a,p,g,w,v,d=o.slice(),m=a=o.length,E=i.length,b=i.slice(0,a),P=b.length,D=r,M=D.c=[],x=0,y=h+(D.e=e.e-r.e)+1;for(D.s=f,f=y<0?0:y,d.unshift(0);P++<a;)b.push(0);do{for(g=0;g<10;g++){if(a!=(P=b.length))w=a>P?1:-1;else for(v=-1,w=0;++v<a;)if(o[v]!=b[v]){w=o[v]>b[v]?1:-1;break}if(!(w<0))break;for(p=P==a?o:d;P;){if(b[--P]<p[P]){for(v=P;v&&!b[--v];)b[v]=9;--b[v],b[P]+=10}b[P]-=p[P]}for(;!b[0];)b.shift()}M[x++]=w?g:++g,b[0]&&w?b[P]=i[m]||0:b=[i[m]]}while((m++<E||b[0]!==u)&&f--);return M[0]||1==x||(M.shift(),D.e--,y--),x>y&&l(D,y,n.RM,b[0]!==u),D},f.eq=function(r){return 0===this.cmp(r)},f.gt=function(r){return this.cmp(r)>0},f.gte=function(r){return this.cmp(r)>-1},f.lt=function(r){return this.cmp(r)<0},f.lte=function(r){return this.cmp(r)<1},f.minus=f.sub=function(r){var e,t,n,i,o=this,s=o.constructor,c=o.s,f=(r=new s(r)).s;if(c!=f)return r.s=-f,o.plus(r);var u=o.c.slice(),h=o.e,l=r.c,a=r.e;if(!u[0]||!l[0])return l[0]?r.s=-f:u[0]?r=new s(o):r.s=1,r;if(c=h-a){for((i=c<0)?(c=-c,n=u):(a=h,n=l),n.reverse(),f=c;f--;)n.push(0);n.reverse()}else for(t=((i=u.length<l.length)?u:l).length,c=f=0;f<t;f++)if(u[f]!=l[f]){i=u[f]<l[f];break}if(i&&(n=u,u=l,l=n,r.s=-r.s),(f=(t=l.length)-(e=u.length))>0)for(;f--;)u[e++]=0;for(f=e;t>c;){if(u[--t]<l[t]){for(e=t;e&&!u[--e];)u[e]=9;--u[e],u[t]+=10}u[t]-=l[t]}for(;0===u[--f];)u.pop();for(;0===u[0];)u.shift(),--a;return u[0]||(r.s=1,u=[a=0]),r.c=u,r.e=a,r},f.mod=function(r){var e,t=this,n=t.constructor,i=t.s,o=(r=new n(r)).s;if(!r.c[0])throw Error(c);return t.s=r.s=1,e=1==r.cmp(t),t.s=i,r.s=o,e?new n(t):(i=n.DP,o=n.RM,n.DP=n.RM=0,t=t.div(r),n.DP=i,n.RM=o,this.minus(t.times(r)))},f.neg=function(){var r=new this.constructor(this);return r.s=-r.s,r},f.plus=f.add=function(r){var e,t,n,i=this,o=i.constructor;if(r=new o(r),i.s!=r.s)return r.s=-r.s,i.minus(r);var s=i.e,c=i.c,f=r.e,u=r.c;if(!c[0]||!u[0])return u[0]||(c[0]?r=new o(i):r.s=i.s),r;if(c=c.slice(),e=s-f){for(e>0?(f=s,n=u):(e=-e,n=c),n.reverse();e--;)n.push(0);n.reverse()}for(c.length-u.length<0&&(n=u,u=c,c=n),e=u.length,t=0;e;c[e]%=10)t=(c[--e]=c[e]+u[e]+t)/10|0;for(t&&(c.unshift(t),++f),e=c.length;0===c[--e];)c.pop();return r.c=c,r.e=f,r},f.pow=function(r){var e=this,t=new e.constructor("1"),i=t,s=r<0;if(r!==~~r||r<-1e6||r>n)throw Error(o+"exponent");for(s&&(r=-r);1&r&&(i=i.times(e)),r>>=1;)e=e.times(e);return s?t.div(i):i},f.prec=function(r,e){if(r!==~~r||r<1||r>t)throw Error(o+"precision");return l(new this.constructor(this),r,e)},f.round=function(r,e){if(r===u)r=0;else if(r!==~~r||r<-t||r>t)throw Error(s);return l(new this.constructor(this),r+this.e+1,e)},f.sqrt=function(){var r,e,t,n=this,o=n.constructor,s=n.s,c=n.e,f=new o("0.5");if(!n.c[0])return new o(n);if(s<0)throw Error(i+"No square root");0===(s=Math.sqrt(n+""))||s===1/0?((e=n.c.join("")).length+c&1||(e+="0"),c=((c+1)/2|0)-(c<0||1&c),r=new o(((s=Math.sqrt(e))==1/0?"5e":(s=s.toExponential()).slice(0,s.indexOf("e")+1))+c)):r=new o(s+""),c=r.e+(o.DP+=4);do{t=r,r=f.times(t.plus(n.div(t)))}while(t.c.slice(0,c).join("")!==r.c.slice(0,c).join(""));return l(r,(o.DP-=4)+r.e+1,o.RM)},f.times=f.mul=function(r){var e,t=this,n=t.constructor,i=t.c,o=(r=new n(r)).c,s=i.length,c=o.length,f=t.e,u=r.e;if(r.s=t.s==r.s?1:-1,!i[0]||!o[0])return r.c=[r.e=0],r;for(r.e=f+u,s<c&&(e=i,i=o,o=e,u=s,s=c,c=u),e=new Array(u=s+c);u--;)e[u]=0;for(f=c;f--;){for(c=0,u=s+f;u>f;)c=e[u]+o[f]*i[u-f-1]+c,e[u--]=c%10,c=c/10|0;e[u]=c}for(c?++r.e:e.shift(),f=e.length;!e[--f];)e.pop();return r.c=e,r},f.toExponential=function(r,e){var n=this,i=n.c[0];if(r!==u){if(r!==~~r||r<0||r>t)throw Error(s);for(n=l(new n.constructor(n),++r,e);n.c.length<r;)n.c.push(0)}return a(n,!0,!!i)},f.toFixed=function(r,e){var n=this,i=n.c[0];if(r!==u){if(r!==~~r||r<0||r>t)throw Error(s);for(r=r+(n=l(new n.constructor(n),r+n.e+1,e)).e+1;n.c.length<r;)n.c.push(0)}return a(n,!1,!!i)},f.toJSON=f.toString=function(){var r=this,e=r.constructor;return a(r,r.e<=e.NE||r.e>=e.PE,!!r.c[0])},f.toNumber=function(){var r=Number(a(this,!0,!0));if(!0===this.constructor.strict&&!this.eq(r.toString()))throw Error(i+"Imprecise conversion");return r},f.toPrecision=function(r,e){var n=this,i=n.constructor,s=n.c[0];if(r!==u){if(r!==~~r||r<1||r>t)throw Error(o+"precision");for(n=l(new i(n),r,e);n.c.length<r;)n.c.push(0)}return a(n,r<=n.e||n.e<=i.NE||n.e>=i.PE,!!s)},f.valueOf=function(){var r=this,e=r.constructor;if(!0===e.strict)throw Error(i+"valueOf disallowed");return a(r,r.e<=e.NE||r.e>=e.PE,!0)},e=function r(){function e(t){var n=this;if(!(n instanceof e))return t===u?r():new e(t);if(t instanceof e)n.s=t.s,n.e=t.e,n.c=t.c.slice();else{if("string"!=typeof t){if(!0===e.strict&&"bigint"!=typeof t)throw TypeError(o+"value");t=0===t&&1/t<0?"-0":String(t)}!function(r,e){var t,n,i;if(!h.test(e))throw Error(o+"number");r.s="-"==e.charAt(0)?(e=e.slice(1),-1):1,(t=e.indexOf("."))>-1&&(e=e.replace(".",""));(n=e.search(/e/i))>0?(t<0&&(t=n),t+=+e.slice(n+1),e=e.substring(0,n)):t<0&&(t=e.length);for(i=e.length,n=0;n<i&&"0"==e.charAt(n);)++n;if(n==i)r.c=[r.e=0];else{for(;i>0&&"0"==e.charAt(--i););for(r.e=t-n-1,r.c=[],t=0;n<=i;)r.c[t++]=+e.charAt(n++)}}(n,t)}n.constructor=e}return e.prototype=f,e.DP=20,e.RM=1,e.NE=-7,e.PE=21,e.strict=false,e.roundDown=0,e.roundHalfUp=1,e.roundHalfEven=2,e.roundUp=3,e}(),e.default=e.Big=e,"function"==typeof define&&define.amd?define((function(){return e})):"undefined"!=typeof module&&module.exports?module.exports=e:r.Big=e}(this);
// STARTED TOP nodejs/browser hack
(function() {
// FINISHED TOP nodejs/browser hack

  // Blake2B in pure Javascript
  // Adapted from the reference implementation in RFC7693
  // Ported to Javascript by DC - https://github.com/dcposc

  // 64-bit unsigned addition
  // Sets v[a,a+1] += v[b,b+1]
  // v should be a Uint32Array
  function ADD64AA(v, a, b) {
    const o0 = v[a] + v[b];
    let o1 = v[a + 1] + v[b + 1];
    if (o0 >= 0x100000000) {
      o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
  }

  // 64-bit unsigned addition
  // Sets v[a,a+1] += b
  // b0 is the low 32 bits of b, b1 represents the high 32 bits
  function ADD64AC(v, a, b0, b1) {
    let o0 = v[a] + b0;
    if (b0 < 0) {
      o0 += 0x100000000;
    }
    let o1 = v[a + 1] + b1;
    if (o0 >= 0x100000000) {
      o1++;
    }
    v[a] = o0;
    v[a + 1] = o1;
  }

  // Little-endian byte access
  function B2B_GET32(arr, i) {
    return (arr[i] ^
  (arr[i + 1] << 8) ^
  (arr[i + 2] << 16) ^
  (arr[i + 3] << 24));
  }

  // G Mixing function
  // The ROTRs are inlined for speed
  function B2B_G(a, b, c, d, ix, iy) {
    const x0 = m[ix];
    const x1 = m[ix + 1];
    const y0 = m[iy];
    const y1 = m[iy + 1];

    ADD64AA(v, a, b); // v[a,a+1] += v[b,b+1] ... in JS we must store a uint64 as two uint32s
    ADD64AC(v, a, x0, x1); // v[a, a+1] += x ... x0 is the low 32 bits of x, x1 is the high 32 bits

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated to the right by 32 bits
    let xor0 = v[d] ^ v[a];
    let xor1 = v[d + 1] ^ v[a + 1];
    v[d] = xor1;
    v[d + 1] = xor0;

    ADD64AA(v, c, d);

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 24 bits
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor0 >>> 24) ^ (xor1 << 8);
    v[b + 1] = (xor1 >>> 24) ^ (xor0 << 8);

    ADD64AA(v, a, b);
    ADD64AC(v, a, y0, y1);

    // v[d,d+1] = (v[d,d+1] xor v[a,a+1]) rotated right by 16 bits
    xor0 = v[d] ^ v[a];
    xor1 = v[d + 1] ^ v[a + 1];
    v[d] = (xor0 >>> 16) ^ (xor1 << 16);
    v[d + 1] = (xor1 >>> 16) ^ (xor0 << 16);

    ADD64AA(v, c, d);

    // v[b,b+1] = (v[b,b+1] xor v[c,c+1]) rotated right by 63 bits
    xor0 = v[b] ^ v[c];
    xor1 = v[b + 1] ^ v[c + 1];
    v[b] = (xor1 >>> 31) ^ (xor0 << 1);
    v[b + 1] = (xor0 >>> 31) ^ (xor1 << 1);
  }

  // Initialization Vector
  const BLAKE2B_IV32 = new Uint32Array([
    0xF3BCC908, 0x6A09E667, 0x84CAA73B, 0xBB67AE85,
    0xFE94F82B, 0x3C6EF372, 0x5F1D36F1, 0xA54FF53A,
    0xADE682D1, 0x510E527F, 0x2B3E6C1F, 0x9B05688C,
    0xFB41BD6B, 0x1F83D9AB, 0x137E2179, 0x5BE0CD19,
  ]);

  const SIGMA8 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
    11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4,
    7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8,
    9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13,
    2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9,
    12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11,
    13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10,
    6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5,
    10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3,
  ];

  // These are offsets into a uint64 buffer.
  // Multiply them all by 2 to make them offsets into a uint32 buffer,
  // because this is Javascript and we don't have uint64s
  const SIGMA82 = new Uint8Array(SIGMA8.map(function(x) {
    return x * 2;
  }));

  // Compression function. 'last' flag indicates last block.
  // Note we're representing 16 uint64s as 32 uint32s
  var v = new Uint32Array(32);
  var m = new Uint32Array(32);
  function blake2bCompress(ctx, last) {
    let i = 0;

    // init work variables
    for (i = 0; i < 16; i++) {
      v[i] = ctx.h[i];
      v[i + 16] = BLAKE2B_IV32[i];
    }

    // low 64 bits of offset
    v[24] = v[24] ^ ctx.t;
    v[25] = v[25] ^ (ctx.t / 0x100000000);
    // high 64 bits not supported, offset may not be higher than 2**53-1

    // last block flag set ?
    if (last) {
      v[28] = ~v[28];
      v[29] = ~v[29];
    }

    // get little-endian words
    for (i = 0; i < 32; i++) {
      m[i] = B2B_GET32(ctx.b, 4 * i);
    }

    // twelve rounds of mixing
    // uncomment the DebugPrint calls to log the computation
    // and match the RFC sample documentation
    // util.debugPrint('          m[16]', m, 64)
    for (i = 0; i < 12; i++) {
    // util.debugPrint('   (i=' + (i < 10 ? ' ' : '') + i + ') v[16]', v, 64)
      B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
      B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
      B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
      B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
      B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
      B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
      B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
      B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
    }
    // util.debugPrint('   (i=12) v[16]', v, 64)

    for (i = 0; i < 16; i++) {
      ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
    }
  // util.debugPrint('h[8]', ctx.h, 64)
  }

  // Creates a BLAKE2b hashing context
  // Requires an output length between 1 and 64 bytes
  // Takes an optional Uint8Array key
  function blake2bInit(outlen, key) {
    if (outlen === 0 || outlen > 64) {
      throw new Error('Illegal output length, expected 0 < length <= 64');
    }
    if (key && key.length > 64) {
      throw new Error('Illegal key, expected Uint8Array with 0 < length <= 64');
    }

    // state, 'param block'
    const ctx = {
      b: new Uint8Array(128),
      h: new Uint32Array(16),
      t: 0, // input count
      c: 0, // pointer within buffer
      outlen: outlen, // output length in bytes
    };

    // initialize hash state
    for (let i = 0; i < 16; i++) {
      ctx.h[i] = BLAKE2B_IV32[i];
    }
    const keylen = key ? key.length : 0;
    ctx.h[0] ^= 0x01010000 ^ (keylen << 8) ^ outlen;

    // key the hash, if applicable
    if (key) {
      blake2bUpdate(ctx, key);
      // at the end
      ctx.c = 128;
    }

    return ctx;
  }

  // Updates a BLAKE2b streaming hash
  // Requires hash context and Uint8Array (byte array)
  function blake2bUpdate(ctx, input) {
    for (let i = 0; i < input.length; i++) {
      if (ctx.c === 128) { // buffer full ?
        ctx.t += ctx.c; // add counters
        blake2bCompress(ctx, false); // compress (not last)
        ctx.c = 0; // counter to zero
      }
      ctx.b[ctx.c++] = input[i];
    }
  }

  // Completes a BLAKE2b streaming hash
  // Returns a Uint8Array containing the message digest
  function blake2bFinal(ctx) {
    ctx.t += ctx.c; // mark last block offset

    while (ctx.c < 128) { // fill up with zeros
      ctx.b[ctx.c++] = 0;
    }
    blake2bCompress(ctx, true); // final block flag = 1

    // little endian convert and store
    const out = new Uint8Array(ctx.outlen);
    for (let i = 0; i < ctx.outlen; i++) {
      out[i] = ctx.h[i >> 2] >> (8 * (i & 3));
    }
    return out;
  }

  // Computes the BLAKE2B hash of a string or byte array, and returns a Uint8Array
  //
  // Returns a n-byte Uint8Array
  //
  // Parameters:
  // - input - the input bytes, as a string, Buffer or Uint8Array
  // - key - optional key Uint8Array, up to 64 bytes
  // - outlen - optional output length in bytes, default 64
  function blake2b(input, key, outlen) {
  // preprocess inputs
    outlen = outlen || 64;
    input = util.normalizeInput(input);

    // do the math
    const ctx = blake2bInit(outlen, key);
    blake2bUpdate(ctx, input);
    return blake2bFinal(ctx);
  }

  // Computes the BLAKE2B hash of a string or byte array
  //
  // Returns an n-byte hash in hex, all lowercase
  //
  // Parameters:
  // - input - the input bytes, as a string, Buffer, or Uint8Array
  // - key - optional key Uint8Array, up to 64 bytes
  // - outlen - optional output length in bytes, default 64
  function blake2bHex(input, key, outlen) {
    const output = blake2b(input, key, outlen);
    return util.toHex(output);
  }


  // STARTED BOTTOM nodejs/browser hack
  const exports = (() => {
    const exports = {};
    exports.blake2b= blake2b;
    exports.blake2bHex= blake2bHex;
    exports.blake2bInit= blake2bInit;
    exports.blake2bUpdate= blake2bUpdate;
    exports.blake2bFinal= blake2bFinal;
    return exports;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.blakejs = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
// STARTED TOP nodejs/browser hack
(function() {
// FINISHED TOP nodejs/browser hack

  const ERROR_MSG_INPUT = 'Input must be an string, Buffer or Uint8Array';

  // For convenience, let people hash a string, not just a Uint8Array
  function normalizeInput(input) {
    let ret;
    if (input instanceof Uint8Array) {
      ret = input;
    } else if (input instanceof Buffer) {
      ret = new Uint8Array(input);
    } else if (typeof (input) === 'string') {
      ret = new Uint8Array(Buffer.from(input, 'utf8'));
    } else {
      throw new Error(ERROR_MSG_INPUT);
    }
    return ret;
  }

  // Converts a Uint8Array to a hexadecimal string
  // For example, toHex([255, 0, 255]) returns "ff00ff"
  function toHex(bytes) {
    return Array.prototype.map.call(bytes, function(n) {
      return (n < 16 ? '0' : '') + n.toString(16);
    }).join('');
  }

  // Converts any value in [0...2^32-1] to an 8-character hex string
  function uint32ToHex(val) {
    return (0x100000000 + val).toString(16).substring(1);
  }

  // For debugging: prints out hash state in the same format as the RFC
  // sample computation exactly, so that you can diff
  function debugPrint(label, arr, size) {
    let msg = '\n' + label + ' = ';
    for (let i = 0; i < arr.length; i += 2) {
      if (size === 32) {
        msg += uint32ToHex(arr[i]).toUpperCase();
        msg += ' ';
        msg += uint32ToHex(arr[i + 1]).toUpperCase();
      } else if (size === 64) {
        msg += uint32ToHex(arr[i + 1]).toUpperCase();
        msg += uint32ToHex(arr[i]).toUpperCase();
      } else throw new Error('Invalid size ' + size);
      if (i % 6 === 4) {
        msg += '\n' + new Array(label.length + 4).join(' ');
      } else if (i < arr.length - 2) {
        msg += ' ';
      }
    }
    console.log(msg);
  }

  // For performance testing: generates N bytes of input, hashes M times
  // Measures and prints MB/second hash performance each time
  function testSpeed(hashFn, N, M) {
    let startMs = new Date().getTime();

    const input = new Uint8Array(N);
    for (var i = 0; i < N; i++) {
      input[i] = i % 256;
    }
    const genMs = new Date().getTime();
    console.log('Generated random input in ' + (genMs - startMs) + 'ms');
    startMs = genMs;

    for (i = 0; i < M; i++) {
      const hashHex = hashFn(input);
      const hashMs = new Date().getTime();
      const ms = hashMs - startMs;
      startMs = hashMs;
      console.log('Hashed in ' + ms + 'ms: ' + hashHex.substring(0, 20) + '...');
      console.log(Math.round(N / (1 << 20) / (ms / 1000) * 100) / 100 + ' MB PER SECOND');
    }
  }

  // STARTED BOTTOM nodejs/browser hack
  const exports = (() => {
    const exports = {};
    exports.normalizeInput= normalizeInput;
    exports.toHex= toHex;
    exports.debugPrint= debugPrint;
    exports.testSpeed= testSpeed;
    return exports;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.blakejsUtil = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
'use strict';
// STARTED TOP nodejs/browser hack
(function() {
  const exports = (() => {
    const exports = {};
    const blake = window.blakejs

    const u64 = function(h, l) {
      this.hi = h | 0 >>> 0;
      this.lo = l | 0 >>> 0;
    };
    const gf = function(init) {
      let i; const r = new Float64Array(16);
      if (init) {
        for (i = 0; i < init.length; i++) {
          r[i] = init[i];
        }
      }
      return r;
    };

    // Pluggable, initialized in high-level API below.
    let randombytes = function(/* x, n */) {
      throw new Error('no PRNG');
    };

    const _0 = new Uint8Array(16);
    const _9 = new Uint8Array(32);
    _9[0] = 9;

    const gf0 = gf(); const gf1 = gf([1]); const _121665 = gf([0xdb41, 1]); const D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079,
      0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]); const D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e,
      0xfce7, 0x56df, 0xd9dc, 0x2406]); const X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e,
      0x36d3, 0x2169]); const Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]); const I = gf([
      0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

    function L32(x, c) {
      return (x << c) | (x >>> (32 - c));
    }

    function ld32(x, i) {
      let u = x[i + 3] & 0xff;
      u = (u << 8) | (x[i + 2] & 0xff);
      u = (u << 8) | (x[i + 1] & 0xff);
      return (u << 8) | (x[i + 0] & 0xff);
    }

    function dl64(x, i) {
      const h = (x[i] << 24) | (x[i + 1] << 16) | (x[i + 2] << 8) | x[i + 3];
      const l = (x[i + 4] << 24) | (x[i + 5] << 16) | (x[i + 6] << 8) | x[i + 7];
      return new u64(h, l);
    }

    function st32(x, j, u) {
      let i;
      for (i = 0; i < 4; i++) {
        x[j + i] = u & 255;
        u >>>= 8;
      }
    }

    function ts64(x, i, u) {
      x[i] = (u.hi >> 24) & 0xff;
      x[i + 1] = (u.hi >> 16) & 0xff;
      x[i + 2] = (u.hi >> 8) & 0xff;
      x[i + 3] = u.hi & 0xff;
      x[i + 4] = (u.lo >> 24) & 0xff;
      x[i + 5] = (u.lo >> 16) & 0xff;
      x[i + 6] = (u.lo >> 8) & 0xff;
      x[i + 7] = u.lo & 0xff;
    }

    function vn(x, xi, y, yi, n) {
      let i; let d = 0;
      for (i = 0; i < n; i++) {
        d |= x[xi + i] ^ y[yi + i];
      }
      return (1 & ((d - 1) >>> 8)) - 1;
    }

    function crypto_verify_16(x, xi, y, yi) {
      return vn(x, xi, y, yi, 16);
    }

    function crypto_verify_32(x, xi, y, yi) {
      return vn(x, xi, y, yi, 32);
    }

    function core(out, inp, k, c, h) {
      const w = new Uint32Array(16); const x = new Uint32Array(16); const y = new Uint32Array(16); const t = new Uint32Array(4);
      let i; let j; let m;

      for (i = 0; i < 4; i++) {
        x[5 * i] = ld32(c, 4 * i);
        x[1 + i] = ld32(k, 4 * i);
        x[6 + i] = ld32(inp, 4 * i);
        x[11 + i] = ld32(k, 16 + 4 * i);
      }

      for (i = 0; i < 16; i++) {
        y[i] = x[i];
      }

      for (i = 0; i < 20; i++) {
        for (j = 0; j < 4; j++) {
          for (m = 0; m < 4; m++) {
            t[m] = x[(5 * j + 4 * m) % 16];
          }
          t[1] ^= L32((t[0] + t[3]) | 0, 7);
          t[2] ^= L32((t[1] + t[0]) | 0, 9);
          t[3] ^= L32((t[2] + t[1]) | 0, 13);
          t[0] ^= L32((t[3] + t[2]) | 0, 18);
          for (m = 0; m < 4; m++) {
            w[4 * j + (j + m) % 4] = t[m];
          }
        }
        for (m = 0; m < 16; m++) {
          x[m] = w[m];
        }
      }

      if (h) {
        for (i = 0; i < 16; i++) {
          x[i] = (x[i] + y[i]) | 0;
        }
        for (i = 0; i < 4; i++) {
          x[5 * i] = (x[5 * i] - ld32(c, 4 * i)) | 0;
          x[6 + i] = (x[6 + i] - ld32(inp, 4 * i)) | 0;
        }
        for (i = 0; i < 4; i++) {
          st32(out, 4 * i, x[5 * i]);
          st32(out, 16 + 4 * i, x[6 + i]);
        }
      } else {
        for (i = 0; i < 16; i++) {
          st32(out, 4 * i, (x[i] + y[i]) | 0);
        }
      }
    }

    function crypto_core_salsa20(out, inp, k, c) {
      core(out, inp, k, c, false);
      return 0;
    }

    function crypto_core_hsalsa20(out, inp, k, c) {
      core(out, inp, k, c, true);
      return 0;
    }

    const sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
    // "expand 32-byte k"

    function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
      const z = new Uint8Array(16); const x = new Uint8Array(64);
      let u; let i;
      if (!b) {
        return 0;
      }
      for (i = 0; i < 16; i++) {
        z[i] = 0;
      }
      for (i = 0; i < 8; i++) {
        z[i] = n[i];
      }
      while (b >= 64) {
        crypto_core_salsa20(x, z, k, sigma);
        for (i = 0; i < 64; i++) {
          c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
        }
        u = 1;
        for (i = 8; i < 16; i++) {
          u = u + (z[i] & 0xff) | 0;
          z[i] = u & 0xff;
          u >>>= 8;
        }
        b -= 64;
        cpos += 64;
        if (m) {
          mpos += 64;
        }
      }
      if (b > 0) {
        crypto_core_salsa20(x, z, k, sigma);
        for (i = 0; i < b; i++) {
          c[cpos + i] = (m ? m[mpos + i] : 0) ^ x[i];
        }
      }
      return 0;
    }

    function crypto_stream_salsa20(c, cpos, d, n, k) {
      return crypto_stream_salsa20_xor(c, cpos, null, 0, d, n, k);
    }

    function crypto_stream(c, cpos, d, n, k) {
      const s = new Uint8Array(32);
      crypto_core_hsalsa20(s, n, k, sigma);
      return crypto_stream_salsa20(c, cpos, d, n.subarray(16), s);
    }

    function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
      const s = new Uint8Array(32);
      crypto_core_hsalsa20(s, n, k, sigma);
      return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, n.subarray(16), s);
    }

    function add1305(h, c) {
      let j; let u = 0;
      for (j = 0; j < 17; j++) {
        u = (u + ((h[j] + c[j]) | 0)) | 0;
        h[j] = u & 255;
        u >>>= 8;
      }
    }

    const minusp = new Uint32Array([5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 252]);

    function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
      let s; let i; let j; let u;
      const x = new Uint32Array(17); const r = new Uint32Array(17); const h = new Uint32Array(17); const c = new Uint32Array(17); const g = new Uint32Array(17);
      for (j = 0; j < 17; j++) {
        r[j] = h[j] = 0;
      }
      for (j = 0; j < 16; j++) {
        r[j] = k[j];
      }
      r[3] &= 15;
      r[4] &= 252;
      r[7] &= 15;
      r[8] &= 252;
      r[11] &= 15;
      r[12] &= 252;
      r[15] &= 15;

      while (n > 0) {
        for (j = 0; j < 17; j++) {
          c[j] = 0;
        }
        for (j = 0; (j < 16) && (j < n); ++j) {
          c[j] = m[mpos + j];
        }
        c[j] = 1;
        mpos += j;
        n -= j;
        add1305(h, c);
        for (i = 0; i < 17; i++) {
          x[i] = 0;
          for (j = 0; j < 17; j++) {
            x[i] = (x[i] + (h[j] * ((j <= i) ? r[i - j] : ((320 * r[i + 17 - j]) | 0))) | 0) | 0;
          }
        }
        for (i = 0; i < 17; i++) {
          h[i] = x[i];
        }
        u = 0;
        for (j = 0; j < 16; j++) {
          u = (u + h[j]) | 0;
          h[j] = u & 255;
          u >>>= 8;
        }
        u = (u + h[16]) | 0;
        h[16] = u & 3;
        u = (5 * (u >>> 2)) | 0;
        for (j = 0; j < 16; j++) {
          u = (u + h[j]) | 0;
          h[j] = u & 255;
          u >>>= 8;
        }
        u = (u + h[16]) | 0;
        h[16] = u;
      }

      for (j = 0; j < 17; j++) {
        g[j] = h[j];
      }
      add1305(h, minusp);
      s = (-(h[16] >>> 7) | 0);
      for (j = 0; j < 17; j++) {
        h[j] ^= s & (g[j] ^ h[j]);
      }

      for (j = 0; j < 16; j++) {
        c[j] = k[j + 16];
      }
      c[16] = 0;
      add1305(h, c);
      for (j = 0; j < 16; j++) {
        out[outpos + j] = h[j];
      }
      return 0;
    }

    function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
      const x = new Uint8Array(16);
      crypto_onetimeauth(x, 0, m, mpos, n, k);
      return crypto_verify_16(h, hpos, x, 0);
    }

    function crypto_secretbox(c, m, d, n, k) {
      let i;
      if (d < 32) {
        return -1;
      }
      crypto_stream_xor(c, 0, m, 0, d, n, k);
      crypto_onetimeauth(c, 16, c, 32, d - 32, c);
      for (i = 0; i < 16; i++) {
        c[i] = 0;
      }
      return 0;
    }

    function crypto_secretbox_open(m, c, d, n, k) {
      let i;
      const x = new Uint8Array(32);
      if (d < 32) {
        return -1;
      }
      crypto_stream(x, 0, 32, n, k);
      if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) {
        return -1;
      }
      crypto_stream_xor(m, 0, c, 0, d, n, k);
      for (i = 0; i < 32; i++) {
        m[i] = 0;
      }
      return 0;
    }

    function set25519(r, a) {
      let i;
      for (i = 0; i < 16; i++) {
        r[i] = a[i] | 0;
      }
    }

    function car25519(o) {
      let c;
      let i;
      for (i = 0; i < 16; i++) {
        o[i] += 65536;
        c = Math.floor(o[i] / 65536);
        o[(i + 1) * (i < 15 ? 1 : 0)] += c - 1 + 37 * (c - 1) * (i === 15 ? 1 : 0);
        o[i] -= (c * 65536);
      }
    }

    function sel25519(p, q, b) {
      let t; const c = ~(b - 1);
      for (let i = 0; i < 16; i++) {
        t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }

    function pack25519(o, n) {
      let i; let j; let b;
      const m = gf(); const t = gf();
      for (i = 0; i < 16; i++) {
        t[i] = n[i];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (j = 0; j < 2; j++) {
        m[0] = t[0] - 0xffed;
        for (i = 1; i < 15; i++) {
          m[i] = t[i] - 0xffff - ((m[i - 1] >> 16) & 1);
          m[i - 1] &= 0xffff;
        }
        m[15] = t[15] - 0x7fff - ((m[14] >> 16) & 1);
        b = (m[15] >> 16) & 1;
        m[14] &= 0xffff;
        sel25519(t, m, 1 - b);
      }
      for (i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 0xff;
        o[2 * i + 1] = t[i] >> 8;
      }
    }

    function neq25519(a, b) {
      const c = new Uint8Array(32); const d = new Uint8Array(32);
      pack25519(c, a);
      pack25519(d, b);
      return crypto_verify_32(c, 0, d, 0);
    }

    function par25519(a) {
      const d = new Uint8Array(32);
      pack25519(d, a);
      return d[0] & 1;
    }

    function unpack25519(o, n) {
      let i;
      for (i = 0; i < 16; i++) {
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      }
      o[15] &= 0x7fff;
    }

    function A(o, a, b) {
      let i;
      for (i = 0; i < 16; i++) {
        o[i] = (a[i] + b[i]) | 0;
      }
    }

    function Z(o, a, b) {
      let i;
      for (i = 0; i < 16; i++) {
        o[i] = (a[i] - b[i]) | 0;
      }
    }

    function M(o, a, b) {
      let i; let j; const t = new Float64Array(31);
      for (i = 0; i < 31; i++) {
        t[i] = 0;
      }
      for (i = 0; i < 16; i++) {
        for (j = 0; j < 16; j++) {
          t[i + j] += a[i] * b[j];
        }
      }
      for (i = 0; i < 15; i++) {
        t[i] += 38 * t[i + 16];
      }
      for (i = 0; i < 16; i++) {
        o[i] = t[i];
      }
      car25519(o);
      car25519(o);
    }

    function S(o, a) {
      M(o, a, a);
    }

    function inv25519(o, i) {
      const c = gf();
      let a;
      for (a = 0; a < 16; a++) {
        c[a] = i[a];
      }
      for (a = 253; a >= 0; a--) {
        S(c, c);
        if (a !== 2 && a !== 4) {
          M(c, c, i);
        }
      }
      for (a = 0; a < 16; a++) {
        o[a] = c[a];
      }
    }

    function pow2523(o, i) {
      const c = gf();
      let a;
      for (a = 0; a < 16; a++) {
        c[a] = i[a];
      }
      for (a = 250; a >= 0; a--) {
        S(c, c);
        if (a !== 1) {
          M(c, c, i);
        }
      }
      for (a = 0; a < 16; a++) {
        o[a] = c[a];
      }
    }

    function crypto_scalarmult(q, n, p) {
      const z = new Uint8Array(32);
      const x = new Float64Array(80); let r; let i;
      const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const f = gf();
      for (i = 0; i < 31; i++) {
        z[i] = n[i];
      }
      z[31] = (n[31] & 127) | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (i = 0; i < 16; i++) {
        b[i] = x[i];
        d[i] = a[i] = c[i] = 0;
      }
      a[0] = d[0] = 1;
      for (i = 254; i >= 0; --i) {
        r = (z[i >>> 3] >>> (i & 7)) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        A(e, a, c);
        Z(a, a, c);
        A(c, b, d);
        Z(b, b, d);
        S(d, e);
        S(f, a);
        M(a, c, a);
        M(c, b, e);
        A(e, a, c);
        Z(a, a, c);
        S(b, a);
        Z(c, d, f);
        M(a, c, _121665);
        A(a, a, d);
        M(c, c, a);
        M(a, d, f);
        M(d, b, x);
        S(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      const x32 = x.subarray(32);
      const x16 = x.subarray(16);
      inv25519(x32, x32);
      M(x16, x16, x32);
      pack25519(q, x16);
      return 0;
    }

    function crypto_scalarmult_base(q, n) {
      return crypto_scalarmult(q, n, _9);
    }

    function crypto_box_keypair(y, x) {
      randombytes(x, 32);
      return crypto_scalarmult_base(y, x);
    }

    function crypto_box_beforenm(k, y, x) {
      const s = new Uint8Array(32);
      crypto_scalarmult(s, x, y);
      return crypto_core_hsalsa20(k, _0, s, sigma);
    }

    const crypto_box_afternm = crypto_secretbox;
    const crypto_box_open_afternm = crypto_secretbox_open;

    function crypto_box(c, m, d, n, y, x) {
      const k = new Uint8Array(32);
      crypto_box_beforenm(k, y, x);
      return crypto_box_afternm(c, m, d, n, k);
    }

    function crypto_box_open(m, c, d, n, y, x) {
      const k = new Uint8Array(32);
      crypto_box_beforenm(k, y, x);
      return crypto_box_open_afternm(m, c, d, n, k);
    }

    function add64() {
      let a = 0; let b = 0; let c = 0; let d = 0; const m16 = 65535; let l; let h; let i;
      for (i = 0; i < arguments.length; i++) {
        l = arguments[i].lo;
        h = arguments[i].hi;
        a += (l & m16);
        b += (l >>> 16);
        c += (h & m16);
        d += (h >>> 16);
      }

      b += (a >>> 16);
      c += (b >>> 16);
      d += (c >>> 16);

      return new u64((c & m16) | (d << 16), (a & m16) | (b << 16));
    }

    function shr64(x, c) {
      return new u64((x.hi >>> c), (x.lo >>> c) | (x.hi << (32 - c)));
    }

    function xor64() {
      let l = 0; let h = 0; let i;
      for (i = 0; i < arguments.length; i++) {
        l ^= arguments[i].lo;
        h ^= arguments[i].hi;
      }
      return new u64(h, l);
    }

    function R(x, c) {
      let h; let l; const c1 = 32 - c;
      if (c < 32) {
        h = (x.hi >>> c) | (x.lo << c1);
        l = (x.lo >>> c) | (x.hi << c1);
      } else if (c < 64) {
        h = (x.lo >>> c) | (x.hi << c1);
        l = (x.hi >>> c) | (x.lo << c1);
      }
      return new u64(h, l);
    }

    function Ch(x, y, z) {
      const h = (x.hi & y.hi) ^ (~x.hi & z.hi); const l = (x.lo & y.lo) ^ (~x.lo & z.lo);
      return new u64(h, l);
    }

    function Maj(x, y, z) {
      const h = (x.hi & y.hi) ^ (x.hi & z.hi) ^ (y.hi & z.hi); const l = (x.lo & y.lo) ^ (x.lo & z.lo) ^ (y.lo & z.lo);
      return new u64(h, l);
    }

    function Sigma0(x) {
      return xor64(R(x, 28), R(x, 34), R(x, 39));
    }
    function Sigma1(x) {
      return xor64(R(x, 14), R(x, 18), R(x, 41));
    }
    function sigma0(x) {
      return xor64(R(x, 1), R(x, 8), shr64(x, 7));
    }
    function sigma1(x) {
      return xor64(R(x, 19), R(x, 61), shr64(x, 6));
    }

    const K = [new u64(0x428a2f98, 0xd728ae22), new u64(0x71374491, 0x23ef65cd), new u64(0xb5c0fbcf, 0xec4d3b2f), new u64(0xe9b5dba5, 0x8189dbbc),
      new u64(0x3956c25b, 0xf348b538), new u64(0x59f111f1, 0xb605d019), new u64(0x923f82a4, 0xaf194f9b), new u64(0xab1c5ed5, 0xda6d8118),
      new u64(0xd807aa98, 0xa3030242), new u64(0x12835b01, 0x45706fbe), new u64(0x243185be, 0x4ee4b28c), new u64(0x550c7dc3, 0xd5ffb4e2),
      new u64(0x72be5d74, 0xf27b896f), new u64(0x80deb1fe, 0x3b1696b1), new u64(0x9bdc06a7, 0x25c71235), new u64(0xc19bf174, 0xcf692694),
      new u64(0xe49b69c1, 0x9ef14ad2), new u64(0xefbe4786, 0x384f25e3), new u64(0x0fc19dc6, 0x8b8cd5b5), new u64(0x240ca1cc, 0x77ac9c65),
      new u64(0x2de92c6f, 0x592b0275), new u64(0x4a7484aa, 0x6ea6e483), new u64(0x5cb0a9dc, 0xbd41fbd4), new u64(0x76f988da, 0x831153b5),
      new u64(0x983e5152, 0xee66dfab), new u64(0xa831c66d, 0x2db43210), new u64(0xb00327c8, 0x98fb213f), new u64(0xbf597fc7, 0xbeef0ee4),
      new u64(0xc6e00bf3, 0x3da88fc2), new u64(0xd5a79147, 0x930aa725), new u64(0x06ca6351, 0xe003826f), new u64(0x14292967, 0x0a0e6e70),
      new u64(0x27b70a85, 0x46d22ffc), new u64(0x2e1b2138, 0x5c26c926), new u64(0x4d2c6dfc, 0x5ac42aed), new u64(0x53380d13, 0x9d95b3df),
      new u64(0x650a7354, 0x8baf63de), new u64(0x766a0abb, 0x3c77b2a8), new u64(0x81c2c92e, 0x47edaee6), new u64(0x92722c85, 0x1482353b),
      new u64(0xa2bfe8a1, 0x4cf10364), new u64(0xa81a664b, 0xbc423001), new u64(0xc24b8b70, 0xd0f89791), new u64(0xc76c51a3, 0x0654be30),
      new u64(0xd192e819, 0xd6ef5218), new u64(0xd6990624, 0x5565a910), new u64(0xf40e3585, 0x5771202a), new u64(0x106aa070, 0x32bbd1b8),
      new u64(0x19a4c116, 0xb8d2d0c8), new u64(0x1e376c08, 0x5141ab53), new u64(0x2748774c, 0xdf8eeb99), new u64(0x34b0bcb5, 0xe19b48a8),
      new u64(0x391c0cb3, 0xc5c95a63), new u64(0x4ed8aa4a, 0xe3418acb), new u64(0x5b9cca4f, 0x7763e373), new u64(0x682e6ff3, 0xd6b2b8a3),
      new u64(0x748f82ee, 0x5defb2fc), new u64(0x78a5636f, 0x43172f60), new u64(0x84c87814, 0xa1f0ab72), new u64(0x8cc70208, 0x1a6439ec),
      new u64(0x90befffa, 0x23631e28), new u64(0xa4506ceb, 0xde82bde9), new u64(0xbef9a3f7, 0xb2c67915), new u64(0xc67178f2, 0xe372532b),
      new u64(0xca273ece, 0xea26619c), new u64(0xd186b8c7, 0x21c0c207), new u64(0xeada7dd6, 0xcde0eb1e), new u64(0xf57d4f7f, 0xee6ed178),
      new u64(0x06f067aa, 0x72176fba), new u64(0x0a637dc5, 0xa2c898a6), new u64(0x113f9804, 0xbef90dae), new u64(0x1b710b35, 0x131c471b),
      new u64(0x28db77f5, 0x23047d84), new u64(0x32caab7b, 0x40c72493), new u64(0x3c9ebe0a, 0x15c9bebc), new u64(0x431d67c4, 0x9c100d4c),
      new u64(0x4cc5d4be, 0xcb3e42b6), new u64(0x597f299c, 0xfc657e2a), new u64(0x5fcb6fab, 0x3ad6faec), new u64(0x6c44198c, 0x4a475817)];

    function crypto_hashblocks(x, m, n) {
      const z = []; const b = []; const a = []; const w = []; let t; let i; let j;

      for (i = 0; i < 8; i++) {
        z[i] = a[i] = dl64(x, 8 * i);
      }

      let pos = 0;
      while (n >= 128) {
        for (i = 0; i < 16; i++) {
          w[i] = dl64(m, 8 * i + pos);
        }
        for (i = 0; i < 80; i++) {
          for (j = 0; j < 8; j++) {
            b[j] = a[j];
          }
          t = add64(a[7], Sigma1(a[4]), Ch(a[4], a[5], a[6]), K[i], w[i % 16]);
          b[7] = add64(t, Sigma0(a[0]), Maj(a[0], a[1], a[2]));
          b[3] = add64(b[3], t);
          for (j = 0; j < 8; j++) {
            a[(j + 1) % 8] = b[j];
          }
          if (i % 16 === 15) {
            for (j = 0; j < 16; j++) {
              w[j] = add64(w[j], w[(j + 9) % 16], sigma0(w[(j + 1) % 16]), sigma1(w[(j + 14) % 16]));
            }
          }
        }

        for (i = 0; i < 8; i++) {
          a[i] = add64(a[i], z[i]);
          z[i] = a[i];
        }

        pos += 128;
        n -= 128;
      }

      for (i = 0; i < 8; i++) {
        ts64(x, 8 * i, z[i]);
      }
      return n;
    }

    const iv = new Uint8Array([0x6a, 0x09, 0xe6, 0x67, 0xf3, 0xbc, 0xc9, 0x08, 0xbb, 0x67, 0xae, 0x85, 0x84, 0xca, 0xa7, 0x3b, 0x3c, 0x6e, 0xf3, 0x72, 0xfe, 0x94,
      0xf8, 0x2b, 0xa5, 0x4f, 0xf5, 0x3a, 0x5f, 0x1d, 0x36, 0xf1, 0x51, 0x0e, 0x52, 0x7f, 0xad, 0xe6, 0x82, 0xd1, 0x9b, 0x05, 0x68, 0x8c, 0x2b, 0x3e, 0x6c, 0x1f,
      0x1f, 0x83, 0xd9, 0xab, 0xfb, 0x41, 0xbd, 0x6b, 0x5b, 0xe0, 0xcd, 0x19, 0x13, 0x7e, 0x21, 0x79]);

    function crypto_hash(out, m, n) {
      const h = new Uint8Array(64); const x = new Uint8Array(256);
      let i; const b = n;

      for (i = 0; i < 64; i++) {
        h[i] = iv[i];
      }

      crypto_hashblocks(h, m, n);
      n %= 128;

      for (i = 0; i < 256; i++) {
        x[i] = 0;
      }
      for (i = 0; i < n; i++) {
        x[i] = m[b - n + i];
      }
      x[n] = 128;

      n = 256 - 128 * (n < 112 ? 1 : 0);
      x[n - 9] = 0;
      ts64(x, n - 8, new u64((b / 0x20000000) | 0, b << 3));
      crypto_hashblocks(h, x, n);

      for (i = 0; i < 64; i++) {
        out[i] = h[i];
      }

      return 0;
    }

    function add(p, q) {
      const a = gf(); const b = gf(); const c = gf(); const d = gf(); const e = gf(); const f = gf(); const g = gf(); const h = gf(); const t = gf();

      Z(a, p[1], p[0]);
      Z(t, q[1], q[0]);
      M(a, a, t);
      A(b, p[0], p[1]);
      A(t, q[0], q[1]);
      M(b, b, t);
      M(c, p[3], q[3]);
      M(c, c, D2);
      M(d, p[2], q[2]);
      A(d, d, d);
      Z(e, b, a);
      Z(f, d, c);
      A(g, d, c);
      A(h, b, a);

      M(p[0], e, f);
      M(p[1], h, g);
      M(p[2], g, f);
      M(p[3], e, h);
    }

    function cswap(p, q, b) {
      let i;
      for (i = 0; i < 4; i++) {
        sel25519(p[i], q[i], b);
      }
    }

    function pack(r, p) {
      const tx = gf(); const ty = gf(); const zi = gf();
      inv25519(zi, p[2]);
      M(tx, p[0], zi);
      M(ty, p[1], zi);
      pack25519(r, ty);
      r[31] ^= par25519(tx) << 7;
    }

    function scalarmult(p, q, s) {
      let b; let i;
      set25519(p[0], gf0);
      set25519(p[1], gf1);
      set25519(p[2], gf1);
      set25519(p[3], gf0);
      for (i = 255; i >= 0; --i) {
        b = (s[(i / 8) | 0] >> (i & 7)) & 1;
        cswap(p, q, b);
        add(q, p);
        add(p, p);
        cswap(p, q, b);
      }
    }

    function scalarbase(p, s) {
      const q = [gf(), gf(), gf(), gf()];
      set25519(q[0], X);
      set25519(q[1], Y);
      set25519(q[2], gf1);
      M(q[3], X, Y);
      scalarmult(p, q, s);
    }

    function crypto_sign_keypair(pk, sk, seeded) {
      let d = new Uint8Array(64);
      const p = [gf(), gf(), gf(), gf()];
      let i;

      if (!seeded) {
        randombytes(sk, 32);
      }

      const context = blake.blake2bInit(64);
      blake.blake2bUpdate(context, sk);
      d = blake.blake2bFinal(context);

      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;

      scalarbase(p, d);
      pack(pk, p);

      return 0;
    }

    const hashSecret = ( sk ) => {
      let d = new Uint8Array( 64 );
      const pk = new Uint8Array( 32 );
      const context = blake.blake2bInit( 64 );
      blake.blake2bUpdate( context, sk );
      d = blake.blake2bFinal( context );
      return d;
    };

    exports.camo = {};
    exports.camo.hashsecret = hashSecret;

    exports.camo.scalarMult = function(n, p) {
      checkArrayTypes(n, p);
      if (n.length !== crypto_scalarmult_SCALARBYTES * 2) {
        throw new Error('bad n size');
      }
      if (p.length !== crypto_scalarmult_BYTES) {
        throw new Error('bad p size');
      }
      const q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult(q, n, p);
      return q;
    };

    exports.camo.scalarMult.base = function(n) {
      checkArrayTypes(n);
      if (n.length !== crypto_scalarmult_SCALARBYTES*2) {
        throw new Error('bad n size');
      }
      const q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult_base(q, n);
      return q;
    };

    exports.camo.scalarbase = deriveUnhashedPublicFromSecret;

    function deriveUnhashedPublicFromSecret(sk) {
      const d = sk;
      const p = [gf(), gf(), gf(), gf()];
      let i;
      const pk = new Uint8Array(32);

      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;

      scalarbase(p, d);
      pack(pk, p);
      return pk;
    }

    function derivePublicFromSecret(sk) {
      let d = new Uint8Array(64);
      const p = [gf(), gf(), gf(), gf()];
      let i;
      const pk = new Uint8Array(32);
      const context = blake.blake2bInit(64);
      blake.blake2bUpdate(context, sk);
      d = blake.blake2bFinal(context);

      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;

      scalarbase(p, d);
      pack(pk, p);
      return pk;
    }

    const L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0x10]);

    function modL(r, x) {
      let carry; let i; let j; let k;
      for (i = 63; i >= 32; --i) {
        carry = 0;
        for (j = i - 32, k = i - 12; j < k; ++j) {
          x[j] += carry - 16 * x[i] * L[j - (i - 32)];
          carry = (x[j] + 128) >> 8;
          x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
      }
      carry = 0;
      for (j = 0; j < 32; j++) {
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
      }
      for (j = 0; j < 32; j++) {
        x[j] -= carry * L[j];
      }
      for (i = 0; i < 32; i++) {
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
      }
    }

    function reduce(r) {
      const x = new Float64Array(64); let i;
      for (i = 0; i < 64; i++) {
        x[i] = r[i];
      }
      for (i = 0; i < 64; i++) {
        r[i] = 0;
      }
      modL(r, x);
    }

    // Note: difference from C - smlen returned, not passed as argument.
    function crypto_sign(sm, m, n, sk) {
      let d = new Uint8Array(64); let h = new Uint8Array(64); let r = new Uint8Array(64);
      let i; let j; const x = new Float64Array(64);
      const p = [gf(), gf(), gf(), gf()];

      const pk = derivePublicFromSecret(sk);

      let context = blake.blake2bInit(64, null);
      blake.blake2bUpdate(context, sk);
      d = blake.blake2bFinal(context);
      d[0] &= 248;
      d[31] &= 127;
      d[31] |= 64;

      const smlen = n + 64;
      for (i = 0; i < n; i++) {
        sm[64 + i] = m[i];
      }
      for (i = 0; i < 32; i++) {
        sm[32 + i] = d[32 + i];
      }

      context = blake.blake2bInit(64, null);
      blake.blake2bUpdate(context, sm.subarray(32));
      r = blake.blake2bFinal(context);

      reduce(r);
      scalarbase(p, r);
      pack(sm, p);

      for (i = 32; i < 64; i++) {
        sm[i] = pk[i - 32];
      }

      context = blake.blake2bInit(64, null);
      blake.blake2bUpdate(context, sm);
      h = blake.blake2bFinal(context);

      reduce(h);

      for (i = 0; i < 64; i++) {
        x[i] = 0;
      }
      for (i = 0; i < 32; i++) {
        x[i] = r[i];
      }
      for (i = 0; i < 32; i++) {
        for (j = 0; j < 32; j++) {
          x[i + j] += h[i] * d[j];
        }
      }

      modL(sm.subarray(32), x);
      return smlen;
    }

    function unpackneg(r, p) {
      const t = gf(); const chk = gf(); const num = gf(); const den = gf(); const den2 = gf(); const den4 = gf(); const den6 = gf();

      set25519(r[2], gf1);
      unpack25519(r[1], p);
      S(num, r[1]);
      M(den, num, D);
      Z(num, num, r[2]);
      A(den, r[2], den);

      S(den2, den);
      S(den4, den2);
      M(den6, den4, den2);
      M(t, den6, num);
      M(t, t, den);

      pow2523(t, t);
      M(t, t, num);
      M(t, t, den);
      M(t, t, den);
      M(r[0], t, den);

      S(chk, r[0]);
      M(chk, chk, den);
      if (neq25519(chk, num)) {
        M(r[0], r[0], I);
      }

      S(chk, r[0]);
      M(chk, chk, den);
      if (neq25519(chk, num)) {
        return -1;
      }

      if (par25519(r[0]) === (p[31] >> 7)) {
        Z(r[0], gf0, r[0]);
      }

      M(r[3], r[0], r[1]);
      return 0;
    }

    function crypto_sign_open(m, sm, n, pk) {
      let i; let mlen;
      const t = new Uint8Array(32); let h = new Uint8Array(64);
      const p = [gf(), gf(), gf(), gf()]; const q = [gf(), gf(), gf(), gf()];

      mlen = -1;
      if (n < 64) {
        return -1;
      }

      if (unpackneg(q, pk)) {
        return -1;
      }

      for (i = 0; i < n; i++) {
        m[i] = sm[i];
      }
      for (i = 0; i < 32; i++) {
        m[i + 32] = pk[i];
      }
      // crypto_hash(h, m, n);

      context = blake.blake2bInit(64, null);
      blake.blake2bUpdate(context, m);
      h = blake.blake2bFinal(context);

      reduce(h);
      scalarmult(p, q, h);

      scalarbase(q, sm.subarray(32));
      add(p, q);
      pack(t, p);

      n -= 64;
      if (crypto_verify_32(sm, 0, t, 0)) {
        for (i = 0; i < n; i++) {
          m[i] = 0;
        }
        return -1;
      }

      for (i = 0; i < n; i++) {
        m[i] = sm[i + 64];
      }
      mlen = n;
      return mlen;
    }

    const crypto_secretbox_KEYBYTES = 32; const crypto_secretbox_NONCEBYTES = 24; const crypto_secretbox_ZEROBYTES = 32; const crypto_secretbox_BOXZEROBYTES = 16; var crypto_scalarmult_BYTES = 32; var crypto_scalarmult_SCALARBYTES = 32; const crypto_box_PUBLICKEYBYTES = 32; const crypto_box_SECRETKEYBYTES = 32; const crypto_box_BEFORENMBYTES = 32; const crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES; const crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES; const crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES; const crypto_sign_BYTES = 64; const crypto_sign_PUBLICKEYBYTES = 32; const crypto_sign_SECRETKEYBYTES = 32; const crypto_sign_SEEDBYTES = 32; const crypto_hash_BYTES = 64;

    exports.lowlevel = {
      crypto_core_hsalsa20: crypto_core_hsalsa20,
      crypto_stream_xor: crypto_stream_xor,
      crypto_stream: crypto_stream,
      crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
      crypto_stream_salsa20: crypto_stream_salsa20,
      crypto_onetimeauth: crypto_onetimeauth,
      crypto_onetimeauth_verify: crypto_onetimeauth_verify,
      crypto_verify_16: crypto_verify_16,
      crypto_verify_32: crypto_verify_32,
      crypto_secretbox: crypto_secretbox,
      crypto_secretbox_open: crypto_secretbox_open,
      crypto_scalarmult: crypto_scalarmult,
      crypto_scalarmult_base: crypto_scalarmult_base,
      crypto_box_beforenm: crypto_box_beforenm,
      crypto_box_afternm: crypto_box_afternm,
      crypto_box: crypto_box,
      crypto_box_open: crypto_box_open,
      crypto_box_keypair: crypto_box_keypair,
      crypto_hash: crypto_hash,
      crypto_sign: crypto_sign,
      crypto_sign_keypair: crypto_sign_keypair,
      crypto_sign_open: crypto_sign_open,

      crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
      crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
      crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
      crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
      crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
      crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
      crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
      crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
      crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
      crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
      crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
      crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
      crypto_sign_BYTES: crypto_sign_BYTES,
      crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
      crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
      crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
      crypto_hash_BYTES: crypto_hash_BYTES,
    };

    /* High-level API */

    function checkLengths(k, n) {
      if (k.length !== crypto_secretbox_KEYBYTES) {
        throw new Error('bad key size' + n.length + ' expected:' + crypto_secretbox_KEYBYTES);
      }
      if (n.length !== crypto_secretbox_NONCEBYTES) {
        throw new Error('bad nonce size' + n.length + ' expected:' + crypto_secretbox_NONCEBYTES);
      }
    }

    function checkBoxLengths(pk, sk) {
      if (pk.length !== crypto_box_PUBLICKEYBYTES) {
        throw new Error('bad public key size' + pk.length + ' expected:' + crypto_box_PUBLICKEYBYTES);
      }
      if (sk.length !== crypto_box_SECRETKEYBYTES) {
        throw new Error('bad secret key size:' + sk.length + ' expected:' + crypto_box_SECRETKEYBYTES);
      }
    }

    function checkArrayTypes() {
      for (let i = 0; i < arguments.length; i++) {
        if (!(arguments[i] instanceof Uint8Array)) {
          throw new TypeError('unexpected type, use Uint8Array');
        }
      }
    }

    function cleanup(arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = 0;
      }
    }

    exports.randomBytes = function(n) {
      const b = new Uint8Array(n);
      randombytes(b, n);
      return b;
    };

    exports.secretbox = function(msg, nonce, key) {
      checkArrayTypes(msg, nonce, key);
      checkLengths(key, nonce);
      const m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
      const c = new Uint8Array(m.length);
      for (let i = 0; i < msg.length; i++) {
        m[i + crypto_secretbox_ZEROBYTES] = msg[i];
      }
      crypto_secretbox(c, m, m.length, nonce, key);
      return c.subarray(crypto_secretbox_BOXZEROBYTES);
    };

    exports.secretbox.open = function(box, nonce, key) {
      checkArrayTypes(box, nonce, key);
      checkLengths(key, nonce);
      const c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
      const m = new Uint8Array(c.length);
      for (let i = 0; i < box.length; i++) {
        c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
      }
      if (c.length < 32) {
        console.log('c.length < 32', c.length);
        return null;
      }
      const val = crypto_secretbox_open(m, c, c.length, nonce, key);
      if (val !== 0) {
        console.log('val !== 0', val);
        return null;
      }
      return m.subarray(crypto_secretbox_ZEROBYTES);
    };

    exports.secretbox.keyLength = crypto_secretbox_KEYBYTES;
    exports.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
    exports.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

    exports.scalarMult = function(n, p) {
      checkArrayTypes(n, p);
      if (n.length !== crypto_scalarmult_SCALARBYTES) {
        throw new Error('bad n size');
      }
      if (p.length !== crypto_scalarmult_BYTES) {
        throw new Error('bad p size');
      }
      const q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult(q, n, p);
      return q;
    };

    exports.scalarMult.base = function(n) {
      checkArrayTypes(n);
      if (n.length !== crypto_scalarmult_SCALARBYTES) {
        throw new Error('bad n size');
      }
      const q = new Uint8Array(crypto_scalarmult_BYTES);
      crypto_scalarmult_base(q, n);
      return q;
    };

    exports.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
    exports.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

    exports.box = function(msg, nonce, publicKey, secretKey) {
      const k = exports.box.before(publicKey, secretKey);
      return exports.secretbox(msg, nonce, k);
    };

    exports.box.before = function(publicKey, secretKey) {
      checkArrayTypes(publicKey, secretKey);
      checkBoxLengths(publicKey, secretKey);
      const k = new Uint8Array(crypto_box_BEFORENMBYTES);
      crypto_box_beforenm(k, publicKey, secretKey);
      return k;
    };

    exports.box.after = exports.secretbox;

    exports.box.open = function(msg, nonce, publicKey, secretKey) {
      const k = exports.box.before(publicKey, secretKey);
      return exports.secretbox.open(msg, nonce, k);
    };

    exports.box.open.after = exports.secretbox.open;

    exports.box.keyPair = function() {
      const pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      const sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
      crypto_box_keypair(pk, sk);
      return {
        publicKey: pk,
        secretKey: sk,
      };
    };

    exports.box.keyPair.fromSecretKey = function(secretKey) {
      checkArrayTypes(secretKey);
      if (secretKey.length !== crypto_box_SECRETKEYBYTES) {
        throw new Error('bad secret key size');
      }
      const pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
      crypto_scalarmult_base(pk, secretKey);
      return {
        publicKey: pk,
        secretKey: new Uint8Array(secretKey),
      };
    };

    exports.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
    exports.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
    exports.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
    exports.box.nonceLength = crypto_box_NONCEBYTES;
    exports.box.overheadLength = exports.secretbox.overheadLength;

    exports.sign = function(msg, secretKey) {
      checkArrayTypes(msg, secretKey);
      if (secretKey.length !== crypto_sign_SECRETKEYBYTES) {
        throw new Error('bad secret key size');
      }
      const signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
      crypto_sign(signedMsg, msg, msg.length, secretKey);
      return signedMsg;
    };

    exports.sign.open = function(signedMsg, publicKey) {
      checkArrayTypes(signedMsg, publicKey);
      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) {
        throw new Error('bad public key size');
      }
      const tmp = new Uint8Array(signedMsg.length);
      const mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
      if (mlen < 0) {
        return null;
      }
      const m = new Uint8Array(mlen);
      for (let i = 0; i < m.length; i++) {
        m[i] = tmp[i];
      }
      return m;
    };

    exports.sign.detached = function(msg, secretKey) {
      const signedMsg = exports.sign(msg, secretKey);
      const sig = new Uint8Array(crypto_sign_BYTES);
      for (let i = 0; i < sig.length; i++) {
        sig[i] = signedMsg[i];
      }
      return sig;
    };

    exports.sign.detached.verify = function(msg, sig, publicKey) {
      checkArrayTypes(msg, sig, publicKey);
      if (sig.length !== crypto_sign_BYTES) {
        throw new Error('bad signature size');
      }
      if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) {
        throw new Error('bad public key size:' + publicKey.length + ' expected:' + crypto_sign_PUBLICKEYBYTES);
      }
      const sm = new Uint8Array(crypto_sign_BYTES + msg.length);
      const m = new Uint8Array(crypto_sign_BYTES + msg.length);
      let i;
      for (i = 0; i < crypto_sign_BYTES; i++) {
        sm[i] = sig[i];
      }
      for (i = 0; i < msg.length; i++) {
        sm[i + crypto_sign_BYTES] = msg[i];
      }
      return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
    };

    exports.sign.keyPair = function() {
      const pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      const sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
      crypto_sign_keypair(pk, sk);
      return {
        publicKey: pk,
        secretKey: sk,
      };
    };

    exports.sign.keyPair.fromUnhashedSecretKey = function(secretKey) {
      checkArrayTypes(secretKey);
      // if (secretKey.length !== crypto_sign_SECRETKEYBYTES) {
      // throw new Error('bad secret key size');
      // }
      return deriveUnhashedPublicFromSecret(secretKey);
    };

    exports.convertSecretKey = function(sk, direct) {
      let d = new Uint8Array(64);
      const o = new Uint8Array(32);
      let i;
      if (direct) {
        d = sk.slice(0, 32);
      } else {
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
      }
      for (i = 0; i < 32; i++) o[i] = d[i];
      for (i = 0; i < 64; i++) d[i] = 0;
      return o;
    };

    exports.convertPublicKey = function(pk) {
      // https://github.com/dchest/ed2curve-js/blob/master/ed2curve.js
      const z = new Uint8Array(32);
      const q = [gf(), gf(), gf(), gf()];
      const a = gf(); const b = gf();

      if (unpackneg(q, pk)) return null; // reject invalid key

      const y = q[1];

      A(a, gf1, y);
      Z(b, gf1, y);
      inv25519(b, b);
      M(a, a, b);

      pack25519(z, a);
      return z;
    };

    exports.TryToConvertPublicKeyBack = function(pk) {
  		const z = new Uint8Array(32);
  			const x = gf(); const a = gf(); const b = gf();

  		unpack25519(x, pk);

  		A(a, x, gf1);
  		Z(b, x, gf1);
  		inv25519(a, a);
  		M(a, a, b);

  		pack25519(z, a); // what about last byte of this value??? Sometimes pubKeys not equals... Maybe there is parity-bit lost.

      // https://crypto.stackexchange.com/questions/13077/can-curve25519-keys-be-used-with-ed25519-keys

  		return z;
  	};
    exports.convert_ed25519_to_curve25519_public_key = exports.convertPublicKey;

    exports.convert_curve25519_to_ed25519_public_key = exports.TryToConvertPublicKeyBack;



    exports.sign.keyPair.add = function(a, b) {
      const aUnpacked = new Float64Array(80);
      const bUnpacked = new Float64Array(80);
      unpack25519(aUnpacked, a);
      unpack25519(bUnpacked, b);
      add(aUnpacked, bUnpacked);
      pack(bUnpacked, c);
      const c = new Uint8Array(32);
    };

    exports.sign.keyPair.fromSecretKey = function(secretKey) {
      checkArrayTypes(secretKey);
      if (secretKey.length !== crypto_sign_SECRETKEYBYTES) {
        throw new Error('bad secret key size:' + secretKey.length + ' expected:' + crypto_box_SECRETKEYBYTES);
      }
      let pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      pk = derivePublicFromSecret(secretKey);
      return {
        publicKey: pk,
        secretKey: new Uint8Array(secretKey),
      };
    };

    exports.sign.keyPair.fromSeed = function(seed) {
      checkArrayTypes(seed);
      if (seed.length !== crypto_sign_SEEDBYTES) {
        throw new Error('bad seed size');
      }
      const pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
      const sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
      for (let i = 0; i < 32; i++) {
        sk[i] = seed[i];
      }
      crypto_sign_keypair(pk, sk, true);
      return {
        publicKey: pk,
        secretKey: sk,
      };
    };

    exports.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
    exports.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
    exports.sign.seedLength = crypto_sign_SEEDBYTES;
    exports.sign.signatureLength = crypto_sign_BYTES;

    exports.hash = function(msg) {
      checkArrayTypes(msg);
      const h = new Uint8Array(crypto_hash_BYTES);
      crypto_hash(h, msg, msg.length);
      return h;
    };

    exports.hash.hashLength = crypto_hash_BYTES;

    exports.verify = function(x, y) {
      checkArrayTypes(x, y);
      // Zero length arguments are considered not equal.
      if (x.length === 0 || y.length === 0) {
        return false;
      }
      if (x.length !== y.length) {
        return false;
      }
      return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
    };

    exports.setPRNG = function(fn) {
      randombytes = fn;
    };

    (function() {
      // Initialize PRNG if environment provides CSPRNG.
      // If not, methods calling randombytes will throw.
      let crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
      if (crypto && crypto.getRandomValues) {
        // Browsers.
        const QUOTA = 65536;
        exports.setPRNG(function(x, n) {
          let i; const v = new Uint8Array(n);
          for (i = 0; i < n; i += QUOTA) {
            crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
          }
          for (i = 0; i < n; i++) {
            x[i] = v[i];
          }
          cleanup(v);
        });
      } else if (typeof require !== 'undefined') {
        // Node.js.
        
        if (crypto && crypto.randomBytes) {
          exports.setPRNG(function(x, n) {
            let i; const v = crypto.randomBytes(n);
            for (i = 0; i < n; i++) {
              x[i] = v[i];
            }
            cleanup(v);
          });
        }
      }
    })();

    // STARTED BOTTOM nodejs/browser hack
    return exports;
  })();

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = exports;
  } else {
    window.nacl = exports;
  }
})();
// FINISHED BOTTOM nodejs/browser hack
const prefix = "ban_"
var node = "https://kaliumapi.appditto.com/api"
var pow = "https://pow.nano.to/"
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
uint8ToHex = function (uint8) {
  var hex = "";
  let aux;
  for (let i = 0; i < uint8.length; i++) {
    aux = uint8[i].toString(16).toUpperCase();
    if (aux.length == 1)
      aux = '0' + aux;
    hex += aux;
    aux = '';
  }
  return (hex);
}
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
const publicKey = (acc) => {
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
const privAdr = (privKey) => {
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
const genWork = async (w) => {
  const res = await fetch(pow, {
    method: "POST",
    body: JSON.stringify({
      action:"work_generate",
      hash:w
    }),
    headers: {
    "Content-type":"application/json; charset=UTF-8"
    }
  })
  return res.json()
}
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
  return Big('100000000000000000000000000000').times(Big(r)).toString()
}
const fromRaw = (r) => {
  return Big(r).times(Big('0.00000000000000000000000000001')).toString()
}
const accInfo = async (a) => {
  return await nodeAPI({action:'account_info', account:a})
}
const accHistory = async (a, c="-1", raw, head, offset, filter) => {
  var body = {
    action:"account_history",
    account:a,
    count:c
  }
  if (raw != null) {
    body.raw = raw
  }
  if (head != null) {
    body.head = head
  }
  if (offset != null) {
    body.offset = offset
  }
  if (head != null) {
    body.head = head
  }
  return nodeAPI(body)
}
const pendingBlocks = async (a, c="-1", s=false) => {
  return (await nodeAPI({action:"accounts_pending", accounts:[a], count:c, source:s},))["blocks"][a]
}
const blockInfo = async (hash) => {
  return await nodeAPI({action:"block_info", hash:hash, json_block:true})
}
const blockAcc = async (hash) => {
  return (await nodeAPI({action:"block_account", hash:hash}))["account"]
}
const preamble = "0000000000000000000000000000000000000000000000000000000000000006";
const hashBlock = (block) => {
  const context = blake.blake2bInit(32, null);
  blake.blake2bUpdate(context, hexToUint8(preamble));
  blake.blake2bUpdate(context, hexToUint8(block.account));
  blake.blake2bUpdate(context, hexToUint8(block.previous));
  blake.blake2bUpdate(context, hexToUint8(block.representative));
  blake.blake2bUpdate(context, hexToUint8(block.balance));
  blake.blake2bUpdate(context, hexToUint8(block.link));
  return uint8ToHex(blake.blake2bFinal(context))
}
const withdraw = async (priv, to, amnt, raw=false, rep="ban_1ka1ium4pfue3uxtntqsrib8mumxgazsjf58gidh1xeo5te3whsq8z476goo") => {
  if (!raw) {
    amnt = toRaw(amnt)
  }
  var s = privAdr(priv)
  const info = await nodeAPI({action:"account_info", account:s})
  bal = Big(info["balance"]).minus(amnt).toString()
  let padBal = parseInt(bal).toString(16);
  while (padBal.length < 32) {
    padBal = '0' + padBal;
  }
  if (bal.startsWith("-")) {
    return new Error("insufficient_funds")
  }
  var block = {
    type:"state",
    account:publicKey(s),
    previous:info["frontier"],
    representative:rep,
    balance:padBal,
    link:publicKey(to),
    signature:"",
    work:""
  }
  const signature = signHash(priv, hashBlock(block))
  const work = await genWork(block.previous)
  block.account = s
  block.representative = getAdr(block.representative)
  block.balance = bal
  block.work = work.response.work
  block.signature = signature
  return await nodeAPI({action:"process", json_block:"true", subtype:"send", block:block})
}
const deposit = async (priv) => {
  const s = privAdr(priv)
  const pending = await pendingBlocks(s,"-1", true)
  if (pending == undefined) {
    return "No pending blocks..."
  }
  var hashes = []
  for (i in pending) {
    console.log(pending[i])
  }
}