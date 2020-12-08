import { Client, Message } from "discord.js";
import CommandLoader from "../loaders/CommandLoader";
import EventLoader from "../loaders/EventLoader";
import ListenerLoader from "../loaders/ListenerLoader";
import EventBinder from "./EventBinder";
import { AtronicHTTPClient } from "./HTTP";

export class Atronic extends Client {
  public commands = new CommandLoader(this, "../commands");
  public eventBinder = new EventBinder(this);
  public events = new EventLoader(this, "../events");
  public customListeners = new ListenerLoader(this, "../listeners");
  public http: AtronicHTTPClient;

  constructor(modules: AtronicClientModules) {
    super();
    this.http = modules.http ?? new AtronicHTTPClient();
    console.log('Client Initialized.')
    process.on('exit', this.onDestroy.bind(this));
    process.on('beforeExit', this.onDestroy.bind(this));
    process.on('SIGINT', this.onDestroy.bind(this));
    process.on('SIGUSR1', this.onDestroy.bind(this));
    process.on('SIGUSR2', this.onDestroy.bind(this));
  }
  onDestroy() {
    console.log('Exiting Client.')
    this.destroy();
  }
}

interface AtronicClientModules {
  http?: AtronicHTTPClient;
}
