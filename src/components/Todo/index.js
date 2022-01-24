import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { TodoHeader } from "./TodoHeader";
import { CreateTodo } from "./CreateTodo";
import { TodoList } from "./TodoList";
import { borderTop } from "@mui/system";
import { TodoFooter } from "./TodoFooter";
import { api } from "../../common/api";
import { GlobalContext } from "../../context/GlobalContext";
import { useMediaQuery, useTheme } from "@mui/material";
const Todo = () => {
  const classes = useStyles();
  const [isClick, setIsClick] = useState(false);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [active, setActive] = useState({
    all: true,
    active: false,
    completed: false,
  });
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalLeft, setTotalLeft] = useState(0);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const getLists = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${api}/list`, {
        method: "get",
      });
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setOriginalData(data);
        const d = data.filter((d) => d.completedStatus === false);
        setTotalLeft(d.length);
        setIsLoading(false);

        setIsAllCompleted(data.some((d) => d.completedStatus === false));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    getLists();
    console.log(isAllCompleted);
  }, [isClick]);
  const handleComplete = async (id) => {
    try {
      const res = await fetch(`${api}/list/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setIsClick((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleCompleted = () => {
    let newData = originalData.filter((d) => d.completedStatus === true);
    setData(newData);
    setActive((prev) => {
      return {
        all: false,
        active: false,
        completed: true,
      };
    });
  };
  const handleAll = () => {
    setData(originalData);
    setActive((prev) => {
      return {
        all: true,
        active: false,
        completed: false,
      };
    });
  };
  const handleActive = () => {
    let newData = originalData.filter((d) => d.completedStatus === false);
    setData(newData);
    setActive((prev) => {
      return {
        all: false,
        active: true,
        completed: false,
      };
    });
  };
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <TodoHeader />
        <CreateTodo
          setIsClick={setIsClick}
          data={data}
          isAllCompleted={isAllCompleted}
          setData={setData}
          className={classes.addItem}
        />

        <div className={classes.content}>
          <TodoList
            isLoading={isLoading}
            setIsClick={setIsClick}
            handleComplete={handleComplete}
            data={data}
            setData={setData}
            className={classes.listItem}
          ></TodoList>
          <TodoFooter
            handleActive={handleActive}
            handleCompleted={handleCompleted}
            handleAll={handleAll}
            totalLeft={totalLeft}
            setIsClick={setIsClick}
            active={active}
            data={data}
            className={classes.todoFooter}
          />
        </div>
      </div>
      {isSm && (
        <div className={classes.smallScreen}>
          <div className={`${classes.action} `}>
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
        </div>
      )}
      {data.length > 1 && !isSm && (
        <div className={classes.footerLabel}>
          <label htmlFor="">Drag and Drop to reorder list</label>
        </div>
      )}
    </div>
  );
};
export default Todo;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    color: "hsl(234, 39%, 85%)",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    background: `${theme.background.primary} ${theme.hero} center top / contain no-repeat `,
    [theme.breakpoints.down("sm")]: {
      background: `${theme.background.primary} url(${theme.hero2}) center top / contain no-repeat `,
      padding: "20px",
    },
  },
  content: {
    marginTop: "20px",
    border: `1px solid ${theme.color.border2}`,
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  main: {
    maxWidth: "600px",
    width: "100%",
    padding: "40px 0 0 0",

    [theme.breakpoints.down("sm")]: {
      padding: "10px 0 0 0",
    },
  },
  addItem: {
    margin: "40px 0 0 0",
    [theme.breakpoints.down("sm")]: {
      margin: "20px 0 0 0",
    },
  },
  smallScreen: {
    margin: "5px 0 0 0",
    height: "60px",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.color.border2}`,

    backgroundColor: theme.background.secondary,
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
  footerLabel: {
    display: "flex",
    justifyContent: "center",
    padding: "30px 0",
    "& label": {
      color: theme.color.primary,
      fontSize: "0.8rem",
      opacity: "0.5",
    },
  },
}));
