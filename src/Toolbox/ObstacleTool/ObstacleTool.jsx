import React from 'react';
import { CellTypes } from '../../App/utils';
import CommonTool from '../CommonTool';

function ObstacleTool(props) {
  return (
    <CommonTool
      type={CellTypes.OBSTACLE}
      icon="Obstacle"
      {...props}
    />
  );
}

ObstacleTool.propTypes = {};

export default ObstacleTool;
