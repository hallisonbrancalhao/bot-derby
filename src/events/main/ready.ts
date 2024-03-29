import { client } from "../..";
import { Event } from "../../common/types/Event";

export default new Event({
  name: "ready",
  once: true,
  run() {
    const { commands, buttons, selects, modals } = client;

    console.log("✅ Bot online".green);
    console.log("--------------------------------");
    console.log(`Commands loaded: ${commands.size}`.cyan);
    console.log(`Buttons loaded: ${buttons.size}`.cyan);
    console.log(`Select Menus loaded: ${selects.size}`.cyan);
    console.log(`Modals loaded: ${modals.size}`.cyan);
  },
});
