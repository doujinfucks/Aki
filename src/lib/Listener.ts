import type { Atronic } from "./Atronic";
import { AtronicClientEvents, InternalEvent } from "./Event";
import { ClientEvents } from "discord.js";
import { ListenerContext } from "./Context"
export class Listener {
  constructor(public client: Atronic, public name: string, public listensFor: (keyof ClientEvents)[]) {
  }
//  public exec(evtName: keyof ClientEvents, ...args: any) {
  public exec(ctx: ListenerContext) {
    throw new Error("Method not implemented.");
  }
}
