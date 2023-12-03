// svg
import MySVG from '../../.././../svg/computer-svgrepo-com.svg';

// styles
import './styles.css';

import { Handle } from 'reactflow';

const EnvironmentNode = ({ data }) => {
  return (
    <div className="box-container" id={data.value._id}>
        <img className='box-image' src={MySVG} alt="Computer Icon" />
      <p className='box-text'>{data.label}</p>
      <Handle type="source" position="right" style={{ background: '#555' }} />
     <Handle type="target" position="left" style={{ background: '#555' }} />
    </div>
  );
};

export default EnvironmentNode;
