export type Profile = {
  id: string
  name: string
  iidx_id: string
  infinitas_id: string
  scope: 'private' | 'public' | 'rival'
}

export type ApiKey = {
  id: string
  api_key: string
}

export type Song = {
  id: number
  title: string
  title2: string
  genre: string
  artist: string
  bpm: string
  unlock_type: string
}

export type Chart = {
  song_id: number
  difficulty: 'SPB' | 'SPN' | 'SPH' | 'SPA' | 'SPL' | 'DPB' | 'DPN' | 'DPH' | 'DPA' | 'DPL'
  note_count: number
  level: number
}

export type Chartstat = {
  user_id: string
  song_id: number
  difficulty: 'SPB' | 'SPN' | 'SPH' | 'SPA' | 'SPL' | 'DPB' | 'DPN' | 'DPH' | 'DPA' | 'DPL'
  grade: string
  gradediff: string
  lamp: string
  miss: number
  ex_score: number
  percent_max: number
  updated_at: string | Date
}

export type FullChartstat = {
  song_id: number
  songs: {
    title: string
  }
  charts: {
    note_count: number
    level: number
  }
  difficulty: 'SPB' | 'SPN' | 'SPH' | 'SPA' | 'SPL' | 'DPB' | 'DPN' | 'DPH' | 'DPA' | 'DPL'
  grade: string
  gradediff: string
  lamp: string
  miss: number
  ex_score: number
  percent_max: number
}

export type Filter = {
  style: string
  difficulty: string | null
  level: number | null
  lamp: string | null
  grade: string | null
  limit: number
}
