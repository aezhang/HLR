import { useEffect, useRef, useState } from "react";

function LeftCard(props) {
    const [animate, setAnimate] = useState(true);
    const [text, setText] = useState(props.tab);
    const pageLoad = useRef(false);

    useEffect(() => {
        if (pageLoad.current) {
            setAnimate(false)
            setTimeout(() => {
                setText(props.tab)
                setAnimate(true)
            }, 600)
        }
        pageLoad.current = true
    }, [props.tab]);

    return (
        <div className={`LeftCard ${animate ? 'move' : ''}`} dangerouslySetInnerHTML={{__html: text}}></div>
    );
}
export default LeftCard;