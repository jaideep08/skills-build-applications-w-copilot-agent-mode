# OctoFit Tracker presentation tier

## API configuration

In GitHub Codespaces, define `VITE_CODESPACE_NAME` in the frontend environment
before starting Vite so the presentation tier can reach the API on port 8000.
For local development, create `octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart the Vite development server after changing environment variables.
When `VITE_CODESPACE_NAME` is unset, the frontend safely defaults to
`http://localhost:8000`.

## Development

Run `npm run dev` to start the Vite development server. The app uses React
Router for its Activities, Leaderboard, Teams, Users, and Workouts pages.

Run `npm run build` to create a production build, or `npm run lint` to lint the
presentation tier.
