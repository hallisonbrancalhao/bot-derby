import cron from "node-cron";
import api from "../common/services/config/apiMongoDB";
import axios from "axios";

const websiteUrl = "https://chamados.crefaz.com.br";

export const glpi = cron.schedule("*/1 * * * *", async () => {
  try {
    const response = await axios.get(websiteUrl);
    if (response.status === 200) {
    } else {
      api.post("/alert-monitoring", {
        content: `🚨 @everyone **GLPI** está fora do ar.`,
      });
    }
  } catch (error) {
    console.error(error);
  }
});
