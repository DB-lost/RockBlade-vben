import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJid7iQoFSizWWZ95CqqRRI8/qIKvqugDV/0b2
nqloyLTo8CVER0J1e6kX+cgyQpq+OF56mqmOk5UOIoa+UkNvKdaqwxnMwAadWa3yml+hxfSn4h02
7qeaXaAQk8VpG3IRHRBW+hl1g1H9d/v9/QIe8oC6OUxt7WRVs4C3sU+mIQIDAQAB
-----END PUBLIC KEY-----`;

// 加密方法  公钥
export function RSA256Encrypt(password: string): false | string {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
}
