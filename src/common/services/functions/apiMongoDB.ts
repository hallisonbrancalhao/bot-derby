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
}

export async function getAllUsers() {
  const users = api.get("/users");
  return users;
}
