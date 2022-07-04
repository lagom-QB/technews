import React, { useState, useEffect, useRef } from "react";
import styles from "./fetcher1.module.css";
// Bring in the d3 library
import * as d3 from "d3";

const frequencyChart = (wordCount) => {
  const margin = { top: 40, right: 3, bottom: 1, left: 100 },
    width = 1300 - margin.left - margin.right,
    height = 3000 - margin.top - margin.bottom;

  var histsvg = d3
      .select("#wordsPlot")
      .append("svg")
      .attr("viewBox", [0, 0, 1300, 1700])
      .attr("preserveAspectRatio", "xMidYMid meet")
      .attr("transform", "translate(" + 0 + "," + margin.top + ")"),
    g = histsvg.append("g");
  barPlot(g, wordCount, margin, width, height);

  titleText(histsvg);

  console.log("new plot", histsvg.node());
  return histsvg.node();
};

const wordFreq = (sentence) => {
  const STOPWORDS = [
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "you're",
    "you've",
    "you'll",
    "you'd",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "she's",
    "her",
    "hers",
    "herself",
    "it",
    "it's",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "that'll",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "can",
    "will",
    "just",
    "don",
    "don't",
    "should",
    "should've",
    "now",
    "ll",
    "re",
    "ve",
    "ain",
    "aren",
    "aren't",
    "couldn",
    "couldn't",
    "didn",
    "didn't",
    "doesn",
    "doesn't",
    "hadn",
    "hadn't",
    "hasn",
    "hasn't",
    "haven",
    "haven't",
    "isn",
    "isn't",
    "ma",
    "mightn",
    "mightn't",
    "mustn",
    "mustn't",
    "needn",
    "needn't",
    "shan",
    "shan't",
    "shouldn",
    "shouldn't",
    "wasn",
    "wasn't",
    "weren",
    "weren't",
    "won",
    "won't",
    "wouldn",
    "wouldn't",
  ];

  var important = {};
  let res = sentence
    .replace(/[.]/g, "")
    .split(/\s/)
    .reduce(
      (map, word) =>
        Object.assign(map, {
          [word]: map[word] ? map[word] + 1 : 1,
        }),
      {}
    );

  // Remove numerical entries
  Object.entries(res).forEach(([key, value]) => {
    if ((value > 1) & (key.length > 1)) {
      if (
        isNaN(parseFloat(key)) &&
        !isFinite(key) &&
        STOPWORDS.indexOf(key.toLowerCase()) <= 0
      ) {
        important[key] = value;
      }
    }
  });

  return important;
};
function mostCommonWord(wordCount) {
  return Object.keys(wordCount).reduce((a, b) =>
    wordCount[a] > wordCount[b] ? a : b
  );
  /* console.log(
    "start...",
    wordCount,
    Object.keys(wordCount).reduce((a, b) =>
      wordCount[a] > wordCount[b] ? a : b
    ),
    wordCount[
      Object.keys(wordCount).reduce((a, b) =>
        wordCount[a] > wordCount[b] ? a : b
      )
    ]
  ); */
}
function leastCommonWord(wordCount) {
  return Object.keys(wordCount).reduce((a, b) =>
    wordCount[a] < wordCount[b] ? a : b
  );
  /* console.log(
    "start...",
    wordCount,
    Object.keys(wordCount).reduce((a, b) =>
      wordCount[a] > wordCount[b] ? a : b
    ),
    wordCount[
      Object.keys(wordCount).reduce((a, b) =>
        wordCount[a] > wordCount[b] ? a : b
      )
    ]
  ); */
}

function barPlot(g, wordCount, margin, width, height) {
  var bins = d3.bin()(Object.values(wordCount)),
    x = d3
      .scaleLinear()
      .domain([1, 14])
      .range([margin.left, width - margin.right]),
    y = d3
      .scaleBand()
      .range([0, height / 2])
      .domain(Object.keys(wordCount))
      .padding(0.1);

  g.append("g")
    .attr("class", ".plot")
    .attr("transform", "translate(-5,45)")
    .selectAll("myRect")
    .data(Object.entries(wordCount))
    .enter()
    .append("rect")
    .attr("x", Math.abs(x(0) + margin.left))
    .attr("y", function (d) {
      return y(d[0]);
    })
    .attr("width", function (d) {
      //   console.log(d[1]);
      return x(d[1]);
    })
    .attr("ry", 3)
    .attr("fill", (d, i) => {
      return d3.interpolate("pink", "darkgrey")(d3.randomUniform()());
    })
    .attr("height", y.bandwidth() - 10);
  /* .attr("fill", barColors(randomNum)) */
  bottomAxis(g, height, x);
  leftAxis(g, margin, y);
}
function titleText(histsvg) {
  histsvg
    .append("text")
    .attr("transform", "translate(500,-30)")
    .attr("x", 50)
    .attr("y", 50)
    .attr("font-size", "2.6rem")
    .attr("font-family", "monospace")
    .attr("fill", "grey")
    .text("Count of Common Words");
}

function bottomAxis(g, height, x) {
  g.append("g")
    .attr("transform", "translate(10," + height / 1.94 + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", 18);
}

function leftAxis(g, margin, y) {
  g.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .style("text-anchor", "end")
    .style("font-size", 14);
}

function WordCount() {
  var url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(true),
    [wordsObject, setWordsObject] = useState(true),
    [titleText, setTitleText] = useState(null),
    wordSvg = useRef(null);

  useEffect(() => {
    const getData = async () => {
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((apiData) => {
          setApiData(apiData.data.children);

          let titles = "";
          var res = apiData.data.children.map((obj, idx) => {
            titles += " " + obj.data.title;
          });
          setTitleText(titles);

          var wordfrequency = wordFreq(titles);
          var newplot = frequencyChart(wordfrequency);
          setWordsObject(wordfrequency);

          if (wordSvg.current) {
            wordSvg.current.appendChild(newplot);
          }
        })
        .catch((error) => {
          console.error("Error :\t" + error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getData();
  }, []);

  if (loading) return "\nloading...";
  if (error) return "Error !" + error;

  return (
    <div className={styles.data}>
      <div className={styles.wordsPlotDiv}>
        <br />
        <span className={styles.title}>
          How often do the words from the posts occur?
        </span>
        <div className={styles.wordsPlot} ref={wordSvg} id="wordsPlot">
          <div className={styles.wordsGraph} id="wordsGraph"></div>
        </div>
        <hr />
        <div className={styles.text}>
          I realised the most common word is{" "}
          <code className={styles.conclude}>{mostCommonWord(wordsObject)}</code>{" "}
          used{" "}
          <code className={styles.conclude}>
            {wordsObject[mostCommonWord(wordsObject)]}
          </code>{" "}
          times while the least used word was
          <code className={styles.conclude}>
            {leastCommonWord(wordsObject)}
          </code>{" "}
          used{" "}
          <code className={styles.conclude}>
            {wordsObject[leastCommonWord(wordsObject)]}
          </code>{" "}
          times.
        </div>
      </div>
    </div>
  );
}

export default WordCount;
