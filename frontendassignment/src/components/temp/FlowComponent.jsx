import React, { useState, useEffect } from 'react';
import { ReactFlow } from 'react-flow';
import Environment from './Environment';
import FeatureComponent from './FeatureComponent';
import SubfeatureComponent from './SubfeatureComponent';

const FlowComponent = () => {
  const [elements, setElements] = useState([]);
  const [environments, setEnvironments] = useState([{name: 'DEV', id: 123}]);

  const handleEnvironmentClick = async (environment) => {
    // Make API call to get features for the selected environment
    try {
      const features = await fetch(`https://api.example.com/features?environment=${environment}`);
      const featuresData = await features.json();

      const newElements = [
        ...elements,
        { id: environment, type: 'input', data: { label: <Environment environment={environment} onClick={handleFeatureClick} /> }, position: { x: 100, y: 100 } },
        ...featuresData.map((feature, index) => ({
          id: `feature-${index}`,
          type: 'default',
          data: { label: <FeatureComponent feature={feature} onClick={handleSubfeatureClick} /> },
          position: { x: 200, y: 200 + index * 100 },
        })),
      ];
      setElements(newElements);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleFeatureClick = async (feature) => {
    // Make API call to get subfeatures for the selected feature
    try {
      const subfeatures = await fetch(`https://api.example.com/subfeatures?feature=${feature}`);
      const subfeaturesData = await subfeatures.json();

      const newElements = [
        ...elements,
        ...subfeaturesData.map((subfeature, index) => ({
          id: `subfeature-${index}`,
          type: 'output',
          data: { label: <SubfeatureComponent subfeature={subfeature} /> },
          position: { x: 300, y: 300 + index * 100 },
        })),
      ];
      setElements(newElements);
    } catch (error) {
      console.error('Error fetching subfeatures:', error);
    }
  };

  return (
    <div>
      <h2>Select an environment:</h2>
      <div>
      {environments.length > 0 && environments.map((environment) => (
        <Environment key={environment} environment={environment} onClick={handleEnvironmentClick} />
      ))}
      </div>
      <ReactFlow elements={elements} />
    </div>
  );
};

export default FlowComponent;
