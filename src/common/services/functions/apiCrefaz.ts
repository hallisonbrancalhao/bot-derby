import { Ticket } from "../../types/Ticket";
import apiGlpi from "../config/apiCrefaz";

export async function getAllTickets(username: string) {
  const response = await apiGlpi.get(`?username=${username}`);
  return response.data.tickets;
}

export async function getTicket(number: string) {
  const res = await apiGlpi.get(`?ticket_id=${number}`);
  return res.data.tickets[0];
}
