import { teste } from "./test";
import { elektro } from "./elektro";

export class CronJobs {
  public run() {
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
    teste.start();
    elektro.start();
  }
}
