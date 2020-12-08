function encodeBase64(StringResolveable: string) {
   return Buffer.from(StringResolveable).toString("base64");
}
function decodeBase64(Base64Resolveable: string) {
   return Buffer.from(Base64Resolveable, "base64").toString();
}

export {
  encodeBase64,
  decodeBase64
}
