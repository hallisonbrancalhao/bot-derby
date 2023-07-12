import cron from "node-cron";
import api from "../common/services/config/apiMongoDB";
import axios from "axios";

const websiteUrl = "https://chamados.crefaz.com.brr";

export const glpi = cron.schedule("*/1 * * * *", async () => {
  try {
    const response = await axios.get(websiteUrl);
    if (response.status !== 200) {
      api.post("/alert-monitoring", {
        content: `⚠️ **GLPI**: Status: ${
          response.status
        } ⚠️ - ${new Date().toLocaleString()}`,
      });
    }
  } catch (error) {
    api.post("/alert-monitoring", {
      content: `@here 🚨 **GLPI fora do ar**  - 🕗 ${new Date().toLocaleTimeString(
        "pt-BR"
      )} ${error}`,
    });
  }
});
