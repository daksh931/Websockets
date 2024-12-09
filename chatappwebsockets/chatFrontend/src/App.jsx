import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const [messages, setMessages] = useState([])
  const inputMessage =   useRef();

  function sendMessage (e) {
    e.preventDefault();
    console.log(inputMessage.current.value)
    socket.send(JSON.stringify({
      type : "chat",
      payload : {
                  message : inputMessage.current.value
                  }
  })
  );
  }

  useEffect(() => {
    const ws = new WebSocket("wss://websockets-c6hs.onrender.com/")
    setSocket(ws)
    ws.onmessage = (e)=> {
      const ms = JSON.stringify(e.data)
      // console.log(e.data)
      setMessages(m => [...m, ms])
    }

    ws.onopen = () => {
      // Send the "join" message when the connection opens
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };
  }, [])



  return (
    <div className='w-[100vw] h-[100vh] bg-gray-200 flex justify-center align-middle items-center'>

      <div className=' space-x-3'>
        <form onSubmit={sendMessage}>

        <input ref={inputMessage} className='border-[1px] pl-2 border-gray-400 rounded-sm focus:border-none'type="text" placeholder='type here...' />
        <button type="submit" className='bg-black text-white px-2 p-1 rounded-md'> Send</button>
        </form>
      
        <div className='m-2 space-y-1'>
          { messages.map( msg => 
            <div key={Math.random()} className=' text-right p-1 px-2 bg-gray-500 text-white'> { msg}</div> 
        )}
        </div>
      </div>
    </div>
  )
}

export default App
