import { ClientEvents, Message } from "discord.js";
import { AtronicClientEvents } from "./Event";
interface ListenerContext {
  evtName: keyof ClientEvents;
  args: AtronicClientEvents[this["evtName"]][];
}

interface CommandContext {
  command: string;
  message: Message;
  arguments: string[]; // change please.
}

export { ListenerContext, CommandContext };
