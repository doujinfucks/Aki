import type { Atronic } from "./Atronic";
import { PermissionString, Message } from "discord.js";

class Command {
  public readonly dir = __dirname;
  public constructor(public client: Atronic, public identifier: string, public options: CommandOptions)  {}
}

interface CommandOptions {
  description: {
    content: string;
    usage: string;
    examples: string[];
    additionalInfo?: string[];
  },
  permissions?: {
    client?: PermissionString[];
    user?: PermissionString[];
  };
  /**
    * @ignore This is set at runtime.
    */
  category?: string;
  aliases: string[];
  cooldown?: number;
  disable?: boolean;
  devOnly?: boolean;
  nsfw?: boolean;
  args?: Argument[];
}
export type TypeFunction = (msg: Message, input: string) => unknown;

/**
 * @param content - The argument that is supplied.
 */
export type ArgumentTypeFunction = (msg: Message, content: string) => unknown;

export interface Argument {
  /**
   * The Property you want it to be named
   */
  identifier: string;
  /**
   * @param rest - matches rest of the arguments (keep this at the end if u want to take everything else.)
   * @param single - single argument
   * @param multiple - multiple arguments
   * @param flag - `--flag`
   */
  match: "rest" | "single" | "multiple" | "flag";
  type?: ArgumentTypeFunction | string;
  optional?: boolean;
  flag?: string;
  default?: ((msg: Message) => any) | any;
  prompt?: ((msg: Message) => string) | string;
}
export {
  Command,
  CommandOptions
};
