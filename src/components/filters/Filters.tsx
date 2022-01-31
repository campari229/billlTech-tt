import React from "react";
import Checkbox from "../checkbox/checkbox";
import styled from "styled-components";

type Props = {
  handler: (transfer: 0 | 1 | 2 | 3 | null, add: boolean) => void;
  transfers: (0 | 1 | 2 | 3)[] | null;
};

const Filters = ({ handler, transfers }: Props) => {
  return (
    <FiltersWrapper>
      <FiltersHeading>Количество пересадок</FiltersHeading>
      <Checkbox
        labelText="Все"
        name="all"
        checked={transfers === null}
        handler={handler}
      />
      <Checkbox
        labelText="Без пересадок"
        name="0"
        checked={transfers?.includes(0)}
        handler={handler}
      />
      <Checkbox
        labelText="1 пересадка"
        name="1"
        checked={transfers?.includes(1)}
        handler={handler}
      />
      <Checkbox
        labelText="2 пересадки"
        name="2"
        checked={transfers?.includes(2)}
        handler={handler}
      />
      <Checkbox
        labelText="3 пересадки"
        name="3"
        checked={transfers?.includes(3)}
        handler={handler}
      />
    </FiltersWrapper>
  );
};

export default Filters;

const FiltersWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  background-color: ${({ theme }) => theme.colors.blocksBg};
  overflow: hidden;
`;

const FiltersHeading = styled.p`
  font-size: ${({ theme }) => theme.text.mainTextSize};
  font-weight: 600;
  line-height: 12px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mainText};
  margin-bottom: 20px;
  margin-left: 20px;
`;
