import React, { useState, useEffect } from "react";
import styles from "./fetcher.module.css";

import * as d3 from "d3";

function chart(apiData) {
  const svgWidth = 500,
    svgHeight = 500,
    data = apiData,
    barPadding = 5,
    barWidth = svgWidth / apiData.length;

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, svgWidth, svgHeight])
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  svg
    .selectAll("rect")
    .data(apiData)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
      return i;
    })
    .attr("y", function (d) {
      let time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");

      return svgHeight - (time[0] * 60 + time[1]);
    })
    .attr("width", () => {
      let res = barWidth + barPadding;
      return res;
    })
    .attr("height", (d) => {
      let time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");
      return time[0] * 60 + time[1] + time[2] / 60;
    })
    .attr("transform", (d, i) => {
      let translate = [barWidth * i, 0];
      // console.log("translate", translate);
      return `translate(${translate})`;
    })
    .attr("fill", "#7ED26D")
    .on("mouseover", function () {
      d3.select(this).transition().attr("fill", "#0C9CDF");
    })
    .on("mouseout", function () {
      d3.select(this).transition().attr("fill", "#7ED26D");
    })
    .attr("fill", "#7ED26D")
    .append("text")
    .text((d) => new Date(d.data.created_utc).toLocaleString().split(" ")[0]);

  return svg.node();
}

function Fetcher() {
  const url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(true);

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
        })
        .catch((error) => {
          console.error("Error fetching apiData :" + error);
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

  const plot = chart(apiData);
  console.log("plot ...", typeof plot, plot);

  return (
    <div className={styles.data}>
      <span className={styles.title}>Examples of the Data</span>
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
        <span className={styles.title}>Bar Chart</span>
        <div className={styles.plot}>{plot}</div>
        <hr />
      </div>
    </div>
  );
}

export default Fetcher;

{
  /*  <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */
}
