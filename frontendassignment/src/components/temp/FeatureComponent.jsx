import React from "react";
import { Handle } from "react-flow";

const FeatureComponent = ({ feature, onClick }) => {
  return (
    <div onClick={() => onClick(feature)}>
      <Handle type="target" position="top" style={{ background: "#555" }} />
      {feature}
      <Handle type="source" position="bottom" style={{ background: "#555" }} />
    </div>
  );
};

export default FeatureComponent;
