import crypto from "node:crypto";

export const jwt = {
  sign : function (payload, secret, options) {
    if (!options?.algorithm) options.algorithm = "SHA256";
    payload.expires = Math.round(Date.now() / 1000) + options.expiresIn;
    payload.iat = Math.round(Date.now() / 1000);
    // console.log(payload.expires, payload.iat);

    //now we write code for manually generating jwt token.
    const algoToken = Buffer.from(JSON.stringify({
      alg: options.algorithm,
      typ : "JWT"
    })).toString("base64url");

    const payloadToken = Buffer.from(JSON.stringify(payload)).toString(
      "base64url"
    );

    // now we sign token.
    const signature = crypto
      .createHmac(options.algorithm, secret)
      .update(`${algoToken}.${payloadToken}`)
      .update(`${payloadToken}.${algoToken}`)
      .digest("base64url");

    return `${algoToken}.${payloadToken}.${signature}`;
  },

  verify : function(token, secret){
    const [algo,payload, signature] = token.split(".")
    const algoData = JSON.parse(Buffer.from(algo, 'base64url').toString('utf-8'));
    const payloadData = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    //first we check token is valid or not.
    const signatureVerify = crypto.createHmac(algoData.alg, secret)
    .update(`${algo}.${payload}`)
    .update(`${payload}.${algo}`)
    .digest("base64url");

    if(signature !== signatureVerify){
      throw new Error("Invalid Token");
      return;
    }
    // console.log(payloadData);
    // code for check token expiry.
    if(payloadData.expires < Math.round(Date.now() / 1000)) {
      throw new Error("Token Expired");
      return;
    }

    return payloadData;
  },

  decode : function(token){
    const [algo,payload, signature] = token.split(".")
  
    const payloadData = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    return payloadData;
  }
};

