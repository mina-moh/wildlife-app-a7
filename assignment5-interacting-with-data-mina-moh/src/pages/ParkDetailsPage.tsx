import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function ParkDetailsPage() {
  const { id } = useParams()

  const [sightings, setSightings] = useState<any[]>([])
  const [before, setBefore] = useState('')
  const [since, setSince] = useState('')

  async function loadSightings() {
    let url = `/api/sightings?park=${id}`

    if (since) {
      url += `&since=${since}`
    }

    if (before) {
      url += `&before=${before}`
    }

    const res = await fetch(url)
    const data = await res.json()

    setSightings(data)
  }

  useEffect(() => {
    void loadSightings()
  }, [])

  return (
    <div>
      <h1>Park Sightings: {id}</h1>

      <div>
        <label>
          Since:
          <input
            type="date"
            value={since}
            onChange={(e) => setSince(e.target.value)}
          />
        </label>

        <label>
          Before:
          <input
            type="date"
            value={before}
            onChange={(e) => setBefore(e.target.value)}
          />
        </label>

        <button onClick={loadSightings}>
          Filter
        </button>
      </div>

      <ul>
        {sightings.map((s) => (
          <li key={s.ID}>
            <p>Park: {s.ParkID}</p>
            <p>Species: {s.SpeciesID}</p>
            <p>User: {s.UserID}</p>
            <p>Date: {s.DateTime}</p>
            <p>Notes: {s.Notes}</p>
            <p>Lat: {s.Lat}</p>
            <p>Long: {s.Long}</p>

            {s.ImagePath && (
              <img
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/SightingsImages/${s.ImagePath}`}
                width="300"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}