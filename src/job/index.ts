import { arquivosCelpe } from "./arquivos_celpe";
import { arquivosCoelba } from "./arquivos_coelba";
import { arquivosCosern } from "./arquivos_cosern";
import { arquivosElektro } from "./arquivos_elektro";
import { glpi } from "./glpi";
import { siteCrefaz } from "./site_crefaz";
import { tickets } from "./tickets";
export class CronJobs {
  public run() {
    arquivosElektro.start();
    arquivosCelpe.start();
    arquivosCoelba.start();
    arquivosCosern.start();
    tickets.start();
    glpi.start();
    siteCrefaz.start();
    console.log("✅ Tarefas de monitoramento iniciadas!".green);
  }
}
