import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'
import { infoReducer } from './redux/reducers.ts'
import { thunk } from 'redux-thunk'

const rootReducer = combineReducers({
  info: infoReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
