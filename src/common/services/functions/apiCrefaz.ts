import apiGlpi from "../config/apiCrefaz";

export async function getAllTickets(username: string) {
  try {
    const response = await apiGlpi.get(`?username=${username}`);
    return response.data.tickets;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao buscar tickets");
  }
}
