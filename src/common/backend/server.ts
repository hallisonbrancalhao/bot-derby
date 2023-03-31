import app from "./app";

export class Server {
  public start() {
    try {
      app.listen(3000, "localhost", async () => {
        console.log("✅ Backend NODE server started".green);
      });
    } catch (err) {
      console.error("Starting server Error", err);
    }
  }
}
