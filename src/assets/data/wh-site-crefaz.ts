export const payload = {
  "@type": "MessageCard",
  "@context": "http://schema.org/extensions",
  themeColor: "FF0000",
  title: "Alerta ⚠️",
  text: "**[SITE CREFAZ]** não está acessível. Ação imediata é necessária.",
  sections: [
    {
      text: "Execute o seguinte comando SQL para a correção:\n```SQL\nSET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));\n```",
    },
  ],
  potentialAction: [
    {
      "@type": "OpenUri",
      name: "Ver Site",
      targets: [
        {
          os: "default",
          uri: "https://site.crefaz.com.br",
        },
      ],
    },
  ],
};
