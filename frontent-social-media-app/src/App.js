import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter} from 'react-router-dom';
import HomePage from "./routes/HomePage";
import { hot } from 'react-hot-loader';

function App() {

  // const [solayman, setSolayman] = useState('');

  // useEffect(()=>{
  //   axios.get(`${process.env.REACT_APP_BASE_URL}`)
  //   .then((e)=>setSolayman(e.data))
  //   .then(e=>console.log(e.data))
  //   .catch((e)=>{console.log(e)})
  // }, [])

  return (
    <BrowserRouter>
      <HomePage/>
    </BrowserRouter>
  );
}

export default App;
