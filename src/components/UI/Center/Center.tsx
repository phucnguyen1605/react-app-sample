import React from "react";
import classes from "./Center.module.css";

function Center(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) {
  return <div className={classes.actions}>{props.children}</div>;
}

export default Center;
