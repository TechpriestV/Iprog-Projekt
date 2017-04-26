
<!-- Component for line chart-->
<script>
  import { Line, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default Line.extend({
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
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        };
        this.renderChart(this.chartData, this.defaultOptions)
      }else{
        this.renderChart(this.chartData, this.options)
      };
    }
  });
</script>
