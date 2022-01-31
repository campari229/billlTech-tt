import {
  AllTicketsGettingAction,
  IdGettingAction,
  Ticket,
} from "./store.types";

export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GET_SEARCH_ID = "GET_SEARCH_ID";
export const SORT_TICKETS = 'SORT_TICKETS';

export const getSearchIdAction = (searchId: string): IdGettingAction => ({
  type: GET_SEARCH_ID,
  searchId,
});

export const getAllTickets = (tickets: Ticket[]): AllTicketsGettingAction => ({
  type: GET_ALL_TICKETS,
  tickets,
});

export const sortTickets = (sortType: 'cheap' | 'fast' | null, transfers: (0 | 1 | 2 | 3)[] | null) => ({
  type: SORT_TICKETS,
  sortType,
  transfers,
})
