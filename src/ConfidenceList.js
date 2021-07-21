import { useEffect, useRef, useState } from 'react';
import BarElement from './BarElement';

function ConfidenceList(props) {
  const [revealed, setRevealed] = useState(false);
  const isFirstLoad = useRef(true)
  useEffect(() => {
    if (!isFirstLoad.current) {
      setTimeout(() => {
        setRevealed(true)
      }, 0)
    }
    isFirstLoad.current = false
  }, [props.revealed]);
  return (
    <>
      <div className={`wall ${revealed? 'slide': ''}`}></div>
      <div>
        <p>Tensorflow's prediction: {props.prediction}</p>
        {Object.keys(props.confidences).map((key) => (
            <BarElement key={key} label={key} val={props.confidences[key]}/>
        ))}
      </div>
    </>
  );
}

export default ConfidenceList;