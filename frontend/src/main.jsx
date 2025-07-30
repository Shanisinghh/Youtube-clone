import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import Chennel from './pages/channel.jsx';
import ViewChannel from './pages/ViewChannel.jsx';
import Home from './pages/Home.jsx';
import UploadVideo from './pages/UplodeVideo.jsx';
import Video from './pages/VideoPlayer.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="/" element={<App />}>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/chennel' element={<Chennel/>}/>
      <Route path='/viewchannel' element={<ViewChannel/>}/>
      <Route path='/uploadvideo' element={<UploadVideo/>}/>
      <Route path='/video/:videoId' element={<Video/>}/>
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
