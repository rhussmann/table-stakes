import * as AWS from "aws-sdk";

import { config } from "../config/config";
import { decryptSecret } from "../util/secrets";

const toEncryptCLI = process.argv[2];
if (!toEncryptCLI) {
  console.error("Error: input parameter requred");
  console.error("");
  console.error("Usage: yarn -s decryptSecret encryptedSecret");
  process.exit(1);
}

const kms = new AWS.KMS({
  region: "us-east-1"
});

(async function(toDecrypt: string) {
  const { encryptedDataKey } = config;
  const decryptResponse = await kms
    .decrypt({
      CiphertextBlob: Buffer.from(encryptedDataKey, "base64")
    })
    .promise();

  const decryptedSecret = decryptSecret(
    toDecrypt,
    decryptResponse.Plaintext as Buffer
  );

  console.log(decryptedSecret);
})(toEncryptCLI);
