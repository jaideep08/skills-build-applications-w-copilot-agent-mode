import { useEffect, useState } from 'react'
import { fetchRecords } from '../api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.name ?? value.username ?? value._id ?? JSON.stringify(value)
  }

  return String(value)
}

function ResourceList({ title, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      try {
        const items = await fetchRecords(endpoint, controller.signal)
        setRecords(items)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load records.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()

    return () => controller.abort()
  }, [endpoint])

  return (
    <section aria-labelledby="resource-title">
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-3">
        <div>
          <p className="eyebrow mb-1">OctoFit Tracker</p>
          <h1 className="h2 mb-0" id="resource-title">
            {title}
          </h1>
        </div>
        {!loading && !error && (
          <span className="text-secondary small">
            {records.length} {records.length === 1 ? 'record' : 'records'}
          </span>
        )}
      </div>

      {loading && (
        <div className="text-secondary py-4" role="status">
          Loading {title.toLowerCase()}...
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Unable to load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <div className="alert alert-light border" role="status">
          No {title.toLowerCase()} found.
        </div>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive resource-table-wrap">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                {columns.map(({ label }) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map(({ field }) => (
                    <td key={field}>{formatValue(record[field])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceList
