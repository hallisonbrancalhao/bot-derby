import { IUser } from "../types/UserTypes";

export const postData = async (url: string, data: IUser) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log("CRIADO COM SUCESSO", res);
  } catch (error) {
    console.error("DEU ERRO", error);
  }
};

export async function sendData(body: IUser) {
  console.log("envindo dados");

  await postData(process.env.URL_API_BACKEND as string, body);
}
