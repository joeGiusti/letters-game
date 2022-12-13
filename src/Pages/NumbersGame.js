
import React, { useRef, useState } from 'react'


function NumbersGame(props) {
    const [started, setStarted] = useState()
    const [character, setCharacter] = useState()
    const [counts, setCounts] = useState({correct: 0, notCorrect: 0})
    const [correct, setCorect] = useState(true)
    const [keyLog, setKeyLog] = useState([])
    const [hint, setHint] = useState("")
    const [showCharacters, setShowCharacters] = useState(true)

    const gameType = useRef("array") // could also be arrays or characters
    const arrayLength = useRef(10)
    const inputRef = useRef()
    const postCounter = useRef(1)
    const boxRef = useRef()
    
    const characterArray = "0 1 2 3 4 5 6 7 8 9 a b c d e f g h i j k l m n o p q r s t u v w x y z".split(" ")            
    
    // could have noun action place for each one
    const wordMap = {
        0: "hero 0",
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
        n: "nonpine 14",
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
        z: "zed 26",
    }
    const justWordMap = {
      0: "hero",
      1: "apron",
      2: "boots",
      3: "coffee",
      4: "door",
      5: "eve",
      6: "flicks",
      7: "getin",
      8: "hydrate",
      9: "incline",
      a: "apron",
      b: "boots",
      c: "coffee",
      d: "door",
      e: "eve",
      f: "flicks",
      g: "getin",
      h: "hydrate",
      i: "incline",
      j: "justthen",
      k: "kitchen",
      l: "lshelf",
      m: "marine",
      n: "nonpine",
      o: "overseen",
      p: "protein",
      q: "queen",
      r: "routine",
      s: "screen",
      t: "tea",
      u: "upon",
      v: "venue",
      w: "wintery",
      x: "xor",
      y: "ydive",
      z: "zed",
  }    

    // swap() A dev function that was used to adjust the map once    
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
      
      setShowCharacters(true)

      // Choose a character and hint and put it in state
      if(props.gameType == "characters"){
        
        var character = characterArray[Math.floor(Math.random() * characterArray.length)]
        
        setCharacter(character)        
        setHint(wordMap[character])

      } 
      // Create an array and hint string, put them in state
      else if(props.gameType == "array"){

        // Generate an array of characters
        var c = 0      
        var tempArray = []
        while(c++ < arrayLength.current){
          tempArray.push(characterArray[Math.floor(Math.random() * characterArray.length)])          
        }

        // Generate a hint string based on the character array
        var hintString = ""
        var answerArrayTemp = generateAnswerArray(tempArray)
        answerArrayTemp.forEach(answerWord =>{
          hintString += answerWord + " "
        })

        // Put them in state
        setHint(hintString)
        setCharacter(tempArray)
      }
    }
    // When the key is pressed look at the input to see if it should be checked
    function keyPressed(){
      // Get the input value
      var input = inputRef.current.value      

      // If there are over 2 spaces check the answer
      if(props.gameType == "characters"){
        if(input.split(" ").length >= 3)
          checkInput(input)
      }
      // If there are a number of words input that is equal to the answer array length
      else if(props.gameType == "array"){
        setShowCharacters(false)
        if(input.split(" ").length > arrayLength.current)
          checkInput(input)
      }

    }

    function generateAnswerArray(_characterArray){
      var tempArray = []
      if(Array.isArray(_characterArray)){
        _characterArray.forEach(baseCharacter => {
          tempArray.push(justWordMap[baseCharacter])
        })
      }
      return tempArray
    }

    // Check the input to see if it matches the key value pair
    function checkInput(_input){
      // Check to see if the input value matches the value in the map that correcponds to the character
      if(props.gameType == "characters"){
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
        setKeyLog(" | " + character + " : " + wordMap[character] + " | " + keyLog)
      }      
      // Look at each input to see if it matches the corresponding word
      else if(props.gameType == "array"){
        var correctArray = generateAnswerArray(character)
        var inputArray = _input.toLowerCase().trim().split(" ")
        var c = 0
        var cc = 0
        correctArray.forEach(correctWord => {
          if(inputArray[c++] === correctWord)
            cc++
        })
        if(cc == correctArray.length){
          setCorect(true)
          setKeyLog(" | All Correct | " + keyLog)
          showBox()
          arrayLength.current = arrayLength.current + 1
        }
        else{
          setCorect(false)
          console.log("====================")
          console.log("input:")
          console.log(inputArray)
          console.log("correct:")
          console.log(correctArray)
          setKeyLog("| "+cc+" / " +correctArray.length+" | "+ keyLog)
        }

      }

      // Choose a new character and clear the input field
      choseCharacter()
      inputRef.current.value = ""
    }

    function postCountUp(){
      // Go to the next post
      postCounter.current = postCounter.current + 1
          
      // Make sure there is an image for that post
      while(!props.postArray[postCounter.current]?.data?.preview?.images[0]?.source.url.replaceAll("amp;","") && (postCounter.current < props.postArray.length))
        postCounter.current = postCounter.current + 1            

      // If there are about to be no more add more
      if(postCounter.current >= props.postArray.length - 1){
        postCounter.current = 0
        
        var lastPost = props.postArray[(props.postArray.length - 1)].kind +
        "_"+
        props.postArray[(props.postArray.length - 1)].data.id
        
        props.fetchData(lastPost)
          
        
      }      
    }

    // Removes the class with the animation then re adds it
    function showBox(){
      
      // If the images are not being shown (set in settings) there will be no current to the ref
      if(!boxRef.current)
        return
            
      // Remove the class with the animation so it will replay when it is re-added
      boxRef.current.style.animation = "null"
      //boxRef.current.classList.remove("fade")
      
      // Add the class back on so the animation plays after a brief pause
      setTimeout(() => {
        
          //boxRef.current.classList.add("fade")    
          boxRef.current.style.animation = `fadeInAndOut ${props.imageTime}s`

      }, 50);

      // Put the post count up after 3 seconds
      setTimeout(() => {
        postCountUp()
      }, 500);
    }    
  
  return (
    <div className='numberGameContainer'>
      {props.showImages && <box className="box" ref={boxRef}>        
        <img src={props.postArray[postCounter.current]?.data?.preview?.images[0]?.source.url.replaceAll("amp;","")}></img>
        {/* <img src={props.postArray[postCounter.current]?.data?.thumbnail}></img> */}
      </box>}
      {started ?       
        <div className=''>
          <div className='hintIcon'>
            <div className='hintIconText'>Hint</div>
            <div className='hint'>{hint}</div>            
          </div>
          {<div className={'characterContainer ' + (!showCharacters && " hidden")}>
            {character}
          </div>}
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