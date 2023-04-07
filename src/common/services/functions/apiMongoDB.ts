import { IUser } from "../../types/UserTypes";
import api from "../config/apiMongoDB";

export async function sendData(body: IUser) {
  try {
    const response = await api.post("/users", body);
    return response.status;
  } catch (err) {
    console.error("Erro ao criar usuário".red);
  }
}

export async function getUserGLPI(discordId: string) {
  const user = await api.get(`/users/${discordId}`);
  return user.data;
  try {
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao encontrar usuário vinculado: ");
  }
}

export async function getAllUsers() {
  try {
    const users = api.get("/users");
    return users;
  } catch (error) {
    throw new Error("Erro ao encontrar usuários".red);
  }
}
