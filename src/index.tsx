
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './components/homepage/Homepage';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/' element={<Homepage />} />
          {/* <Route path='/weathers' element={<------------/>} /> */}
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);