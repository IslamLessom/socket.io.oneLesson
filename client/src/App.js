import React, { useEffect, useState } from 'react'

import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

function App() {
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")
  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket]) //он будет запускаться каждый раз когда будет происходить изменение
  return (
    <div className="App">
      <input onChange={(event) => {
        setMessage(event.target.value)
      }} placeHolder="Введите текст" />
      <button onClick={sendMessage}>Поделиться</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
