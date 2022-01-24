import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { GlobalContext } from "../../context/GlobalContext";
export const TodoHeader = () => {
  const {
    state: { theme },
    dispatch,
  } = useContext(GlobalContext);
  const classes = useStayles();
  const handleThemeMode = () => {
    if (theme === "dark") {
      dispatch({ type: "light" });
    }
    if (theme === "light") {
      dispatch({ type: "dark" });
    }
  };

  return (
    <div className={classes.container}>
      <h1>T O D O</h1>
      <img
        style={{ cursor: "pointer" }}
        onClick={handleThemeMode}
        src={
          theme === "dark" ? "/images/icon-sun.svg" : "/images/icon-moon.svg"
        }
        width="30"
        alt=""
      />
    </div>
  );
};
const useStayles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    "& h1": {
      fontWeight: "bold",
      color: "#fff",
    },
  },
}));
