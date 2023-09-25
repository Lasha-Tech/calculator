import { useReducer, useState } from "react";
import { DigitButton } from './DigitButton';
import { OperationButton } from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }

      if(payload.digit === '0' && state.currentOperand === '0') {
        return state
      } 

      if(payload.digit === '.' && state.currentOperand.includes('.')) {
        return state
      } 

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

    case ACTIONS.CLEAR: 
      return {}

    case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand == null) {
          return state
        }

        if(state.previousOperand == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand: null
          }
        }

        if(state.currentOperand == null) {
            return {
              ...state,
              operation: payload.operation
            }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperand: null
      }

    case ACTIONS.EVALUATE:
      if(state.currentOperand == null || 
         state.previousOperand == null ||
         state.operation == null ) {
        return state
      }
    
      return {
        ...state,
        currentOperand: evaluate(state),
        overwrite: true,
        operation: null,
        previousOperand: null
      }  

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }

      if(state.currentOperand == null) {
        return state
      }

      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

      default:
        return 
  }
}

function evaluate({previousOperand, currentOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if(isNaN(prev) || isNaN(curr)) return ''

  let computation = '';
  switch(operation) {
    case '+':
      computation = prev + curr
      break
    case '-':
      computation = prev - curr
      break
    case 'x':
      computation = prev * curr
      break
    case '/':
      computation = prev / curr
      break
    default:
      return
  }
  return computation.toString()
}

const INTEGER_FORMATTER = Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split('.');
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  //Reducer
  const [{previousOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {});

  //States
  //Screen & Title
  const [ballMargin, setBallMargin] = useState('');
  const [ballEqualColor, setBallEqualColor] = useState('hsl(6, 63%, 50%)');
  const [appBackground, setAppBackground] = useState('hsl(222, 26%, 31%)');
  const [titleScreenColor, setTitleScreenColor] = useState('white');
  const [screenBackground, setScreenBackground] = useState('hsl(224, 36%, 15%)');
  //Keypad
  const [keyboardToggleBackground, setKeyboardToggleBackground] = useState('hsl(223, 31%, 20%)');
  const [buttonBackground, setButtonBackground] = useState('hsl(30, 25%, 89%)');
  const [buttonColor, setButtonColor] = useState('hsl(221, 14%, 31%)');
  const [buttonShadow, setButtonShadow] = useState('0 4px 0 hsl(28, 16%, 65%)');
  const [clearShadow, setClearShadow] = useState('0 4px 0 hsl(224, 28%, 35%)');
  const [clearBackground, setClearBackground] = useState('hsl(225, 21%, 49%)');
  const [equalColor, setEqualColor] = useState('white');
  const [equalShadow, setEqualShadow] = useState('0 4px 0 hsl(6, 70%, 34%)');


  //Toggle Color Changing Function
  const clickBall = () => {
    // Second Color
    setBallMargin('23.5px')
    setBallEqualColor('hsl(25, 98%, 40%)')
    setAppBackground('hsl(0, 0%, 90%)')
    setTitleScreenColor('hsl(60, 10%, 19%)')
    setKeyboardToggleBackground('hsl(0, 5%, 81%)')
    setScreenBackground('hsl(0, 0%, 93%)')
    setButtonColor('hsl(60, 10%, 19%)')
    setButtonBackground('hsl(45, 7%, 89%)')
    setClearBackground('hsl(185, 42%, 37%)')
    setButtonShadow('0 4px 0 hsl(35, 11%, 61%)')
    setClearShadow('0 4px 0 hsl(185, 58%, 25%)')
    setEqualShadow('0 4px 0 hsl(25, 99%, 27%)')

    //Third Color
    if(ballMargin === '23.5px') {
      setBallMargin('47px')
      setBallEqualColor('hsl(176, 100%, 44%)')
      setAppBackground('hsl(268, 75%, 9%)')
      setTitleScreenColor('hsl(52, 100%, 62%)')
      setKeyboardToggleBackground('hsl(268, 71%, 12%)')
      setScreenBackground('hsl(268, 71%, 12%)')
      setButtonColor('hsl(52, 100%, 62%)')
      setButtonBackground('hsl(268, 47%, 21%)')
      setClearBackground('hsl(281, 89%, 26%)')
      setEqualColor('hsl(198, 20%, 13%)')
      setButtonShadow('0 4px 0 hsl(290, 70%, 36%)')
      setClearShadow('0 4px 0 hsl(285, 91%, 52%)')
      setEqualShadow('0 4px 0 hsl(177, 92%, 70%)')
    } 
    
    //First Color
    else if(ballMargin === '47px') {
      setBallMargin('0px')
      setBallEqualColor('hsl(6, 63%, 50%)')
      setAppBackground('hsl(222, 26%, 31%)')
      setTitleScreenColor('white')
      setKeyboardToggleBackground('hsl(223, 31%, 20%)')
      setScreenBackground('hsl(224, 36%, 15%)')
      setButtonColor('hsl(221, 14%, 31%)')
      setButtonBackground('hsl(30, 25%, 89%)')
      setClearBackground('hsl(225, 21%, 49%)')
      setEqualColor('white')
      setButtonShadow('0 4px 0 hsl(28, 16%, 65%)')
      setClearShadow('0 4px 0 hsl(224, 28%, 35%)')
      setEqualShadow('0 4px 0 hsl(6, 70%, 34%)')
    }
  }


  //Mouseover Color Changing Function
  //Common Key
  const handleOverFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(30, 25%, 100%)';
  }
  const handleOverSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(45, 7%, 100%)';
  }
  const handleOverThird = (event) => {
    event.target.style.backgroundColor = 'hsl(268, 47%, 56%)';
  }

  //Clean Key
  const handleOverCleanFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(225, 21%, 70%)';
  }
  const handleOverCleanSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(185, 42%, 57%)';
  }
  const handleOverCleanThird = (event) => {
    event.target.style.backgroundColor = 'hsl(281, 89%, 40%)';
  }

  //Toggle Ball, Equal Key
  const handleOverEqualFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(6, 63%, 60%)';
  }
  const handleOverEqualSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(25, 98%, 60%)';
  }
  const handleOverEqualThird = (event) => {
    event.target.style.backgroundColor = 'hsl(176, 100%, 84%)';
  }


  //Mouseout Color Changing Function
  //Common Key
  const handleOutFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(30, 25%, 89%)';
  }
  const handleOutSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(45, 7%, 89%)';
  }
  const handleOutThird = (event) => {
    event.target.style.backgroundColor = 'hsl(268, 47%, 21%)';
  }

  //Clean Key
  const handleOutCleanFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(225, 21%, 49%)';
  }
  const handleOutCleanSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(185, 42%, 37%)';
  }
  const handleOutCleanThird = (event) => {
    event.target.style.backgroundColor = 'hsl(281, 89%, 26%)';
  }

  //Toggle Ball, Equal Key
  const handleOutEqualFirst = (event) => {
    event.target.style.backgroundColor = 'hsl(6, 63%, 50%)';
  }
  const handleOutEqualSecond = (event) => {
    event.target.style.backgroundColor = 'hsl(25, 98%, 40%)';
  }
  const handleOutEqualThird = (event) => {
    event.target.style.backgroundColor = 'hsl(176, 100%, 44%)';
  }


  //Key Shadow Color Changing Function
  //Common Key Shadow Change
  const handleClickFirst = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(28, 16%, 65%)';
      }, 250)
  }
  const handleClickSecond = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(35, 11%, 61%)';
      }, 250)
  }
  const handleClickThird = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(290, 70%, 36%)';
      }, 250)
  }

  //Clean Key Shadow Change
  const handleClickCleanFirst = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(224, 28%, 35%)';
      }, 250)
  }
  const handleClickCleanSecond = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(185, 58%, 25%)';
      }, 250)
  }
  const handleClickCleanThird = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(285, 91%, 52%)';
      }, 250)
  }

  //Equal Key Shadow Change
  const handleClickEqualFirst = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(6, 70%, 34%)';
      }, 250)
  }
  const handleClickEqualSecond = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(25, 99%, 27%)';
      }, 250)
  }
  const handleClickEqualThird = (event) => {
    event.target.style.boxShadow = '';
    setTimeout(() => {
        event.target.style.boxShadow = '0 4px 0 hsl(177, 92%, 70%)';
      }, 250)
  }


  return (
    <div className="App" style={{backgroundColor: appBackground}}>
      <div className="calculator">

      {/* Title */}
        <div className="title" style={{color: titleScreenColor}}>
          <p className='calc'>calc</p>
          <div className="theme">
            <p className="theme-numbers">1  2  3</p>
            <div className="theme-button">
              <p className="theme-button-title">THEME</p>

              <div className='button' style={{backgroundColor: keyboardToggleBackground}}>
                <div className="ball" onClick={clickBall}   
                onMouseOver={e => {
                  ballMargin === '23.5px'? handleOverEqualSecond(e) : ballMargin === '47px'? handleOverEqualThird(e) : handleOverEqualFirst(e)
                }}   
                onMouseOut={e => {
                  ballMargin === '23.5px'? handleOutEqualSecond(e) : ballMargin === '47px'? handleOutEqualThird(e) : handleOutEqualFirst(e)
                }} style={{marginLeft: ballMargin, backgroundColor: ballEqualColor}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="screen" style={{color: titleScreenColor, backgroundColor: screenBackground}}>
          <div className="previous">
            <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
          </div>
          <div className="current">
            <div className="current-operand">{formatOperand(currentOperand)}</div>
          </div>
        </div>

        {/* Keypad */}
        <div className="keypad" style={{backgroundColor: keyboardToggleBackground}}>
            {/* First  */}
          <div className="first-column flex">
            {/* 7 */}
            <DigitButton  digit='7' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 8  */}
            <DigitButton  digit='8' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 9  */}
            <DigitButton  digit='9' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* Delete Button  */}
            <button id="delete"
             onClick={e => {
              dispatch({type: ACTIONS.DELETE_DIGIT});
              ballMargin === '23.5px'? handleClickCleanSecond(e) : ballMargin === '47px'? handleClickCleanThird(e) : handleClickCleanFirst(e)
            }}
            onMouseOver={e => {
              ballMargin === '23.5px'? handleOverCleanSecond(e) : ballMargin === '47px'? handleOverCleanThird(e) : handleOverCleanFirst(e)
            }}   
            onMouseOut={e => {
              ballMargin === '23.5px'? handleOutCleanSecond(e) : ballMargin === '47px'? handleOutCleanThird(e) : handleOutCleanFirst(e)
            }} style={{backgroundColor: clearBackground, boxShadow: clearShadow}}>
              DEL
              </button>
          </div>
            {/* Second  */}
          <div className="second-column flex">
            {/* 4  */}
            <DigitButton  digit='4' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 5 */}
            <DigitButton  digit='5' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 6 */}
            <DigitButton  digit='6' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* +  */}
            <OperationButton  operation='+' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>
          </div>
            {/* Third  */}
            <div className="third-column flex">
            {/* 1  */}
            <DigitButton  digit='1' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 2  */}
            <DigitButton  digit='2' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 3 */}
            <DigitButton  digit='3' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* -  */}
            <OperationButton  operation='-' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>
          </div>
            {/* Forth  */}
          <div className="forth-column flex">
            {/* .  */}
            <DigitButton  digit='.' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* 0  */}
            <DigitButton  digit='0' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* /  */}
            <OperationButton  operation='/' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>

            {/* x  */}
            <OperationButton  operation='x' dispatch={dispatch}
                style={{
                  width: '25%',
                  height: '100%',
                  outline: 'none',
                  border: 'unset',
                  borderRadius: '7px',
                  fontSize: '28px',
                  fontWeight: '700',
                  fontFamily: 'League Spartan, sans-serif',
                  cursor: 'pointer',
                  backgroundColor: buttonBackground,
                  boxShadow: buttonShadow,
                  color: buttonColor
                }}
                click={e => {
                  ballMargin === '23.5px'? handleClickSecond(e) : ballMargin === '47px'? handleClickThird(e) : handleClickFirst(e)
                }}
                mouseOver={e => {
                  ballMargin === '23.5px'? handleOverSecond(e) : ballMargin === '47px'? handleOverThird(e) : handleOverFirst(e)
                }}   
                mouseOut={e => {
                  ballMargin === '23.5px'? handleOutSecond(e) : ballMargin === '47px'? handleOutThird(e) : handleOutFirst(e)
                }}/>
          </div>
            {/* Fifth  */}
          <div className="fifth-column flex">
            {/* Reset  */}
            <button id="reset"
             onClick={e => {
              dispatch({type: ACTIONS.CLEAR});
              ballMargin === '23.5px'? handleClickCleanSecond(e) : ballMargin === '47px'? handleClickCleanThird(e) : handleClickCleanFirst(e);
            }}
            onMouseOver={e => {
              ballMargin === '23.5px'? handleOverCleanSecond(e) : ballMargin === '47px'? handleOverCleanThird(e) : handleOverCleanFirst(e)
            }}   
            onMouseOut={e => {
              ballMargin === '23.5px'? handleOutCleanSecond(e) : ballMargin === '47px'? handleOutCleanThird(e) : handleOutCleanFirst(e)
            }} style={{backgroundColor: clearBackground, boxShadow: clearShadow}}>
              RESET
              </button>

            {/* Equal */}
            <button id='equal'
             onClick={e => {
              dispatch({type: ACTIONS.EVALUATE});
              ballMargin === '23.5px'? handleClickEqualSecond(e) : ballMargin === '47px'? handleClickEqualThird(e) : handleClickEqualFirst(e)
            }}
            onMouseOver={e => {
              ballMargin === '23.5px'? handleOverEqualSecond(e) : ballMargin === '47px'? handleOverEqualThird(e) : handleOverEqualFirst(e)
            }}   
            onMouseOut={e => {
              ballMargin === '23.5px'? handleOutEqualSecond(e) : ballMargin === '47px'? handleOutEqualThird(e) : handleOutEqualFirst(e)
            }} style={{backgroundColor: ballEqualColor, color: equalColor, boxShadow: equalShadow}}>
              =
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
