# 🚀 Project Setup Guide

## ✅ Required VSCode Extensions

To ensure consistency across all developers, please install the following extensions:

- **Material Icon Theme**  
  For a clean and intuitive file explorer with proper iconography.

- **Prettier – Code formatter**  
  🔥 **This is MANDATORY. Only Prettier is allowed for formatting.**  
  _Do not use any other formatter._

- **ES7+ React/Redux/React-Native snippets**  
  Provides useful code snippets for React development.

---

## 🧱 Project Structure & File Organization

To ensure a clean, maintainable codebase, follow these structure rules:

- ✅ Inside `pages/` and `components/`, only create **folders** that contain `.jsx` files. No loose files allowed for organization purposes.
- ✅ Helper or utility functions (e.g., date formatters, array handlers) must be stored in the `utils/` directory and saved as `.js`.
- ✅ More complex or business-related logic (e.g., API calls, local storage handlers) should be stored in the `services/` directory and also use `.js`.

---

## 🎨 Styling Rules

To maintain a consistent and clean UI codebase:

- ✅ Only **pure CSS** will be used for styling (no styled-components, Sass, etc.).
- ✅ CSS files must be named after the **component** or **page** they style, using **lowercase** letters.  
  Example:
  - `navbar.css` → styles for `Navbar.jsx`
  - `login.css` → styles for `Login.jsx` or `LoginPage.jsx`

Keep your styles modular and scoped where possible.

---

## 🎯 Design Patterns Followed

This project implements the following design patterns for better structure and scalability:

- **HOC (High Order Component)**  
  Reusable logic through component wrappers.

- **State Reducer Pattern**  
  Clean and predictable state management via `useReducer`.

- **Custom Hooks**  
  Abstract complex logic into reusable functions.

---

## ✂️ React Snippets (ES7+)

Speed up your React coding with these snippets from **ES7+ React/Redux/React-Native Snippets**:

| Snippet    | Description                                      |
| ---------- | ------------------------------------------------ |
| `rafce`    | React Arrow Function Export Component (no props) |
| `rafc`     | React Arrow Function Component                   |
| `rce`      | React Class Component                            |
| `rconst`   | React Constructor                                |
| `clg`      | Console Log                                      |
| `imr`      | Import React                                     |
| `usee`     | useEffect Hook                                   |
| `usestate` | useState Hook                                    |
| `redux`    | Basic Redux Setup                                |

Example (type `rafce` and hit Enter):

``````jsx
import React from 'react';

const MyComponent = () => {
  return <div>MyComponent</div>;
};

export default MyComponent
`````

---

## 🔧 Git Workflow Rules

To keep the repository clean and collaborative:

- ✅ Create a **new branch** for each assigned task or feature.
- ✅ Use **only Prettier** for formatting.
  ❌ _Other formatters are not allowed._
- ✅ If you need to install a new package, notify the team lead first.
  Do **not** install dependencies without approval.

---

## 📦 Packages Used

All used dependencies can be found in the [`package.json`](./package.json) file.

To install them, run:

```bash
npm install```
``````
