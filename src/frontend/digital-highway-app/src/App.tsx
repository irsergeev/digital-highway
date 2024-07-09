import css from './App.module.scss';
import { HighwayMetadata } from './types';
import React, { useState } from 'react';
import { HighwayMetadataApi } from './generated/api';
import { HighwayLineChart } from './components/HighwayLineChart';
import { HighwayPanel } from './components/HighwayPanel';
import { highwayTheme } from './theme';
import { useResponsive } from './hooks/useResponsive';

export function App() {
  const [highwaysMetadata, setHighwaysMetadata] = useState<HighwayMetadata[]>([]);
  const [selectedHighwayId, setSelectedHighwayId] = useState<string>(null!);
  const METADATA_PANEL_WIDTH = 350;
  const { isSmallScreen, isBigScreen } = useResponsive();

  React.useEffect(() => {
    const getHighwaysMetadata = async () => {
      const api = new HighwayMetadataApi();
      
      var result = await api.getHighwaysMetadata();
      setHighwaysMetadata(result.data.data?.map((item) => item as HighwayMetadata) ?? []);
      calculateChartSize();
    }
    
    getHighwaysMetadata();
  }, []);

  const [chartWidth, setChartWidth] = useState<number>(window.innerWidth);
  const [chartHeight, setChartHeight] = useState<number>(window.innerHeight)

  React.useLayoutEffect(() => {
      const useResize = () => { calculateChartSize() }
      window.addEventListener('resize', useResize);
      return () => { window.removeEventListener('resize', useResize) };
  }, []);

  function calculateChartSize (){
    if(isSmallScreen){
      setChartWidth(window.innerWidth - 10); 
      setChartHeight(window.innerHeight - 60);
    }
    else{
      setChartWidth(window.innerWidth - METADATA_PANEL_WIDTH); 
      setChartHeight(window.innerHeight - 10);
    }
  }

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