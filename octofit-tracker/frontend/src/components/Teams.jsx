import ResourceList from './ResourceList.jsx'

const columns = [
  { field: 'name', label: 'Team' },
  { field: 'members', label: 'Members' },
]

function Teams() {
  return (
    <ResourceList columns={columns} endpoint="/api/teams/" title="Teams" />
  )
}

export default Teams
