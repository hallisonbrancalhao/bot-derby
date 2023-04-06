import { Ticket } from "../../types/Ticket";
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

export async function getTicket(number: string) {
  try {
    const res = await apiGlpi.get(`?ticket_id=${number}`);
    return res.data.tickets[0];
  } catch (err) {
    throw new Error("Nenhum ticket encontrado".red);
  }
}
