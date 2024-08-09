import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
  exists,
  createDir,
} from "@tauri-apps/api/fs";

function makeSaveSystem(saveFileName) {
  const fullDir = "save";
  saveFileName = `${fullDir}/${saveFileName}`;
  return {
    data: {},
    async save() {
      const dirExists = await exists(fullDir, {
        dir: BaseDirectory.AppLocalData,
      });
      if (!dirExists) {
        await createDir(fullDir, {
          dir: BaseDirectory.AppLocalData,
          recursive: true,
        });
      }
      await writeTextFile(saveFileName, JSON.stringify(this.data), {
        dir: BaseDirectory.AppLocalData,
      });
    },
    async load() {
      try {
        this.data = JSON.parse(
          await readTextFile(saveFileName, { dir: BaseDirectory.AppLocalData })
        );
      } catch {
        this.data = {};
      }
      console.log(`Loaded high score: ${this.data.maxScore}`);
    },
  };
}

export const saveSystem = makeSaveSystem("save.json");
