import { tickets } from "./tickets";
export class CronJobs {
  public run() {
    tickets.start();
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
  }
}
