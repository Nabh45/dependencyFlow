import { useEffect, useState } from 'react';
import{ useNodesState, useEdgesState } from 'reactflow';

// Components
import ConfigurationSummary from '../configurationSummary'
import ConfigurationWorkflow from '../configurationWorkflow';
import ConfigurationHeadings from '../configurationHeadings';


// styles
import './styles.css';

function ConfigurationManager() {

  const [workflowHeight, setWorkFlowHeight] = useState(0);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const height = document.getElementById('innerContainer')?.offsetHeight;
    let workFlowHeight = window.innerHeight - height-100;
    setWorkFlowHeight(workFlowHeight)
  },[])

  return <div className='container '>
    <div id='innerContainer'>
      <h1>Configuration Manager</h1>
      <ConfigurationSummary />
      <ConfigurationHeadings nodes={nodes}/>
    </div>
    <div id='workFlow' style={{height: workflowHeight}}>
  <ConfigurationWorkflow nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}/>
    </div>
    
  </div>
}

export default ConfigurationManager;
