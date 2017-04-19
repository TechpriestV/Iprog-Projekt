
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
              barPercentage: 1.0,
              categoryPercentage: 1.0
              // categorySpacing: 0
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
