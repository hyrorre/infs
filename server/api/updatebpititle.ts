import { serverSupabaseClient } from '#supabase/server'
import { Song } from '~/types'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { data: songs, error } = await client.from('songs').select('*')

  if (error) {
    return error
  }

  const newsongs = songs.map((song: Song) => {
    song.bpititle = song.title

    if (song.title === 'ピアノ協奏曲第１番"蠍火"') {
      song.bpititle = 'ピアノ協奏曲第１番”蠍火”'
    } else if (song.title === 'Sweet Sweet ♥ Magic') {
      song.bpititle = 'Sweet Sweet Magic'
    } else if (song.title === '100% minimoo-G') {
      song.bpititle = '100％ minimoo-G'
    } else if (song.title === 'Blind Justice ～Torn souls, Hurt Faiths ～') {
      song.bpititle = 'Blind Justice ～Torn souls， Hurt Faiths ～'
    } else if (song.title === 'Übertreffen') {
      song.bpititle = 'Ubertreffen'
    } else if (song.title === "Raison d'être～交差する宿命～") {
      song.bpititle = "Raison d'etre～交差する宿命～"
    } else if (song.title === 'DM STAR ～関西 energy style～') {
      song.bpititle = 'DM STAR～関西 energy style～'
    } else if (song.title === 'ƒƒƒƒƒ') {
      song.bpititle = 'fffff'
    } else if (song.title === 'Präludium') {
      song.bpititle = 'Praludium'
    } else if (song.title === 'キャトられ♥恋はモ～モク') {
      song.bpititle = 'キャトられ恋はモ～モク'
    } else if (song.title === 'Light and Cyber･･･') {
      song.bpititle = 'Light and Cyber…'
    } else if (song.title === '†渚の小悪魔ラヴリィ～レイディオ† (IIDX EDIT)') {
      song.bpititle = '†渚の小悪魔ラヴリィ～レイディオ†(IIDX EDIT)'
    } else if (song.title === '旋律のドグマ～Misérables～') {
      song.bpititle = '旋律のドグマ～Miserables～'
    } else if (song.title === '超!!遠距離らぶ♡メ～ル') {
      song.bpititle = '超!!遠距離らぶメ～ル'
    } else if (song.title === 'ÆTHER') {
      song.bpititle = 'ATHER'
    } else if (song.title === '表裏一体！？怪盗いいんちょの悩み♥') {
      song.bpititle = '表裏一体！？怪盗いいんちょの悩み'
    } else if (song.title === 'COLOSSEUM ') {
      song.bpititle = 'COLOSSEUM'
    } else if (song.title === 'Erosion Mark  ') {
      song.bpititle = 'Erosion Mark'
    } else if (song.title === '¡Viva!') {
      song.bpititle = '!Viva!'
    } else if (song.title === '焱影') {
      song.bpititle = '火影'
    } else if (song.title === 'Amor De Verão') {
      song.bpititle = 'Amor De Verao'
    } else if (song.title === 'Mächö Mönky') {
      song.bpititle = 'Macho Monky'
    } else if (song.title === 'Pārvatī') {
      song.bpititle = 'Parvati'
    } else if (song.title === 'POLꞰAMAИIA') {
      song.bpititle = 'POLKAMAИIA'
    } else if (song.title === 'Ignis†Ir?') {
      song.bpititle = 'Ignis†Irae'
    } else if (song.title === 'V?ID') {
      song.bpititle = 'VOID'
    } else if (song.title === 'Ōu Legends') {
      song.bpititle = 'Ou Legends'
    } else if (song.title === 'RINИE') {
      song.bpititle = 'RINNE'
    }

    return song
  })

  const { data, error: error2 } = await client
    .from('songs')
    .upsert(newsongs as never)
    .select()
  if (error2) {
    return error2
  }

  return data
})
