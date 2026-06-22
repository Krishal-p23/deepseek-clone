# 🤖 DeepSeek Clone

A full-stack AI chat application inspired by DeepSeek, built with **Next.js**, powered by **OpenAI / Groq APIs**, secured with **Clerk Authentication**, and backed by **MongoDB (Mongoose)**.

It supports real-time chat, persistent history, authentication, and AI-generated responses with clean UI/UX.

---

## 🚀 Live Demo

🌐 Vercel Deployment:  
👉 https://deepseek-clone-five-black.vercel.app

---

## ✨ Features

- 💬 AI Chat interface (DeepSeek / Groq powered responses)
- 🔐 Authentication with Clerk (Google / Email login)
- 🧠 Persistent chat history (MongoDB)
- ⚡ Fast streaming-ready architecture
- 📂 Chat creation, rename & delete functionality
- 📱 Responsive UI (mobile + desktop)
- 🎨 Clean Tailwind UI design
- 🪝 Clerk Webhooks integration for user sync

---

## 🛠️ Tech Stack

### 🎨 Frontend
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,tailwind"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/PrismJS-Code_Highlighting-purple?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/React_Markdown-Markdown_Renderer-orange?style=for-the-badge"/>
</p>

---

### 🧠 Backend

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,mongodb"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Mongoose-ODM_Library-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/OpenAI-000000?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Groq-AI_Inference-FF6B00?style=for-the-badge"/>
</p>

---

### 🔐 Auth & Infrastructure

<p align="center">
  <img src="https://skillicons.dev/icons?i=vercel"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Clerk-Auth_&_User_Management-3B82F6?style=for-the-badge"/>
</p>

---

### 🔧 Utilities

<p align="center">
  <img src="https://img.shields.io/badge/Axios-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/React_Hot_Toast-Toast_Notifications-red?style=for-the-badge"/>
</p>

---

## 📦 Installation (Run Locally)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/krishal-p23/deepseek-clone.git
cd deepseek-clone
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env.local` file in the root of your project:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Clerk Webhook
CLERK_WEBHOOK_SECRET=your_webhook_secret

# AI APIs
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4️⃣ Run development server

```bash
npm run dev
```

Your app will start at:
`http://localhost:3000`

---

## 🧠 Database (MongoDB + Mongoose)

This project uses MongoDB Atlas with Mongoose ORM for:

- User chat storage
- Chat sessions
- Message history
- CRUD operations (create / rename / delete chats)

---

## 🔐 Authentication (Clerk)

I used Clerk for:

- User login / signup
- Session handling
- Secure API protection
- Webhook-based user sync into MongoDB

---

## 🪝 Webhooks

Clerk webhooks are used to:

- Automatically create user records in MongoDB
- Sync user updates
- Handle user deletion events

---

## 🤖 AI Integration

This project supports multiple AI providers:

- OpenAI API 🤖
- Groq API ⚡ (faster inference)

You can switch or extend models easily inside API routes.

---

## 🚀 Deployment (Vercel)

This project is deployed using Vercel.

👉 Live URL: `https://deepseek-clone-five-black.vercel.app`

To deploy your own:
```bash
vercel
```
Then add environment variables in the Vercel dashboard.

---

## 🤝 Connect with Me

I am always open to collaboration, research discussions, and learning opportunities in Machine Learning, AI, and Full Stack Development.

<p align="center">
  <a href="mailto:prasad.krishal23@gmail.com">
    <img src="https://skillicons.dev/icons?i=gmail" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/krishal-p23">
    <img src="https://skillicons.dev/icons?i=linkedin" />
  </a>
</p> 
