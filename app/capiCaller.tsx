

export async function getArticles() {
  const url = `https://content.guardianapis.com/search?api-key=${process.env.CAPI_KEY}`;
  const response = await fetch(url);
  const reply = await response.json();

  let listOfWebUrls: string[] = [];
  for (let i = 0; i < reply.response.results.length; i++) {
    listOfWebUrls.push(reply.response.results[i].webUrl);
    console.log(reply.response.results[i].webUrl);
  }

  return listOfWebUrls;
}
