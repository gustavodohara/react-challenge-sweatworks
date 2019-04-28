import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './history'
import App from './Components/App.js'
import initialize from './redux/store'

const store = initialize();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  , document.getElementById('app')
)
