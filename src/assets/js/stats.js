require("chart.js");
require("chartkick");

function fetchData() {
  fetch("/stats.json")
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      let data = processData(res.posts);
      displayCharts(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function displayCharts(data) {
  // console.log(`displayCharts()`);
  // console.log(data);
  new Chartkick.ColumnChart("chart-holder", data, {
    ytitle: "Words",
    xtitle: "Days of week",
  });
}

function processData(posts) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let totals = [
    // [totalWordCount, numberofDaysMakingThatCount]
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  // set up structure of final data array to be returned
  let data = [
    // data will be bi-dimensional array ["Dayname", totalWordCount]
    {
      name: "Total word count",
      data: [],
    },
    // data will be bi-dimensional array ["Dayname", averageWordCount]
    {
      name: "Daily average",
      data: [],
    },
  ];

  //extract word counts from posts (and count posts per weekday)
  posts.forEach((post) => {
    let date = new Date(post.date);
    totals[date.getDay()][0] += post.wordCount;
    totals[date.getDay()][1] += 1;
    //console.log(`${post.title}: ${post.wordCount}`);
  });

  let totalWordCountData = [
    ["Sun", 0],
    ["Mon", 0],
    ["Tue", 0],
    ["Wed", 0],
    ["Thu", 0],
    ["Fri", 0],
    ["Sat", 0],
  ];
  let averageWordCountData = [
    ["Sun", 0],
    ["Mon", 0],
    ["Tue", 0],
    ["Wed", 0],
    ["Thu", 0],
    ["Fri", 0],
    ["Sat", 0],
  ];
  for (let i = 0; i < totals.length; i++) {
    let wc = totals[i][0];
    let days = totals[i][1];
    let av = Math.round(wc / days);
    let dow = weekdays[i];
    //console.log(`${dow}: ${wc} : ${days} : ${av}`);
    totalWordCountData[i][1] = wc;
    averageWordCountData[i][1] = av;
  }

  data[0].data = totalWordCountData;
  data[1].data = averageWordCountData;

  return data;
}

fetchData();
