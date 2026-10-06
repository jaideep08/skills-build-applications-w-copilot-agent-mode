import ResourceList from './ResourceList.jsx'

const columns = [
  { field: 'rank', label: 'Rank' },
  { field: 'user', label: 'User' },
  { field: 'points', label: 'Points' },
]

function Leaderboard() {
  return (
    <ResourceList
      columns={columns}
      endpoint="/api/leaderboard/"
      title="Leaderboard"
    />
  )
}

export default Leaderboard
