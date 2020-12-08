import type { ClientEvents } from "discord.js";
import type { Atronic } from "./Atronic";

export interface AtronicClientEvents extends ClientEvents {
  raw: [any];
}
export interface InternalEvent {
  readonly listener: keyof AtronicClientEvents;
  run(...args: AtronicClientEvents[InternalEvent["listener"]]): any;
}

export class Event implements InternalEvent {
  constructor(
    public client: Atronic,
    public readonly listener: keyof AtronicClientEvents
  ) {}
  run(...args: AtronicClientEvents[InternalEvent["listener"]]): any {}
}
