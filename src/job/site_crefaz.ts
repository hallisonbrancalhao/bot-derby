import cron from "node-cron";
import api from "../common/services/config/apiMongoDB";
import axios from "axios";

const websiteUrl = "https://site.crefaz.com.br";

export const siteCrefaz = cron.schedule("*/1 * * * *", async () => {
  try {
    const response = await axios.get(websiteUrl);
    if (response.status !== 200) {
      api.post("/alert-monitoring", {
        content: `🚨 Site Crefaz fora do ar`,
      });
    }
  } catch (error) {
    api.post("/alert-monitoring", {
      content: `🚨 @everyone - Site Crefaz fora do ar 🚨`,
    });
  }
});
