# new_project2
# Covid19 pandemic impact on US Financial Markets during January 2020 - March 2020

## Introduction
On January 7, 2020, the first confirmed case of a novel coronavirus, 2019-nCoV (Covid-19) was reported in
Wuhan, Hubei Province. Since then person to person transmission of Covid-19 has been occurring worldwide, including the first confirmed case reported in the United States on January 20, 2020. Covid-19 has been spreading
uncontrolled across the United States and has impacted the financial markets. The first quarter of 2020 was
the worst ever for the Dow and S&P 500. On March 16, 2020, the 2,997 point drop was the worst single-day drop in history. The previous record was four days earlier on March 12, 2020 when the Dow fell 2,353 point.  On March 31, 2020 the Dow recorded its worst first quarter in history, down 23.2%.

This project will analyze the US financial markets during this period through data from the following:
    1.  Dow Jones Industrial Averages (DJIA) - a stock market index that measures the stock performance of 30 large companies listed on the US stock exchanges.
    2.  S&P 500 (SNP)  - a stock market index that measures the stock performance of 500 large companies listed on the US stock exchanges.
    3. Nasdaq composite (NAS) - a stock market index of market capitalization-weighted index of equities listed on the Nasdaq stock exchange.
    4. Bitcoin (BTC) - The world’s largest cryptocurrency by market cap.
    5. VIX -  a measure of the stock market’s expectation of volatility based on S&P index options. It is often referred to as the fear index.


## Extract
Data on COVID19 was obtainged using an API call from https://covid19api.com/.
This data comes from a trusted source: Johns Hopkins Center for Systems Science and Engineering (CSSE).
The data is updated daily and includes a variety of information including summary of new and total cases per country, and cases by case type for a country from the first recorded case. There are also options to obtain "live" data where records are pulled every 10 minutes.

Data on financial markets came from  https://twelvedata.com/. We chose to use this API due to ease of use. But more importantly, this site provided access to everything we needed; stocks, forex, and cryptocurrencies. All data is available in real-time and historical formats. Twelve Data API also provides time series and technical indicators. It was free and there were no daily limits.


## Transform without Jupyter Notebook - directly from app.py
Covid-19 cases
We wanted to create a chart by day of confirmed Covid-19 cases. While we could have chosen any country, we decided on the United States since we were analyzing the US financial markets. Unlike project 2, we use requests.get directly from app.py. The request returned a JSON file.

Financials
Twelve Data has the option to return data in JSON or CSV. Again, we use requests.get directly from app.py.   The raw data returns , a dictionary 

 "values": [
            {
                "close": "23867.16016",
                "datetime": "2020-04-09",
                "high": "23964.22070",
                "low": "23689.10938",
                "open": "23737.60938",
                "volume": "43493588"
            },

Once completed, we used flask to load the database into two app routes.

Steps that were not done :
1.transformed into a DataFrame using Pandas in Python on a Jupyter Notebook. 
2.create separate CSV files - added an index and converted this into a CSV for DJIA, SNP, NAS, VIX,and BTC.
3.Combine CSV files - add "name" to identify the stock index, then concatenate dataframes for DJIA, SNP, NAS and VIX, add an index and convert into as CSV file.
4.Load to SQLite using DB Browser.

## Using Heroku
## Procfile
Heroku is a cloud platform as a service supporting several programming languages. 
Procfile is created and used for Heroku to know which file to look for in the server file.
Inside this file, there is one line, web: gunicorn app:app
gunicorn - for launching to heroku
app:app - refers to app = Flask(__name__) inside app.py

## requirements.txt
This file was created by running pip freeze > requirements.txt in gitbash. It contains a list of modules needed for Heroku.


## app.js - using LocalStorage
Using LocalStorage helped speed load time tremendously. This allows JSON files to be stored inside the browser. When called, the older stock and covid data is fetched in local storage. 
d3.json("/stocks") is asynchoronus, meaning it will continue through the program
.then(function (data) represents data we are waiting for from the APA. Once received, it will update local storage

## Creating Charts
We use the app routes to create one visualizations using Plotly, which uses a dropdown menu to select the financial index.
Line and Barchart - The line chart of the selected stock market index would display with a bar chart of the US Covid cases. In order to emphasize the impact of the Covid-19 acceleration seen in March. 
    
# Conclusion
Heroku and LocalStorage illustrated how the same project could be created more efficiently and with less code. API calls are made quickly to retrieve daily data. Using LocalStorage allows the graph to display without having to wait for data to be retrieved. 

# Special Thank you
Acknowledgement to Justin Moore, who walked me through the code and introduced me Heroku and LocalStorage.  Both were completely outside the scope of the Data Analytics Bootcamp.