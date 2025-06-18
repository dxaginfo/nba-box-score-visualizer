import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { PlayerData } from '../../interfaces/GameInterfaces';

interface ShootingChartProps {
  player: PlayerData;
  width?: number;
  height?: number;
}

const ShootingChart: React.FC<ShootingChartProps> = ({ player, width = 300, height = 282 }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !player.shotChart) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Court dimensions (NBA court is 94ft x 50ft)
    const courtWidth = 50;
    const courtHeight = 47; // Using just half court
    const threePointRadius = 23.75; // NBA 3-point line is 23.75ft from center of hoop
    const keyWidth = 16; // Width of the free throw lane (key)
    const keyHeight = 19; // Length of free throw lane
    const hoopCenterX = courtWidth / 2;
    const hoopCenterY = 5.25; // Distance from baseline
    
    // Create scales to map court coordinates to SVG
    const xScale = d3.scaleLinear()
      .domain([0, courtWidth])
      .range([0, width]);
      
    const yScale = d3.scaleLinear()
      .domain([0, courtHeight])
      .range([height, 0]); // Invert Y-axis to match basketball court

    // Create SVG
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    // Draw court
    const court = svg.append('g');

    // Court background
    court.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#f8f9fa')
      .attr('stroke', '#000');

    // Draw three point line
    const threePointX = xScale(hoopCenterX);
    const threePointY = yScale(hoopCenterY);
    const threePointRadiusScaled = xScale(threePointRadius);

    // Arc part of 3-point line
    const threePointArc = d3.arc()
      .innerRadius(threePointRadiusScaled)
      .outerRadius(threePointRadiusScaled)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    court.append('path')
      .attr('d', threePointArc as any)
      .attr('transform', `translate(${threePointX},${threePointY})`)
      .attr('stroke', '#000')
      .attr('fill', 'none');

    // Key (paint)
    const keyX = xScale(hoopCenterX - keyWidth / 2);
    const keyY = yScale(0);
    const keyWidthScaled = xScale(keyWidth) - xScale(0);
    const keyHeightScaled = yScale(0) - yScale(keyHeight);

    court.append('rect')
      .attr('x', keyX)
      .attr('y', keyY - keyHeightScaled)
      .attr('width', keyWidthScaled)
      .attr('height', keyHeightScaled)
      .attr('stroke', '#000')
      .attr('fill', 'none');

    // Free throw circle
    const ftCircleX = xScale(hoopCenterX);
    const ftCircleY = yScale(keyHeight);
    const ftCircleRadius = keyWidthScaled / 2;

    court.append('circle')
      .attr('cx', ftCircleX)
      .attr('cy', ftCircleY)
      .attr('r', ftCircleRadius)
      .attr('stroke', '#000')
      .attr('fill', 'none');

    // Backboard
    court.append('line')
      .attr('x1', xScale(hoopCenterX - 3))
      .attr('y1', yScale(hoopCenterY - 1.5))
      .attr('x2', xScale(hoopCenterX + 3))
      .attr('y2', yScale(hoopCenterY - 1.5))
      .attr('stroke', '#000')
      .attr('stroke-width', 2);

    // Hoop
    court.append('circle')
      .attr('cx', xScale(hoopCenterX))
      .attr('cy', yScale(hoopCenterY))
      .attr('r', 7.5)
      .attr('stroke', '#e53e3e')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // Draw shot data
    // For this example, let's create sample shot data since it's not in our interface
    const sampleShotData = player.shotChart || [
      { x: hoopCenterX - 10, y: 15, made: true, value: 2 },
      { x: hoopCenterX + 5, y: 10, made: false, value: 2 },
      { x: hoopCenterX - 15, y: 25, made: true, value: 3 },
      { x: hoopCenterX + 12, y: 23, made: false, value: 3 },
      { x: hoopCenterX - 8, y: 5, made: true, value: 2 },
      { x: hoopCenterX + 3, y: 17, made: true, value: 2 },
      { x: hoopCenterX - 20, y: 24, made: false, value: 3 },
    ];

    const shots = svg.append('g');

    shots.selectAll('.shot')
      .data(sampleShotData)
      .enter()
      .append('circle')
      .attr('class', 'shot')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 5)
      .attr('fill', d => d.made ? '#38a169' : '#e53e3e')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .append('title')
      .text(d => `${d.made ? 'Made' : 'Missed'} ${d.value}-pointer`);

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 90}, 20)`);

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 5)
      .attr('fill', '#38a169');

    legend.append('text')
      .attr('x', 10)
      .attr('y', 4)
      .attr('font-size', '10px')
      .text('Made Shot');

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 20)
      .attr('r', 5)
      .attr('fill', '#e53e3e');

    legend.append('text')
      .attr('x', 10)
      .attr('y', 24)
      .attr('font-size', '10px')
      .text('Missed Shot');

  }, [player, width, height]);

  return (
    <div className="text-center">
      <svg ref={chartRef} className="mx-auto" />
      <p className="text-sm text-gray-500 mt-2">Shot Distribution</p>
    </div>
  );
};

export default ShootingChart;