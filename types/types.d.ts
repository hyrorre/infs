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
  difficulty: string
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
}
