export const searchIdURL = "https://front-test.beta.aviasales.ru/search";

export const getTicketReqwestURL = (searchId: string) =>
  `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`;
