# mente calma

App minimalista para organizar pensamentos e reduzir ansiedade, guiando o usuário por 4 passos via chat com IA (DeepSeek).

## Stack

- **Frontend**: React 18 + Vite + Tailwind CSS v3
- **Backend**: FastAPI + Uvicorn
- **IA**: DeepSeek API (via OpenAI SDK)

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# editar .env e adicionar sua DEEPSEEK_API_KEY
uvicorn main:app --reload --port 8000
```

Swagger disponível em `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
# Acesse http://localhost:5173
```

## Testando a API diretamente

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"estou muito ansioso com o trabalho"}]}'
```
