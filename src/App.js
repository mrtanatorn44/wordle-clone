import userEvent from '@testing-library/user-event';
import React, {useState, useEffect} from 'react';
import './App.css';
import wordsFile from './data/words.txt';

function App() {

  const [inputPos, setInputPos] = useState([0,0])
  const [input, setInput] = useState([
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
  ])
  const [answer, setAnswer] = useState(null);
  const [keyboard, setKeyboard] = useState([
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["0","Z","X","C","V","B","N","M","0"]
  ])

  const [help, setHelp] = useState([
    ["W","E","A","R","Y"],
    ["P","I","L","L","S"],
    ["V","A","G","U","E"]
  ])

  // store Input data correctness
  // 0=empty, 1=filled, 2=wrongPos, 3=correct, 4=incorrect
  const [correctness, setCorrectness] = useState([
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ])
  // Tile CSS
  // 0=empty, 1=filled, 2=wrongPos, 3=correct, 4=incorrect
  var tileCSS = [
    "col bg-black     border m-1 border-2 border-secondary d-flex tile",
    "col bg-black     border m-1 border-2 border-gray      d-flex tile",
    "col bg-danger    border m-1 border-2 border-danger    d-flex tile",
    "col bg-success   border m-1 border-2 border-success   d-flex tile",
    "col bg-secondary border m-1 border-2 border-secondary d-flex tile"
  ]
  // Help Modal Tile CSS 
  var helpTileCSS = [
    "col bg-secondary border m-1 border-2 border-secondary d-flex xtile",
    "col bg-dark      border m-1 border-2 border-gray      d-flex xtile",
    "col bg-danger    border m-1 border-2 border-danger    d-flex xtile",
    "col bg-success   border m-1 border-2 border-success   d-flex xtile",
    "col bg-secondary border m-1 border-2 border-secondary d-flex xtile"
  ]

  const [helpModal, setHelpModal] = useState(false);
  const [textAlert, setTextAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [rowShake,  setRowShake]  = useState(-1);
  const [colFlip,   setColFlip]   = useState(-1);
  const [isFlip,    setIsFlip]    = useState(0);

  useEffect(() => {
    // it will run twice, but dont worry. we still get last answer.
    if (answer === null) {
      fetch(wordsFile)
        .then(r => r.text())
          .then(text => {
            var randomIndex = Math.floor(Math.random() * 5757);
            var wordleAnswer = text.split('\r\n')[randomIndex];
            setAnswer(wordleAnswer);
            console.log("Answer is :", wordleAnswer)
          }
      );
    }
  }, [])

  function onKeyPress(keyRow, keyCol) {
    // 2,0 is Enter 2,8 is Backspace
    let tempInput = input;
    let tempCorrectness = correctness;
    let currentRow = inputPos[0];
    let currentCol = inputPos[1];

    // Enter
    if (keyRow === 2 && keyCol === 0) {
      // not enought lettes
      if (tempInput[currentRow][4] === "") {
        onShowAlert("Not enought letters");
        onRowShake(currentRow);
      } else { // enough letters move inputPos to next column
        var currentAnswer = tempInput[currentRow].join('').toLowerCase();

        fetch(wordsFile)
          .then(r => r.text())
            .then(text => {
              if(text.includes(currentAnswer)) {
                // onShowAlert('TRUE');
                if (!isFlip)
                  onColFlip(0);
                setInputPos([currentRow+1, 0]); // update input row to next row  
              } else {
                onShowAlert('Not in word list');
                onRowShake(currentRow);
              }
            }
        );
      }
      
    }
    // Backspace
    else if (keyRow === 2 && keyCol === 8) {
      if (currentCol !== 0 ) {
        tempInput[currentRow][currentCol-1] = "";
        tempCorrectness[currentRow][currentCol-1] = 0;
        setInputPos([currentRow, currentCol-1]);
      }
    }
    // Letter input
    else {
      if (currentCol === 5) return; // if filled all letter, no more input
      tempInput[currentRow][currentCol] = keyboard[keyRow][keyCol];
      tempCorrectness[currentRow][currentCol] = 1;
      setInputPos([currentRow, currentCol+1]);
    }
  }

  function onShowAlert(text) {
    if (showAlert) return; // if showing alert, dont show
    setTextAlert(text);
    setShowAlert(true);
    setTimeout(function () {
      setShowAlert(false);
    }, 1000);
  }

  function onRowShake(row) {
    if (rowShake !== -1) return; // if shaking, dont shake
    setRowShake(row);
    setTimeout(function () {
      setRowShake(-1);
    }, 1000);
  }

  function onColFlip(col) {
    if (col === 5) {// base-case, prevent overflow tile column
      setColFlip(-1); // reset column to flip
      setIsFlip(0);   // set is flip to false
      return;
    } 
    setIsFlip(1);

    setColFlip(col);
    checkAnswer(col);
    setTimeout(function () {
      onColFlip(col+1)
    }, 500);
  }

  function checkAnswer(col) {
    var tempCorrectness = correctness;
    var checkingRow = inputPos[0];
    console.log(input[checkingRow][col], answer[col])
    if (input[checkingRow][col].toLowerCase() === answer[col]) {
      console.log('correct')
      console.log(input[checkingRow][col], answer[col])
      tempCorrectness[checkingRow][col] = 3; 
    } else if (answer.includes(input[checkingRow][col].toLowerCase())) {
      console.log('wrong pos')
      console.log(input[checkingRow].join('').toLowerCase(), answer.charAt(col))
      tempCorrectness[checkingRow][col] = 2; 
    } else {
      console.log('incorrect')
      console.log(input[checkingRow][col], answer[col])
      tempCorrectness[checkingRow][col] = 4; 
    }
  }

  return (
    <div className="App">

      {/* Modal Help */}
      <div className="d-flex position-fixed w-100 h-100 bg-black bg-opacity-75" 
        style={{
          opacity: !helpModal ? "0" : "1",
          transition: "all .2s",
          visibility: !helpModal ? "hidden" : "visible",
        }}
        onClick={() => setHelpModal(false)}
      >
          <div className="bg-dark rounded w-30 m-auto">
            {/* MODAL TOP */}
            <div className="border-bottom p-3">
              <div className="d-flex border-0">
                <h3 className="text-center m-auto pb-2">HOW TO PLAY</h3>
                <button type="button" onClick={() => setHelpModal(false)} className="btn-close btn-close-white m-0 p-0"></button>
              </div>
              <h5 className="pb-2">Guess the WORDLE in six tries.</h5>
              <h5 className="pb-2">Each guess must be a valid five-letter word. Hit the enter button to submit.</h5>
              <h5>After each guess, the color of the tiles will change to show how close your guess was to the word.</h5>
            </div>
            {/* MODAL CENTER */}
            <div className="border-bottom p-3">
              <h5 className="pb-2">Examples</h5>

              <div className="row mx-0">
                { help[0].map((charInput, index) => {
                  return (
                    <div className={index === 0 ? helpTileCSS[3]: helpTileCSS[1]}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>
              <h5 className="py-2">The letter W is in the word and in the correct spot.</h5>
             
              <div className="row mx-0">
                { help[1].map((charInput, index) => {
                  return (
                    <div className={index === 1 ? helpTileCSS[2]: helpTileCSS[1]}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>    
              <h5 className="py-2">The letter I is in the word but in the wrong spot.</h5>

              <div className="row mx-0">
                { help[2].map((charInput, index) => {
                  return (
                    <div className={index === 3 ? helpTileCSS[4]: helpTileCSS[1]}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>   
              <h5 className="py-2">The letter U is not in the word in any spot.</h5>
            </div>
            {/* MODAL BOTTOM */}
            <div className="p-3">
              <h5 className="pb-2">A new WORDLE will be available each day!</h5>
            </div>
          </div>
      </div>
      
      {/* Modal Alert */}
      <div className="bg-white rounded text-black w-25 mt-5 p-2 ms-auto me-auto text-center position-absolute start-0 end-0" 
        style={{
          opacity: !showAlert ? "0" : "1",
          transition: "all .4s",
          visibility: !showAlert ? "hidden" : "visible",
        }}
      >
        <h2>{textAlert}</h2>
      </div>
      
      
      {/* TOP NAV */}
      <div className="row border-bottom border-2 border-dark d-flex ms-0" style={{height: "7vh"}}>
        <div className="col p-0 text-start d-flex h-100">
          <button type="button" className="btn my-auto mx-2 p-0 text-right text-white h-100" onClick={()=> window.open("https://github.com/mrtanatorn44/wordle-clone", "_blank")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </button>
          {/* Button trigger modal */}
          <button type="button" onClick={() => setHelpModal(true)} className="btn my-auto mx-2 p-0 text-right text-white h-100" data-bs-toggle="modal" data-bs-target="#helpModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
          </button>
          <button onClick={() => onShowAlert("HAHA")}>XX</button>
        </div>
        
        <div className="col p-0 d-flex h-100">
          <h1 className="m-auto fw-bold text-center">Wordle</h1>
        </div>

        <div className="col p-0 d-flex h-100">
          <p className="m-auto me-2 text-end">by Tanatorn Boonprasert</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="py-5" style={{height: "63vh",color: "white"}}>
        { input.map((rowInput, row) =>
          <div className={"row mx-0 justify-content-center" + (rowShake === row? " shake": "")} key={row}>
            { rowInput.map((charInput, col) =>
              <div className={tileCSS[correctness[row][col]] + (colFlip === col && inputPos[0]-1 === row ? " flip": "")} key={col}>
                <h1 className="m-auto fw-bolder">
                  {charInput}
                </h1>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ON-SCREEN KEYBOARD */}
		  <div className="py-4" style={{height: "30vh", color: "white"}}>
        { keyboard.map((rowKey, row) =>
          <div className='row p-0 m-auto justify-content-center' key={row}>
            { rowKey.map((charKey, col) =>
                <>
                  { (row === 2 && col === 0) &&
                    <button className='col m-1 bg-secondary border-0 rounded d-flex fkey p-0' onClick={() => onKeyPress(row, col)}>
                      <h4 className='m-auto'>ENTER</h4>
                    </button>
                  }
                  { (charKey !== "0") &&
                  <button className='col m-1 bg-secondary border-0 rounded d-flex key' onClick={() => onKeyPress(row, col)}>
                    <h4 className='m-auto'>
                      {charKey}
                    </h4>
                  </button>
                  }
                  { (row === 2 && col === rowKey.length - 1) &&
                    <button className='col m-1 bg-secondary border-0 rounded d-flex fkey p-0' onClick={() => onKeyPress(row, col)}>
                      <h4 className='m-auto'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' className='bi bi-backspace' viewBox='0 0 16 16'>
                          <path d='M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z'/>
                          <path d='M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z'/>
                        </svg>
                      </h4>
                    </button>
                  }
                </>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default App;
