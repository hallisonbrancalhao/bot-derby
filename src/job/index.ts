import { tickets } from "./tickets";
import { enel_ce } from "./enel_ce";
export class CronJobs {
  public run() {
    tickets.start();
    enel_ce.start();
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
  }
}
