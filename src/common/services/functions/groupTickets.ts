import { Ticket, Tickets } from "../../types/Ticket";

export function groupTickets(tickets: Tickets): { [key: string]: Ticket } {
  return tickets.reduce((grupos: any, ticket: any) => {
    if (grupos[ticket.status]) {
      grupos[ticket.status].push(ticket);
    } else {
      grupos[ticket.status] = [ticket];
    }
    return grupos;
  }, {});
}
