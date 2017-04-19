# This is a smallbackend built to handle interaction with twitters Api
# It's built on flask, can handle cors and use post requets to get data

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import twitter
from flask_cors import CORS
import json

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


parser = reqparse.RequestParser()
parser.add_argument('consumer_key')
parser.add_argument('consumer_secret')
parser.add_argument('access_token')
parser.add_argument('access_token_secret')

tweets = {}

class GetTweets(Resource):
    def get(self):

        return {"Use post"}

    def post(self):
        args = parser.parse_args()

        #print(args)
        api = twitter.Api(consumer_key=args['consumer_key'], consumer_secret=args['consumer_secret'],access_token_key=args['access_token'],access_token_secret=args['access_token_secret'])
        # print(api.VerifyCredentials())
        st = api.GetUserTimeline()
        print(type(st))
        dmp = []
        for s in st:

            print(s.text)
            print()
            dmp.append(json.loads(str(s)))

        # dmp = {st[i]: st[i+1] for i in range(0, len(st), 2)}
        return dmp, 201


api.add_resource(GetTweets, '/api/gettweets')



if __name__ == '__main__':
    app.run()
