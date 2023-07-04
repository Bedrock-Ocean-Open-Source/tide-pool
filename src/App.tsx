import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@/store';
import { Surveys } from './pages/Surveys/Surveys';
import '@/index.css';

const MainContext = React.createContext({});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainContext.Provider value={{}}>
          <Surveys />
        </MainContext.Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
