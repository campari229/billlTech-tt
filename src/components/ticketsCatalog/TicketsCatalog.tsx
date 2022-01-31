import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { sortTickets } from "../../store/actions";
import { getTicketsList } from "../../store/reducer";
import Filters from "../filters/Filters";
import SortingBar from "../sortingBar/SortingBar";
import TicketsList from "../ticketsList/TicketsList";

export type SortingState = {
  sorting: "cheap" | "fast" | null;
  transfers: (0 | 1 | 2 | 3)[] | null;
};

const TicketsCatalog = () => {
  const tickets = useSelector(getTicketsList);
  const dispatch = useDispatch();
  const [sortingState, setSortingState] = useState<SortingState>({
    sorting: null,
    transfers: null,
  });

  const setSorting = (sortType: "cheap" | "fast") => {
    setSortingState({
      ...sortingState,
      sorting: sortType,
    });
    dispatch(sortTickets(sortType, sortingState.transfers));
  };

  const setTransfersFilter = (transfer: 0 | 1 | 2 | 3 | null, add: boolean) => {
    let transfersArr: (0 | 1 | 2 | 3)[] | null = sortingState.transfers;
    if (transfer !== null) {
      if (add) {
        transfersArr = [...(transfersArr || []), transfer];
      } else {
        transfersArr = transfersArr
          ? transfersArr.filter((transferFilter) => transferFilter !== transfer)
          : [];
      }
    } else {
      transfersArr = null;
    }

    if (!transfersArr?.length) {
        transfersArr = null;
    }
    
    setSortingState({
      ...sortingState,
      transfers: transfersArr,
    });
    dispatch(sortTickets(sortingState.sorting, transfersArr));
  };

  return (
    <Container>
      <TicketsCatalogSide>
        <Filters
          handler={setTransfersFilter}
          transfers={sortingState.transfers}
        />
      </TicketsCatalogSide>
      <TicketsCatalogContent>
        <SortingBar sortType={sortingState.sorting} handler={setSorting} />
        {Boolean(tickets.length) && <TicketsList tickets={tickets} />}
      </TicketsCatalogContent>
    </Container>
  );
};

const TicketsCatalogContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TicketsCatalogSide = styled.div`
  min-width: 232px;
  margin-right: 20px;
`;

const Container = styled.div`
  width: 78%;
  min-width: 754px;
  margin: 0 auto;
  display: flex;
`;

export default TicketsCatalog;
