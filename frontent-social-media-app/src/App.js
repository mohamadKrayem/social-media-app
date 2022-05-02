import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [solayman, setSolayman] = useState('');

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}`)
    .then((e)=>setSolayman(e.data))
    .then(e=>console.log(e.data))
    .catch((e)=>{console.log(e)})
  }, [])

  return (
    <div className="App">
      <h1>hello world</h1>
      <h2>{solayman}</h2>
    </div>
  );
}

export default App;
