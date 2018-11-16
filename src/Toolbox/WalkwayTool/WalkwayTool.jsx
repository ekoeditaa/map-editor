import React from 'react';
import { CellTypes } from '../../App/utils';
import CommonTool from '../CommonTool';

function WalkwayTool(props) {
  return (
    <CommonTool
      type={CellTypes.WALKWAY}
      icon="Walkway"
      {...props}
    />
  );
}

WalkwayTool.propTypes = {};

export default WalkwayTool;