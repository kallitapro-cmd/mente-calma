export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-3 mb-2">
      <div
        className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
        style={{ animationDelay: '0ms' }}
      />
      <div
        className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
        style={{ animationDelay: '150ms' }}
      />
      <div
        className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
        style={{ animationDelay: '300ms' }}
      />
    </div>
  )
}
