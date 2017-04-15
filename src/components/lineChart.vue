
<!-- Component for line chart-->
<script>
  import { Line } from 'vue-chartjs';

  export default Line.extend({
    props: ['data', 'options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.defaultOptions= {
          responsive: true,
          maintainAspectRatio: false
        };
        this.renderChart(this.data, this.defaultOptions)
      }else{
        this.renderChart(this.data, this.options)
      };
    }
  });
</script>
