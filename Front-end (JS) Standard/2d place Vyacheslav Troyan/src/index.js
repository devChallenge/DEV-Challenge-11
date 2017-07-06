import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App/index.js'


// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import thunk from 'redux-thunk'

// import reducer from './reducers'
// const middleware = [thunk]
// const store = createStore(
//   reducer,
//   applyMiddleware(...middleware)
// )

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
