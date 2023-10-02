"use client";

import { useState } from "react";
import { runLighthouse } from "./lighthouseApiCaller";
import { getArticles } from "./capiCaller";

const test = {
  response: {
    status: "ok",
    userTier: "developer",
    total: 2454651,
    startIndex: 1,
    pageSize: 10,
    currentPage: 1,
    pages: 245466,
    orderBy: "newest",
    results: [
      {
        id: "football/live/2023/sep/30/aston-villa-v-brighton-premier-league-live-updates",
        type: "liveblog",
        sectionId: "football",
        sectionName: "Football",
        webPublicationDate: "2023-09-30T12:51:58Z",
        webTitle: "Aston Villa v Brighton: Premier League – live",
        webUrl:
          "https://www.theguardian.com/football/live/2023/sep/30/aston-villa-v-brighton-premier-league-live-updates",
        apiUrl:
          "https://content.guardianapis.com/football/live/2023/sep/30/aston-villa-v-brighton-premier-league-live-updates",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "sport/live/2023/sep/30/ryder-cup-2023-day-two-live-golf-updates",
        type: "liveblog",
        sectionId: "sport",
        sectionName: "Sport",
        webPublicationDate: "2023-09-30T12:51:19Z",
        webTitle:
          "Ryder Cup 2023: Europe lead 9½-2½ against USA on day two – live",
        webUrl:
          "https://www.theguardian.com/sport/live/2023/sep/30/ryder-cup-2023-day-two-live-golf-updates",
        apiUrl:
          "https://content.guardianapis.com/sport/live/2023/sep/30/ryder-cup-2023-day-two-live-golf-updates",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "sport/live/2023/sep/30/argentina-v-chile-rugby-world-cup-2023-live",
        type: "liveblog",
        sectionId: "sport",
        sectionName: "Sport",
        webPublicationDate: "2023-09-30T12:49:19Z",
        webTitle: "Argentina v Chile: Rugby World Cup 2023 – live",
        webUrl:
          "https://www.theguardian.com/sport/live/2023/sep/30/argentina-v-chile-rugby-world-cup-2023-live",
        apiUrl:
          "https://content.guardianapis.com/sport/live/2023/sep/30/argentina-v-chile-rugby-world-cup-2023-live",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "football/live/2023/sep/30/wolves-v-manchester-city-bournemouth-v-arsenal-and-more-premier-league-football-live",
        type: "liveblog",
        sectionId: "football",
        sectionName: "Football",
        webPublicationDate: "2023-09-30T12:44:30Z",
        webTitle:
          "Wolves v Manchester City, Bournemouth v Arsenal: Premier League and more – live",
        webUrl:
          "https://www.theguardian.com/football/live/2023/sep/30/wolves-v-manchester-city-bournemouth-v-arsenal-and-more-premier-league-football-live",
        apiUrl:
          "https://content.guardianapis.com/football/live/2023/sep/30/wolves-v-manchester-city-bournemouth-v-arsenal-and-more-premier-league-football-live",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "us-news/2023/sep/30/us-government-shutdown-congress-senate-kevin-mccarthy",
        type: "article",
        sectionId: "us-news",
        sectionName: "US news",
        webPublicationDate: "2023-09-30T12:38:22Z",
        webTitle:
          "Senate gathers to advance bipartisan stopgap spending bill to avert shutdown",
        webUrl:
          "https://www.theguardian.com/us-news/2023/sep/30/us-government-shutdown-congress-senate-kevin-mccarthy",
        apiUrl:
          "https://content.guardianapis.com/us-news/2023/sep/30/us-government-shutdown-congress-senate-kevin-mccarthy",
        isHosted: false,
        pillarId: "pillar/news",
        pillarName: "News",
      },
      {
        id: "sport/2023/sep/30/simone-biles-breathtaking-return-adds-a-new-layer-to-her-unique-legacy",
        type: "article",
        sectionId: "sport",
        sectionName: "Sport",
        webPublicationDate: "2023-09-30T12:35:49Z",
        webTitle:
          "Simone Biles’ breathtaking return adds a new layer to her unique legacy",
        webUrl:
          "https://www.theguardian.com/sport/2023/sep/30/simone-biles-breathtaking-return-adds-a-new-layer-to-her-unique-legacy",
        apiUrl:
          "https://content.guardianapis.com/sport/2023/sep/30/simone-biles-breathtaking-return-adds-a-new-layer-to-her-unique-legacy",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "uk-news/2023/sep/30/mucky-duck-restaurant-digger-nottinghamshire-police",
        type: "article",
        sectionId: "uk-news",
        sectionName: "UK news",
        webPublicationDate: "2023-09-30T12:29:05Z",
        webTitle:
          "Restaurant owner in UK ‘lost for words’ after digger rams into historic building",
        webUrl:
          "https://www.theguardian.com/uk-news/2023/sep/30/mucky-duck-restaurant-digger-nottinghamshire-police",
        apiUrl:
          "https://content.guardianapis.com/uk-news/2023/sep/30/mucky-duck-restaurant-digger-nottinghamshire-police",
        isHosted: false,
        pillarId: "pillar/news",
        pillarName: "News",
      },
      {
        id: "sport/2023/sep/30/i-wont-change-jon-rahm-blasts-back-at-brooks-koepkas-childish-jibe",
        type: "article",
        sectionId: "sport",
        sectionName: "Sport",
        webPublicationDate: "2023-09-30T12:24:39Z",
        webTitle:
          "‘I won’t change’: Jon Rahm blasts back at Brooks Koepka’s ‘childish’ jibe",
        webUrl:
          "https://www.theguardian.com/sport/2023/sep/30/i-wont-change-jon-rahm-blasts-back-at-brooks-koepkas-childish-jibe",
        apiUrl:
          "https://content.guardianapis.com/sport/2023/sep/30/i-wont-change-jon-rahm-blasts-back-at-brooks-koepkas-childish-jibe",
        isHosted: false,
        pillarId: "pillar/sport",
        pillarName: "Sport",
      },
      {
        id: "commentisfree/2023/sep/30/all-eyes-in-europe-are-focused-on-polands-divisive-election-fight-but-its-not-a-pretty-sight",
        type: "article",
        sectionId: "commentisfree",
        sectionName: "Opinion",
        webPublicationDate: "2023-09-30T12:17:26Z",
        webTitle:
          "All eyes are focused on Poland’s election fight. It’s not a pretty sight | Simon Tisdall",
        webUrl:
          "https://www.theguardian.com/commentisfree/2023/sep/30/all-eyes-in-europe-are-focused-on-polands-divisive-election-fight-but-its-not-a-pretty-sight",
        apiUrl:
          "https://content.guardianapis.com/commentisfree/2023/sep/30/all-eyes-in-europe-are-focused-on-polands-divisive-election-fight-but-its-not-a-pretty-sight",
        isHosted: false,
        pillarId: "pillar/opinion",
        pillarName: "Opinion",
      },
      {
        id: "society/2023/sep/30/snap-food-insecurity-government-shutdown",
        type: "article",
        sectionId: "society",
        sectionName: "Society",
        webPublicationDate: "2023-09-30T12:00:14Z",
        webTitle:
          "The hidden cost of a shutdown: America’s battle with food insecurity",
        webUrl:
          "https://www.theguardian.com/society/2023/sep/30/snap-food-insecurity-government-shutdown",
        apiUrl:
          "https://content.guardianapis.com/society/2023/sep/30/snap-food-insecurity-government-shutdown",
        isHosted: false,
        pillarId: "pillar/news",
        pillarName: "News",
      },
    ],
  },
};

