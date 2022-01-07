import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

let timerID = 0;
const Timer = () => {
  const [count, setCount] = useState(0);
  const [tooltipShown, setTooltipShown] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    timerID++;
    const timer = setInterval(() => {
      setCount((currentCount) => {
        console.log(`Timer ${timerID} starts ${currentCount}`);
        return currentCount + 1
      });
    }, 1000);

    // cleanup function
    return () => {
      // clear the timer
      clearInterval(timer);
    }
  }, []);

  const tooltipPopperRef = useRef(null);

  const onMouseOver = useCallback(() => setTooltipShown(true), []);
  const onMouseOut = useCallback(() => setTooltipShown(false), []);
  const onButtonClick = useCallback(() => {
    console.log('use callback being fired');
    setShowButton(true);
  }, []);
  const onButtonClickTest = () => {
    console.log('normal button being fired');
  }

  useEffect(() => {
    console.log('Add event Listeners');
    // if current - addEventListner is defined
    tooltipPopperRef.current?.addEventListener('mouseover', onMouseOver);
    tooltipPopperRef.current?.addEventListener('mouseout', onMouseOut);
    
    const ref = tooltipPopperRef.current

    return () => {
      console.log('removing event listeners');
      ref?.removeEventListener('mouseover', onMouseOver);
      ref?.removeEventListener('mouseout', onMouseOver);
    }
  }, [onMouseOver, onMouseOut]);

  return (<div>
      <div> Timer: {count} </div>
      <div ref={tooltipPopperRef}>Tooltip popper </div>
      {tooltipShown && <div>Tooltip Timer: {count}</div>}
      <button onClick={onButtonClick}> Do something </button>
    </div>
  );
}


function App() {
  const [ index, setIndex ] = useState(0);

  const updateIndex = useCallback(() => setIndex(index + 1), [index]);

  return (
    <div className="App">
      <Timer key={index}/>
      <div>
         <button onClick={updateIndex}>Update Index</button>
      </div>
    </div>
  );
}

export default App;
