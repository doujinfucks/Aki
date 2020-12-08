import { Loader } from "../lib";
import { join, relative } from "path";
import { readdirRecursive } from "../utils/fsUtils";
import type { Atronic } from "../lib/Atronic";
import { Command } from "../lib/Command";

import Cache from "../lib/Cache";
export default class CommandLoader {
  public commands: Cache<string, Command> = new Cache();
  public categories: CommandCollectorCategory[] = [];

  public constructor(public client: Atronic, public readonly dir = "../commands") {
    this.loadAll();
  }
  public loadAll(): void {
    const path = join(__dirname, "../commands");
    const files = readdirRecursive(path);
    for(const file of files) {
      const load = require(file).default;
      if (!load || !(load.prototype instanceof Command)) continue;
      const command = this.getCommand(file);
      const categoriesForCommand = this.getCategories(file);
      this.registry(command, categoriesForCommand);
    }
  }
  public registry(command: Command, categoriesForCommand: string[]): void {
    this.addToCategory(command, categoriesForCommand);

  // fetch category | print(`${color(this.getCategories(file), "A20092")}`);
  this.commands.set(command.identifier, command);
}
  public getCommand(path: string) {
    const command: Command = new (require(path).default)(this.client);
  //  command.dir = path;
  //  command.loader = this;
    return command;
  }
  public getCategories(path: string): string[] {
    // ok fuck off windows unix bs shit
    const categories =
      process.platform === "win32"
        ? relative(__dirname, path).split("\\")
        : relative(__dirname, path).split("/");
    categories.shift();
    categories.shift();
    categories.pop();
    return categories;
  }
  public getTopCategory(command: Command): string {
    return command.options.category!.split(",")[0];
  }
  public addToCategory(command: Command, categories: string[]): void {
    // first category is the main
    command.options.category = categories.join(",");
    const category: CommandCollectorCategory = this.categories.find(
      (x) => x.type === command.options.category
    ) || {
      type: command.options.category,
      name: categories[0], // change this later ty
      commands: [],
    };
    if (!category.commands.some((x) => x.identifier === command.identifier))
      category.commands.push(command);
    if (!this.categories.some((x) => x.type === command.options.category))
      this.categories.push(category);
  }
}

export interface CommandCollectorCategory {
  type: string;
  subCategories?: string[];
  name: string;
  commands: Command[];
}
