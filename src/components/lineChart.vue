
<!-- Component for line chart-->
<script>
  import { Line } from 'vue-chartjs';

  export default Line.extend({
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
