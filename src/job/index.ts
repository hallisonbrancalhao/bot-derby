import { glpi } from "./glpi";
import { siteCrefaz } from "./site_crefaz";
import { tickets } from "./tickets";
export class CronJobs {
  public run() {
    tickets.start();
    glpi.start();
    siteCrefaz.start();
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
  }
}
