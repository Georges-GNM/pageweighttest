// export async function sendToApi(
//     text: string,
//   ): Promise<string> {

//     const textEncoded = encodeURIComponent(text)
//     console.log(textEncoded)
//     const url = `/api/request/getReply?text=${textEncoded}`
//     // const url = `/api/request`
  
  
//     const response = await fetch(url);
//     const reply = await response.text();
//     //eventually tokens will be available in the response
//     // const tokens_used = await response.tokens()
  
//     return reply;
//   }
  


export async function runLighthouse(articleUrl: string) {
    const url = setUpQuery(articleUrl);
    const foo = fetch(url)
      .then(response => response.json())
      .then(json => {
        // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
        // to learn more about each of the properties in the response object.
        // showInitialContent(json.id);
        const cruxMetrics = {
          "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
          "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
        };
        // showCruxContent(cruxMetrics);
        const lighthouse = json.lighthouseResult;
        const lighthouseMetrics = {
        //   'First Contentful Paint': lighthouse.audits.first-contentful-paint.displayValue,
          'Title': lighthouse.requestedUrl,
          'weight': lighthouse.audits['total-byte-weight'].displayValue,
        };
        console.log("light", lighthouseMetrics);
        return lighthouseMetrics;
      });
    return foo
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
  
//   function showInitialContent(id: any) {
//     document.body.innerHTML = '';
//     const title = document.createElement('h1');
//     title.textContent = 'PageSpeed Insights API Demo';
//     document.body.appendChild(title);
//     const page = document.createElement('p');
//     page.textContent = `Page tested: ${id}`;
//     document.body.appendChild(page);
//   }
  
//   function showCruxContent(cruxMetrics: any) {
//     const cruxHeader = document.createElement('h2');
//     cruxHeader.textContent = "Chrome User Experience Report Results";
//     document.body.appendChild(cruxHeader);
//     for (const key in cruxMetrics) {
//       const p = document.createElement('p');
//       p.textContent = `${key}: ${cruxMetrics[key]}`;
//       document.body.appendChild(p);
//     }
//   }
  
  function showLighthouseContent(lighthouseMetrics: any) {
    const lighthouseHeader = document.createElement('h2');
    lighthouseHeader.textContent = "Lighthouse Results";
    document.body.appendChild(lighthouseHeader);
    for (const key in lighthouseMetrics) {
      const p = document.createElement('p');
      p.textContent = `${key}: ${lighthouseMetrics[key]}`;
      document.body.appendChild(p);
    }
  }