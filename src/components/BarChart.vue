<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: ['chartData'],
  computed: {
    chartData() { return {
      labels: new Array(3).fill(''),
      // datasets: [ { data: this.chartData, backgroundColor: '#4f3' } ],
      datasets: [
        {
          label: 'Dataset 1',
          data: this.chartData,
          borderColor: '#36A2EB',
          backgroundColor: '#9BD0F5',
        },
        {
          label: 'Dataset 2',
          data: [20, 30, 40],
          borderColor: '#FF6384',
          backgroundColor: '#FFB1C1',
        }
      ]
    } }
  },
  data() {
    return {
      chartOptions: {
        responsive: false,
        legend: {
          display: false
        },
      }
    }
  }
}
</script>