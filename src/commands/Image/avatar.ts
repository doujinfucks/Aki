import { Atronic } from "../../lib/Atronic";
import { Command } from "../../lib/Command";
import type { Message } from "discord.js";

export default class AvatarCommand extends Command {
  public constructor(client: Atronic) {
    super(client, "avatar", {
      aliases: [],
      description: {
        content: "Get the avatar of you or someone else's",
        usage: "avatar @ or their username",
        examples: ["avatar @Bingbong"],
      },
      args: [{ identifier: "user", match: "single", type: "User" }],
    });
  }

  public async exec({ message: msg }: any): Promise<Message> {
    let text = "";
  //  Object.values(Emojis).forEach((emoji) => {
  //    text += emoji;
  //  });
    return msg.channel.send(text);
  }
}
