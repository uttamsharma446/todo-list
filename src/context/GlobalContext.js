import React, { useReducer } from "react";

export const GlobalContext = React.createContext("dark");
const reducer = (state, action) => {
  switch (action.type) {
    case "dark":
      return { theme: "dark" };
    case "light":
      return { theme: "light" };
    default:
      throw new Error();
  }
};
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { theme: "dark" });
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
