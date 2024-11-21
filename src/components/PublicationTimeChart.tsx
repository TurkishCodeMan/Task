import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Article } from '../types/news';
import '../styles/PublicationTimeChart.css';

Chart.register(...registerables);

interface PublicationTimeChartProps {
  articles: Article[];
}

const PublicationTimeChart: React.FC<PublicationTimeChartProps> = ({ articles }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const prepareChartData = (articles: Article[]) => {
    const hourLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const sourceData: { [key: string]: number[] } = {};

    articles.forEach(article => {
      const publishedAt = new Date(article.publishedAt);
      const hour = publishedAt.getHours();
      const source = article.source.name || 'Unknown';

      if (!sourceData[source]) {
        sourceData[source] = Array(24).fill(0);
      }
      sourceData[source][hour]++;
    });

    const datasets = Object.entries(sourceData).map(([source, data], index) => ({
      label: source,
      data: data,
      borderColor: `hsl(${index * 137.5}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 137.5}, 70%, 50%, 0.2)`,
      tension: 0.4,
      fill: true,
      borderWidth: 2,
    }));

    return { labels: hourLabels, datasets };
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const data = prepareChartData(articles);

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'Haber Yayınlanma Saatleri',
            color: '#ffffff',
            font: {
              size: 16,
              weight: 'bold',
            },
            padding: {
              bottom: 15,
            },
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#ffffff',
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 15,
            },
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#333333',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              title: (items) => `Saat: ${items[0].label}`,
              label: (item) => `${item.dataset.label}: ${item.formattedValue} haber`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#ffffff',
              maxRotation: 45,
              minRotation: 45,
            },
            border: {
              display: true,
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: '#ffffff',
              stepSize: 1,
              padding: 8,
            },
            border: {
              display: true,
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [articles]);

  return (
    <div className="publication-time-chart">
      <canvas ref={chartRef} height="300"></canvas>
    </div>
  );
};

export default PublicationTimeChart;
