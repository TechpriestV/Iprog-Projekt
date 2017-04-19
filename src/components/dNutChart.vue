
<!-- Component for Munkchart-->
<script>
  import { Doughnut } from 'vue-chartjs';

  export default Doughnut.extend({
    props: ['data', 'options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.defaultOptions = {
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
