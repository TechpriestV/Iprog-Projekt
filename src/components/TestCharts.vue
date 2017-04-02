<script>
  import { Bar } from 'vue-chartjs'
  // console.log("HEJ");
  export default Bar.extend({
    // components{
    //
    // }
    // props: ["data", "options"],
    props: ['data', 'options'],
    mounted () {
    // Overwriting base render method with actual data.

    //Dynamic data
    console.log(this.data);
    if (!this.options) {
      console.log("No options passed, using defualts!");
    }
    this.renderChart(this.data, this.options)

    // Static data
    // this.renderChart({
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    //   datasets: [
    //     {
    //       label: 'GitHub Commits',
    //       backgroundColor: '#f87979',
    //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    //     }
    //   ]
    // })
  }
  })
</script>
