import React from 'react';
import { CellTypes } from '../../App/utils';
import CommonTool from '../CommonTool';
import obstacle from '../../assets/obstacle_color.svg';
import obstacleInverted from '../../assets/obstacle_inverted.svg';
import styles from './ObstacleTool.module.scss';

function ObstacleTool(props) {
  return (
    <CommonTool
      name="Obstacle Tool"
      type={CellTypes.OBSTACLE}
      icon={
        <img
          className={styles.icon}
          src={props.isActive
            ? obstacleInverted
            : obstacle}
          alt="obstacle"
        />
      }
      {...props}
    />
  );
}

ObstacleTool.propTypes = {};

export default ObstacleTool;
