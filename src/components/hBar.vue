
<!-- Component for horizontal barchart-->
<script>
  import { Bar } from 'vue-chartjs';

  export default Bar.extend({
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
