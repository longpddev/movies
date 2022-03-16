import React, { useReducer } from 'react'
import Collapse from '../Collapse';

const initialState = {
  sort_by: 'popularity.desc'
};
/**
 * 
 * @param {*} state type and key value
 * @param {*} action 
 * @returns 
 */
function reducer(state, action) {
  switch (action.type) {
    case 'addFilter':
      return {
        ...state,
        [action.key]: action.value
      };
    case 'removeFilter':
      delete state[action.key];
      return {
        ...state
      };
    default:
      throw new Error();
  }
}

const Filter = ({onSearch}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Collapse className="mb-3" name="Sort">
      </Collapse>
      <button 
      onClick={() => onSearch(state)}
      className="bg-sky-400 hover:bg-sky-900 rounded-md text-xl text-white px-2 py-1 w-full"
      >Search</button>
    </>
  )
}

export default Filter