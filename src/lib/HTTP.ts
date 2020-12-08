import fetch from "node-fetch";

interface HTTPOptions {
    method: "POST" | "GET";
}

class AtronicHTTPClient {
  // Simple HTTP Request nothing special.
  public async makeHTTPRequest(url: URL, opts: HTTPOptions): Promise<any> {
    return await fetch(url, opts);
  }
  public async hastebin(text: string) {
    //const { body } = await fetch("https://www.hastebin.com/documents", { method: "POST" }).send(text);
  //  return `https://www.hastebin.com/${body.key}`;
  }

}

export {
  HTTPOptions,
  AtronicHTTPClient
};
