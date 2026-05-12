import { useState, useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'

export default function ChatScreen({ messages, isLoading, onSend }) {
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function handleInput(e) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function submit() {
    if (!input.trim() || isLoading) return
    onSend(input)
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header mínimo */}
      <div className="flex items-center justify-center py-4 shrink-0">
        <span className="w-2 h-2 rounded-full bg-accent/60" />
        <span className="ml-2 text-text-muted text-xs font-light tracking-widest uppercase">
          mente calma
        </span>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-2xl mx-auto pt-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input fixo no rodapé */}
      <div className="shrink-0 px-4 pb-6 pt-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end gap-3 bg-surface rounded-2xl px-4 py-3 border border-white/5">
            <textarea
              ref={textareaRef}
              rows={1}
              className="
                flex-1 bg-transparent text-text-primary text-sm font-light
                leading-relaxed resize-none focus:outline-none
                placeholder:text-text-muted/40
                overflow-hidden
              "
              placeholder="escreva aqui..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <button
              onClick={submit}
              disabled={!input.trim() || isLoading}
              className="
                text-accent text-lg leading-none mb-0.5 transition-opacity duration-200
                disabled:opacity-20 hover:opacity-70
              "
              aria-label="Enviar"
            >
              →
            </button>
          </div>
          <p className="text-center text-text-muted/20 text-xs mt-2 font-light">
            Enter para enviar · Shift+Enter para nova linha
          </p>
        </div>
      </div>
    </div>
  )
}
