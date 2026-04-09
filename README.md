# 📅 React Wall Calendar

A modern, interactive wall calendar built using React, inspired by a physical wall calendar design.
This application allows users to select dates or ranges and attach multiple notes with persistent storage.

---

## 🚀 Features

* 📆 **Month Navigation**

  * Switch between months using arrow controls

* 📅 **Date Selection**

  * Select single dates
  * Select date ranges (start → end)

* 📝 **Multi-Notes per Date**

  * Add multiple notes to a single date
  * Apply notes across selected ranges

* 💾 **Persistent Storage**

  * Notes are stored using `localStorage`
  * Data remains after refresh

* 🎯 **Visual Highlights**

  * Start and end dates highlighted
  * Range highlighted
  * Selected date highlighted

* 🔴 **Note Indicators**

  * Dates with notes show visual markers

* 📱 **Responsive Design**

  * Works on both desktop and mobile

---

## 🧠 Key Concepts Used

* React Hooks (`useState`, `useEffect`)
* State Management
* LocalStorage Persistence
* Date Normalization (handling timezone issues)
* Component-Based Architecture

---

## 🛠 Tech Stack

* React (Vite)
* JavaScript
* CSS

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Calendar.jsx
│   ├── DayCell.jsx
│   ├── NotesPanel.jsx
├── utils/
│   ├── calendar.js
```

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🎥 Demo

(Add your Loom / YouTube demo link here)

---

## 🌐 Live Demo

(Add your deployed link here - Vercel / Netlify)

---

## 💡 Highlights

This project demonstrates:

* Efficient handling of date ranges
* Scalable note management using a key-value structure
* Handling real-world timezone and date comparison issues
* Clean and responsive UI design

---

## 👨‍💻 Author

**Pagadala Mahindra Reddy**
