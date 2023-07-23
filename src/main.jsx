import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";   // Router. from local path to each page. 
import { router } from './Routes/index.jsx';
import "./index.scss";
import "./index.css";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


import { app } from './firebaseConfig.js';

//This is the actual App. 

ReactDOM.createRoot(document.getElementById('root')).render(
<div>
<RouterProvider router={router} />
    <ToastContainer />
</div>
    

)
