import React, { useState } from "react";
import styled from "styled-components";
import { Ticket } from "../../store/store.types";
import TicketCard from "../ticketCard/TicketCard";

type Props = {
  tickets: Ticket[];
};

const TicketsList = ({ tickets }: Props) => {
  const [ticketsOnScreen, setTicketsOnScreen] = useState(5);

  return (
    <TicketsListWrapper>
      {tickets.slice(0, ticketsOnScreen).map((ticket) => (
        <TicketCard ticket={ticket} key={`${ticket.price}${ticket.carrier}`} />
      ))}
      <ShowMoreButton onClick={() => setTicketsOnScreen(ticketsOnScreen + 5)}>
        Показать еще 5 билетов!
      </ShowMoreButton>
    </TicketsListWrapper>
  );
};

export default TicketsList;

const TicketsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShowMoreButton = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.mainColorBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.text.mainTextSize};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  color: ${({ theme }) => theme.colors.textWhite};
  text-transform: uppercase;
  cursor: pointer;
  margin-bottom: 50px;
`;
