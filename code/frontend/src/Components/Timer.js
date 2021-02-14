import React from "react";
import Moment from "react-moment";

const Timer = () => {
  return (
    <>
      <Moment format="hh:mm:ss" style={{ margin: "15px" }}>
        {Moment.moment}
      </Moment>
    </>
  );
};

export default Timer;
