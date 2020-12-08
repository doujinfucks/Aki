import { InternalEvent, Event } from "../lib/Event";
import type { Atronic } from "../lib/Atronic";

export default class Ready extends Event implements InternalEvent {
  constructor(public client: Atronic) {
    super(client, "ready");
  }
  public run() {
    // any main shit. shouldn't even be here lmao
  }
}
