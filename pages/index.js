import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Suspense } from "react";

import AboutTime from "../components/fetcher";
import WordCount from "../components/fetcher1";

export default function Home() {
  const underlineText = { textDecoration: "underline", display: "inline" };

  return (
    <div className={styles.container}>
      <Head>
        <title>Reddit Analysis</title>
        <meta name="description" content="Analyzing r/technews subreddit" />
        <link rel="icon" href="/analysis.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          An analysis of the{" "}
          <a href="http://reddit.com/r/technews" target="_blank">
            r/technews
          </a>{" "}
          data of the current month
        </h1>

        <p className={styles.description}>
          The goal of this project is to explore the data and present insights
          drawn from the data <br />
          This data is being pulled using the{" "}
          <a href="https://www.reddit.com/r/technews/hot.json" target="_blank">
            reddit API
          </a>
          .{"\n "}
          The <code className={styles.code}>r/technews</code> subreddit contains
          interesting technology news.
        </p>

        <div className={styles.info}>
          By <p style={underlineText}>Quinsy Brenda</p>
        </div>

        <div className={styles.text}>
          This data concerns the current month and year.
          <br />
          <a href="http://reddit.com/r/technews" target="_blank">
            r/technews
          </a>{" "}
          has <em>470000+</em> subscribers. It shows how often the posts are
          being crossposted, and what the population is talking about recently.
          For the recent posts, I use the previous and current day to look at
          frequent words.
          <br />
          After the cleaning, analysing and poking around in the data, I found
          the following columns to be interesting:
          <ol>
            <li>title</li>
            <li>all_awardings</li>
            <li>author</li>
            <li>permalink</li>
            <li>upvote_ratio</li>
            <li>total_awards_recieved</li>
            <li>score</li>
            <li>num_comments</li>
            <li>num_crossposts</li>
          </ol>
          I also found it necessary to calculate the Day and Time of creation of
          each post because it will be important in my analysis.
        </div>

        <Suspense fallback={`Loading Graphs ...`}>
          <AboutTime />
          <WordCount />
        </Suspense>

        <div className={styles.text}>
          In the future, what would be interesting to explore?
        </div>
      </main>
    </div>
  );
}
