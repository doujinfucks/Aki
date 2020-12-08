/**
  * This handles loading internal events which are not allowed to be directly accessed by the public.
  * This loads it and then initalizes it with our custom event Handler.
***/
import {Loader} from "../lib";
import { join, relative } from "path";
import { readdirRecursive } from "../utils/fsUtils";
import type { Atronic } from "../lib/Atronic";
import Cache from "../lib/Cache";
import type { InternalEvent } from "../lib/Event";

export default class EventLoader {
  public events: Cache<string, InternalEvent> = new Cache();

  public constructor(public client: Atronic, public readonly dir = "../events") {
    this.loadAll();
  }
  public loadAll() {
    const path = join(__dirname, this.dir);
    const files = readdirRecursive(path);

    for(const file of files) {
      const imported = require(file).default;
      const internalEvent = <InternalEvent>(new imported(this.client));
      this.events.set(internalEvent.listener, imported)
      this.client.eventBinder.addEvent(imported.name);
    };
  }
}
