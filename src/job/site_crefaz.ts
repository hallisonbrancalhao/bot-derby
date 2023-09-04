import cron from "node-cron";
import api from "../common/services/config/apiMongoDB";
import axios from "axios";
import { payload } from "../assets/data/wh-site-crefaz";

const websiteUrl = "https://site.crefaz.com.br";

export const siteCrefaz = cron.schedule("*/5 * * * *", async () => {
  try {
    const response = await axios.get(websiteUrl);
    if (response.status !== 200) {
      api.post("/alert-monitoring", {
        content: `⚠️ **Site Crefaz**: Status: ${
          response.status
        } ⚠️ - ${new Date().toLocaleString()}`,
      });
    }
  } catch (error) {
    axios.post(process.env.TEAMS_WEBHOOK as string, payload);

    api.post("/alert-monitoring", {
      content: `@here 🚨 **[SITE CREFAZ]** Fora do ar`,
    });
  }
});
