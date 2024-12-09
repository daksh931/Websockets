import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const inputValue = useRef();

  function sendMessage (e) {
    e.preventDefault();
    // console.log(inputValue.current.value);
    socket.send(inputValue.current.value);
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
      <form onSubmit={sendMessage} >  

      <input type="text" ref={inputValue} placeholder='write something...' />
      <button  type="submit"  > Send</button>
      </form>
    </div>
  )
}

export default App
