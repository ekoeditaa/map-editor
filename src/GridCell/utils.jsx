import React from 'react';
import qrIcon from '../assets/qr_inverted.svg';
import { CellTypes } from '../App/utils';
import styles from './GridCell.module.scss';

export const getStyle = (type, row, col, map) => {
  const topRow = map[row - 1];
  const midRow = map[row];
  const bottomRow = map[row + 1];

  const TC = topRow && topRow[col];
  const ML = midRow && midRow[col - 1];
  const MR = midRow && midRow[col + 1];
  const BC = bottomRow && bottomRow[col];

  switch (type) {
    case CellTypes.OBSTACLE: {
      const style = {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#A0A0A0',
      };

      if (TC === CellTypes.OBSTACLE) {
        style.borderTopColor = 'transparent';
        // style.borderTopLeftRadius = 0;
        // style.borderTopRightRadius = 0;
      }

      if (ML === CellTypes.OBSTACLE) {
        style.borderLeftColor = 'transparent';
        // style.borderTopLeftRadius = 0;
        // style.borderBottomLeftRadius = 0;
      }

      if (MR === CellTypes.OBSTACLE) {
        style.borderRightColor = 'transparent';
        // style.borderTopRightRadius = 0;
        // style.borderBottomRightRadius = 0;
      }

      if (BC === CellTypes.OBSTACLE) {
        style.borderBottomColor = 'transparent';
        // style.borderBottomLeftRadius = 0;
        // style.borderBottomRightRadius = 0;
      }

      return style;
    }

    case CellTypes.WALKWAY: {
      const style = {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#A0A0A0',
      };

      if (TC === CellTypes.WALKWAY) {
        style.borderTopColor = 'transparent';
      }

      if (ML === CellTypes.WALKWAY) {
        style.borderLeftColor = 'transparent';
      }

      if (MR === CellTypes.WALKWAY) {
        style.borderRightColor = 'transparent';
      }

      if (BC === CellTypes.WALKWAY) {
        style.borderBottomColor = 'transparent';
      }

      return style;
    }

    case CellTypes.MARK:
      return {
        backgroundColor: '#584da0',
        boxShadow: '0 5px 15px rgba(88, 77, 160, 0.5)',
        borderColor: 'transparent',
      };
    
    case CellTypes.INTERSECTION:
      return {
        borderColor: 'transparent',
      };

    default:
      return {};
  }
}

export const getContent = (type) => {
  switch (type) {
    case CellTypes.OBSTACLE: {
      return <div className={styles.obstacle} />;
    }
    case CellTypes.MARK: {
      return <img src={qrIcon} alt="mark" className={styles.mark} />;
    }
    case CellTypes.INTERSECTION: {
      return <div className={styles.intersection} />;
    }
    default:
      return null;
  }
}