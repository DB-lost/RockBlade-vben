import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKVEQpkuxqNxw2tQ6LHn0AwAyUL1vqAI/Czn9FdbKfZYFYnc/M9gtB1DBOgZb6vd9odFhhD0BVvIMNE5dl8EYQc+QiEEEH/NxPPfn8pNHhJhHek107xLQPazinJVOJhoRY/aa6AwNbYnRla88ZUGtZLrOOzECXDpfxMlyX/oOlZQIDAQAB
-----END PUBLIC KEY-----`;

// 加密方法  公钥
export function RSA256Encrypt(password: string) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
}
