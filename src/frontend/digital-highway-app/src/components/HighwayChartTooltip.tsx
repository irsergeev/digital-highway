import React from 'react';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import css from './HighwayChartTooltip.module.scss';
import { useResponsive } from '../hooks/useResponsive';

interface PointData{
  distance: number,
  height: number,
  name: string
}

export const HighwayChartTooltip = ({ active, payload } : TooltipProps<ValueType, NameType>) => {
  const { isBigScreen } = useResponsive();

  if (active && payload && payload.length) {
    var data = payload![0].payload as PointData;
  
    return (
        <div className={css['tooltip-container']}>
          <div className={css.header} style={ isBigScreen ? { fontSize: '0.9vw' } : {} }>
            <span>{data.name}</span>
          </div>
          <div className={css.description} style={ isBigScreen ? { fontSize: '0.7vw' } : {} }>
            <div>
              <span>Высота: </span>
              <span>{data.height}</span>
            </div>
            <div>
              <span>Расстояние: </span>
              <span>{data.distance}</span>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  }
  