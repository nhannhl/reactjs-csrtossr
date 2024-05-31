// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import App from './App.jsx'
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import store from "./stores";
// import { persistore } from "./stores";

// export function render() {
//   const html = ReactDOMServer.renderToString(
//     <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistore}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
//   )
//   return { html }
// }

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { initializeStore } from './stores';

export function render(url, preloadedState) {
  const context = {};
  const store = initializeStore(preloadedState);

  const appHtml = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return { html: appHtml, preloadedState: store.getState() };
}