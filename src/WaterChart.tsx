import React from "react";
import { AreaClosed, Bar } from "@visx/shape";
import waterData, { WaterData } from "./WaterData";
import { curveMonotoneX } from "@visx/curve";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleTime, scaleLinear } from "@visx/scale";
import { LinearGradient } from "@visx/gradient";
import { max, extent } from "d3-array";

export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";

// accessors
const getWaterDate = (wd: WaterData) => new Date(wd.date);
const getPercentage = (wd: WaterData) => wd.percentage;

export type AreaProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default function PlantChart({
  width,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 }
}: AreaProps) {
  if (width < 10) return null;

  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const waterDateScale = 
    scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(waterData, getWaterDate) as [Date, Date]
      });

  const waterPercentageScale =
  scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [0, (max(waterData, getPercentage) || 0) + innerHeight / 3],
        nice: true
      });

  return (
    <div>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#area-background-gradient)"
          rx={4}
        />
        <LinearGradient
          id="area-background-gradient"
          from={background}
          to={background2}
        />
        <LinearGradient
          id="area-gradient"
          from={accentColor}
          to={accentColor}
          toOpacity={0.1}
        />
        <GridRows
          left={margin.left}
          scale={waterPercentageScale}
          width={innerWidth}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0}
          pointerEvents="none"
        />
        <GridColumns
          top={margin.top}
          scale={waterDateScale}
          height={innerHeight}
          strokeDasharray="1,3"
          stroke={accentColor}
          strokeOpacity={0.2}
          pointerEvents="none"
        />
        <AreaClosed<WaterData>
          data={waterData}
          x={(wd) => waterDateScale(getWaterDate(wd)) ?? 0}
          y={(wd) => waterPercentageScale(getPercentage(wd)) ?? 0}
          yScale={waterPercentageScale}
          strokeWidth={1}
          stroke="url(#area-gradient)"
          fill="url(#area-gradient)"
          curve={curveMonotoneX}
        />
        <Bar
          x={margin.left}
          y={margin.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
        />
      </svg>
    </div>
  );
}
