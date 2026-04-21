# 📰 Khabar News — Real-Time News Aggregator

[![React](https://img.shields.io/badge/React-17-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![NewsAPI](https://img.shields.io/badge/NewsAPI-Live_Data-FF6B6B?style=for-the-badge)](https://newsapi.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![React Router](https://img.shields.io/badge/React_Router-v5-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)

> A full-featured news reader built with **React 17**, consuming the **NewsAPI** to deliver real-time top headlines across multiple categories — with infinite scroll, category-based routing, and a clean Bootstrap UI.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#️-project-structure)
- [How It Works](#️-how-it-works)
- [Local Setup](#-local-setup)
- [Key Learnings](#-key-learnings)
- [Potential Enhancements](#-potential-enhancements)
- [About the Developer](#-about-the-developer)

---

## 🎯 Overview

People consume news across dozens of sources, making it hard to get a quick overview of what matters. **Khabar News** aggregates top headlines from NewsAPI into a single, category-filtered feed — letting users browse Business, Sports, Technology, Health, and more in one place, without switching between sites.

---

## ✨ Features

- **🗂️ Category Browsing** — General, Business, Entertainment, Health, Science, Sports, Technology
- **♾️ Infinite Scroll** — Automatically loads more articles as you scroll, powered by `react-infinite-scroll-component`
- **🔀 Client-Side Routing** — Clean URL-based navigation (`/business`, `/sports`, etc.) with React Router v5
- **📡 Live Data** — Fetches real-time headlines from NewsAPI (`/v2/top-headlines`)
- **📰 Article Cards** — Each card shows title, description, thumbnail, source, and publish time with a "Read More" link
- **⚡ Optimized Fetching** — Paginated API calls with state management to avoid redundant requests
- **📱 Responsive Design** — Bootstrap 5 grid adapts seamlessly across desktop and mobile

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | React 17 (Class Components) | Component-driven UI with lifecycle methods |
| **Routing** | React Router DOM v5 | Category-based URL navigation |
| **Infinite Scroll** | react-infinite-scroll-component | Pagination-free article loading |
| **HTTP** | Fetch API (native) | REST calls to NewsAPI |
| **Styling** | Bootstrap 5 | Responsive card layout |
| **Tooling** | Create React App (CRA) | Build pipeline, dev server |

---

## 🏗️ Project Structure

```
Khabar_News/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Router setup — maps URL paths to categories
│   ├── Components/
│   │   ├── Navbar.js       # Navigation bar with category links
│   │   ├── News.js         # Core logic: API fetch, state, infinite scroll
│   │   ├── NewsItems.js    # Single article card (title, image, source, link)
│   │   └── Spinner.js      # Loading indicator during fetch
│   └── index.js            # React app entry point
├── .env                    # API key (not committed — see setup)
├── .gitignore
└── package.json
```

---

## ⚙️ How It Works

```
User visits /technology
        ↓
React Router matches route → renders <News category="technology" />
        ↓
componentDidMount() builds NewsAPI URL:
  https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=9&page=1&apiKey=...
        ↓
fetch() hits API → setState({ articles, totalResults })
        ↓
NewsItems renders each article as a Bootstrap card
        ↓
User scrolls → InfiniteScroll fires fetchMoreData()
        ↓
page++ → next API call → articles appended to state
        ↓
Stops when: articles.length >= totalResults
```

### Architectural Decisions

**Class components over hooks** — this project deliberately uses `componentDidMount` and `componentDidUpdate` instead of the `useState`/`useEffect` hooks pattern. This demonstrates understanding of React's lifecycle model, which remains prevalent in many enterprise codebases.

**Paginated state management** — the `page`, `articles`, and `totalResults` state fields work together to ensure no duplicate fetches occur, and the scroll boundary correctly halts loading when all results are consumed.

---

## 🚀 Local Setup

### Prerequisites

- Node.js (v14+ recommended)
- A free NewsAPI key from [newsapi.org](https://newsapi.org/)

### 1. Clone and install

```bash
git clone https://github.com/rishijain21/Khabar_News.git
cd Khabar_News
npm install
```

### 2. Configure your API key

Create a `.env` file in the project root:

```bash
REACT_APP_NEWS_API_KEY=your_newsapi_key_here
```

> ⚠️ Never hardcode your API key or commit `.env` to version control. The `.gitignore` already excludes it.

### 3. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Node 17+ Compatibility

If you encounter `ERR_OSSL_EVP_UNSUPPORTED`, run:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

Or add it permanently to your `package.json` scripts:

```json
"start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start"
```

---

## 💡 Key Learnings

| Concept | How It Was Applied |
|---|---|
| **REST API Integration** | Built dynamic NewsAPI URLs from props (`country`, `category`, `pageSize`, `page`) |
| **React Lifecycle Methods** | `componentDidMount` for initial fetch; `componentDidUpdate` for category-change re-fetches |
| **Infinite Scroll** | Integrated `react-infinite-scroll-component` — triggered pagination at scroll boundary |
| **Client-Side Routing** | Mapped URL paths to category props via React Router, keeping UI state in sync with the URL |
| **State Management** | Managed `articles`, `totalResults`, `loading`, `page` — understanding when and why re-renders occur |
| **API Key Security** | Stored key in `.env` as `REACT_APP_NEWS_API_KEY`, accessed via `process.env` — never hardcoded |
| **CRA Build Pipeline** | Resolved Node 17+ OpenSSL compatibility with `--openssl-legacy-provider` flag |

---

## 🔮 Potential Enhancements

- [ ] **Search Functionality** — Let users search for specific topics across all sources
- [ ] **Dark Mode** — Toggle between light and dark themes
- [ ] **Save Articles** — Bookmark articles to read later (local storage)
- [ ] **Country Selector** — Switch between news from different countries
- [ ] **Migrate to Hooks** — Rewrite class components using `useState` + `useEffect`
- [ ] **TypeScript Migration** — Add type safety to API response handling
- [ ] **PWA Support** — Enable offline reading and home screen installation
- [ ] **Share Button** — Share articles directly to social media

---

## 👨‍💻 About the Developer

**Rishi Jain** — Software Developer at Infosys | B.Tech CSE, SRM Institute Chennai

Khabar News demonstrates practical React skills including REST API integration, state management across multiple components, routing architecture, and real-time data fetching patterns — all directly relevant to production frontend development.

| Platform | Link |
|---|---|
| 💼 Portfolio | [rishijain21.github.io/rishi-jain](https://rishijain21.github.io/rishi-jain/) |
| 💼 LinkedIn | [linkedin.com/in/rishi-jainn](https://www.linkedin.com/in/rishi-jainn/) |
| 🐙 GitHub | [github.com/rishijain21](https://github.com/rishijain21) |
| 📧 Email | jainnrishii21@gmail.com |

---

*Open to collaborations, freelance projects, and full-time opportunities.* 🚀
