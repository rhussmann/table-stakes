//  https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb

import * as crypto from "crypto";

const IV_LENGTH = 16; // For AES, this is always 16

export const encryptSecret = (text: string, ENCRYPTION_KEY: Buffer): string => {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decryptSecret = (text: string, ENCRYPTION_KEY: Buffer): string => {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
