# 🎓 AI Learning Assistant

An AI-powered full-stack web application that transforms your PDF documents into interactive learning experiences — automatically generating flashcards, quizzes, summaries, and enabling document-based AI chat.

---
## Demo
Live demo: https://ai-learning-assistant-frontend-one.vercel.app/

---

## ✨ Features

- 📄 **PDF Upload** — Upload study materials and store them securely on Cloudinary
- 🃏 **AI Flashcard Generation** — Auto-generate question/answer flashcard sets from your document
- 📝 **AI Quiz Generation** — Create multiple-choice quizzes with explanations and difficulty levels
- 📋 **AI Document Summary** — Get a concise summary of any uploaded document
- 💬 **Chat with Document** — Ask questions and get answers grounded in your document content (RAG)
- 💡 **Concept Explainer** — Explain any concept found in the document in simple terms
- 📊 **Progress Dashboard** — Track documents, quiz scores, flashcard reviews, and study streaks
- 🔐 **JWT Authentication** — Secure register/login with token-based auth and password hashing

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite), React Router v6, Axios, TailwindCSS |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB Atlas, Mongoose |
| AI Engine | Google Gemini AI (`gemini-2.5-flash-lite`) |
| File Storage | Cloudinary |
| Auth | JWT (jsonwebtoken), bcryptjs |
| File Upload | Multer (memory storage) |
| PDF Parsing | pdf-parse |
| Validation | express-validator |

---

## 📁 Project Structure

```
AI_Learning_Assistant/
├── backend/
│   ├── server.js                  # Entry point
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   ├── cloudinary.js          # Cloudinary config
│   │   └── multer.js              # File upload config
│   ├── models/
│   │   ├── User.js
│   │   ├── Document.js
│   │   ├── Quiz.js
│   │   ├── Flashcard.js
│   │   └── ChatHistory.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── aiController.js
│   │   ├── quizController.js
│   │   ├── flashcardController.js
│   │   └── progressController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── aiRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── FlashcardRoutes.js
│   │   └── progressRoutes.js
│   ├── middleware/
│   │   ├── auth.js                # JWT verification
│   │   ├── errorHandler.js        # Global error handler
│   │   └── validate.js            # Input validation
│   └── utils/
│       ├── geminiService.js       # All Gemini AI calls
│       ├── pdfParser.js           # PDF text extraction
│       └── textChunker.js         # Text chunking + RAG retrieval
│
└── frontend/ai-learning-assistant/
    └── src/
        ├── App.jsx                # Routes
        ├── context/
        │   └── AuthContext.jsx    # Global auth state
        ├── pages/
        │   ├── Auth/              # Login, Register
        │   ├── Dashboard/
        │   ├── Documents/
        │   ├── Flashcards/
        │   ├── Quizzes/
        │   └── Profile/
        ├── components/            # Reusable UI components
        ├── services/              # API call functions
        └── utils/
            ├── apiPaths.js        # All endpoint URLs
            └── axiosInstance.js   # Configured Axios with auth
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)
- [Google Gemini API Key](https://aistudio.google.com/) (free)
- [Cloudinary](https://cloudinary.com/) account (free tier works)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ShreyaShendkar/AI_Learning_Assistant.git
cd AI_Learning_Assistant
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
NODE_ENV=development
PORT=8000

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ai-learning-db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_DOCUMENT_FOLDER=ai-learning-assistant/documents

# File Upload
MAX_FILE_SIZE=10485760
```

Start the backend server:

```bash
npm run dev        # Development (with nodemon)
# or
npm start          # Production
```

The server will run at `http://localhost:8000`

---

### 3. Frontend Setup

```bash
cd frontend/ai-learning-assistant
npm install
npm run dev
```

The app will open at `http://localhost:5173`

> **Note:** Make sure the backend is running before using the frontend. The frontend points to `http://localhost:8000` by default — see `src/utils/apiPaths.js` to change this.

---

## 🔌 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/profile` | Private | Get current user profile |
| PUT | `/api/auth/profile` | Private | Update profile |
| POST | `/api/auth/change-password` | Private | Change password |

### Documents — `/api/documents`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/documents/upload` | Private | Upload a PDF (`multipart/form-data`) |
| GET | `/api/documents` | Private | Get all documents for user |
| GET | `/api/documents/:id` | Private | Get a single document |
| DELETE | `/api/documents/:id` | Private | Delete a document |

### AI — `/api/ai`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/ai/generate-flashcards` | Private | Generate flashcards from document |
| POST | `/api/ai/generate-quiz` | Private | Generate a quiz from document |
| POST | `/api/ai/generate-summary` | Private | Generate a summary |
| POST | `/api/ai/chat` | Private | Ask a question about the document |
| POST | `/api/ai/explain-concept` | Private | Explain a concept from the document |
| GET | `/api/ai/chat-history/:documentId` | Private | Get chat history for a document |

### Quizzes — `/api/quizzes`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/quizzes/:documentId` | Private | Get all quizzes for a document |
| GET | `/api/quizzes/quiz/:id` | Private | Get a single quiz |
| POST | `/api/quizzes/:id/submit` | Private | Submit quiz answers |
| GET | `/api/quizzes/:id/results` | Private | Get detailed quiz results |
| DELETE | `/api/quizzes/:id` | Private | Delete a quiz |

### Flashcards — `/api/flashcards`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/flashcards` | Private | Get all flashcard sets for user |
| GET | `/api/flashcards/:documentId` | Private | Get flashcards for a document |
| POST | `/api/flashcards/:cardId/review` | Private | Mark card as reviewed |
| PUT | `/api/flashcards/:cardId/star` | Private | Toggle star on a card |
| DELETE | `/api/flashcards/:id` | Private | Delete a flashcard set |

### Progress — `/api/progress`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/progress/dashboard` | Private | Get learning statistics |

---

## 🧠 How the AI Works

### Text Chunking
After extracting text from a PDF, the app splits it into overlapping chunks of ~500 words each with a 50-word overlap. This ensures context is preserved at chunk boundaries and keeps content within the AI model's token limits.

### RAG (Retrieval Augmented Generation)
For the chat and concept explanation features, the app doesn't send the entire document to the AI. Instead:
1. It scores each chunk using keyword matching against the user's question
2. Selects the top 3 most relevant chunks
3. Sends only those chunks as context to Gemini AI

This makes responses faster, cheaper, and more accurate.

### Parallel Generation
For long documents, flashcard and quiz generation runs across multiple chunks in parallel using `Promise.all()`, then deduplicates similar questions before returning results.

---

## 🔐 Authentication Flow

```
User logs in → Server verifies credentials
            → Generates JWT (expires in 7 days)
            → Frontend stores token in localStorage
            → Every API request sends: Authorization: Bearer <token>
            → protect middleware verifies token on every private route
```

---

## 📦 Available Scripts

### Backend
```bash
npm run dev     # Start with nodemon (auto-restart on file changes)
npm start       # Start without nodemon
```

### Frontend
```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 🌱 Environment Variables Reference

| Variable | Description |
|---|---|
| `PORT` | Backend server port (default: 8000) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRE` | Token expiry duration (e.g. `7d`) |
| `GEMINI_API_KEY` | Google Gemini AI API key |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLOUDINARY_DOCUMENT_FOLDER` | Cloudinary folder path for PDFs |
| `MAX_FILE_SIZE` | Max upload size in bytes (default: 10485760 = 10MB) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Shreya Shendkar**
- GitHub: [@ShreyaShendkar](https://github.com/ShreyaShendkar)

---

> Built with ❤️ using Node.js, React, MongoDB, and Google Gemini AI
