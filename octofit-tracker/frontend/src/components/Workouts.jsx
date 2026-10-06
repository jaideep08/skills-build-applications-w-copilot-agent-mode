import ResourceList from './ResourceList.jsx'

const columns = [
  { field: 'name', label: 'Workout' },
  { field: 'category', label: 'Category' },
  { field: 'difficulty', label: 'Difficulty' },
  { field: 'description', label: 'Description' },
]

function Workouts() {
  return (
    <ResourceList
      columns={columns}
      endpoint="/api/workouts/"
      title="Workouts"
    />
  )
}

export default Workouts
