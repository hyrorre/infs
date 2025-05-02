export default function () {
  const filter = useState<Filter>('filter', () => {
    return {
      style: 'SP',
      difficulty: null,
      level: null,
      lamp: null,
      grade: null,
      limit: 100
    }
  })

  const sort = useState('sort', () => 'TITLE')
  const reverse = useState('reverse', () => false)

  return {
    filter,
    sort,
    reverse
  }
}
