import { IUser } from "../../types/UserTypes";
import api from "../config/apiMongoDB";

export async function sendData(body: IUser) {
  try {
    const response = await api.post("/users", body);
    return response.status;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserGLPI(discordId: string) {
  try {
    const user = await api.get(`/users/${discordId}`);
    return user.data;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao encontrar usuário vinculado: ");
  }
}
