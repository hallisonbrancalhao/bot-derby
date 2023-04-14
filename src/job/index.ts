import { glpi } from "./glpi";
import { tickets } from "./tickets";
export class CronJobs {
  public run() {
    tickets.start();
    glpi.start();
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
  }
}
