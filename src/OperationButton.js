import { ACTIONS } from './App'


export function OperationButton ({dispatch, operation, style, click, mouseOver, mouseOut}) {
  return <button  
    style={style}
    onMouseOver={mouseOver} 
    onMouseOut={mouseOut}
    onClick={e => {
      click(e);
      dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }});
    }}>{ operation }</button>
}