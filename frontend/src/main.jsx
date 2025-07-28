import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="/" element={<App />}>
      <Route path='/login' element={<Login/>}/>
    </Route>
  )
);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
