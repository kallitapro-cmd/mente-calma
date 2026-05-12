import { useState } from 'react'

export default function BrainDumpScreen({ onSubmit }) {
  const [text, setText] = useState('')

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && text.trim()) {
      onSubmit(text)
    }
  }

  return (
    <div className="h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="text-center">
          <p className="text-text-muted text-sm font-light tracking-widest uppercase">
            mente calma
          </p>
          <h1 className="mt-4 text-text-primary text-xl font-light leading-relaxed">
            o que está passando pela sua mente?
          </h1>
          <p className="mt-2 text-text-muted text-xs font-light">
            escreva tudo. aqui é um espaço seguro.
          </p>
        </div>

        <textarea
          className="
            w-full h-[52vh] bg-surface text-text-primary text-sm font-light
            leading-relaxed resize-none rounded-2xl p-5
            border border-white/5 focus:border-accent/20 focus:outline-none
            placeholder:text-text-muted/40 transition-colors duration-300
          "
          placeholder="escreva tudo. sem filtro. sem julgamento."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />

        <div className="flex flex-col items-center gap-3">
          {text.trim() && (
            <button
              onClick={() => onSubmit(text)}
              className="
                px-8 py-2.5 rounded-full text-accent text-sm font-light
                bg-accent/10 hover:bg-accent/20 transition-all duration-300
                border border-accent/20 hover:border-accent/30
              "
            >
              respirar e organizar
            </button>
          )}
          <p className="text-text-muted/30 text-xs font-light">
            {text.trim() ? 'ou pressione Ctrl + Enter' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}
