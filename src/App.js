import './App.css';
import NumbersGame from './Pages/NumbersGame';
import { useEffect, useRef, useState } from 'react';
import Settings from './Pages/Settings';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  const [postArray, setPostArray]= useState([])  
  const [showSettings, setShowSettings] = useState()
  const [sub, setSub] = useState("r/gonewild")
  const [imageTime, setImageTime] = useState(3)
  const [showImages, setShowImages] = useState()
  const isFist = useRef(true)

  useEffect(()=>{
    //console.log(sub)
    if(isFist.current){
      fetchData()
      isFist.current = false
    }
  },[])

  // Fetches data from the subreddit starting after the given post id
  function fetchData(_after){
    if(!sub)
      return
    fetch("https://www.reddit.com/" + sub + ".json?limit=20&after="+_after)
    .then(res => res.json())
    .then(res2 => {
      console.log(res2.data.children)
      setPostArray(res2.data.children)
    })

  }

  return (
    <div className="App">
      <Routes>
      <Route 
          path='/' 
          element={
            <NumbersGame 
              postArray={postArray}   
              fetchData={fetchData} 
              showImages={showImages}
              imageTime={imageTime}              
            >
            </NumbersGame>}>
        </Route>
        <Route 
          path='/letters-game' 
          element={
            <NumbersGame 
              postArray={postArray}   
              fetchData={fetchData} 
              showImages={showImages}
              imageTime={imageTime}                      
              >
            </NumbersGame>}>
        </Route>
      </Routes>
      
      {showSettings &&
        <Settings 
          setShowSettings={setShowSettings} 
          showImages={showImages} 
          setShowImages={setShowImages}
          sub={sub}
          setSub={setSub}
          fetchData={fetchData}
          imageTime={imageTime}
          setImageTime={setImageTime}
        >
        </Settings> 
      }
      <div className='settingsIcon' onClick={()=>setShowSettings(true)}>Settings</div>
    </div>
  );
}

export default App;
