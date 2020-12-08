import { InternalEvent, Event } from "../lib/Event";
import type { Atronic } from "../lib/Atronic";

export default class Message extends Event implements InternalEvent {
  constructor(public client: Atronic) {
    super(client, "ready");
  }
  public run(message: any) {
    // any main shit. shouldn't even be here lmao
  }
}
