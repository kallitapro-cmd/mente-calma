import { useState } from 'react'
import BrainDumpScreen from './components/BrainDumpScreen.jsx'
import ChatScreen from './components/ChatScreen.jsx'

const API_URL = 'http://localhost:8000/api/chat'

export default function App() {
  const [screen, setScreen] = useState('braindump')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(userText) {
    const newMessage = { role: 'user', content: userText }
    const updatedMessages = [...messages, newMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()
      const reply = res.ok
        ? data.message
        : (data.detail ?? 'algo deu errado... tente novamente.')
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'algo deu errado... verifique sua conexão e tente novamente.' },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleBrainDump(text) {
    setScreen('chat')
    sendMessage(text)
  }

  return screen === 'braindump'
    ? <BrainDumpScreen onSubmit={handleBrainDump} />
    : <ChatScreen messages={messages} isLoading={isLoading} onSend={sendMessage} />
}
