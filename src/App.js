import React, {useEffect, useRef, useState} from "react";
import './App.css';
import ConfidenceList from './ConfidenceList';
import LeftCard from './LeftCard';
import aboutText from './textFiles/about.js';
import faqText from './textFiles/FAQ.js';
import contactText from './textFiles/contact';

function App() {
  const mapping = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabdefghnqrt';
  const initialState = {}

  for (let i = 0; i < mapping.length; i++) {
    initialState[mapping[i]] = 0;
  }
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [symbols, setSymbols] = useState([]);
  const [tfconfidences, setTFConfidences] = useState(initialState);
  const [tfprediction, setTFPrediction] = useState('');
  const [isShowingBoxes, setIsShowingBoxes] = useState(false);
  const [strokes, setStrokes] = useState({});
  const [numStrokes, setNumStrokes] = useState(0);
  const [scale, setScale] = useState(0);
  const [cardState, setCardState] = useState(aboutText);
  const [tabState, setTabState] = useState('about');
  const [clearClicked, setClearClicked] = useState(false);
  const [showClicked, setShowClicked] = useState(false);
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const size = Math.min(window.innerHeight, window.innerWidth)
    const csize = 250;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = `${csize}px`;
    canvas.style.height = `${csize}px`;
    canvas.style.border = `1px solid black`;

    const context = canvas.getContext("2d");
    context.scale(size/csize, size/csize);
    setScale(size/csize);
    context.lineCap = "round";
    context.lineJoin = 'round';
    context.strokeStyle = "black";
    context.lineWidth = 20;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    const temp = {
      ...strokes,
      [numStrokes + 1]: []
    };
    temp[numStrokes + 1].push({offsetX, offsetY});
    setStrokes(temp);
    setNumStrokes(numStrokes + 1);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
      setRevealed(true);
      const dataURL = canvasRef.current.toDataURL();

      let header = new Headers();
      header.append("Content-Type", "application/json");

      let formdata = new FormData();
      formdata.append("base64image", dataURL);
      let requestOptions = {
        method: 'POST',
        headers: header,
        body: formdata,
        redirect: 'follow'
      };
      fetch("https://ul2efbv4q2.execute-api.us-west-1.amazonaws.com", requestOptions)
      .then(response => response.json())
      .then(response => {
        setSymbols(response.symbols || []);
        setTFConfidences(response.tfconfidences);
        setTFPrediction(response.tfresponse);
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    const temp = {
      ...strokes
    };
    temp[numStrokes].push({offsetX, offsetY});
    setStrokes(temp);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    setSymbols([]);
    setStrokes({});
    setNumStrokes(0);
    setIsShowingBoxes(false);
    setTFConfidences(initialState);
    setTFPrediction('');
  }

  const toggleBox = () => {
    if (isShowingBoxes) {
      const canvas = canvasRef.current;
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      contextRef.current.strokeStyle = 'black';
      for (let i in strokes) {
        contextRef.current.moveTo(strokes[i][0].offsetX, strokes[i][0].offsetY);
        contextRef.current.beginPath();
        strokes[i].forEach((item, index) => {
          if (index !== 0) {
            contextRef.current.lineTo(item.offsetX, item.offsetY);
            contextRef.current.stroke();
          }
        });
        contextRef.current.closePath();
      }
      setIsShowingBoxes(false);
    } else {
      symbols.forEach((item) =>{
        contextRef.current.lineWidth = 4;
        if (item.confidence >= 0.85) {
          contextRef.current.strokeStyle = 'green';
        } else if (item.confidence >= 0.5) {
          contextRef.current.strokeStyle = 'orange';
        } else {
          contextRef.current.strokeStyle = 'red';
        }
        contextRef.current.moveTo(item.boundingBox.vertices[0].x / scale, item.boundingBox.vertices[0].y / scale);
        contextRef.current.beginPath();
        item.boundingBox.vertices.forEach((vertex) => {
          contextRef.current.lineTo(vertex.x / scale, vertex.y/ scale);
          contextRef.current.stroke();
        });
        contextRef.current.closePath();
        contextRef.current.stroke();
        contextRef.current.strokeStyle = 'black';
        contextRef.current.lineWidth = 20;
      });
      setIsShowingBoxes(true);
    }
    setShowClicked(false)
  }

  const handleClearClicked = () => {
    setClearClicked(true)
  }

  const handleShowClicked = () => {
    setShowClicked(true)
  }

  const tabClicked = (tab) => {
    if (tab === 'about') {
      setCardState(aboutText)
    } else if (tab === 'faq') {
      setCardState(faqText)
    } else {
      setCardState(contactText)
    }
    setTabState(tab)
  }

  return (
    <>
      <ul className="navbar">
        <li className={`${tabState ==='about'? 'active': ''}`} onMouseDown={() => {tabClicked('about')}}>About</li>
        <li className={`${tabState ==='faq'? 'active': ''}`} onMouseDown={() => {tabClicked('faq')}}>FAQ</li>
        <li className={`${tabState ==='contact'? 'active': ''}`} onMouseDown={() => {tabClicked('contact')}}>Contact</li>
      </ul>

      <div className="left-sidebar">
        <LeftCard tab={cardState} />
      </div>

      <div className="main1">
        <table className="mainContent">
          <tbody>
            <tr>
              <td>
                <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={draw} onMouseLeave={stopDrawing}>Something went wrong.</canvas>
              </td>
            </tr>
            <tr>
              <td>
              <button className={`${clearClicked? 'clicked' : ''}`} onMouseDown={handleClearClicked} onClick={clearCanvas} onMouseUp={() => {setClearClicked(false)}}>Clear canvas</button>
              <button className={`${showClicked? 'clicked' : ''}`} onClick={toggleBox} onMouseDown={handleShowClicked}>Show bounding boxes</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="wrapper">
        <div className="ConfidenceList">
          <ConfidenceList revealed={revealed} confidences={tfconfidences} prediction={tfprediction} />
        </div>
      </div>

      <div className="right-sidebar">
        <p className="section-title">Google's Cloud Vision response:</p>
        <table className="response">
          <thead>
            <tr>
              <th>Character</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {symbols.map((item, index) =>(
              <tr key={index}>
                <td>
                  {'"' + item.symbol + '"'}
                </td>
                <td>
                  {item.confidence.toFixed(2).toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
