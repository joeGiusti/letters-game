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

  function fetchData(){
    var _sub = "r/gonewild"    
    fetch("https://www.reddit.com/" + _sub + ".json?limit=10")
    .then(res => res.json())
    .then(res2 => {
      console.log(res2.data.children)
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