# Secrets

table-stakes uses AWS KMS to manage secrets.

A customer-managed secret (CMS) is generated using CloudFormation. Once the key is generated, a data-encryption key can be generated. AWS generates both a plaintext (unencrypted) and ciphertext (encrypted) version of the key. The encrypted version of the data-encryption key is stored in the application configuration.

Before storing and managing any secrets, the CMS must be generated within AWS. This key is stored in AWS and is never pulled into the application. The CMS is used only to generate and decrypt the data-dencryption key. Once the CMS is created, you won't need to interact with it.

The data-encryption key is the primary key used within the application. It's used to encrypt and decrypt secrets in the application.

table-stakes uses AES-256 encryption.

## Prerequisites

### Generate the CMS

The CMS is generated with a CloudFormation template in the `/cloudformation/kms.yml` file. To generate the CMS, from the root directory:

* `aws cloudformation create-stack --stack-name kms --template-body file://cloudformation/kms.yml`

You can check the AWS CloudFormation console to check on the status of the key generation. Once this is compete you can generate a data-encryption key.

### Generate the data-encryption key

To generate the data-encryption key:

* `aws kms generate-data-key --key-spec AES_256 --key-id <ARN or CMS key ID>`

This command will return both the plaintext base64-encoded key (this is theunencrypted key), and the Ciphertext base64-encoded encrypted key.

**IMPORTANT**

The plaintext value returned is a master key for the application. DO NOT COOMMIT THIS KEY TO SOURCE CONTROL OR A PUBLIC PLACE.

The ciphertext, however, has been encrypted and is safe to commit to the repo.

### Updating the application configuration

Update the value for `encryptedDataKey` in `src/config/config.ts` to the ciphertext value. Also, update the `cmsKeyId` value in the same value to the ARN returned from generating the data-encryption key.

## Encrypting Secrets

table-stakes provides yarn scripts for encrypting secrets (passwords, API keys), such that these encrypted values can be included in config files and decrypted at runtime. There's also a decryption script for one-off decryption and sanity checking.

### Manually encrypting a secret

Use the process below to encrypt a secret value (such as an external API key). This encrypted value can then safely be stored in a config.

For the example, I'm going to encrypt the string "shhhhhhhhh".

```
╭─rhussmann at rhgalago in ~/Code/table-stakes/backend
╰─± yarn encryptSecret shhhhhhhhh
yarn run v1.21.1
$ ts-node src/scripts/encryptSecret.ts shhhhhhhhh
0966971d2214e8f63a74c2747379b1fa:8c2562ba755152e79104952e99a9ee0f
Done in 4.65s.
```

### Manually decrypting a secret

To decrypt a secret, use the `decryptSecret` yarn script. For the example, I'll be using the secret value generated above.

```
╭─rhussmann at rhgalago in ~/Code/table-stakes/backend
╰─± yarn decryptSecret 0966971d2214e8f63a74c2747379b1fa:8c2562ba755152e79104952e99a9ee0f
yarn run v1.21.1
$ ts-node src/scripts/decryptSecret.ts 0966971d2214e8f63a74c2747379b1fa:8c2562ba755152e79104952e99a9ee0f
shhhhhhhhh
Done in 4.74s.
```
