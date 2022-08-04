import React from "react";
import { makeStyles } from "@material-ui/core";
import CN from "classnames";
const Wrapper = ({ children, bgColored, bgInvisible }) => {
  const classes = useStyles();
  return (
    <div
      className={CN({
        [classes.bgColored]: bgColored,
        [classes.bgInvisible]: bgInvisible,
      })}
    >
      {children}
    </div>
  );
};

export default Wrapper;
const useStyles = makeStyles((theme) => ({
  bgColored: {
    padding: "50px 170px",
    backgroundColor: "#fbfbfb",
    [theme.breakpoints.down("md")]: {
      padding: "10px 10px",
    },
  },
  bgInvisible: {
    padding: "0px 170px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 10px",
    },
  },
}));
