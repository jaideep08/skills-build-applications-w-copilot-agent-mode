const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('The API returned an unsupported response format.')
  }

  for (const key of ['results', 'items', 'docs', 'data']) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  throw new Error('The API response did not contain a record list.')
}

export async function fetchRecords(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status} ${response.statusText}`.trim(),
    )
  }

  return getRecords(await response.json())
}
