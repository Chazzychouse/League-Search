export default function Header() {
  let api_url =
    "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/The%20Jbas?api_key=RGAPI-1feb4546-c319-4568-a975-c8eac306985e";

  async function getJbas() {
    let response = await fetch(api_url);
    let data = await response.json();
    return data;
  }
  let data = getJbas();
  console.log(data);
  let jbas = JSON.stringify(this.data.summonerLevel);
  return <h1>{jbas}</h1>;
}
