
<!-- Component for Barchart-->
<script>
  import { Bar } from 'vue-chartjs';

  export default Bar.extend({
    props: ['data', 'options', 'height','width'],
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
        this.renderChart(this.data, this.defaultOptions)
      }else {
        this.renderChart(this.data, this.options)
      };
    }
  });
</script>
