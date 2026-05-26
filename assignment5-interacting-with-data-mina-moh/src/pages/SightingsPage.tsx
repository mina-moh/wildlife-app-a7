import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function SightingsPage() {
  const [parkId, setParkId] = useState('')
  const [speciesId, setSpeciesId] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [notes, setNotes] = useState('')
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [file, setFile] = useState<File | null>(null)

  async function uploadImage(file: File) {
    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from('SightingsImages')
      .upload(fileName, file)

    if (error) throw error

    return data.path
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('Not authenticated')
      }

      let imagePath: string | null = null

      if (file) {
        imagePath = await uploadImage(file)
      }

      const { error } = await supabase.from('sightings').insert({
        ParkID: parkId,
        SpeciesID: speciesId,
        DateTime: dateTime ? new Date(dateTime).toISOString() : new Date().toISOString(),
        UserID: user.id,
        Notes: notes || null,
        Lat: lat ? parseFloat(lat) : null,
        Long: long ? parseFloat(long) : null,
        ImagePath: imagePath
      })

      if (error) throw error

      // reset form
      setParkId('')
      setSpeciesId('')
      setDateTime('')
      setNotes('')
      setLat('')
      setLong('')
      setFile(null)

      alert('Sighting created!')
    } catch (err) {
      console.error('CREATE SIGHTING ERROR:', err)
      alert(err instanceof Error ? err.message : JSON.stringify(err))
    }
  }

  return (
    <div>
      <h1>New Sighting</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Park ID"
          value={parkId}
          onChange={(e) => setParkId(e.target.value)}
        />

        <input
          placeholder="Species ID"
          value={speciesId}
          onChange={(e) => setSpeciesId(e.target.value)}
        />

        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <input
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />

        <input
          placeholder="Longitude"
          value={long}
          onChange={(e) => setLong(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}