export default function ChatBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[75%] px-4 py-3 text-text-primary text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'bg-bubble-user rounded-2xl rounded-br-sm'
            : 'bg-bubble-ai rounded-2xl rounded-bl-sm'
          }
        `}
      >
        {content}
      </div>
    </div>
  )
}
