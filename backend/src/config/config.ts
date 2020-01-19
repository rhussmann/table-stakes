export interface Config {
  cmkId: string;
  encryptedDataKey: string;
}

export const config: Config = {
  cmkId:
    "arn:aws:kms:us-east-1:330560821579:key/12863ea7-0bfb-4014-8d36-1a2c39505bb6",
  encryptedDataKey:
    "AQIDAHjwrSMKicHwwIfFboo1WM76p+us0YuB0n2MIrqWcMZcfAH9LKJYf4us4rY70hZYpacAAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMC1H2Qayonah7nTYPAgEQgDuq4sHn5gzYCbfbtJMlDCBVNMYF35v9B0Uu5m2HN74SF6NAHXml6iAfHIiQk46Swtyt6HTMoWauyaCO9Q=="
};
