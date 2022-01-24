import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";
import React, { useContext, useState } from "react";
import { api } from "../../common/api";
import { GlobalContext } from "../../context/GlobalContext";

export const CreateTodo = ({
  className,
  setData,
  data,
  setIsClick,
  isAllCompleted,
}) => {
  const [item, setItem] = useState("");
  const handleChange = (e) => {
    setItem(e.target.value);
  };
  const {
    state: { theme },
  } = useContext(GlobalContext);
  const classes = useStyles({ theme });

  const addItem = async (value) => {
    try {
      const data = {
        value: value,
      };

      const response = await fetch(`${api}/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setIsClick((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    addItem(item);
    e.preventDefault();
    setItem("");
    console.log(data);
  };

  console.log(data);
  const handleAllComplete = async () => {
    if (isAllCompleted) {
      try {
        const response = await fetch(`${api}/list/complete/all`, {
          method: "put",
        });
        if (response.ok) {
          const data = await response.json();
          setIsClick((prev) => !prev);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(`${api}/list/incomplete/all`, {
          method: "put",
        });
        if (response.ok) {
          const data = await response.json();
          setIsClick((prev) => !prev);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className={className}>
      <form className={classes.form} action="" onSubmit={handleSubmit}>
        <span
          onClick={handleAllComplete}
          style={{
            backgroundColor: !isAllCompleted && data.length > 0 ? "blue" : "",
          }}
        >
          {!isAllCompleted && data.length > 0 && (
            <img src="/images/icon-check.svg" alt="" />
          )}
        </span>
        <input
          className={classes.input}
          type="text"
          name="item"
          placeholder="Create a new todo..."
          value={item}
          onChange={handleChange}
        />
        <button type="submit" style={{ display: "none" }}></button>
      </form>
    </div>
  );
};
const useStyles = makeStyles((theme) => ({
  form: {
    position: "relative",
    width: "100%",

    "& span": {
      position: "absolute",
      width: " 20px",
      height: "20px",
      border: `1px solid ${theme.color.border}`,
      borderRadius: "50%",
      left: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      top: "19px",

      cursor: "pointer",
    },
  },
  input: {
    width: "100%",
    height: "60px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: `1px solid ${theme.color.border2}`,
    backgroundColor: theme.background.secondary,
    paddingLeft: "40px",
    color: theme.color.primary,
    "&:focus": {
      outline: "none",
    },
  },
}));
