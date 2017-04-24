# This is a smallbackend built to handle interaction with twitters Api
# It's built on flask, can handle cors and use post requets to get data

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
import twitter
from flask_cors import CORS
import json
import datetime

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


parser = reqparse.RequestParser()
parser.add_argument('consumer_key')
parser.add_argument('consumer_secret')
parser.add_argument('access_token')
parser.add_argument('access_token_secret')
parser.add_argument('term')

year = {'Jan':1,'Feb':2,'Mar':3,'Apr':4,'May':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Oct':10,'Nov':11,'Dec':12}


def getWeek(tweets, weeksBack=0):
    lastWeek = {'Mon':0,'Tue':0,'Wed':0,'Thu':0,'Fri':0,'Sat':0,'Sun':0 }
    today = datetime.date.today()
    startDate = today - datetime.timedelta(days=today.weekday(), weeks=weeksBack)
    endDate = startDate + datetime.timedelta(days=6)
    for tweet in tweets:
        timestamp = tweet.created_at.split()
        tweetDate = datetime.date(int(timestamp[5]), int(year[timestamp[1]]), int(timestamp[2]))
        if startDate <= tweetDate <= endDate:
            lastWeek[timestamp[0]] += 1
    weekSum = [lastWeek['Mon'],lastWeek['Tue'],lastWeek['Wed'],lastWeek['Thu'],lastWeek['Fri'],lastWeek['Sat'],lastWeek['Sun']]
    return weekSum


class LastSevenDays(Resource):
    def get(self):
        return {"Use post"}

    def post(self):
        args = parser.parse_args()
        api = twitter.Api(consumer_key=args['consumer_key'], consumer_secret=args['consumer_secret'],access_token_key=args['access_token'],access_token_secret=args['access_token_secret'])
        tweets = api.GetUserTimeline(screen_name=args['term'], count=199, include_rts=False)
        api.ClearCredentials()
        rV = getWeek(tweets)
        return json.dumps(list(rV)), 201

class GetTweets(Resource):
    def get(self):
        return {"Use post"}

    def post(self):
        args = parser.parse_args()
        api = twitter.Api(consumer_key=args['consumer_key'], consumer_secret=args['consumer_secret'],access_token_key=args['access_token'],access_token_secret=args['access_token_secret'])
        st = api.GetUserTimeline(count=199)
        print(type(st))
        dmp = []
        for tweet in tweets:
            dmp.append(json.loads(str(tweet)))
        api.ClearCredentials()
        return dmp, 201

class SearchTweets(Resource):
    def get(self):
        return {"User post"}

    def post(self):
        args = parser.parse_args()
        api = twitter.Api(consumer_key=args['consumer_key'], consumer_secret=args['consumer_secret'],access_token_key=args['access_token'],access_token_secret=args['access_token_secret'])

        tw = api.GetUserTimeline(screen_name=args['term'], count=100, include_rts=False)
        
        dmp = []
        for s in tw:
            dmp.append(json.loads(str(s)))

        # Need to add error handler here, in case user does not exist...

        api.ClearCredentials()
        return dmp, 201

api.add_resource(GetTweets, '/api/gettweets')
api.add_resource(SearchTweets, '/api/search')
api.add_resource(LastSevenDays, '/api/lastseven')

# GetMentions
# GetSearch

if __name__ == '__main__':
    app.run()
