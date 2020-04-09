import requests
from config import key
from flask import Flask, jsonify, render_template, redirect

app = Flask(__name__)


#################################################
# Database Setup
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/stocks")
def stocks():
# Build the endpoint URL for DJI, GSPC, IXIC, VIX
# Time : one day interval
    target_url = (f'https://api.twelvedata.com/time_series?symbol=DJI,GSPC,IXIC,VIX&start_date=2020-01-22&interval=1day&apikey={key}')
    stock_data = requests.get(target_url).json()
    stocks = list(stock_data.keys())
    mylist = []
    for stock in stocks:
        values = stock_data[stock]["values"]
        for value in values:
            value["name"] = stock
            mylist.append (value)   
    return jsonify(mylist)



@app.route("/us")
def us():
    """Return a list of sample names."""
    target_url = ('https://api.covid19api.com/total/dayone/country/us/status/confirmed')
    US_data = requests.get(target_url).json()
    # Return a list of the column names 
    return jsonify(US_data)


if __name__ == "__main__":
    app.run(debug=True)
