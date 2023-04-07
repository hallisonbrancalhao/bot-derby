import { tickets } from "./tickets";

export class CronJobs {
  public run() {
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
    tickets.start();
  }
}
