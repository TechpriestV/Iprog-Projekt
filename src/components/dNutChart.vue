
<!-- Component for Munkchart-->
<script>
  import { Doughnut } from 'vue-chartjs';

  export default Doughnut.extend({
    props: ['data', 'options', 'height','width'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
        this.options= {
          responsive: true,
          maintainAspectRatio: false
        };
      };
      this.renderChart(this.data, this.options)
    }
  });
</script>
