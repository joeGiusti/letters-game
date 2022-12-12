import logo from './logo.svg';
import './App.css';
import NumbersGame from './Pages/NumbersGame';
import { useEffect, useRef, useState } from 'react';

function App() {
  
  const [postArray, setPostArray]= useState([])  
  const isFist = useRef(true)

  useEffect(()=>{
    if(isFist.current){
      fetchData()
      isFist.current = false
    }
  })

  function fetchData(_after){
    console.log("fetching data after post with id " + _after)
    var _sub = "r/gonewild"    
    fetch("https://www.reddit.com/" + _sub + ".json?limit=2&after="+_after)
    .then(res => res.json())
    .then(res2 => {
      console.log(res2.data.children)
      console.log("last post id "+res2.data.children[res2.data.children.length - 1].data.id)
      setPostArray(res2.data.children)
    })

  }

  return (
    <div className="App">
      <NumbersGame postArray={postArray} fetchData={fetchData}></NumbersGame>
    </div>
  );
}

export default App;
