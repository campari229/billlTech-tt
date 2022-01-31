import { Action, InitialStateType, Ticket } from "./store.types";
import { GET_ALL_TICKETS, GET_SEARCH_ID, SORT_TICKETS } from "./actions";

const InitialState: InitialStateType = {
  allTickets: [],
  sortedTickeds: [],
  searchId: null,
};

export const getId = (store: InitialStateType) => store.searchId;
export const getTicketsList = (store: InitialStateType) => store.sortedTickeds;

export const rootReducer = (
  store: InitialStateType = InitialState,
  action: Action
): InitialStateType => {
  switch (action.type) {
    case GET_SEARCH_ID:
      return {
        ...store,
        searchId: action.searchId,
      };

    case GET_ALL_TICKETS:
      return {
        ...store,
        allTickets: [...store.allTickets, ...action.tickets],
        sortedTickeds: [...store.allTickets, ...action.tickets],
      };

    case SORT_TICKETS:
      let sortedTickets: Ticket[] = store.allTickets;
      if (action.transfers === null) {
        sortedTickets = store.allTickets;
      } else {
        sortedTickets = sortedTickets.filter((ticket) => {
          return action.transfers?.some((transfer) => {
            const ticketTransferFrom = ticket.segments[0].stops.length;
            const ticketTransferTo = ticket.segments[1].stops.length;
            return (
              transfer === ticketTransferFrom || transfer === ticketTransferTo
            );
          });
        });
      }

      if (action.sortType === "cheap") {
        sortedTickets = sortedTickets.sort((a, b) => a.price - b.price);
      } else if (action.sortType === "fast") {
        sortedTickets = sortedTickets.sort((a, b) => {
          const [fromA, toA] = a.segments;
          const aDuration = fromA.duration + toA.duration;
          const [fromB, toB] = b.segments;
          const bDuration = fromB.duration + toB.duration;

          return aDuration - bDuration;
        });
      }
      return {
        ...store,
        sortedTickeds: sortedTickets,
      };

    default:
      return store;
  }
};
