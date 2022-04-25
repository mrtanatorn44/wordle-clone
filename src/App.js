import React, {useState, useEffect} from 'react';
import './App.css';

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
  
  const [keyboard, setKeyboard] = useState([
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
  ])

  const [help, setHelp] = useState([
    ["W","E","A","R","Y"],
    ["P","I","L","L","S"],
    ["V","A","G","U","E"]
  ])

  var correctTile  = "col bg-success   border m-1 border border-2 border-success   d-flex tile"
  var normalTile   = "col bg-black     border m-1 border border-2 border-secondary d-flex tile"
  var nothingTile  = "col bg-secondary border m-1 border border-2 border-secondary d-flex tile"
  var wrongTile    = "col bg-danger    border m-1 border border-2 border-danger    d-flex tile"
  var correctXTile = "col bg-success   border m-1 border border-2 border-success   d-flex xtile"
  var normalXTile  = "col bg-black     border m-1 border border-2 border-secondary d-flex xtile"
  var nothingXTile = "col bg-secondary border m-1 border border-2 border-secondary d-flex xtile"
  var wrongXTile   = "col bg-danger    border m-1 border border-2 border-danger    d-flex xtile"

  const [textAlert, setTextAlert] = useState("Hi There");
  const [showAlert, setShowAlert] = React.useState(false);
  useEffect(() => {
    setTimeout(function () {
      setShowAlert(false);
    }, 2000);
  }, []);

  function onKeyPress(row, col) {
    let tempInput = 
  }
  return (
    <div className="App">
      {/* TOP NAV */}
      <div className="row border-bottom border-2 border-dark d-flex ms-0" style={{height: "7vh"}}>
        <div className="col p-0 text-start d-flex h-100">
          <button type="button" className="btn my-auto mx-2 p-0 text-right text-white h-100" onClick={()=> window.open("https://github.com/mrtanatorn44/wordle-clone", "_blank")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </button>
          {/* Button trigger modal */}
          <button type="button" className="btn my-auto mx-2 p-0 text-right text-white h-100" data-bs-toggle="modal" data-bs-target="#helpModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-question-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
            </svg>
          </button>
          <button onClick={() => setShowAlert(true)}>XX</button>
        </div>
        
        <div className="col p-0 d-flex h-100">
          <h1 className="m-auto fw-bold text-center">Wordle</h1>
        </div>

        <div className="col p-0 d-flex h-100">
          <p className="m-auto me-2 text-end">by Tanatorn Boonprasert</p>
        </div>
      </div>

      {/* Modal Help */}
      <div className="modal fade " id="helpModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-dark ">
            {/* MODAL TOP */}
            <div className="modal-body ">
              <div className="modal-header d-flex border-0">
                <h3 className="text-center m-auto">HOW TO PLAY</h3>
                <button type="button" className="btn-close m-0 p-0 text-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <h5>Guess the WORDLE in six tries.</h5>
              <h5>Each guess must be a valid five-letter word. Hit the enter button to submit.</h5>
              <h5>After each guess, the color of the tiles will change to show how close your guess was to the word.</h5>
            </div>
            {/* MODAL CENTER */}
            <div className="modal-footer m-0 p-0">{/* USE FOR UNDERLINE */}</div>
            <div className="modal-body">
              <h5>Examples</h5>

              <div className="row mx-0">
                { help[0].map((charInput, index) => {
                  return (
                    <div className={index === 0 ? correctXTile: normalXTile}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>
              <h5>The letter W is in the word and in the correct spot.</h5>
             
              <div className="row mx-0">
                { help[1].map((charInput, index) => {
                  return (
                    <div className={index === 1 ? wrongXTile: normalXTile}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>    
              <h5>The letter I is in the word but in the wrong spot.</h5>

              <div className="row mx-0">
                { help[2].map((charInput, index) => {
                  return (
                    <div className={index === 3 ? nothingXTile: normalXTile}>
                      <h1 className="m-auto fw-bolder">
                        {charInput}
                      </h1>
                    </div>
                  )
                })}
              </div>   
              <h5>The letter U is not in the word in any spot.</h5>
            </div>
            {/* MODAL BOTTOM */}
            <div className="modal-footer m-0 p-0">{/* USE FOR UNDERLINE */}</div>
            <div className="modal-body">
              <h5>A new WORDLE will be available each day!</h5>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal Alert */}
      { showAlert &&
        <div className="alert bg-white text-black border-0 w-25 ms-auto me-auto text-center position-absolute start-0 end-0" 
        style={{
          opacity: showAlert ? 1 : 0
        }}
        role="alert">
          <h2>{textAlert}</h2>
        </div>
      }

      {/* CONTENT */}
      <div className="py-5" style={{height: "63vh",color: "white"}}>
        { input.map((rowInput, row) =>
          <div className="row mx-0 justify-content-center" key={row}>
            { rowInput.map((charInput, col) =>
              <div className="col border m-1 border border-2 border-dark d-flex tile" key={col}>
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
                    <button className='col m-1 bg-secondary border-0 rounded d-flex fkey p-0'>
                      <h4 className='m-auto'>ENTER</h4>
                    </button>
                  }
                  <button className='col m-1 bg-secondary border-0 rounded d-flex key' onClick={() => console.log()} key={col}>
                    <h4 className='m-auto'>
                      {charKey}
                    </h4>
                  </button>
                  { (row === 2 && col === rowKey.length -1) &&
                    <button className='col m-1 bg-secondary border-0 rounded d-flex fkey p-0'>
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
