import { getEkikanKyori } from '../../dijkstra/get_ekikan_kyori'

test('何もセットされない場合', () => {
  expect(getEkikanKyori('', '', [])).toStrictEqual(Infinity)
})

test('駅間リストのみを指定した場合', () => {
  expect(getEkikanKyori('', '')).toStrictEqual(Infinity)
})

test('2駅セットした場合', () => {
  expect(getEkikanKyori('小竹向原', '氷川台')).toStrictEqual(1.5)
})

test('2駅セットした場合（逆順）', () => {
  expect(getEkikanKyori('氷川台', '小竹向原')).toStrictEqual(1.5)
})
