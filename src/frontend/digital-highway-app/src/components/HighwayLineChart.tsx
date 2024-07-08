import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import { Highway, HighwayPart } from '../types';
import { Blocker } from './Blocker';
import { HighwayChartTooltip } from './HighwayChartTooltip';
import { HighwayApi } from '../generated';
import { highwayTheme } from '../theme';
import { useResponsive } from '../hooks/useResponsive';

interface HighwayLineChartProps {
    highwayId: string,
    chartWidth: number,
    chartHeight: number
}

interface ChartItem {
  order: number,
  items: Item[],
  maxSpeed?: number,
  surfaceType?: number,
}

interface Item {
  distance: number,
  height: number,
  name: string
}

const CHART_BACK_COLOR_OPACITY : number = 0.4;
const TOOLTIP_ANIMATION_DURATION : number = 50;
const STROKE_DASHARRAY : number = 15;

export const HighwayLineChart : React.FC<HighwayLineChartProps> = ({ highwayId, chartWidth, chartHeight }) => {
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [lineChartWidth, setLineChartWidth] = useState<number>(chartWidth);
  const [chartLineWidth, setChartLineWidth] = useState<number>();
  const { isBigScreen } = useResponsive();

  function UpdateChart(highway: Highway){
    setChartData([]);
    var totalDistance : number = 0;
    
    var draft: ChartItem[] = [];
    highway?.parts?.forEach((item) => {
      var startItem: Item = { distance: totalDistance, height: item?.track?.startPoint?.height ?? 0, name: item?.track?.startPoint?.name ?? '' };
      totalDistance = totalDistance + item?.track?.distance ?? 0;
      var endItem: Item = { distance: totalDistance, height: item?.track?.endPoint?.height ?? 0, name: item?.track?.endPoint?.name ?? '' };

      draft.push({ order: item.order, items: [startItem, endItem], maxSpeed: item.track?.maxSpeed, surfaceType: item.track?.surfaceType });
    });

    setChartData(draft);
  }

  React.useEffect(() => {
    if(isBigScreen) 
      setChartLineWidth(5); 
    else 
      setLineChartWidth(2) 
  }, [isBigScreen]);
  
  React.useEffect(() => { setLineChartWidth(chartWidth) }, [chartWidth])

  React.useEffect(() => {
    setLoading(true);

    const getHighwaysMetadata = async () => {
      const api = new HighwayApi();
      var result = await api.getHighwayById(highwayId);

      const highway: Highway = {
        id: result.data?.id! ?? '',
        parts: result.data?.parts?.map(item => item as HighwayPart) ?? []
      }
      
      UpdateChart(highway);
      setLoading(false);
    };

    if(highwayId){
      getHighwaysMetadata();
    }
    else{
      setLoading(false);
    }

  }, [highwayId]);

  function getTrackColor(maxSpeed: number){
    switch (maxSpeed){
      case 1: return highwayTheme.color.red
      case 2: return highwayTheme.color.blue
      case 3: return highwayTheme.color.green
      default: return highwayTheme.color.black
    }
  }

  function getSurfaceColor(surfaceType: number){
    switch (surfaceType) {
      case 1: return highwayTheme.color.red
      case 2: return highwayTheme.color.blue
      case 3: return highwayTheme.color.green
      default: return highwayTheme.color.black
    }
  }

  return (
      (isLoading ? 
        <Blocker />
        :
        <LineChart data={chartData} width={lineChartWidth} height={chartHeight}>
            <CartesianGrid strokeDasharray={STROKE_DASHARRAY} />
            <XAxis dataKey="distance" type="category" allowDuplicatedCategory={false} tickLine={false} />
            <YAxis tickLine={false} />
            <Tooltip animationDuration={TOOLTIP_ANIMATION_DURATION} content={<HighwayChartTooltip />} />
            { chartData.map((item, index) => 
              <Line 
                data={item.items} 
                dataKey="height" 
                key={index} 
                stroke={getTrackColor(item.maxSpeed!)} 
                type='bump' 
                strokeWidth={chartLineWidth} /> )
            }
            { chartData.map((item) => 
              <ReferenceArea
                key={item.order} 
                x1={item.items[0].distance} 
                x2={item.items[1].distance} 
                fill={getSurfaceColor(item.surfaceType!)} 
                opacity={CHART_BACK_COLOR_OPACITY}  /> )
            }
        </LineChart>
      ));
}