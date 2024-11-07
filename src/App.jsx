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
      <h1>Spotify UI</h1>
      <div className="search">
        <img src="https://investors.spotify.com/files/images/2024/Spotify_Full_Logo_RGB_White-1.png" alt="https://open.spotify.com/ " className='spotify' />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_cOPV6IZvcmJQ66Pw7yxPbOeWCB1AAZLhbni2VYLvkEjITt7yUUrQO6qRkWMauwBqqA&usqp=CAU" alt="" />
        <a href="">Home</a>
        <h4>Search</h4>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTea_UXyIuzxKogybrcEm3Bfeojq1Bn_eVeRsXzU2Y0WXzR5JMIlt0xc-ohdE6yqcpM44&usqp=CAU" alt="" className='color' />
        <h5>Your Library</h5>
        <div className='Spaces'>
          <p>Create PlayList</p>
          <p>Liked Songs</p>
          <p>Your Episodes</p>

          <h2>+</h2>
          <img src="https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1" alt="" className='nkar' />
          <img src="https://www.tinyquip.com/wp-content/uploads/2023/08/Spotify-Podcast.jpg" alt="" className='nkar1' />
        </div>
        <div className='grer'>
          <p>FAV</p>
          <p>Daily Mix 1</p>
          <p>Discover Weekly</p>
          <p>Malayalam</p>
          <p>Dance / Electronix Mix</p>
          <p>EDM / Popular</p>
        </div>



        <SearchPop />
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

      </div>
      <MuzicPlayer />
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
        <div className='player'>
          <h3>Listem to the album</h3>
             <iframe src="" frameborder="0"></iframe>
        </div>

    </div>
  );
}

export default App;
