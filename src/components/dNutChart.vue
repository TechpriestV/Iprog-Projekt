
<!-- Component for Munkchart-->
<script>
  import { Doughnut } from 'vue-chartjs';

  export default Doughnut.extend({
    props: ['data', 'options'],
    mounted(){
      if (!this.options){
        // Define defualt options here
        // this.options = {...}
      };
      this.renderChart(this.data, this.options)
    }
  });
</script>
