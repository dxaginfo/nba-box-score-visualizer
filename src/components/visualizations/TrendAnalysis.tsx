import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { format } from 'date-fns';
import { Player, Team, GameStats } from '../../types/nba';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TrendAnalysisProps {
  data: {
    dates: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
  title: string;
  yAxisLabel: string;
  height?: number;
}

const TrendAnalysis: React.FC<TrendAnalysisProps> = ({
  data,
  title,
  yAxisLabel,
  height = 400
}) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const formattedData = {
        labels: data.dates.map(date => format(new Date(date), 'MMM d, yyyy')),
        datasets: data.datasets.map(dataset => ({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          backgroundColor: `${dataset.color}33`,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
        })),
      };

      setChartData(formattedData);
    }
  }, [data]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: yAxisLabel,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          }
        }
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff',
      },
    },
  };

  if (!chartData) {
    return <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">Loading trend data...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6" style={{ height: `${height}px` }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendAnalysis;