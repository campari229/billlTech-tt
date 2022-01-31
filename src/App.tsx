import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getSearchId, getTickets } from "./store/thunk/thunk";
import { getId } from "./store/reducer";
import logo from "./images/Logo.png";
import TicketsCatalog from "./components/ticketsCatalog/TicketsCatalog";

function App() {
  const dispatch = useDispatch();
  const id = useSelector(getId);

  useEffect(() => {
    if (!id) {
      dispatch(getSearchId());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(getTickets(id));
    }
  }, [dispatch, id]);

  return (
    <AppWrapper>
      <IconHeader>
        <IconImage src={logo} />
      </IconHeader>
      <TicketsCatalog />
    </AppWrapper>
  );
}

export default App;

const IconImage = styled.img`
  width: 80px;
  height: 80px;
`;

const IconHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
  margin-bottom: 18px;
`;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.mainBg};
`;
