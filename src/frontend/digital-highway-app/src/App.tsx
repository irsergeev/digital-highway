import css from './App.module.scss';
import { HighwayMetadata } from './types';
import React, { useState } from 'react';
import { HighwayLineChart } from './components/HighwayLineChart';
import { HighwayPanel } from './components/HighwayPanel';
import { highwayTheme } from './theme';
import { useResponsive } from './hooks/useResponsive';
import { GetHighwayMetadataApi } from './services';

export function App() {
  const [highwaysMetadata, setHighwaysMetadata] = useState<HighwayMetadata[]>([]);
  const [selectedHighwayId, setSelectedHighwayId] = useState<string>(null!);
  const METADATA_PANEL_WIDTH = 350;
  const { isSmallScreen, isBigScreen, windowHeight, windowWidth } = useResponsive();

  React.useEffect(() => {
    const getHighwaysMetadata = async () => {
      const api = GetHighwayMetadataApi();
      console.log('call api');
      var result = await api.getHighwaysMetadata();
      setHighwaysMetadata(result.data.data?.map((item) => item as HighwayMetadata) ?? []);
    }
    
    getHighwaysMetadata();
  }, []);

  const [chartWidth, setChartWidth] = useState<number>(window.innerWidth);
  const [chartHeight, setChartHeight] = useState<number>(window.innerHeight)

  React.useLayoutEffect(() => {
      if(isSmallScreen){
        setChartWidth(window.innerWidth - 10); 
        setChartHeight(window.innerHeight - 60);
      }
      else{
        setChartWidth(window.innerWidth - METADATA_PANEL_WIDTH); 
        setChartHeight(window.innerHeight - 10);
      }

  }, [isSmallScreen, isBigScreen, windowHeight, windowWidth]);

  return(
    <div className={css.app} style={{ fontFamily: `${highwayTheme.typography.fontFamily}` }}>
      { !isBigScreen ? (
        <div className={css.mainContainer} style={ isSmallScreen ? { flexDirection: 'column' } : {}}>
          <div className={css.metadataContainer} style={ isSmallScreen ? { width: '100%' } : { width: `${METADATA_PANEL_WIDTH}px` }}>
            <HighwayPanel highwayMetadataArray={highwaysMetadata} changeSelectedHighway={setSelectedHighwayId} />
          </div>
          <div className={css.chartContainer}>
            <HighwayLineChart highwayId={selectedHighwayId} chartWidth={chartWidth} chartHeight={chartHeight}/>
          </div>
        </div>
      ) : (
        <div className={css.mainContainer} style={ isSmallScreen ? { flexDirection: 'column' } : {}}>
          <div className={css.metadataContainer}>
            <HighwayPanel highwayMetadataArray={highwaysMetadata} changeSelectedHighway={setSelectedHighwayId} />
          </div>
          <div className={css.chartContainer}>
            <HighwayLineChart highwayId={selectedHighwayId} chartWidth={chartWidth} chartHeight={chartHeight}/>
          </div>
        </div>
      )}
      </div>
  )}