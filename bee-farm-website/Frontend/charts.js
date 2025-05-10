document.addEventListener('DOMContentLoaded', async () => {
  const beeChartCanvas = document.getElementById('beeChart').getContext('2d');
  const flowerChartCanvas = document.getElementById('flowerChart').getContext('2d');

  try {
    const [beeRes, flowerRes] = await Promise.all([
      fetch('http://localhost:3000/statistics/bee-growth'),
      fetch('http://localhost:3000/statistics/flower-productivity'),
    ]);

    const beeData = await beeRes.json();
    const flowerData = await flowerRes.json();

    // 🐝 Bee Chart
    new Chart(beeChartCanvas, {
      type: 'line',
      data: {
        labels: beeData.labels,
        datasets: [{
          label: 'Количество пчелиных семей',
          data: beeData.data,
          borderColor: '#FFC107',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#212121',
          pointBorderColor: '#FFC107',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart',
                delay: (context) => {
                if (context.type === 'data' && context.mode === 'default') {
                    return context.dataIndex * 100; // задержка 100мс между точками
                }
                return 0;
                }
            },
            hover: {
                mode: null
            },
            elements: {
                point: {
                radius: 3,
                backgroundColor: 'rgba(255, 193, 7, 0.5)',
                borderColor: 'rgba(255, 193, 7, 0.3)',
                borderWidth: 1,
                hoverRadius: 3,
                hoverBackgroundColor: 'rgba(255, 193, 7, 0.5)',
                hoverBorderColor: 'rgba(255, 193, 7, 0.3)'
                }
            },
        plugins: {
              tooltip: {enabled: false},
          legend: {
            labels: { color: '#212121' }
          }
        },
        scales: {
        x: {
            ticks: { color: '#212121'},
            grid: {                       
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
            lineWidth: 1
            }
            },
        y: {
            ticks: { display: false },     
            grid: {                       
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
            lineWidth: 1
            }
            }
        }
    }
});

    // 🌼 Flower Chart
    new Chart(flowerChartCanvas, {
    type: 'bar',
    data: {
        labels: flowerData.labels,
        datasets: [{
        label: 'Урожайность медоносов',
        data: flowerData.data,
        backgroundColor: 'rgba(255, 193, 7, 0.4)', // мягкий мёд
        borderColor: '#FF9800', // насыщенный янтарь
        borderWidth: 2
        }]
    },
    options: {
        responsive: true,
            animation: {
                duration: 800,
                easing: 'easeOutQuart',
                delay: (ctx) => {
                if (ctx.type === 'data' && ctx.mode === 'default') {
                    return ctx.dataIndex * 80;
                }
                return 0;
                }
            },
            elements: {
                bar: {
                    backgroundColor: 'rgba(255, 193, 7, 0.4)',
                    borderColor: '#FF9800',
                    borderWidth: 2,
                    hoverBackgroundColor: '#FFD54F',
                    hoverBorderColor: '#FFA000'
                }
                },
        plugins: {
        legend: {
            labels: { color: '#212121' }
        }
        },
        scales: {
        x: {
            ticks: { color: '#212121'},
            grid: {                       
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
            lineWidth: 1
            }
            },
        y: {
            ticks: { display: false },     
            grid: {                       
            display: true,
            color: 'rgba(0, 0, 0, 0.1)', 
            lineWidth: 1
            }
            }
        }
    }
    });

  } catch (error) {
    console.error('Ошибка при загрузке данных графиков:', error);
  }
});
