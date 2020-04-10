var stocks = JSON.parse(localStorage.getItem('stocks'))
var covid = JSON.parse(localStorage.getItem('covid'))
console.log ("js is loaded")

d3.json("/stocks").then(function (data) {
  //stocks = data//.filter(obj => !obj.datetime.includes("-01-"))
  localStorage.setItem('stocks',JSON.stringify(data))
  stocks= JSON.parse(localStorage.getItem('stocks'))
  console.log(stocks)
  d3.json("/us").then(function (coviddata) {
    //covid = coviddata//.filter(obj => !obj.Date.split("T")[0].includes("-01-"))
    //save covid data to local storage
    // if (!covid){
    //   init()
    // }
    localStorage.setItem('covid',JSON.stringify(coviddata))
    covid = JSON.parse(localStorage.getItem('covid'))
    console.log(covid)
    //if nothing in covid, returns null and run init
    init()
  })
});
init()

function buildCharts(stock) {
  var stockInfo = stocks.filter(row => row.name === stock)
  var stockClose = stockInfo.map(row => row.close)
  var stockDate = stockInfo.map(row => row.datetime)
  var covidCases = covid.map(row => row.Cases)
  var covidDate = covid.map(row => row.Date.split("T")[0])
  // console.log(stockDate)
  var linetrace = {
    x: stockDate,
    y: stockClose,
    name: stock,
    type: 'scatter',
    marker: {
      color: 'rgb(0,0,255)'
    }

  };

  var bartrace = {
    x: covidDate,
    y: covidCases,
    name: 'US Covid cases',
    yaxis: 'y2',
    type: 'bar',
    marker: {
      color: 'rgb(255,51,051)'
    }

  };

  var data = [bartrace, linetrace];

  var layout = {
    title: 'US Covid19 cases and US Stock Indices',
    yaxis: { title: 'Stock Index' },
    yaxis2: {
      title: '# of Covid19 cases',
      overlaying: 'y',
      side: 'right',
      autorange: true,
      type: "linear"
    }

  }
  Plotly.newPlot('plot', data, layout);

}

function animateChart(stock) {
  var stockInfo = stocks.filter(row => row.name === stock)
  var stockClose = stockInfo.map(row => row.close)
  var animationData = {
    data: [{ y: stockClose }],

  }
  var transition = {
    transition: {
      duration: 500,
      easing: "cubic-in-out",
    },

    frame: {
      duration: 500,
    }
  }
  Plotly.animate('plot', animationData, transition);
}

// populate drop down
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#sel-stock');
  selector.html ("")
  // Use the list of sample names to populate the select options - reference server routes in app.py
  // route is the from app.py file. sample is id
  let stockNames = []
  stocks.forEach(stock => {
    if (!stockNames.includes(stock.name)) {
      stockNames.push(stock.name)
    }
  })
  stockNames.forEach(stock => {
    selector
      .append('option')
      .text(stock)
      .property('value', stock);
  });

  // Use the first sample from the list to build the initial plots
  const firstStock = stockNames[0];
  buildCharts(firstStock);
}

// // called in HTML - pass information from drop down here 
function optionChanged(newStock) {
  // Fetch new data each time a new sample is selected
  buildCharts(newStock);
  //animateChart(newStock)
}

 
