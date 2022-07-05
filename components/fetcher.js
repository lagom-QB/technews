import React, { useState, useEffect, useRef, Suspense } from "react";
import styles from "./fetcher.module.css";

import * as d3 from "d3";

const chart = (apiData, creatingChart, setCreatingChart) => {
  console.log("Creating first chart here...");
  const margin = { top: 0, right: 1, bottom: 1, left: 1 },
    svgWidth = 760 - margin.left - margin.right,
    svgHeight = 120, //- margin.top - margin.bottom,
    data = apiData;

  var svg = d3
      .select("#plot")
      .append("svg")
      .attr("viewBox", [0, 0, 1300, 80])
      .attr("width", svgWidth + margin.left + margin.right)
      .attr("height", svgHeight + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(
        d3.zoom().on("zoom", function () {
          svg.attr("transform", d3.zoomTransform(this));
        })
      ),
    mouseout = function (d) {
      // console.log("mouse left");
      d3.selectAll("#tooltip").transition().delay(5).remove();

      d3.select(this)
        .style("opacity", 0.8)
        .attr("fill", "#0C9CDF")
        .attr("stroke", "white")
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
        .attr("fill", "#0C9CDF")
        .attr(
          "transform",
          "translate(" + margin.left + "," + margin.top + margin.bottom + ")"
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
      return res.slice(3, res.length);
    })
    .attr("stroke", "white")
    .attr("stroke-width", 0.4)
    .attr("r", (d) => {
      let time = new Date(d.data.created)
        .toLocaleString()
        .split(" ")[1]
        .split(":");
      let actual = ((time[0] * 60 + time[1] + time[2] / 60) / 100).toString();
      const res =
        actual.split(".")[1].slice(0, 1) +
        "." +
        actual.split(".")[1].slice(2, actual.length);
      return res * 2;
    })
    .attr("fill", "red")
    .attr("opacity", 0.8)
    // .style("margin-top", 20)
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .append("div")
    .text(
      (d) => new Date(d.data.created_utc).toLocaleString() //.split(" ")[0].slice(0, 5)
    );

  if (creatingChart) {
    // document.getElementById("plot").appendChild("building Chart...");
  }
  if (svg.node()) {
    setCreatingChart(false);
    console.log("Created the First graph");
  }

  return svg.node();
};

function AboutTime() {
  const url = "https://www.reddit.com/r/technews/hot.json?limit=100000",
    [apiData, setApiData] = useState(null),
    [error, setError] = useState(null),
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

          const plot = chart(
            apiData.data.children,
            creatingChart,
            setCreatingChart
          );

          // console.log("plot ...", plot);
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
          <div className={styles.plot} ref={svg} id="plot"></div>
        </Suspense>

        <hr />
        <div className={styles.text}>
          I realised the fewest post were made at{" "}
          <code className={styles.conclude}>5:00:52</code> while the most posts
          were made at<code className={styles.conclude}>4:59:58</code>
        </div>
      </div>
    </div>
  );
}

export default AboutTime;

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
