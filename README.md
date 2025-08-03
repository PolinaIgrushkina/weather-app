# Weather App 🌤️

A single-page weather forecast application built with **Next.js**.

🔗 **Live demo**: [weather-app-polinaigrushkinas-projects.vercel.app](https://weather-app-polinaigrushkinas-projects.vercel.app/)

## ✨ Features

- 🔍 **Add and remove cities** to track their current weather
- ♻️ **Manual refresh** for each city's weather data
- 🗑️ **Delete button** on each city card to remove it from the list
- 📦 **Persistent storage** using Zustand's `persist` middleware and `localStorage`
- 📄 **City cards** display:
  - Current temperature and weather conditions
  - Refresh and delete buttons
  - Clickable area to navigate to a detailed city view
- 📈 **Detailed city view** includes:
  - Hourly temperature chart for the next 24 hours (powered by Chart.js)
  - Data fetched from the `/forecast` endpoint of OpenWeatherMap API

## 🧰 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)  
  → with [`middleware.persist`](https://docs.pmnd.rs/zustand/integrations/persisting-store-data) to sync state to `localStorage`
- **Data Fetching & Caching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Forms & Validation**:
  - [React Hook Form](https://react-hook-form.com/)
  - [Yup](https://github.com/jquense/yup)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Testing**:
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Code Quality**:
  - ESLint
  - Prettier
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Weather Data Source

Weather data is provided by the [OpenWeatherMap API](https://openweathermap.org/api):

- `/weather` — for current weather conditions
- `/forecast` — for 3-hour interval forecasts (used in the temperature chart)

## 🧑‍💻 How to Run Locally

```bash
git clone https://github.com/PolinaIgrushkina/weather-app.git
cd weather-app
npm install
npm run dev
```

## 🧪 Run Tests

```bash
npm run test
```

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices.

## 📌 Implemented Functionality

- ✅ Weather cards with update and delete buttons
- ✅ Add/remove cities with persisted state
- ✅ Hourly temperature chart with /forecast API
- ✅ Zustand + persist for localStorage
- ✅ Clean, formatted codebase using ESLint + Prettier
- ✅ Tests for key components
- ✅ Functional components with React Hooks
- ✅ Deployed to Vercel

---

Made with ❤️ by [Polina Igrushkina](https://github.com/PolinaIgrushkina)
