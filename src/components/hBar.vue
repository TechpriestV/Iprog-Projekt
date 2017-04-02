
<!-- Component for horizontal barchart-->
<script>
  import { horizontalBar } from 'vue-chartjs';

  export default horizontalBar.extend({
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
