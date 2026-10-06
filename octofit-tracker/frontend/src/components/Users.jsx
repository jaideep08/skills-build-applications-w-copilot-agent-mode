import ResourceList from './ResourceList.jsx'

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'username', label: 'Username' },
  { field: 'email', label: 'Email' },
]

function Users() {
  return (
    <ResourceList columns={columns} endpoint="/api/users/" title="Users" />
  )
}

export default Users
