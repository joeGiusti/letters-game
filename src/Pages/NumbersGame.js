import userEvent from '@testing-library/user-event'
import React, { useRef, useState } from 'react'
import "./NumbersGame"

function NumbersGame(props) {
    const [started, setStarted] = useState()
    const [character, setCharacter] = useState()
    const [counts, setCounts] = useState({correct: 0, notCorrect: 0})
    const [correct, setCorect] = useState(true)
    const [keyLog, setKeyLog] = useState([])
    const inputRef = useRef()

    const characterArray = "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ")            
    // could have noun action place for each one
    const wordMap = {
        0: "hero h",
        1: "apron a",
        2: "boots 2",
        3: "coffee c",
        4: "door d",
        5: "eve e",
        6: "flicks f",
        7: "getin g",
        8: "hydrate h",
        9: "incline i",
        a: "apron 1",
        b: "boots 2",
        c: "coffee 3",
        d: "door 4",
        e: "eve 5",
        f: "flicks 6",
        g: "getin 7",
        h: "hydrate 8",
        i: "incline 9",
        j: "justthen 10",
        k: "kitchen 11",
        l: "lshelf 12",
        m: "marine 13",
        n: "nicotine 14",
        o: "overseen 15",
        p: "protein 16",
        q: "queen 17",
        r: "routine 18",
        s: "screen 19",
        t: "tea 20",
        u: "upon 21",
        v: "venue 22",
        w: "wintery 23",
        x: "xor 24",
        y: "ydive 25",
        z: "zulu 26",
    }    

    // A dev function that was used to adjust the map once
    //swap()
    function swap(){
        var tempString = ""
        for(var index in wordMap)
            tempString += index +': "'+wordMap[index].split(" ")[1]+" "+wordMap[index].split(" ")[0]+'",\n'
        console.log(tempString)
    }

    // Set the state to show the game and choose the first character
    function startGame(){
      setStarted(true)
      choseCharacter()
    }
    // Choose a random character from the array
    function choseCharacter(){
      setCharacter(characterArray[Math.floor(Math.random() * characterArray.length)])
    }
    // When the key is pressed look at the input to see if it should be checked
    function keyPressed(){
      var input = inputRef.current.value      

      if(input.split(" ").length >= 3)
        checkInput(input)
    }
    // Check the input to see if it matches the key value pair
    function checkInput(_input){
      
      if(_input.toLowerCase().trim() === wordMap[character]){        
        setCorect(true)
        setCounts({correct: counts.correct + 1, notCorrect: counts.notCorrect})
        showBox()
      }
      else{
        console.log("input: " + _input + " correct: " + wordMap[character])
        setCorect(false)
        setCounts({correct: counts.correct, notCorrect: counts.notCorrect + 1})
      }
      
      // Choose a new character and clear the input field
      choseCharacter()
      inputRef.current.value = ""
      setKeyLog(" | " + character + " : " + wordMap[character] + " | " + keyLog)
    }

    const postCounter = useRef(1)
    const boxRef = useRef()
    function showBox(){

        boxRef.current.classList.remove("fade")
        
        setTimeout(() => {

            boxRef.current.classList.add("fade")
            
        }, 1000);
    }    
  console.log(props.postArray[2]?.data?.preview?.images[0])
  return (
    <div className='numberGameContainer'>
      <box className="box" ref={boxRef}>        
        <img src={props.postArray[2]?.data?.preview?.images[0]?.source.url.replaceAll("amp;","")}></img>
      </box>
      {started ?       
        <div className=''>
          <div className='hintIcon'>
            <div className='hintIconText'>Hint</div>
            <div className='hint'>{wordMap[character]}</div>            
          </div>
          <div className='characterContainer'>
            {character}
          </div>
          <div>
            <input ref={inputRef} onChange={keyPressed}></input>
          </div>
          <div className='resultsArea'>
            <div className={"correctIndicator " + (correct ? "correct":"notCorrect")}>
              {counts.correct + " "+counts.notCorrect}
            </div>
            <div className='keyLog'>{keyLog}</div>
          </div>
        </div>
        :
        <div className='startButtonContainer'>
          <button onClick={startGame}>Start</button>
        </div> 
      }
    </div>
  )
}

export default NumbersGame