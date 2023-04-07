import app from "./app";

export class Server {
  public start() {
    try {
      app.listen(3001, process.env.API_HOST as string, async () => {
        console.log("✅ Backend NODE server started".green);
      });
    } catch (err) {
      console.error("Starting server Error", err);
    }
  }
}
