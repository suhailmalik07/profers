import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../../utils/api";
import { debounce } from "../../../utils/debounce";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    width: "100%",
    listStyleType: "none",
    top: "2.2rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    padding: theme.spacing(0, 1),
    zIndex: 1000,
  },
  listItem: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: theme.spacing(0, 1),
    fontSize: "0.8rem",

    "& span": {
      color: "#4db3aa",
    },
    "& p, & span": {
      fontSize: "0.8rem !important",
    },
    "& img": {
      height: "30px",
      marginRight: theme.spacing(1),
    },
  },
}));

const Suggestions = ({ query, clearSearch }) => {
  const history = useHistory();
  const { location } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const searchDebounce = useMemo(() => {
    const search = async (query) => {
      try {
        const { data } = await api.get("/products", {
          params: {
            query,
            location,
            limit: 10,
          },
        });
        setList(data.docs);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    return debounce(search, 1000);
  }, [location]);

  useEffect(() => {
    setLoading(true);
    searchDebounce(query);
  }, [searchDebounce, query]);

  return (
    <ul className={classes.root}>
      {list.map((item) => (
        <li
          onMouseDown={() => {
            history.push(`/productCate/${item._id}`);
            clearSearch();
          }}
          key={item._id}
          className={classes.listItem}
        >
          <img src={item.images[0].location} alt={item.name + ".img"} />
          <Typography color="textSecondary">
            {item.name}{" "}
            <Typography component="span">{item.category}</Typography>
          </Typography>
        </li>
      ))}
      {!loading && list.length === 0 && (
        <li className={classes.listItem}>
          <Typography color="textSecondary">
            Sorry not found any match with {query}
          </Typography>
        </li>
      )}
    </ul>
  );
};

export default Suggestions;
