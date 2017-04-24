
<!-- Component for Barchart-->
<script>
  import { Bar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default Bar.extend({
    mixins: [reactiveProp],
    props: ['options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.defaultOptions= {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              barPercentage: 0.99,
              categoryPercentage: 0.99,
              gridLines: {
                display: false
              }
              // categorySpacing: 0
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }]
          }
        };
        this.renderChart(this.chartData, this.defaultOptions)
      }else {
        this.renderChart(this.chartData, this.options)
      };
    }
  });
</script>
