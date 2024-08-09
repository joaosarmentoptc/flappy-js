import { saveSystem } from "./save";
import { goToGame } from "./utils";

export async function makeScoreBox(k, pos, score) {
  await saveSystem.load();
  const oldScore = saveSystem.data.maxScore;
  if (score > oldScore) {
    console.log(`New High Score: ${score}`);
    saveSystem.data.maxScore = score;
    await saveSystem.save();
  }

  const container = k.make([
    k.rect(600, 500),
    k.pos(pos),
    k.color(k.Color.fromHex("#d7f2d7")),
    k.area(),
    k.anchor("center"),
    k.outline(4, k.Color.fromHex("#14638e")),
  ]);

  container.add([
    k.text(`Previous best score: ${oldScore}`),
    k.color(k.Color.fromHex("#14638e")),
    k.area(),
    k.pos(-240, -200),
  ]);
  container.add([
    k.text(`Current score: ${score}`),
    k.color(k.Color.fromHex("#14638e")),
    k.area(),
    k.pos(-240, -150),
  ]);

  const restartBtn = container.add([
    k.rect(200, 50, { radius: 3 }),
    k.color(k.Color.fromHex("#14638e")),
    k.area(),
    k.anchor("center"),
    k.pos(0, 200),
  ]);

  restartBtn.add([
    k.text("Play again", { size: 24 }),
    k.color(k.Color.fromHex("#d7f2f7")),
    k.area(),
    k.anchor("center"),
  ]);

  restartBtn.onClick(() => goToGame(k));
  k.onKeyPress("space", () => goToGame(k));
  k.onGamepadButtonPress("south", () => goToGame(k));

  return container;
}
