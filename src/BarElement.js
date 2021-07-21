import { useState } from "react";
import Bar from './Bar';

function BarElement(props) {
  const [hovered, setHovered] = useState(false);
  const handleEnter = () => {
    setHovered(true)
  }
  const handleLeave = () => {
    setHovered(false)
  }
  const handleDown = () => { //These functions are for mobile tapping
    if (!hovered) {
        setHovered(true)
    }
  }
  const handleUp = () => {
    if (!hovered) {
        setHovered(false)
    }
  }
  return (
    <div className={`BarElement ${hovered ? 'interact' : ''}`} onMouseEnter={handleEnter} onMouseDown={handleDown} onMouseLeave={handleLeave} onMouseUp={handleUp}>
        <span className={`tooltip ${hovered ? 'interact' : ''}`}>{props.val.toPrecision(4)}</span>
        <Bar val={props.val} />
        <div className="bar-bottom"></div>
        <span className="label">{props.label}</span>
    </div>
  );
}

export default BarElement;