// Library
import { useEffect, useRef, useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge
} from 'reactflow';

// Helpers
import { getUpdatedNodesAndEdges,hightlightSelectedNodes,updateSelectedNodeDetails,createNodes,getUpdatedPrevNodes,getUpdatedPrevEdges} from "./configurationWorkflow.helpers";

// Services
import {getEnvironmentList,} from '../../configurationService'

// Constants
import { MINI_MAP_STYLE } from './configurationWorkflow.constants';

// Components
import CustomModal from '../customModal'

// Styles
import 'reactflow/dist/style.css';

function ConfigurationWorkflow(props) {
  
  const {nodes, edges,setNodes, setEdges, onNodesChange, onEdgesChange } =  props;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentCategoryWithConfig = useRef({});
  const variableInfo = useRef([]);
  const selectedNodeDetails = useRef({selectedIds: {}, selectedNodeData: []})


  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  useEffect(() => {
     const fetchEnvironments = async () => {
      const environmentList = await getEnvironmentList()
      const nodes = createNodes(environmentList);
      setNodes(nodes)
    }
    fetchEnvironments();
  },[])

  const onNodeClick = async (event, node) => {
    updateSelectedNodeDetails(node, selectedNodeDetails)
    if(node.data.category === 'configuration') {
      variableInfo.current = node?.data?.value?.properties || [];
      hightlightSelectedNodes(selectedNodeDetails)
      return setIsModalOpen(true);
    }
      const {nodes=[], edges=[]} = await getUpdatedNodesAndEdges(node,selectedNodeDetails,currentCategoryWithConfig);
      setNodes((prevNodes) => {
        const updatedPrevNodes = getUpdatedPrevNodes(prevNodes,node)
      return [...updatedPrevNodes, ...nodes]
    });
    setEdges((prevEdges) => {
      const updatedPrevEdges = getUpdatedPrevEdges(prevEdges, node);
      return [...updatedPrevEdges, ...edges]});
  }

  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        attributionPosition="bottom-left"
        panOnScroll={true}
        panOnScrollMode='vertical'
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        elementsSelectable={false} 
      >
      <MiniMap style={MINI_MAP_STYLE} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
      {isModalOpen && <CustomModal closeModal={() => setIsModalOpen(false)} isOpen={true} content={variableInfo.current}/>}
      </ReactFlow>
    )
}

export default ConfigurationWorkflow;
