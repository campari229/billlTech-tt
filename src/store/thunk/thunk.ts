import { Dispatch } from "react";
import { getAllTickets, getSearchIdAction } from "../actions";
import { Action, Ticket } from "../store.types";
import { getTicketReqwestURL, searchIdURL } from "./thunk.const";

export const getSearchId = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await fetch(searchIdURL);
      const result = await response.json();

      dispatch(getSearchIdAction(result.searchId));
    } catch (error) {
      throw error;
    }
  };
};

export const getTickets = (searchId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    let preperedTickets: Ticket[] = [];
    const loadTickets = async () => {
      try {
        const response = await fetch(getTicketReqwestURL(searchId));
        if (response.status === 500 && response.type === "cors") {
          loadTickets();
          return;
        }
        const result = await response.json();

        preperedTickets = [...preperedTickets, ...result.tickets];

        if (!result.stop) {
          loadTickets();
        } else {
          dispatch(getAllTickets(preperedTickets));
        }
      } catch (error) {
        throw error;
      }
    };

    loadTickets();
  };
};
