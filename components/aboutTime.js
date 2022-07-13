import React, { useState, useEffect, useRef, Suspense } from "react";
import styles from "./aboutTime.module.css";

import * as d3 from "d3";

const chart = function (dataINeed) {
  if (!dataINeed) return "loading...";

  const margin = { top: 10, right: 25, bottom: 5, left: 25 },
    svgWidth = 1000,
    svgHeight = 90;

  var x = d3
      .scaleLinear()
      .domain([0, Object.values(dataINeed).length])
      .range([margin.left, svgWidth - margin.right]),
    xAxis = (g) =>
      g
        .attr(
          "transform",
          `translate(${margin.left},${svgHeight - margin.bottom})`
        )
        .call(d3.axisBottom(x).ticks(1));

  var colorScheme = d3.interpolateRdBu;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var svg = d3
    .select("#plot")
    .append("svg")
    .attr("viewBox", [0, 0, 1300, 80])
    .attr("width", svgWidth)
    .attr("height", svgHeight * 2);
  var mouseout = function (d) {
    d3.selectAll("#tooltip").remove();

    d3.select(this)
      .style("opacity", 0.6)
      .attr("fill", "#0C9CDF")
      .attr("stroke", "grey")
      .attr("stroke-width", 0.4);
  };
  var mouseover = function (d) {
    d3.select(this)
      .style("opacity", 0.8)
      .attr("fill", "#7ED26D")
      .attr("stroke", "white")
      .attr("stroke-width", 0.4);

    svg
      .append("text")
      .attr("id", "tooltip")
      .style("opacity", 0.8)
      .attr("fill", "gray")
      .attr(
        "transform",
        `translate(${svgWidth / 2 - margin.left + margin.right},${
          margin.top + margin.bottom
        })`
      )
      .style("font-size", 30)
      .text(d.toElement.innerHTML.slice(6, -7) + " posts");
  };
  var g = svg.append("g").attr("class", "scatterPlot");

  scatterPlot(g, dataINeed, mouseover, mouseout, margin);
  // svg.append("g").attr("class", "bottomAxis").call(xAxis);
  console.log("finally ...", svg.node());

  return svg.node();
};
function scatterPlot(svg, dataINeed, mouseover, mouseout, margin) {
  return svg
    .attr("transform", `translate(${margin.left + margin.right},${margin.top})`)
    .selectAll("myCircle")
    .data(Object.values(dataINeed))
    .enter()
    .append("circle")
    .attr("cx", (d, i) => {
      // Move along the x axis
      return i * 60;
    })
    .attr("cy", 90)
    .attr("r", (d) => {
      // console.log("radius -->", d);
      return d * 3;
    })
    .attr("fill", "#0C9CDF")
    .attr("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .attr("stroke", "grey")
    .attr("stroke-width", 0.4)
    .append("span")
    .text((d) => d);
}

function toObjectConverter(sentence) {
  return sentence
    .replace(/[.,?!;()"'-]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .reduce((index, word) => {
      if (!index.hasOwnProperty(word)) index[word] = 0;
      index[word]++;
      return index;
    }, {});
}
function mostCommonWord(wordCount) {
  return Object.keys(wordCount).reduce((a, b) =>
    wordCount[a] > wordCount[b] ? a : b
  );
}
function leastCommonWord(wordCount) {
  return Object.keys(wordCount).reduce((a, b) =>
    wordCount[a] < wordCount[b] ? a : b
  );
}
function AboutTime() {
  var url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
    [times, setTimes] = useState(null),
    [loading, setLoading] = useState(true),
    [plotVal, setPlotVal] = useState(null),
    svg = useRef(null);

  useEffect(() => {
    const getData = async () => {
      fetch(url)
        .then((response) => response.json())
        .then((apiData) => {
          var dataIneed = apiData.data.children,
            ts = "";
          setApiData(dataIneed);

          dataIneed.forEach((obj) => {
            ts +=
              " " +
              new Date(obj.data.created).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
          });
          const timeVal = toObjectConverter(ts.slice(7));
          setTimes(timeVal);

          // const plot = chart(dataIneed);
          const plot = chart(timeVal);
          console.log("plot 1...", plot);
          setPlotVal(plot);
          if (svg.current) {
            svg.current.appendChild(plot);
          }
        })
        .catch((error) => {
          console.error("Error fetching data :\t" + error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getData();
  }, [loading]);

  if (loading) return "loading...";
  if (error) return "Error !" + error;
  console.log("plotVal...", plotVal);

  return (
    <div className={styles.data}>
      <span className={styles.title}>Data sample</span>
      <ol className={styles.list}>
        {apiData.slice(0, 4).map((obj, idx) => (
          <li key={idx} className={styles.listItem}>
            <>
              <a href={obj.data.url} target="_blank">
                {obj.data.title}
              </a>
              <br />
              {"By " +
                <span style={{ color: "blue" }}>obj.data.author</span> +
                " recieving " +
                obj.data.num_comments +
                " comments and " +
                obj.data.num_crossposts +
                " crossposts "}
              <br />
              <a
                href={"https://www.reddit.com" + obj.data.permalink}
                target="_blank"
              >
                [Reddit Post]
              </a>
              <br />
              {"@"}
              {new Date(obj.data.created_utc).toLocaleString().split(" ")[1]}
            </>
            <hr />
          </li>
        ))}
      </ol>
      <div className={styles.plotDiv}>
        <br />
        <span className={styles.title}>
          How often do the people post at given times?
        </span>
        <Suspense fallback={"Building chart..."}>
          <div className={styles.plot} ref={svg} id="plot"></div>
        </Suspense>
        <hr />
        <div className={styles.text}>
          I realised <u>{times[leastCommonWord(times)]} </u> post was/were made
          at <code className={styles.conclude}>{leastCommonWord(times)}</code>{" "}
          while <u>{times[mostCommonWord(times)]} </u> posts was/were made at
          <code className={styles.conclude}>{mostCommonWord(times)}</code>
        </div>
      </div>
    </div>
  );
}

export default AboutTime;
