import { useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { display } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../common/api";
import { GlobalContext } from "../../context/GlobalContext";

export const TodoFooter = ({
  setIsClick,
  totalLeft,
  handleActive,
  handleAll,
  handleCompleted,
  active,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClearCompleted = async () => {
    try {
      const response = await fetch(`${api}/list/complete/clear`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setIsClick((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(isSm);
  return (
    <>
      <div
        className={`${classes.container} ${classes.toggleBackgroundColor} ${classes.toggleColor} `}
      >
        <small>{totalLeft} item(s) left</small>
        {!isSm && (
          <div className={classes.action}>
            <label
              style={{ color: active.all ? "blue" : "" }}
              onClick={handleAll}
            >
              All
            </label>
            <label
              style={{ color: active.active ? "blue" : "" }}
              onClick={handleActive}
            >
              Active
            </label>
            <label
              style={{ color: active.completed ? "blue" : "" }}
              onClick={handleCompleted}
            >
              Completed
            </label>
          </div>
        )}
        <div>
          <label
            className={`${classes.allCompleted} ${classes.hoverToggleColor}`}
            onClick={handleClearCompleted}
          >
            Clear Completed
          </label>
        </div>
      </div>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 10px 0 10px",
    alignItems: "center",
    height: "60px",
  },
  action: {
    "& label": {
      cursor: "pointer",
      transition: "0.5s",

      padding: "0 0 4px 0",
      "&:hover": {},
    },
    flex: "1",
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  allCompleted: {
    cursor: "pointer",
    transition: "0.5s",
  },
  toggleColor: {
    color: theme.color.primary,
  },
  hoverToggleColor: {
    "&:hover": {},
  },
  toggleBackgroundColor: {
    backgroundColor: theme.background.secondary,
  },
}));
