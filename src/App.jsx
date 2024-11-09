import { useEffect, useState } from 'react';
import './App.css';
import SpotifyIcon from './Components/SpotifyIcon';
import SearchSpotify from './Components/SearchSpotify';
import SearchPop from './Components/SearchPop';
import MuzicPlayer from './Components/MuzicPlayer';
function App() {
  const clientId = "c5149b89b5014c6f81f211c94de70fda"
  const clientSecret = "16a3d6e583ac404ba03c8f02614bdca4"
  const [accessToken, setToken] = useState('')
  const [value, setValue] = useState("")
  const [artistID, setArtistId] = useState('')
  const [data, setData] = useState([])
  const [like, setLike] = useState('')
  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
      },
      body: "grant_type=client_credentials",
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((res) => res.json())
      .then((res) => setToken(res.access_token))
  }, [])

  async function search() {
    const artistParameters = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const artistID = await fetch(
      `https://api.spotify.com/v1/search?q=${value}&type=artist`,
      artistParameters
    )
      .then((resp) => resp.json())
      .then((resp) => {
        return resp.artists.items[0].id
      });
    await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?offset=0&limit=50&include_groups=album,single,compilation,appears_on`,
      artistParameters
    )
      .then((resp) => resp.json())
      .then((data) => setData(data));
  }




  return (
    <div className="App">



        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button

          onClick={() => {
            search();
          }}
        >Search</button>
       <SearchSpotify/>
       <SearchPop/>
      {data.items?.map(
        (e) =>
          e.images.length > 0 && (
            <SpotifyIcon
              key={e.id}
              imageUrl={e.images[0].url }
              name={e.name}
              followers={e.followers}

            />
          )
        )}
        

    </div>
  );
}

export default App;
