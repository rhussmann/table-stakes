import * as AWS from "aws-sdk";

import { config } from "../config/config";
import { encryptSecret } from "../util/secrets";

const toEncryptCLI = process.argv[2];
if (!toEncryptCLI) {
  console.error("Error: input parameter requred");
  console.error("");
  console.error("Usage: yarn -s encryptSecret secret");
  process.exit(1);
}

const kms = new AWS.KMS({
  region: "us-east-1"
});

(async function(toEncrypt: string) {
  const { encryptedDataKey } = config;
  const decryptResponse = await kms
    .decrypt({
      CiphertextBlob: Buffer.from(encryptedDataKey, "base64")
    })
    .promise();

  const encryptedSecret = encryptSecret(
    toEncrypt,
    decryptResponse.Plaintext as Buffer
  );

  console.log(encryptedSecret);
})(toEncryptCLI);
