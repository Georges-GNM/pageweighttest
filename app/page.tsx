"use client";

import { use, useEffect, useState } from "react";
import { runLighthouse } from "./lighthouseApiCaller";
import { getArticles } from "./capiCaller";
import { Button } from "@guardian/source-react-components";

export default function Home() {
  type dashboardData = {
    time: string;
    weight: string;
    url: string;
    title: string;
    pageLoadTime: string;
    pageType: string;
  };

  const TimeUpdated = "Last updated at ...";

  const [platform, setPlatform] = useState<"Desktop" | "Mobile">("Desktop");

  function setDesktop() {
    setPlatform("Desktop");
  }

  function setMobile() {
    setPlatform("Mobile");
  }

  const [capiList, setCapiList] = useState<string[]>([""]);

  function callCapi() {
    const reply = getArticles()
      .then((res) => setCapiList(res))
      .then(() => {
        console.log("got capilist: ", capiList);
      });
    return reply;
  }

  const [data, setData] = useState<
    {
      time: string;
      weight: string;
      url: string;
      title: string;
      pageLoadTime: string;
      pageType: string;
    }[]
  >([
    {
      time: "c",
      weight: "weight",
      url: "url",
      title: "title",
      pageLoadTime: "pageLoadTime",
      pageType: "pageType",
    },
  ]);

  function callLighthouse(text: string) {
    let data = {
      time: "time",
      weight: "weight",
      url: "url",
      title: "title",
      pageLoadTime: "pageLoadTime",
      pageType: "pageType",
    };
    const reply = runLighthouse(text);
    reply.then((res) => (data = res));
    console.log("data", data);
    return reply;
  }

  function refreshLighthouseData(capiList: string[]) {
    //array of lighthouse data
    let listOfLighthouseResults = [];
    for (let i = 0; i < capiList.length; i++) {
      const result = callLighthouse(capiList[i]);
      console.log("result", result);
      result.then((res) => listOfLighthouseResults.push(res));
      // listOfLighthouseResults.push(result);
    }
    setData(listOfLighthouseResults);
    console.log("listOfLighthouseResults", listOfLighthouseResults);
  }

  // let listOfResults: any[] = [];
  // function getList(listOfWebUrls: string[]) {
  //   for (let i = 0; i < listOfWebUrls.length; i++) {
  //     const result = callLighthouse(listOfWebUrls[i]);
  //     const formattedResult = () => {
  //       return (
  //         <div>
  //           <p>
  //             {result.title} and
  //             {result.weight}
  //           </p>
  //         </div>
  //       );
  //     };
  //     listOfResults.push(formattedResult);
  //   }
  //   setCapiList(listOfResults);
  // }
  //list of urls

  // function getData() {
  //   const data = {
  //     time: "time",
  //     weight: "weight",
  //     url: "url",
  //     title: "title",
  //     pageLoadTime: "pageLoadTime",
  //     pageType: "pageType",
  //   };
  //   return data;
  // }

  const [Refresh, setRefresh] = useState(false);
  function refreshData() {
    setRefresh(!Refresh);
  }

  const [rowData, setRowData] = useState(data);

  useEffect(() => {
    console.log("capilist here", capiList);
    console.log("data here", data);
    console.log("rowdata here", rowData);
    setRowData(data);
  }, [capiList, Refresh]);

  // const rowData = [
  //   {
  //     time: "a",
  //     weight: "weight",
  //     url: "url",
  //     title: "title",
  //     pageLoadTime: "pageLoadTime",
  //     pageType: "pageType",
  //   },
  //   {
  //     time: "time",
  //     weight: "weight",
  //     url: "url",
  //     title: "title",
  //     pageLoadTime: "pageLoadTime",
  //     pageType: "pageType",
  //   },
  // ];
  const ActualTable = () => {
    return (
      <table className="table-fixed">
        <thead>
          <tr>
            <th>Time Page Last Updated</th>
            <th>VisualsElementType of Page (article/liveblog)</th>
            <th>Headline</th>
            <th>Time till page looks loaded </th>
            <th>Page weight (MB) </th>
            {/* <th>Click for more details</th> */}
          </tr>
        </thead>

        <tbody>
          {rowData.map((individualRowData) => {
            return (
              <tr>
                <td>{individualRowData.time}</td>
                <td>{individualRowData.pageType}</td>
                <td>
                  <a href={individualRowData.url}>{individualRowData.title}</a>
                </td>
                <td>{individualRowData.pageLoadTime}</td>
                <td>{individualRowData.weight}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  //     return (<div></div
  //     (rowData?.map((row) => {
  //       Row(row);
  //     });)
  //   };

  //   <div
  // >
  //   <Hide until="desktop">
  //     {largeVariant?.images.map((image) => {
  //       return (
  //         <>
  //           <Picture
  //             master={image.url}

  function checkCapilist(capiList: string[]) {
    console.log(capiList);
  }

  return (
    <main className="m-2">
      <div className="text-3xl">Webpage performance of today's Pages</div>
      <div className="flex flex-row gap-4">
        {TimeUpdated}

        <button className="border p-1" onClick={() => callCapi()}>
          Call capi
        </button>
        <button
          className="border p-1"
          onClick={() => refreshLighthouseData(capiList)}
        >
          Refresh lighthouse
        </button>
        <button className="border p-1" onClick={() => checkCapilist(capiList)}>
          Check list{" "}
        </button>
        <button className="border p-1" onClick={() => refreshData()}>
          Refresh data
        </button>
      </div>
      <div className="flex flex-row gap-2 m-4">
        <Button size="small" onClick={setDesktop}>
          Desktop performance
        </Button>
        <Button size="small" onClick={setMobile}>
          Mobile performance{" "}
        </Button>
      </div>
      <div className="text-lg">{platform} view</div>
      <ActualTable />
    </main>
  );
}
