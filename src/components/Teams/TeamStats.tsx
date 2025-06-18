import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { TeamData } from '../../interfaces/GameInterfaces';

interface TeamStatsProps {
  homeTeam: TeamData;
  awayTeam: TeamData;
}

const TeamStats: React.FC<TeamStatsProps> = ({ homeTeam, awayTeam }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    // Set dimensions
    const width = chartRef.current.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 120, bottom: 30, left: 120 };
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
    const categories = [
      { key: 'fieldGoals.percentage', label: 'FG%' },
      { key: 'threePointers.percentage', label: '3P%' },
      { key: 'rebounds.total', label: 'REB' },
      { key: 'assists', label: 'AST' },
      { key: 'turnovers', label: 'TO' },
      { key: 'steals', label: 'STL' },
      { key: 'blocks', label: 'BLK' }
    ];

    const teamData = categories.map(category => {
      const key = category.key;
      const parts = key.split('.');
      
      let homeValue = homeTeam;
      let awayValue = awayTeam;
      
      for (const part of parts) {
        homeValue = homeValue[part as keyof typeof homeValue];
        awayValue = awayValue[part as keyof typeof awayValue];
      }
      
      return {
        category: category.label,
        home: +homeValue,
        away: +awayValue
      };
    });

    // Y scale
    const y = d3.scaleBand()
      .domain(categories.map(d => d.label))
      .rangeRound([0, innerHeight])
      .padding(0.3);

    // X scale - find the max value for scaling
    const maxValue = d3.max(teamData, d => Math.max(d.home, d.away)) || 0;
    const x = d3.scaleLinear()
      .domain([0, maxValue * 1.1]) // Add some padding
      .range([innerWidth / 2, innerWidth]); // Right half

    const xLeft = d3.scaleLinear()
      .domain([0, maxValue * 1.1]) // Add some padding
      .range([innerWidth / 2, 0]); // Left half (reversed)

    // Add Y axis (category labels in center)
    g.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .attr('transform', `translate(${innerWidth / 2},0)`)
      .call(g => g.select('.domain').remove())
      .selectAll('.tick text')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold');

    // Home team bars (left side)
    g.append('g')
      .selectAll('rect.home')
      .data(teamData)
      .join('rect')
      .attr('class', 'home')
      .attr('x', d => xLeft(d.home))
      .attr('y', d => y(d.category) || 0)
      .attr('width', d => innerWidth / 2 - xLeft(d.home))
      .attr('height', y.bandwidth())
      .attr('fill', homeTeam.primaryColor);

    // Away team bars (right side)
    g.append('g')
      .selectAll('rect.away')
      .data(teamData)
      .join('rect')
      .attr('class', 'away')
      .attr('x', innerWidth / 2)
      .attr('y', d => y(d.category) || 0)
      .attr('width', d => x(d.away) - innerWidth / 2)
      .attr('height', y.bandwidth())
      .attr('fill', awayTeam.primaryColor);

    // Add value labels for home team
    g.append('g')
      .selectAll('text.home-value')
      .data(teamData)
      .join('text')
      .attr('class', 'home-value')
      .attr('x', d => xLeft(d.home) - 5)
      .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .attr('font-size', 12)
      .text(d => d.category.includes('%') ? d.home.toFixed(1) + '%' : d.home);

    // Add value labels for away team
    g.append('g')
      .selectAll('text.away-value')
      .data(teamData)
      .join('text')
      .attr('class', 'away-value')
      .attr('x', d => x(d.away) + 5)
      .attr('y', d => (y(d.category) || 0) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .attr('font-size', 12)
      .text(d => d.category.includes('%') ? d.away.toFixed(1) + '%' : d.away);

    // Add team names
    svg.append('text')
      .attr('x', margin.left / 2)
      .attr('y', margin.top + innerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', 14)
      .text(homeTeam.abbreviation);

    svg.append('text')
      .attr('x', width - margin.right / 2)
      .attr('y', margin.top + innerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('font-size', 14)
      .text(awayTeam.abbreviation);

  }, [homeTeam, awayTeam]);

  return (
    <div className="overflow-hidden">
      <svg ref={chartRef} className="w-full" />
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="font-medium mb-2">{homeTeam.name}</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Points in Paint:</span>
              <span className="font-medium">{homeTeam.stats.points.inPaint}</span>
            </div>
            <div className="flex justify-between">
              <span>Fast Break Points:</span>
              <span className="font-medium">{homeTeam.stats.points.fastBreak}</span>
            </div>
            <div className="flex justify-between">
              <span>Second Chance:</span>
              <span className="font-medium">{homeTeam.stats.points.secondChance}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">{awayTeam.name}</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Points in Paint:</span>
              <span className="font-medium">{awayTeam.stats.points.inPaint}</span>
            </div>
            <div className="flex justify-between">
              <span>Fast Break Points:</span>
              <span className="font-medium">{awayTeam.stats.points.fastBreak}</span>
            </div>
            <div className="flex justify-between">
              <span>Second Chance:</span>
              <span className="font-medium">{awayTeam.stats.points.secondChance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;