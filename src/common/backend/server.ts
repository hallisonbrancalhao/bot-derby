import app from "./app";

export class Server {
  public start() {
    try {
      const port = process.env.PORT || 3000;
      const host = process.env.API_HOST || "localhost";

      app.listen(port as number, host, async () => {
        console.log(`✅ Backend NODE server started at ${host}:${port}`.green);
      });
    } catch (err) {
      console.error("Starting server Error", err);
    }
  }
}
