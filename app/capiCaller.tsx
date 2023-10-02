//make sure to update/remove this eventually!
const capiKey = "176f1616-1e52-42b3-adeb-11ae72de4efc";

export async function getArticles() {
  const url = `https://content.guardianapis.com/search?api-key=${capiKey}`;
  const response = await fetch(url);
  const reply = await response.json();

  let listOfWebUrls: string[] = [];
  for (let i = 0; i < reply.response.results.length; i++) {
    listOfWebUrls.push(reply.response.results[i].webUrl);
    console.log(reply.response.results[i].webUrl);
  }

  return listOfWebUrls;
}
