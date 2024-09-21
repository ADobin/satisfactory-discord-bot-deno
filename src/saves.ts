import { join, resolve } from "jsr:@std/path";
import {} from "jsr:@std/io";

const savePath = resolve(Deno.env.get("SAVE_PATH") || "/saves");

function listSaves() {
  return Deno.readDir(savePath);
}

export async function getLatestSave() {
  const saves = listSaves();
  let latestSave = null;

  for await (const save of saves) {
    if (save.isDirectory) {
      continue;
    }

    const path = join(savePath, save.name);
    const stat = await Deno.stat(path);

    if (latestSave === null || stat.mtime! > latestSave.stat.mtime!) {
      latestSave = { path, stat, name: save.name };
    }
  }

  return latestSave;
}
