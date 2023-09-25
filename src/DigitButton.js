import { ACTIONS } from './App'


export function DigitButton ({dispatch, digit, style, click, mouseOver, mouseOut, state}) {
  return <button  
    disabled = {digit === '.' && !state}
    style={style}
    onMouseOver={mouseOver} 
    onMouseOut={mouseOut}
    onClick={e => {
      click(e);
      dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }});
    }}>{ digit }</button>
}




