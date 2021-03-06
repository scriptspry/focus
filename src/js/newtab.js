import React from 'react';
import ReactDOM from 'react-dom';
import FocusContainer from './containers/FocusContainer';

chrome.storage.sync.get(null, data => {
  ReactDOM.render(
    <FocusContainer state={data} />,
    document.getElementById('mount-point')
  );
});
