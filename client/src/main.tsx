import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from "react-redux";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './ui/ErrorFallback.tsx';
import { store } from './state/store.ts';


  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
            <App />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  )

