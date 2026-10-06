import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const pages = [
  { path: '/activities', label: 'Activities', Component: Activities },
  { path: '/leaderboard', label: 'Leaderboard', Component: Leaderboard },
  { path: '/teams', label: 'Teams', Component: Teams },
  { path: '/users', label: 'Users', Component: Users },
  { path: '/workouts', label: 'Workouts', Component: Workouts },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-3">
          <NavLink className="brand" to="/activities">
            OctoFit Tracker
          </NavLink>
          <nav aria-label="Main navigation" className="app-navigation">
            {pages.map(({ path, label }) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' active' : ''}`
                }
                key={path}
                to={path}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Navigate replace to="/activities" />} />
          {pages.map(({ path, Component }) => (
            <Route
              element={<Component />}
              key={path}
              path={path}
            />
          ))}
          <Route
            path="*"
            element={
              <section className="text-center py-5">
                <h1 className="h3">Page not found</h1>
                <p className="text-secondary">
                  Choose a section from the navigation to continue.
                </p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
