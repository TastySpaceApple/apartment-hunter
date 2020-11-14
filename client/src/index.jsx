import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";

let data = fetch('http://localhost:3000/api/get-all')

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
