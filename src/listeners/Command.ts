import { Listener, Atronic } from "../lib";
import { ListenerContext } from "../lib/Context";
import { Message, ClientEvents } from "discord.js";
import { Command } from "../lib/Command";

export default class CommandListener extends Listener {
  constructor(public client: Atronic) {
    super(client, "CommandListener", ["message"]);
  }
  public exec({ evtName, args }: ListenerContext) {
    const shit = <ClientEvents[evtName]>(<unknown>args);
    const [message]: [Message] = args;
    console.log(message.channel.id);
  }
}
