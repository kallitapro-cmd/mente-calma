import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai

load_dotenv()

SYSTEM_PROMPT = """Você é um assistente calmo e empático especializado em ajudar pessoas a reduzir a ansiedade organizando seus pensamentos. Você guia o usuário por 4 etapas:

1. Brain Dump (Esvaziamento): Acolha tudo que o usuário compartilhar sem julgamento. Valide os sentimentos com warmth genuíno.
2. Categorização Silenciosa: Categorize internamente os pensamentos em temas (trabalho, relacionamentos, saúde, finanças, etc.) e reflita gentilmente essas categorias de volta ao usuário.
3. Redução de Escopo (Micro-passos): Identifique UMA ação pequena e concreta que o usuário pode fazer nos próximos 5 minutos para se sentir menos sobrecarregado.
4. Plano de Alívio: Crie um plano simples e não-opressor para as próximas 24 horas com 2 a 3 itens gentis e realizáveis.

REGRAS CRÍTICAS:
- Faça apenas UMA pergunta curta por vez. Nunca duas.
- Seja caloroso, gentil e completamente não-julgador.
- Use linguagem simples, suave e calmante.
- Nunca sobrecarregue o usuário com múltiplas perguntas ou sugestões ao mesmo tempo.
- Mantenha respostas curtas e focadas — menos é mais.
- Responda sempre em português do Brasil.
- Nunca liste os 4 passos explicitamente para o usuário — guie de forma natural e fluida."""

client = openai.OpenAI(
    base_url="https://api.deepseek.com",
    api_key=os.getenv("DEEPSEEK_API_KEY"),
)

app = FastAPI()

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:4173"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_methods=["POST", "OPTIONS", "GET"],
    allow_headers=["Content-Type"],
)


@app.get("/")
def health():
    return {"status": "ok", "app": "mente-calma"}


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


@app.post("/api/chat")
def chat(request: ChatRequest):
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    full_messages += [{"role": m.role, "content": m.content} for m in request.messages]

    try:
        response = client.chat.completions.create(
            model="deepseek-chat",
            messages=full_messages,
            temperature=0.7,
            max_tokens=500,
        )
        return {"message": response.choices[0].message.content}
    except openai.AuthenticationError:
        raise HTTPException(status_code=500, detail="Chave de API inválida ou não configurada.")
    except Exception:
        raise HTTPException(status_code=500, detail="Erro ao processar sua mensagem. Tente novamente.")
