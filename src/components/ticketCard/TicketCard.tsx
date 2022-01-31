import React, { useCallback } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Ticket } from "../../store/store.types";
import plural from "plural-ru";

type Props = {
  ticket: Ticket;
};

const TicketCard = ({ ticket }: Props) => {
  const [segmentFrom, segmentTo] = ticket.segments;

  const getFromToTimeString = useCallback(
    (dateString: string, duration: number) => {
      const dateFrom = dayjs(dateString);
      const getNumberWithZero = (number: number) =>
        number > 9 ? String(number) : `0${number}`;
      const fromStr = `${getNumberWithZero(
        dayjs(dateFrom).hour()
      )}:${getNumberWithZero(dayjs(dateFrom).minute())}`;
      const dateTo = dayjs(dateFrom.unix() * 1000 + duration * 60000);
      const toStr = `${getNumberWithZero(
        dayjs(dateTo).hour()
      )}:${getNumberWithZero(dayjs(dateTo).minute())}`;

      return `${fromStr} - ${toStr}`;
    },
    []
  );

  const getDurationFromMinutes = useCallback((duration: number) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}ч ${minutes}м`;
  }, []);

  const getPriceString = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <TicketCardWrapper>
      <TicketCardHeadingWrapper>
        <TicketCardPrice>{getPriceString(ticket.price)} P</TicketCardPrice>
        <TicketIcon src={`//pics.avs.io/99/36/${ticket.carrier}.png`} />
      </TicketCardHeadingWrapper>
      <TicketContentWrapper>
        <TicketTextBlock>
          <TicketSemiText>
            {segmentFrom.origin} - {segmentFrom.destination}
          </TicketSemiText>
          <TicketMainText>
            {getFromToTimeString(segmentFrom.date, segmentFrom.duration)}
          </TicketMainText>
        </TicketTextBlock>
        <TicketTextBlock>
          <TicketSemiText>В ПУТИ</TicketSemiText>
          <TicketMainText>
            {getDurationFromMinutes(segmentFrom.duration)}
          </TicketMainText>
        </TicketTextBlock>
        <TicketTextBlock>
          {segmentFrom.stops.length ? (
            <>
              <TicketSemiText>
                {`${segmentFrom.stops.length} ${plural(
                  segmentFrom.stops.length,
                  "ПЕРЕСАДКА",
                  "ПЕРЕСАДКИ",
                  "ПЕРЕСАДОК"
                )}`}
              </TicketSemiText>
              <TicketMainText>
                {segmentFrom.stops.map((stop) => `${stop}, `)}
              </TicketMainText>
            </>
          ) : (
            <TicketSemiText>БЕЗ ПЕРЕСАДОК</TicketSemiText>
          )}
        </TicketTextBlock>
        <TicketTextBlock>
          <TicketSemiText>
            {segmentTo.origin} - {segmentTo.destination}
          </TicketSemiText>
          <TicketMainText>
            {getFromToTimeString(segmentTo.date, segmentTo.duration)}
          </TicketMainText>
        </TicketTextBlock>
        <TicketTextBlock>
          <TicketSemiText>В ПУТИ</TicketSemiText>
          <TicketMainText>
            {getDurationFromMinutes(segmentTo.duration)}
          </TicketMainText>
        </TicketTextBlock>
        <TicketTextBlock>
          {segmentTo.stops.length ? (
            <>
              <TicketSemiText>
                {`${segmentTo.stops.length} ${plural(
                  segmentTo.stops.length,
                  "ПЕРЕСАДКА",
                  "ПЕРЕСАДКИ",
                  "ПЕРЕСАДОК"
                )}`}
              </TicketSemiText>
              <TicketMainText>
                {segmentTo.stops.map((stop) => `${stop}, `)}
              </TicketMainText>
            </>
          ) : (
            <TicketSemiText>БЕЗ ПЕРЕСАДОК</TicketSemiText>
          )}
        </TicketTextBlock>
      </TicketContentWrapper>
    </TicketCardWrapper>
  );
};

const TicketCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.blocksBg};
  padding: 20px;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 24px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

const TicketCardHeadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const TicketCardPrice = styled.p`
  font-size: ${({ theme }) => theme.text.priceTextSize};
  line-height: ${({ theme }) => theme.text.priceTextSize};
  color: ${({ theme }) => theme.colors.mainColorBlue};
`;

const TicketIcon = styled.img`
  width: 110px;
  height: 36px;
`;

const TicketContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const TicketMainText = styled.p`
  font-size: ${({ theme }) => theme.text.bigTextSize};
  font-weight: 600;
  line-height: 21px;
  color: ${({ theme }) => theme.colors.mainText};
`;

const TicketSemiText = styled.p`
  font-size: ${({ theme }) => theme.text.mainTextSize};
  font-weight: 600;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.colorSemiGray};
`;

const TicketTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export default TicketCard;
