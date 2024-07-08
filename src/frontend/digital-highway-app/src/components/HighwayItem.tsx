import React, { useState } from 'react';
import css from './HighwayItem.module.scss';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { HighwayMetadata } from '../types';
import { highwayTheme } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

interface HighwayProps
{
    highwayMetadata: HighwayMetadata
}

export const HighwayItem : React.FC<HighwayProps> = ({ highwayMetadata }) => {

    const { isBigScreen } = useResponsive();
    const [fontSize, setFontSize] = useState<string>();
     
    React.useEffect(() => { setFontSize('0.7vw') }, [isBigScreen]);
    return (
        <div className={css.container} style={ isBigScreen ? { fontSize: fontSize } : {} }>
            <div className={css.header}>
                <span>{highwayMetadata.id}</span>
            </div>
            <div className={css['distance-info']}>
                <span className={css['main-text']}>{highwayMetadata.totalDistance}</span>
                <span>км общая протяженность</span>
            </div>
            <div className={css['tracks-info']}>
                <div>
                    <span>участков:</span>
                    <span className={css['main-text']}>{highwayMetadata.tracksCount}</span>
                </div>
            </div>
            <div className={css['mini-chart']}>
                <SparkLineChart data={highwayMetadata.points} height={30} colors={[ `${highwayTheme.palette.primary.main}` ]}/>
            </div>
        </div>
)};