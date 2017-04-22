
<!-- Component for Munkchart-->
<script>
  import { Doughnut, mixins } from 'vue-chartjs';
  const { reactiveProp } = mixins

  export default Doughnut.extend({
    mixins: [reactiveProp],
    props: ['options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.defaultOptions = {
          responsive: true,
          maintainAspectRatio: false
        };
        this.renderChart(this.chartData, this.defaultOptions)
      }else{
        this.renderChart(this.chartData, this.options)
      };
    }
  });
</script>
