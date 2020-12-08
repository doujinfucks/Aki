import {Loader} from "../lib";
import { join, relative } from "path";
import { readdirRecursive } from "../utils/fsUtils";
import type {Atronic} from "../lib/Atronic";
import type { Listener } from "../lib";
import Cache from "../lib/Cache";
export default class ListenerLoader {
  public listeners: Cache<string, Listener> = new Cache();

  public constructor(public client: Atronic, public readonly dir = "../listeners") {
    this.loadAll();
  }
  public loadAll() {
    const path = join(__dirname, this.dir);
    const files = readdirRecursive(path);
    for(const file of files) {
      try {
        const imported = require(file).default;
        if(typeof imported != "function") throw `Could not load \"${file}\". Maybe you're not default exporting?`;
        const listener = <Listener>(new imported(this.client));
        console.log(`Listener ${listener.name} is listening to ${listener.listensFor.join()}.`)
        for(const evt of listener.listensFor) {
          this.client.eventBinder.addListener(evt, listener);
        }
      } catch (e) {
         console.log(`Error: ${e}`);
      }
    }
  }
}
