import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()

  function sendMessage () {
    socket.send("ping");
  }


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8050");
    setSocket(ws);

    ws.onmessage = ((ev) => {
      console.log(ev.data)
    })

    // ws.onerror = () =>{}
    // ws.close = () =>{}
    // ws.onopen = () =>{}

  }, [])

  return (
    <div>
      {/* <form action="submit">  */}

      <input type="text" placeholder='write something...' />
      <button onClick={sendMessage} > Send</button>
      {/* </form> */}
    </div>
  )
}

export default App
