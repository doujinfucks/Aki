import { readdirRecursive } from "../utils/fsUtils";
import type {Atronic} from "./Atronic";
import { join, relative } from "path";
export class Loader {
  public path: string;

  constructor(public client: Atronic, readonly dir: string) {
    this.path = join(__dirname, dir);
    const files = readdirRecursive(this.path);
    this.exec(files);
  }
  protected exec(files: string[]) {
    throw new Error("Method not implemented.");
  }
}
