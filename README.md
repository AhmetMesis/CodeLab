# 💻 CodeLab - Interactive Web-Based Code Editor

CodeLab is a modern, full-stack, web-based code playground (similar to CodePen or CodeSandbox). It allows users to write, run, and share code directly in their browser. With built-in support for live React rendering, it provides a seamless developer experience.

---

## ✨ Features

- **📝 Interactive Code Editor:** Integrated with Microsoft's Monaco Editor (`@monaco-editor/react`) for a VS Code-like coding experience in the browser (Syntax highlighting, autocomplete, etc.).
- **⚡ Live Preview & Execution:** Compile and run modern JavaScript/React code instantly in the browser using `@babel/standalone`.
- **🎨 Beautiful UI:** Built with Next.js and styled using Tailwind CSS v4 for a highly responsive, modern interface.
- **💾 Save & Share Snippets:** (Backend supported via NestJS & Prisma) Save your code snippets, manage your projects, and share your work with others.
- **🔍 Syntax Highlighting:** Beautifully format code output using `react-syntax-highlighter`.

---

## 🛠️ Tech Stack

**Frontend (Web Sandbox):**
- Next.js (React 19)
- Tailwind CSS 4
- `@monaco-editor/react` (Code Editor component)
- `@babel/standalone` (In-browser transpilation)
- `react-syntax-highlighter`

**Backend (API & Data):**
- NestJS (TypeScript)
- Prisma ORM
- PostgreSQL / SQLite (Database)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/CodeLab.git
cd CodeLab
```

### 2. Backend Setup
The backend is responsible for saving user data, snippets, and project states.
```bash
cd backend
npm install
```

Configure your `.env` file for Prisma:
```env
DATABASE_URL="file:./dev.db" # or your Postgres URL
```

Run migrations and start the server:
```bash
npx prisma db push
npm run start:dev
```
*Backend API runs on http://localhost:3000*

### 3. Frontend Setup
Open a new terminal to start the frontend sandbox:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:3001*

---

## 💡 How It Works (Babel Standalone)

CodeLab uses `@babel/standalone` to compile JSX and ES6+ code directly within the client's browser. When a user types React code into the Monaco Editor, it is instantly transpiled and rendered into a live preview iframe or DOM element safely.

---

## 📄 License
This project is open-source and available under the MIT License.
