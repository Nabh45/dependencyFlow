// Library
import PropTypes from 'prop-types';

// Contants
import { useMemo } from 'react';

// Helpers
import {getNodesCategory} from './configurationHeadings.helpers'

// Styles
import './styles.css'



function ConfigurationHeadings(props) {

    const {nodes} = props;

    const nodesCategoryArray = useMemo(() => getNodesCategory(nodes), [nodes])

    return <div className='headings'>{nodesCategoryArray.map((heading) => <h2 key={heading} className='heading'>{heading}</h2>)}</div>
}

ConfigurationHeadings.propTypes = {
  nodes: PropTypes.array.isRequired,
};


export default ConfigurationHeadings;