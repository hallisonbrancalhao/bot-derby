declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    HOST: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    MONGODB_CONNECT: string;
  }
}
