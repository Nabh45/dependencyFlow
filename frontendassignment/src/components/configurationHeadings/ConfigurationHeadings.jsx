// Contants
import { useMemo } from 'react';
import {HEADINGS} from './configurationHeadings.constants'

// Styles
import './styles.css'

const getNodesCategory = nodes => {
    const nodeSet = new Set();
    nodes.forEach((node) => nodeSet.add(HEADINGS[node.data.category]))
    return Array.from(nodeSet);
}

function ConfigurationHeadings(props) {

    const {nodes} = props;

    const nodesCategoryArray = useMemo(() => getNodesCategory(nodes), [nodes])

    return <div className='headings'>{nodesCategoryArray.map((heading) => <h2 className='heading'>{heading}</h2>)}</div>
}

export default ConfigurationHeadings;