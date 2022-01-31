import { GET_ALL_TICKETS, GET_SEARCH_ID, SORT_TICKETS } from "./actions";

//store types
type TicketSegment = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
};

export type Ticket = {
  price: number;
  carrier: string;
  segments: TicketSegment[];
};

export type InitialStateType = {
  allTickets: Ticket[];
  sortedTickeds: Ticket[];
  searchId: string | null;
};

//action types

export type IdGettingAction = {
  type: typeof GET_SEARCH_ID;
  searchId: string;
};

export type AllTicketsGettingAction = {
  type: typeof GET_ALL_TICKETS;
  tickets: Ticket[];
};

export type SortingAction = {
  type: typeof SORT_TICKETS;
  sortType: "cheap" | "fast";
  transfers: (0 | 1 | 2 | 3)[] | null;
};

export type Action = IdGettingAction | AllTicketsGettingAction | SortingAction;
