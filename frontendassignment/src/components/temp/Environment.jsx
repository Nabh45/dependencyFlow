import React from "react";

const Environment = ({ environment, onClick }) => {
  console.log(environment)
  return (
    <div onClick={() => onClick(environment)}>
      {environment.name}
    </div>
  );
};

export default Environment;
