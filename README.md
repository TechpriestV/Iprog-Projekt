# iprogprojekt

> Projekt för DH2642
>
> This project uses Twitters API to gather user data, this is achived with a combination of firebase and flask based python backend that's setup as an restful API. Firebase handles OAUTH and functions as a small database for saving of search history.

## Build Setup

### Frontend

``` bash
# navigate to the code
cd ..Iprog-Projekt/

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Backend

```bash
# navigate to the backand
cd src/python

# if you don't have pip3 installed, install it. 
pip3 install flask, flask-restful, flask_cors, twitter-python

# run backend
python3 server.py
```
