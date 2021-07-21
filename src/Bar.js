import { useEffect, useState } from "react";

function Bar(props) {
    const [animate, setAnimate] = useState(true)
    const [height, setHeight] = useState(0)
    useEffect(() => {
        setAnimate(false)
        setTimeout(() => {
            setAnimate(true)
            setHeight(Math.round((props.val / 1.) * 60))
        }, 0)
    }, [props.val]);
    return (
        <div className={`Bar ${animate ? 'animate' : ''}`} style={{'--bar-height': `${height}px`}} ></div>
    );
}

export default Bar;