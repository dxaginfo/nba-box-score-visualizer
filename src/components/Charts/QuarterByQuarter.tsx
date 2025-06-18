import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { GameData } from '../../interfaces/GameInterfaces';

interface QuarterByQuarterProps {
  game: GameData;
}

const QuarterByQuarter: React.FC<QuarterByQuarterProps> = ({ game }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart if any
    d3.select(chartRef.current).selectAll('*').remove();

    // Set dimensions
    const width = chartRef.current.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a group for the chart content
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare data
    const homeTeamData = game.homeTeam.quarterScores.map((score, i) => ({
      quarter: `Q${i + 1}`,
      score,
      team: 'home'
    }));

    const awayTeamData = game.awayTeam.quarterScores.map((score, i) => ({
      quarter: `Q${i + 1}`,
      score,
      team: 'away'
    }));

    const data = [...homeTeamData, ...awayTeamData];

    // X scale
    const x0 = d3.scaleBand()
      .domain([...new Set(data.map(d => d.quarter))])
      .rangeRound([0, innerWidth])
      .paddingInner(0.1);

    // X scale for grouped bars
    const x1 = d3.scaleBand()
      .domain(['home', 'away'])
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.score) || 0])
      .nice()
      .rangeRound([innerHeight, 0]);

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(['home', 'away'])
      .range([game.homeTeam.primaryColor, game.awayTeam.primaryColor]);

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0))
      .append('text')
      .attr('x', innerWidth / 2)
      .attr('y', 35)
      .attr('fill', 'currentColor')
      .attr('text-anchor', 'middle')
      .text('Quarter');

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .append('text')
      .attr('x', -innerHeight / 2)
      .attr('y', -30)
      .attr('fill', 'currentColor')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Points');

    // Draw bars
    g.append('g')
      .selectAll('g')
      .data([...new Set(data.map(d => d.quarter))])
      .join('g')
      .attr('transform', d => `translate(${x0(d)},0)`)
      .selectAll('rect')
      .data(quarter => {
        return ['home', 'away'].map(team => {
          const found = data.find(d => d.quarter === quarter && d.team === team);
          return {
            quarter,
            team,
            score: found ? found.score : 0
          };
        });
      })
      .join('rect')
      .attr('x', d => x1(d.team) || 0)
      .attr('y', d => y(d.score))
      .attr('width', x1.bandwidth())
      .attr('height', d => innerHeight - y(d.score))
      .attr('fill', d => color(d.team) as string);

    // Add legend
    const legend = svg.append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)
      .attr('text-anchor', 'end')
      .selectAll('g')
      .data(['home', 'away'])
      .join('g')
      .attr('transform', (d, i) => `translate(${width - 20},${i * 20 + 20})`);

    legend.append('rect')
      .attr('x', -18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', d => color(d) as string);

    legend.append('text')
      .attr('x', -24)
      .attr('y', 9)
      .attr('dy', '0.35em')
      .text(d => d === 'home' ? game.homeTeam.name : game.awayTeam.name);

  }, [game]);

  return (
    <div className="overflow-hidden">
      <svg ref={chartRef} className="w-full" />
    </div>
  );
};

export default QuarterByQuarter;