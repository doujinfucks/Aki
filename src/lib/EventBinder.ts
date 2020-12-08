import { Listener } from "./";
import Cache from "./Cache"
import type { Atronic } from "./Atronic";
import { ListenerContext } from "./Context";
import { ClientEvents } from "discord.js";
export default class EventBinder {
  public constructor(public client: Atronic) {}

  public eventStore: Cache<string, Listener[]> = new Cache();
  public addEvent(event: string) {
    this.eventStore.set(event.toLowerCase(), []);
    this.client.addListener(event.toLowerCase(), this.execute.bind(this, event.toLowerCase()))
  }
  public addListener(event: string, listener: Listener) {
    try {
      const evt = this.eventStore.get(event.toLowerCase());
      if(!evt) throw "No event found. Did you add it?"
      evt.push(listener);
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
  public execute(evtName: string, ...args: any) {
    // implicit type so it won't go brbrbrbrbr kys
    const listeners = this.eventStore.get(<string>evtName.toLowerCase());

    // change this please.
    if(!listeners) throw new Error("No listeners for this specified event.");
    for(const listener of listeners) {
      listener.exec({
        evtName: <keyof ClientEvents>evtName,
        args
      });
    }
  }
}
