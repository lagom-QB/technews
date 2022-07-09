import React, { useState, useEffect, useRef, Suspense } from "react";
import styles from "./fetcher.module.css";

import * as d3 from "d3";

const chart = (apiData, creatingChart, setCreatingChart) => {
  console.log("Creating first chart here...");
  const margin = { top: 10, right: 25, bottom: 1, left: 25 },
    svgWidth = 1200,
    svgHeight = 90,
    data = apiData;

  var svg = d3
      .select("#plot")
      .append("svg")
      .attr("viewBox", [0, 0, 1300, 80])
      .attr("width", svgWidth - 100)
      .attr("height", svgHeight * 2),
    mouseout = function (d) {
      // console.log("mouse left");
      d3.selectAll("#tooltip").remove();

      d3.select(this)
        .style("opacity", 0.6)
        .attr("fill", "#0C9CDF")
        .attr("stroke", "grey")
        .attr("stroke-width", 0.4);
    },
    mouseover = (d) => {
      d3.select(this)
        .style("opacity", 0.8)
        .attr("fill", "#7ED26D")
        .attr("stroke", "white")
        .attr("stroke-width", 0.4);

      svg
        .append("text")
        .attr("id", "tooltip")
        .style("opacity", 0.8)
        .attr("fill", "black")
        .attr(
          "transform",
          "translate(" +
            svgWidth / 2 +
            "," +
            svgHeight / 10 +
            margin.bottom * 2 +
            ")"
        )
        .style("font-size", 30)
        .text(d.toElement.innerHTML.split(",")[1].split("<")[0]);
    };

  svg
    .selectAll("mycircle")
    .append("g")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d, i) {
      return (i + 1) * 12;
    })
    .attr("cy", function (d) {
      let time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");

      const res = time[0] * 60 + time[1];
      return parseInt(res.slice(3, res.length)) + 10;
    })
    .attr("stroke", "white")
    .attr("stroke-width", 0.4)
    .attr("r", (d) => {
      let time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");
      /* let actual = ((time[0] * 60 + time[1] + time[2] / 60) / 100).toString();
      const res =
        actual.split(".")[1].slice(0, 1) +
        "." +
        actual.split(".")[1].slice(2, actual.length);
      return res * 2; */
      return parseInt(time[1]) + parseInt(time[2]);
    })
    .attr("fill", "#7ED26D")
    .attr("opacity", 0.8)
    // .style("margin-top", 20)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .append("div")
    .text(
      (d) => new Date(d.data.created_utc).toLocaleString() //.split(" ")[0].slice(0, 5)
    );

  // if (svg.node()) {
  //   setCreatingChart(false);
  //   console.log("Created the First graph");
  // } else {
  //   console.log("unable to create the first graph", svg.node());
  // }

  // return svg.node();
};
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
  const url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
    [times, setTimes] = useState(null),
    [loading, setLoading] = useState(true),
    [creatingChart, setCreatingChart] = useState(true),
    svg = useRef(null);

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

          let ts = "",
            res = apiData.data.children.map((obj, idx) => {
              ts += " " + new Date(obj.data.created).toLocaleTimeString();
            });

          setTimes(toObjectConverter(ts));

          const plot = chart(
            apiData.data.children,
            creatingChart,
            setCreatingChart
          );

          console.log("plot 1...", plot);
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
  }, []);

  if (loading) return "loading...";
  if (error) return "Error !" + error;
  // console.log(apiData);

  return (
    <div className={styles.data}>
      <span className={styles.title}>Data sample</span>
      <ol className={styles.list}>
        {apiData.slice(0, 2).map((obj, idx) => (
          <li key={idx} className={styles.listItem}>
            <>
              <a href={obj.data.url} target="_blank">
                {obj.data.title}
              </a>
              <br />
              {"By " +
                obj.data.author +
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
          <div className={styles.plot} ref={svg} id="plot" />
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
