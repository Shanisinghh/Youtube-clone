import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
 const [data, setData] = useState([])
console.log(data);
// useEffect(() => {

//     axios.post("http://localhost:3000/api/login", {
//       email: "shivam@2345678",
//       password: "shani1234"
//     },{withCredentials: true}).then((result) => {
//       console.log(result);
//     }).catch((err) => {
//     console.log(err);
//   });
// },[])

 useEffect(() => {
    axios.get("http://localhost:3000/api/videos", {
      withCredentials: true
    })
    .then((result) => {
      console.log(result.data);
      setData(result.data);
    })
    .catch((err) => {
      console.error("Fetch error:", err.response?.data || err.message);
    });
  }, []);

  return (
    <>
    
    </>
  )
}

export default App
