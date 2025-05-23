create or replace view csv_sp with (security_invoker = on) as
  select
    case id / 1000
      when 1 then '1st&substream'
      when 2 then '2nd style'
      when 3 then '3rd style'
      when 4 then '4th style'
      when 5 then '5th style'
      when 6 then '6th style'
      when 7 then '7th style'
      when 8 then '8th style'
      when 9 then '9th style'
      when 10 then '10th style'
      when 11 then 'IIDX RED'
      when 12 then 'HAPPY SKY'
      when 13 then 'DistorteD'
      when 14 then 'GOLD'
      when 15 then 'TROOPERS'
      when 16 then 'EMPRESS'
      when 17 then 'SIRIUS'
      when 18 then 'Resort Anthem'
      when 19 then 'Lincle'
      when 20 then 'tricoro'
      when 21 then 'SPADA'
      when 22 then 'PENDUAL'
      when 23 then 'copula'
      when 24 then 'SINOBUZ'
      when 25 then 'CANNON BALLERS'
      when 26 then 'Rootage'
      when 27 then 'HEROIC VERSE'
      when 28 then 'BISTROVER'
      when 29 then 'CastHour'
      when 30 then 'RESIDENT'
      when 31 then 'EPOLIS'
      when 32 then 'Pinky Crush'
      when 80 then 'INFINITAS'
      else 'UNKNOWN'
    end
    as バージョン,
    title as タイトル,
    genre as ジャンル,
    artist as アーティスト,
    0 as プレー回数,
    coalesce(charts_b.level,0) as "BEGINNER 難易度",
    coalesce(chartstats_b.ex_score,0) as "BEGINNER スコア",
    coalesce(chartstats_b.ex_score / 2,0) as "BEGINNER PGreat",
    coalesce(chartstats_b.ex_score % 2,0) as "BEGINNER Great",
    coalesce(cast(chartstats_b.miss as text),'---') as "BEGINNER ミスカウント",
    case chartstats_b.lamp
        when 'FC' then 'FULLCOMBO CLEAR'
        when 'EX' then 'EX HARD CLEAR'
        when 'HC' then 'HARD CLEAR'
        when 'NC' then 'CLEAR'
        when 'EC' then 'EASY CLEAR'
        when 'AC' then 'ASSIST CLEAR'
        when 'F' then 'FAILED'
        else 'NO PLAY'
      end
    as "BEGINNER クリアタイプ",
    coalesce(chartstats_b.grade, '---') as "BEGINNER DJ LEVEL",
    coalesce(charts_n.level,0) as "NORMAL 難易度",
    coalesce(chartstats_n.ex_score,0) as "NORMAL スコア",
    coalesce(chartstats_n.ex_score / 2,0) as "NORMAL PGreat",
    coalesce(chartstats_n.ex_score % 2,0) as "NORMAL Great",
    coalesce(cast(chartstats_n.miss as text),'---') as "NORMAL ミスカウント",
    case chartstats_n.lamp
        when 'FC' then 'FULLCOMBO CLEAR'
        when 'EX' then 'EX HARD CLEAR'
        when 'HC' then 'HARD CLEAR'
        when 'NC' then 'CLEAR'
        when 'EC' then 'EASY CLEAR'
        when 'AC' then 'ASSIST CLEAR'
        when 'F' then 'FAILED'
        else 'NO PLAY'
      end
    as "NORMAL クリアタイプ",
    coalesce(chartstats_n.grade, '---') as "NORMAL DJ LEVEL",
    coalesce(charts_h.level,0) as "HYPER 難易度",
    coalesce(chartstats_h.ex_score,0) as "HYPER スコア",
    coalesce(chartstats_h.ex_score / 2,0) as "HYPER PGreat",
    coalesce(chartstats_h.ex_score % 2,0) as "HYPER Great",
    coalesce(cast(chartstats_h.miss as text),'---') as "HYPER ミスカウント",
    case chartstats_h.lamp
        when 'FC' then 'FULLCOMBO CLEAR'
        when 'EX' then 'EX HARD CLEAR'
        when 'HC' then 'HARD CLEAR'
        when 'NC' then 'CLEAR'
        when 'EC' then 'EASY CLEAR'
        when 'AC' then 'ASSIST CLEAR'
        when 'F' then 'FAILED'
        else 'NO PLAY'
      end
    as "HYPER クリアタイプ",
    coalesce(chartstats_h.grade, '---') as "HYPER DJ LEVEL",
    coalesce(charts_a.level,0) as "ANOTHER 難易度",
    coalesce(chartstats_a.ex_score,0) as "ANOTHER スコア",
    coalesce(chartstats_a.ex_score / 2,0) as "ANOTHER PGreat",
    coalesce(chartstats_a.ex_score % 2,0) as "ANOTHER Great",
    coalesce(cast(chartstats_a.miss as text),'---') as "ANOTHER ミスカウント",
    case chartstats_a.lamp
        when 'FC' then 'FULLCOMBO CLEAR'
        when 'EX' then 'EX HARD CLEAR'
        when 'HC' then 'HARD CLEAR'
        when 'NC' then 'CLEAR'
        when 'EC' then 'EASY CLEAR'
        when 'AC' then 'ASSIST CLEAR'
        when 'F' then 'FAILED'
        else 'NO PLAY'
      end
    as "ANOTHER クリアタイプ",
    coalesce(chartstats_a.grade, '---') as "ANOTHER DJ LEVEL",
    coalesce(charts_l.level,0) as "LEGGENDARIA 難易度",
    coalesce(chartstats_l.ex_score,0) as "LEGGENDARIA スコア",
    coalesce(chartstats_l.ex_score / 2,0) as "LEGGENDARIA PGreat",
    coalesce(chartstats_l.ex_score % 2,0) as "LEGGENDARIA Great",
    coalesce(cast(chartstats_l.miss as text),'---') as "LEGGENDARIA ミスカウント",
    case chartstats_l.lamp
        when 'FC' then 'FULLCOMBO CLEAR'
        when 'EX' then 'EX HARD CLEAR'
        when 'HC' then 'HARD CLEAR'
        when 'NC' then 'CLEAR'
        when 'EC' then 'EASY CLEAR'
        when 'AC' then 'ASSIST CLEAR'
        when 'F' then 'FAILED'
        else 'NO PLAY'
      end
    as "LEGGENDARIA クリアタイプ",
    coalesce(chartstats_l.grade, '---') as "LEGGENDARIA DJ LEVEL",
    to_char(
      greatest(
        chartstats_b.updated_at,
        chartstats_n.updated_at,
        chartstats_h.updated_at,
        chartstats_a.updated_at,
        chartstats_l.updated_at
      ),
      'YYYY-MM-DD HH24:MI'
    ) as "最終プレー日時"
  from
    songs
  left join charts as charts_b on songs.id = charts_b.song_id and charts_b.difficulty = 'SPB'
  left join charts as charts_n on songs.id = charts_n.song_id and charts_n.difficulty = 'SPN'
  left join charts as charts_h on songs.id = charts_h.song_id and charts_h.difficulty = 'SPH'
  left join charts as charts_a on songs.id = charts_a.song_id and charts_a.difficulty = 'SPA'
  left join charts as charts_l on songs.id = charts_l.song_id and charts_l.difficulty = 'SPL'
  left join chartstats as chartstats_b on songs.id = chartstats_b.song_id and chartstats_b.difficulty = 'SPB'
  left join chartstats as chartstats_n on songs.id = chartstats_n.song_id and chartstats_n.difficulty = 'SPN'
  left join chartstats as chartstats_h on songs.id = chartstats_h.song_id and chartstats_h.difficulty = 'SPH'
  left join chartstats as chartstats_a on songs.id = chartstats_a.song_id and chartstats_a.difficulty = 'SPA'
  left join chartstats as chartstats_l on songs.id = chartstats_l.song_id and chartstats_l.difficulty = 'SPL'
  group by 
    songs.id,
    songs.title,
    songs.genre,
    songs.artist,
    charts_b.level,
    chartstats_b.ex_score,
    chartstats_b.miss,
    chartstats_b.lamp,
    chartstats_b.grade,
    chartstats_b.updated_at,
    charts_n.level,
    chartstats_n.ex_score,
    chartstats_n.miss,
    chartstats_n.lamp,
    chartstats_n.grade,
    chartstats_n.updated_at,
    charts_h.level,
    chartstats_h.ex_score,
    chartstats_h.miss,
    chartstats_h.lamp,
    chartstats_h.grade,
    chartstats_h.updated_at,
    charts_a.level,
    chartstats_a.ex_score,
    chartstats_a.miss,
    chartstats_a.lamp,
    chartstats_a.grade,
    chartstats_a.updated_at,
    charts_l.level,
    chartstats_l.ex_score,
    chartstats_l.miss,
    chartstats_l.lamp,
    chartstats_l.grade,
    chartstats_l.updated_at
  order by id
