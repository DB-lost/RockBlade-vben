import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz3/oKOyE4beKfvE0AfqEuuH50Q4gL/xgxk5sC
y5JzLtraUungQKCOsGaA4eQsgvbzD1AEeu2tpUPsth7hBBSZubes8rkAu5rE6NBIBx9vjlGIwghH
jVg9NHd0RDJqVsqBejmQ+D8Mwa8fmSOHsjuW3BidDQxKleBnU/GptCg8xQIDAQAB
-----END PUBLIC KEY-----`;

// 加密方法  公钥
export function RSA256Encrypt(password: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
}
