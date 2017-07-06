import React from 'react';
import { render } from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import App from './components/App/App';
import 'semantic-ui-css/semantic.min.css';

render(<App />, document.getElementById('root'));
registerServiceWorker();
