declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string;
    HOST: string;
    PORT: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    MONGODB_CONNECT: string;
    URL_API_BACKEND: string;
    URL_API_URL_API_GLPI: string;
  }
}
