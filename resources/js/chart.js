import { Chart, registerables } from 'chart.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

Chart.register(...registerables);
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const chartEl = document.getElementById('hdcChart');
    if (!chartEl) return;

    const ctx = chartEl.getContext('2d');

    const lineData = [15, 19, 18, 12, 12, 10, 13, 11, 11, 14, 15, 12, 12, 12, 12, 10, 12, 12, 12, 10, 13, 15, 13];
    const barData  = [8, 5, 4, 7, 8, 9, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: new Array(30).fill(''),
            datasets: [
                {
                    type: 'line',
                    data: new Array(lineData.length).fill(0),
                    borderColor: '#BA1A1A',
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    pointHoverBackgroundColor: '#BA1A1A',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2,
                    fill: false,
                    tension: 0,
                },
                {
                    type: 'bar',
                    data: new Array(barData.length).fill(0),
                    backgroundColor: '#BFDBFE',
                    barThickness: 8,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart',
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (item) => {
                            if (item.datasetIndex === 0) return `Giá: ${item.raw.toLocaleString('vi-VN')}`;
                            if (item.datasetIndex === 1) return `KL: ${item.raw.toLocaleString('vi-VN')}`;
                        }
                    }
                }
            },
            layout: {
                padding: { bottom: 20 }
            },
            scales: {
                x: { display: false },
                y: {
                    display: true,
                    position: 'right',
                    suggestedMax: 25,
                    suggestedMin: 5,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: '#E8E8ED',
                        borderDash: [2, 2]
                    },
                    ticks: { display: false }
                }
            }
        },
        plugins: [{
            id: 'customLabels',
            afterDraw: (chart) => {
                const { ctx, chartArea: { left, right, bottom } } = chart;
                ctx.save();
                ctx.font = '12px Arial';
                ctx.fillStyle = '#4B5563';
                ctx.textAlign = 'left';
                ctx.fillText('20,200', left, bottom + 15);
                ctx.textAlign = 'right';
                ctx.fillText('20,000', right, bottom + 15);
                ctx.restore();
            }
        }]
    });

    ScrollTrigger.create({
        trigger: chartEl,
        start: "top 85%",
        once: true,
        onEnter: () => {
            chart.data.datasets[0].data = lineData;
            let i = 0;
            const interval = setInterval(() => {
                chart.data.datasets[1].data[i] = barData[i];
                chart.update('active');
                i++;
                if (i >= barData.length) clearInterval(interval);
            }, 40);
            chart.update();
        }
    });
});