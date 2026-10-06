import ResourceList from './ResourceList.jsx'

const columns = [
  { field: 'user', label: 'User' },
  { field: 'activityType', label: 'Activity' },
  { field: 'duration', label: 'Duration (min)' },
  { field: 'distance', label: 'Distance' },
  { field: 'date', label: 'Date' },
]

function Activities() {
  return (
    <ResourceList
      columns={columns}
      endpoint="/api/activities/"
      title="Activities"
    />
  )
}

export default Activities
