export default  {
  methods: {
    twitterApiTests: function (user_key, user_token) {

      const client = new Twitter({
        consumer_key: user_key,
        consumer_secret: user_token,
        access_token_key: '45QA0HdFT6J2DDgvScJs6FKxb',
        access_token_secret: '7Qm1KywGDIDVyVfG0JfgAZifZNPzPuudi4AjOL6nlIUB56QNLi'
      });

      client.get('favorites/list', function(error, tweets, response) {
        if(error) throw error;
        console.log(tweets);  // The favorites. 
        console.log(response);  // Raw response object. 
      });

      console.log("test")
    }
  }
}

