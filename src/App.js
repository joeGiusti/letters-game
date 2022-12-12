import logo from './logo.svg';
import './App.css';
import NumbersGame from './Pages/NumbersGame';
import { useEffect, useRef, useState } from 'react';
import Settings from './Pages/Settings';

function App() {
  
  const [postArray, setPostArray]= useState([])  
  const [showSettings, setShowSettings] = useState()

  const [showImages, setShowImages] = useState()
  const isFist = useRef(true)

  useEffect(()=>{
    if(isFist.current){
      fetchData()
      isFist.current = false
    }
  })

  // Fetches data from the subreddit starting after the given post id
  function fetchData(_after){
    
    var _sub = "r/gonewild"    
    fetch("https://www.reddit.com/" + _sub + ".json?limit=20&after="+_after)
    .then(res => res.json())
    .then(res2 => {
      setPostArray(res2.data.children)
    })

  }

  return (
    <div className="App">
      <NumbersGame postArray={postArray} fetchData={fetchData} showImages={showImages}></NumbersGame>
      {showSettings &&
        <Settings setShowSettings={setShowSettings} showImages={showImages} setShowImages={setShowImages}></Settings> 
      }
      <div className='settingsIcon' onClick={()=>setShowSettings(true)}>Settings</div>
    </div>
  );
}

export default App;
