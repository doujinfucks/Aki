import { Structures, Client } from "discord.js";

class AtronicGuild extends Structure.get("Guild") {
  public constructor(client: Client, data: any) {
    super(client, data);
 }
}
declare module "discord.js" {
  export interface Guild {
  }
}

Structures.extend("Guild", () => AtronicGuild);
