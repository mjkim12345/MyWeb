document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const inputFile = document.getElementById('inputFile');
    const chartCanvas = document.getElementById('myChart').getContext('2d');
    const barGraphBtn = document.getElementById('barGraphBtn');
    const lineGraphBtn = document.getElementById('lineGraphBtn');
    const coreSelect = document.getElementById('coreSelect');
    const taskSelect = document.getElementById('taskSelect');
  
    let chart;
    let chartType = 'bar';
    let chartData = [];
  
    barGraphBtn.addEventListener('click', () => {
      chartType = 'bar';
      renderChart();
    });
  
    lineGraphBtn.addEventListener('click', () => {
      chartType = 'line';
      renderChart();
    });
  
    coreSelect.addEventListener('change', renderChart);
    taskSelect.addEventListener('change', renderChart);
  
    uploadForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('inputFile', inputFile.files[0]);
  
      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        chartData = data;
        renderChart();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during file upload: ' + error.message);
      });
    });
  
    function renderChart() {
      const core = coreSelect.value;
      const task = taskSelect.value;
  
      if (chart) {
        chart.destroy();
      }
  
      const labels = chartData.map(item => item.core);
      const minData = chartData.map(item => item.min);
      const maxData = chartData.map(item => item.max);
      const avgData = chartData.map(item => item.avg);
  
      chart = new Chart(chartCanvas, {
        type: chartType,
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Min',
              data: minData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
              label: 'Max',
              data: maxData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Avg',
              data: avgData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  });
  