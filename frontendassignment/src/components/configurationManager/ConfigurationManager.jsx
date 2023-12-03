// Components
import ConfigurationSummary from '../configurationSummary'
import ConfigurationFilter from '../configurationFilter';
import ConfigurationWorkflow from '../configurationWorkflow';

// styles
import './styles.css';
import { useEffect, useState } from 'react';

function ConfigurationManager() {

  const [workflowHeight, setWorkFlowHeight] = useState(0);
  const [workFlowValues, updateWorkFlowValues] = [{environments: [], features: [], subFeatures: [], category: [], configurations: []}]
  const [filters, setFilters] = useState([])

  useEffect(() => {
    const height = document.getElementById('innerContainer')?.offsetHeight;
    let workFlowHeight = window.innerHeight - height;
    setWorkFlowHeight(workFlowHeight)
  },[])

  return <div className='container '>
    <div id='innerContainer'>
      <h1>Configuration Manager</h1>
      <ConfigurationSummary />
      {/* <ConfigurationFilter /> */}
    </div>
    <div id='workFlow' style={{height: workflowHeight}}>
  <ConfigurationWorkflow />
    </div>
    
  </div>
}

export default ConfigurationManager;
