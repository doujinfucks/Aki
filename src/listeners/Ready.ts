import { Listener, Atronic } from "../lib";
import { ListenerContext } from "../lib/Context";
export default class Ready extends Listener {
  constructor(public client: Atronic) {
    super(client, "ReadyListener", ["ready"]);
  }
  public exec() {
    console.log(`${this.client.user!.tag} is now logged in with ${this.client.guilds.cache.size} guilds online.`)
  }
}
