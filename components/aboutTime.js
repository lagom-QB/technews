import React, { useState, useEffect, useRef, Suspense } from "react";
import styles from "./aboutTime.module.css";

import * as d3 from "d3";

function toObjectConverter(sentence) {
  const res = sentence
    .replace(/[.,?!;()"'-]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .split(" ")
    .reduce((index, word) => {
      if (!index.hasOwnProperty(word)) index[word] = 0;
      index[word]++;
      return index;
    }, {});
  return res;
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

function chart(apiData) {
  var margin = { top: 10, right: 25, bottom: 10, left: 25 },
    svgWidth = 1200,
    svgHeight = 90;

  const scatterSvg = d3
    .select("#plot")
    .append("svg")
    .attr("viewBox", [0, 0, 1300, 80])
    .attr("width", svgWidth - 100)
    .attr("height", svgHeight * 2);
  var mouseout = function (_d) {
    // console.log("mouse left");
    d3.selectAll("#tooltip").remove();

    d3.select(this)
      .style("opacity", 0.6)
      .attr("fill", "#0C9CDF")
      .attr("stroke", "grey")
      .attr("stroke-width", 0.4);
  };
  var mouseover = (d) => {
    d3.select(this)
      .style("opacity", 0.8)
      .attr("fill", "#7ED26D")
      .attr("stroke", "white")
      .attr("stroke-width", 0.4);

    scatterSvg
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

  scatterSvg
    .selectAll("circles")
    .append("g")
    .data(apiData)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => (i + 1) * 12)
    .attr("cy", function (d) {
      const time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");

      const res = time[0] * 60 + time[1];
      console.log("cy", parseInt(res.slice(3)) + 10);
      return parseInt(res.slice(3, res.length)) + 10;
    })
    .attr("r", (d) => {
      var time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");

      console.log("radius ...", parseInt(time[1]) + parseInt(time[2]));
      return parseInt(time[1]) + parseInt(time[2]);
    })
    .attr("fill", "#7ED26D")
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .attr("opacity", 0.8)
    .attr("stroke", "white")
    .attr("stroke-width", 0.4)
    .append("div")
    .text((d) => {
      console.log(
        "times",
        new Date(d.data.created).toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      return new Date(d.data.created).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

  console.log("checking...", scatterSvg.node());
  return scatterSvg.node();
}

function AboutTime() {
  var url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
    [times, setTimes] = useState(null),
    [loading, setLoading] = useState(true),
    [plot, setPlot] = useState(null),
    plotVar = null,
    svgGraph = useRef(null);

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

          setTimes(toObjectConverter(ts.slice(7)));

          plotVar = chart(dataIneed);

          if (plotVar) {
            console.log("plot 1...", plotVar);
            setPlot(plotVar);
          }
          /* if (svgGraph.current) {
            svgGraph.current.appendChild(plotVar);
          } */
        })
        .catch((error) => {
          console.error("Error fetching data :\n" + error);
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
  console.log("results ...", plot, typeof plot);

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
          How often do these people post at given times?
        </span>

        {/* <div className={styles.plot} ref={svg} id="plot" />
         */}
        {
          <div className={styles.plot} id="plot">
            {plot}
          </div>
        }
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
