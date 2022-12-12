import React, { useRef, useState } from 'react'
import "./NumbersGame"

function NumbersGame() {
    const [started, setStarted] = useState()
    const [character, setCharacter] = useState()
    const [counts, setCounts] = useState({correct: 0, notCorrect: 0})
    const [correct, setCorect] = useState(true)
    const [keyLog, setKeyLog] = useState([])
    const inputRef = useRef()

    const characterArray = "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ")            
    // could have noun action place for each one
    const wordMap = {
      0: "h hero",
      1: "a apron",
      2: "2 boots",
      3: "c coffee",
      4: "d door",
      5: "e eve",
      6: "f flicks",
      7: "g getin",
      8: "h hydrate",
      9: "i incline",
      a: "1 apron",
      b: "2 boots",
      c: "3 coffee",
      d: "4 door",
      e: "5 eve",
      f: "6 flicks",
      g: "7 getin",
      h: "8 hydrate",
      i: "9 incline",
      j: "10 justthen",
      k: "11 kitchen",
      l: "12 lshelf",
      m: "13 marine",
      n: "14 nicotine",
      o: "15 overseen",
      p: "16 protein",
      q: "17 queen",
      r: "18 routine",
      s: "19 screen",
      t: "20 tea",
      u: "21 upon",
      v: "22 venue",
      w: "23 wintery",
      x: "24 xor",
      y: "25 ydive",
      z: "26 zulu"
    }
    console.log(wordMap["a"])


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

      console.log("======================")
      console.log("checkign "+_input)
      console.log(_input.toLowerCase()+" === "+"keyValue ".toLowerCase()+(_input.toLowerCase().trim() === "keyValue".toLowerCase().trim()))
      if(_input.toLowerCase().trim() === wordMap[character]){
        console.log("correct")
        setCorect(true)
        setCounts({correct: counts.correct + 1, notCorrect: counts.notCorrect})
      }
      else{
        console.log("not correct")
        setCorect(false)
        setCounts({correct: counts.correct, notCorrect: counts.notCorrect + 1})
      }
      
      // Choose a new character and clear the input field
      choseCharacter()
      inputRef.current.value = ""
      setKeyLog(" | " + character + " : " + wordMap[character] + " | " + keyLog)
    }

  return (
    <div>
      {started ?       
        <div className='numberGameContainer'>
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