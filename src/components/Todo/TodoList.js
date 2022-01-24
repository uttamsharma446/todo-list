import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { api } from "../../common/api";
import { GlobalContext } from "../../context/GlobalContext";

export const TodoList = ({
  className,
  data,
  setData,
  handleComplete,
  setIsClick,
  isLoading,
}) => {
  const {
    state: { theme },
  } = useContext(GlobalContext);
  const classes = useStyles({ theme: theme });
  const [dragId, setDragId] = useState();
  const [isDragOver, setIsDragOver] = useState(0);
  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`${api}/list/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const result = await res.json();
        console.log(result);
        setIsClick((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleDragStart = (e, id) => {
    setDragId(id);
  };
  const handleClick = (e) => {
    console.log(e);
  };

  const handleDrop = async (e, dropId) => {
    if (dragId && dragId) {
      try {
        const body = {
          dragId: dragId,
          dropId: dropId,
        };
        const response = await fetch(`${api}/list/dnd/reorder`, {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          setIsClick((prev) => !prev);
          setIsDragOver(null);
          setDragId(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={`${classes.container} ${className}`}>
      <ul>
        {data.map((data, index) => {
          return (
            <li
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(data._id);
              }}
              style={{
                backgroundColor:
                  isDragOver === data._id && dragId !== data._id
                    ? "hsl(233, 11%, 84%)"
                    : theme === "dark"
                    ? "hsl(235, 24%, 19%)"
                    : "hsl(0, 0%, 98%)",
                opacity: dragId === data._id ? "0.5" : "1",
                boxShadow: "",
              }}
              draggable
              onDrop={(e) => {
                handleDrop(e, data._id);
              }}
              onDragStart={(e) => {
                handleDragStart(e, data._id);
              }}
              onDragEnd={() => {
                setDragId(null);
                setIsDragOver(null);
              }}
              key={index}
            >
              <span
                onClick={() => handleComplete(data._id)}
                style={{
                  backgroundColor: `${
                    data.completedStatus === true ? "blue" : ""
                  }`,
                }}
              >
                {data.completedStatus ? (
                  <img src="/images/icon-check.svg" alt="" />
                ) : null}
              </span>
              <p
                style={{
                  textDecoration: `${
                    data.completedStatus === true ? "line-through" : ""
                  }`,
                  color: `${
                    data.completedStatus === true ? "hsl(234, 39%, 85%)" : ""
                  }`,
                }}
              >
                {data.value.length > 80
                  ? data.value.slice(0, 80).concat("...")
                  : data.value}
              </p>
              <img
                className={classes.crossIcon}
                onClick={() => handleDeleteItem(data._id)}
                src="/images/icon-cross.svg"
                alt=""
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: "400px",
    overflowX: "auto",
    scrollbarWidth: "5px",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "300px",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px #D3DEDC",
      // backgroundCcolor: "#F5F5F5",
    },
    "&::-webkit-scrollbar": {
      width: "4px",
      backgroundColor: "#D3E4CD",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: " rgba(0,0,0,0.3)",
    },
    "& ul": {
      "& li": {
        listStyle: "none",
        width: "100%",
        height: "60px",
        borderBottom: "1px solid hsl(234, 39%, 85%)",
        display: "flex",
        alignItems: "center",
        padding: "0 10px 0 10px",

        transition: "1s",
        "&:hover $crossIcon": {
          opacity: "1",
        },
        "& p": {
          flex: "1",
          padding: "0 0 0 10px",

          color: theme.color.primary,
        },
        "& span": {
          border: `1px solid ${theme.color.border}`,
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        },
      },
    },
  },
  crossIcon: {
    opacity: "0",
    transition: "1s",
    cursor: "pointer",
  },
  dragging: {
    opacity: "0.5",
  },
}));
