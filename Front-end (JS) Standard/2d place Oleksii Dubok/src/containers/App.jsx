import React  from 'react';
import {
    BrowserRouter as Router,
    Route
}             from 'react-router-dom';
import Layout from '../components/pages/Layout.jsx';

export default function App() {
    return (
        <Router>
            <div>
                <Route path='/' component={Layout} />
            </div>
        </Router>
    );
}
