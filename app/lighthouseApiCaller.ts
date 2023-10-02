export async function runLighthouse(articleUrl: string) {
    // const url = setUpQuery(articleUrl);
    // const lighthouseData = 
    // fetch(url)
    //   .then(response => response.json())
    //   .then(json => {
    //     // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
    //     // to learn more about each of the properties in the response object.
    //     const lighthouse = json.lighthouseResult;
    //     const lighthouseMetrics = {
    //     //   'time': lighthouse.requestedUrl,
    //     //   'weight': lighthouse.audits['total-byte-weight'].displayValue,
    //     //   'title': lighthouse.requestedUrl,
    //     //   'weight': lighthouse.audits['total-byte-weight'].displayValue,
    //       time: "time",
    //       weight: "weight",
    //       Title: "title",
    //       pageLoadTime: "pageLoadTime",
    //       pageType: "pageType",
    //     };
    //     console.log("light", lighthouseMetrics);
    //     return lighthouseMetrics;
    //   });
    // return lighthouseData
    const LighthouseDataMock = {time: "time",
          weight: "weight",
          url: "url",
          title: "title",
          pageLoadTime: "pageLoadTime",
          pageType: "pageType",
        };
        console.log(LighthouseDataMock)
    return LighthouseDataMock
  }
  
  function setUpQuery(articleUrl: string) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters: any = {
      // url: encodeURIComponent('https://www.theguardian.com/world/2023/sep/14/destruction-derna-flooding-libya-port-city')
      url: encodeURIComponent(articleUrl)
    };
    let query = `${api}?`;
    for (const key in parameters) {
      query += `${key}=${parameters[key]}`;
    }
    return query;
  }