export default function Home() {
  function callLighthouse(text: string) {
    let data = { Title: "", weight: 0 };
    const reply = runLighthouse(text);
    reply.then((res) => (data = res));
    return data;
  }

  const ArticleButton = (articleUrl: string) => {
    return (
      <>
        <button key={articleUrl} onClick={() => callLighthouse(articleUrl)}>
          {articleUrl}
        </button>
      </>
    );
  };
  // const buttonList: JSX.Element[] = [];

  // const articleButton = (buttonUrl: string) => {
  //   return (
  //     <div>
  //       {buttonUrl}
  //       {/* <button onClick={() => callLighthouse(buttonUrl)}>{buttonUrl}</button> */}
  //     </div>
  //   );
  // };
  // function getArticleButtons(urlList: string[]) {
  //   for (let i = 0; i < urlList.length; i++) {
  //     const button = articleButton(urlList[i]);
  //     buttonList.push(button);
  //   }
  //   console.log(buttonList);
  // }

  // function addUrlToList(res: any) {
  //   let list: string[] = [];
  //   for (let i = 0; i < res.response.results.length; i++) {
  //     list.push(res.response.results[i].webUrl);
  //   }
  //   console.log(list);
  //   getArticleButtons(list);
  // }

  const [list, setList] = useState<JSX.Element[]>();

  let listOfResults: any[] = [];
  function getList(listOfWebUrls: string[]) {
    for (let i = 0; i < listOfWebUrls.length; i++) {
      const result = callLighthouse(listOfWebUrls[i]);
      const formattedResult = () => {
        return (
          <div>
            <p>
              {result.Title} and
              {result.weight}
            </p>
          </div>
        );
      };
      listOfResults.push(formattedResult);

      // const Button = ArticleButton(listOfWebUrls[i]);
      // listOfButtons.push(Button);
      // setList(listOfButtons);
    }
    setList(listOfResults);
  }

  function callCapi() {
    const reply = getArticles().then((res) => getList(res));
  }

  const ActualList = () => {
    return <div></div>;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex flex-row">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
        </p>
        <button onClick={() => callLighthouse("hello")}>send hello</button>
        <button onClick={() => callCapi()}>get capi</button>
      </div>
      <div>Articles: {list}</div>
      {/* <ActualList /> */}
      {/* <div>{listOfResults}</div> */}
    </main>
  );
}
