
<!-- Component for horizontal barchart-->
<script>
  import { HorizontalBar, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins;

  export default HorizontalBar.extend({
    mixins: [reactiveProp],
    props: ['options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.defaultOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              categoryPercentage: 0.5,
              barPercentage: 0.2
            }],
            yAxes: [{
              ticks :{
                beginAtZero: true
              },
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
