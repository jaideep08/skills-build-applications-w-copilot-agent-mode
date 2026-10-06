const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const frontendHostname =
  typeof window === 'undefined' ? '' : window.location.hostname
const inferredCodespaceApiHostname = frontendHostname.replace(
  /-5173(?=\.app\.github\.dev$)/,
  '-8000',
)
const codespaceApiHostname =
  inferredCodespaceApiHostname !== frontendHostname
    ? inferredCodespaceApiHostname
    : codespaceName
      ? `${codespaceName}-8000.app.github.dev`
      : null

export const API_BASE_URL = codespaceApiHostname
  ? `https://${codespaceApiHostname}`
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
