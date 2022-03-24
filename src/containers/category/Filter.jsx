import React, { useReducer } from 'react'
import { createPortal } from 'react-dom'

import Collapse from '../../components/Collapse'
import CollapseWrap from '../../components/CollapseWrap'
import SortFilter from './SortFilter'
import ReleaseDatesFilter from './ReleaseDatesFilter'
import AvailabilitiesFilter from './AvailabilitiesFilter'
import GenresFilter from './GenresFilter'
import UserScoreFilter from './UserScoreFilter'
import UserVotesFilter from './UserVotesFilter'
import RuntimeFilter from './RuntimeFilter'
import KeywordFilter from './KeywordFilter'

const Body = ({ children }) => createPortal(children, document.body)

const Filter = ({ onSearch, state, dispatch }) => {
  return (
    <>
      <Collapse className="mb-3" name="Sort">
        <CollapseWrap>
          <SortFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
      </Collapse>
      <Collapse className="mb-3" name="Filters">
        <CollapseWrap>
          <AvailabilitiesFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <ReleaseDatesFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <GenresFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <UserScoreFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <UserVotesFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <RuntimeFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
        <CollapseWrap>
          <KeywordFilter state={state} dispatch={dispatch} />
        </CollapseWrap>
      </Collapse>
      <button
        onClick={() => onSearch()}
        className="bg-sky-400 hover:bg-sky-900 rounded-md text-xl text-white px-2 py-1 w-full"
      >
        Search
      </button>
      <Body>
        <div className="fixed bottom-0 left-0 w-full">
          <button
            onClick={() => onSearch()}
            className="bg-sky-400 hover:bg-sky-900 text-xl text-white px-2 py-2 w-full"
          >
            Search
          </button>
        </div>
      </Body>
    </>
  )
}

export default Filter
