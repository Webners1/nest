import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <MoralisProvider serverUrl="https://dsgipqqltuoo.usemoralis.com:2053/server" appId="ZMfELwvMZ3ki5onuLo7PUCXk46YNiB2NxAYXPOlO">
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </MoralisProvider>,
  document.getElementById('root')
);

