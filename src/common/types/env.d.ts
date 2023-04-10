declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    API_HOST: string;
    BOT_TOKEN: string;
    BOT_WEBHOOK: string;
    WEBHOOK_ALERT: string;
    HOST: string;
    PORT: string;
    USER: string;
    PASSWORD: string;
    DATABASE: string;
    MONGODB_CONNECT: string;
    URL_API_BACKEND: string;
    URL_API_URL_API_GLPI: string;
    TEST_FTP_IP: string;
    TEST_FTP_HOST: string;
    TEST_FTP_USER: string;
    TEST_FTP_PASSWORD: string;
  }
}
