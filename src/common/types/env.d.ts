declare namespace NodeJS {
  interface ProcessEnv {
    SFTP_HOST: string;
    SFTP_USER: string;
    SFTP_PASSWORD: string;
    SFTP_PORT: number;

    PORT: number;
    API_HOST: string;
    BOT_TOKEN: string;
    GPT_API_TOKEN: string;
    GPT_ORG: string;
    BOT_WEBHOOK: string;
    WEBHOOK_ALERT: string;
    WEBHOOK_ALERT_MONITORAMENTO: string;
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

    PROTOCO_ENEL_CE: string;
    HOST_ENEL_CE: string;
    USER_ENEL_CE: string;
    PASSWORD_ENEL_CE: string;
    PROTOCO_ENEL_RJ: string;
    HOST_ENEL_RJ: string;
    USER_ENEL_RJ: string;
    PASSWORD_ENEL_RJ: string;
    PROTOCO_ENEL_SP: string;
    HOST_ENEL_SP: string;
    USER_ENEL_SP: string;
    PASSWORD_ENEL_SP: string;
    PROTOCO_CPFL: string;
    HOST_CPFL: string;
    USER_CPFL: string;
    PASSWORD_CPFL: string;
    PROTOCO_CELPE_OLD: string;
    HOST_CELPE_OLD: string;
    USER_CELPE_OLD: string;
    PASSWORD_CELPE_OLD: string;
    PROTOCO_COELBA_OLD: string;
    HOST_COELBA_OLD: string;
    USER_COELBA_OLD: string;
    PASSWORD_COELBA_OLD: string;
    PROTOCO_COSERN_OLD: string;
    HOST_COSERN_OLD: string;
    USER_COSERN_OLD: string;
    PASSWORD_COSERN_OLD: string;
    PROTOCO_CELPE: string;
    HOST_CELPE: string;
    USER_CELPE: string;
    PASSWORD_CELPE: string;
    PROTOCO_COELBA: string;
    HOST_COELBA: string;
    USER_COELBA: string;
    PASSWORD_COELBA: string;
    PROTOCO_COSERN: string;
    HOST_COSERN: string;
    USER_COSERN: string;
    PASSWORD_COSERN: string;
    PROTOCO_ELEKTRO: string;
    HOST_ELEKTRO: string;
    USER_ELEKTRO: string;
    PASSWORD_ELEKTRO: string;

    TEAMS_WEBHOOK: string;
  }
}
