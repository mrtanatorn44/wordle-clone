import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [input, setInput] = useState([
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""],
    ["","","","",""]
  ])
  const [key, setKey] = useState([
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
  ])

  return (
    <div className="App">
      {/* TOP NAV */}
      <div className="border-bottom border-2 border-dark d-flex" style={{height: "7vh"}}>
        <h1 className="m-auto ms-3 fw-bold">Wordle</h1>
        <p className="m-auto me-3">by Tanatorn Boonprasert</p>
      </div>

      {/* CONTENT */}
      <div className="py-5" style={{height: "63vh",color: "white"}}>
        { input.map((rowInput) => {
          return (
            <div class="row mx-0 justify-content-center">
              { rowInput.map((charInput) => {
                return (
                  <div class="col border m-1 border border-2 border-dark d-flex" style={{height: "10vh", maxWidth: "10vh"}}>
                    <h1 class="m-auto fw-bolder">
                      {charInput}
                    </h1>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* ON-SCREEN KEYBOARD */}
		  <div className="py-4" style={{height: "30vh", color: "white"}}>
        { key.map((rowKey, row) => {
          return (
            <div class='row p-0 m-auto justify-content-center'>
              { rowKey.map((charKey, col) => {
                return (
                  <>

                    { (row === 2 && col === 0) &&
                    <button class='col m-1 bg-secondary rounded d-flex fkey p-0' ><h4 class='m-auto'>ENTER</h4></button>
                    }
                    <button class='col m-1 bg-secondary border-0 rounded d-flex key' onClick='onKeyPress($row, $char)'>
                      <h4 class='m-auto'>
                        {charKey}
                      </h4>
                    </button>
                    { (row === 2 && col === rowKey.length -1) &&
                    <button class='col m-1 bg-secondary rounded d-flex fkey p-0'>
                      <h4 class='m-auto'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-backspace' viewBox='0 0 16 16'>
                          <path d='M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z'/>
                          <path d='M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z'/>
                        </svg>
                      </h4>
                    </button>
                    }
                  </>
                )
              })}
            </div>
          )
        })}
      </div>

    </div>
  );
}

export default App;
