# Today I Learned

<p align="center">
  <img src="https://github.com/callmedeci/Today-i-learned/blob/main/public/images/logo.png" alt="Today I Learned Logo" width="200" />
</p>

A minimal and dynamic web app where users can **share interesting facts** and **react** to others' posts with categories like `mind-blowing`, `dislike`, or just a casual nod. Built with React, Supabase, and TailwindCSS — designed for curiosity and quick interactions.

**Live Demo:** [today-i-learned-my-version.vercel.app](https://today-i-learned-my-version.vercel.app)

---

## Features

- **Fact Sharing**: Submit short, punchy facts with categories.
- **Filter by Category**: Browse facts by specific topics.
- **Validation**: Built-in form validation using Zod and React Hook Form.
- **Optimistic Updates**: Fast UX with smooth updates using React Query.
- **Responsive Design**: Looks great on desktop and mobile.

---

## Technologies Used

- **Frontend**: React + Vite
- **Database**: Supabase
- **Styling**: TailwindCSS + tw-animate-css
- **Form Handling**: React Hook Form + Zod
- **Data Fetching & Caching**: @tanstack/react-query
- **Notifications**: react-hot-toast
- **Routing**: React Router
- **Error Boundaries**: react-error-boundary
- **Icons**: Lucide React & react-icons

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/today-i-learned.git
cd today-i-learned
```

## 2. Install dependencies

```bash
npm install
```

## 3. Set up environment
Create a .env file and add your Supabase project credentials:

```ini
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_API_KEY=your_supabase_anon_key
```

## 4. Run the dev server

```bash
npm run dev
```

## Contributing
Pull requests and feedback are welcome. Whether it’s a bug fix or a new feature idea, feel free to open an issue or submit a PR.


