import { koushin, saitanWoBunri } from '../../dijkstra/main'

describe('saitanWoBunri', () => {
  const ekiA: EkiT = { namae: 'eki_a', saitan_kyori: 0.1, temae_list: [] }
  const ekiB: EkiT = { namae: 'eki_b', saitan_kyori: 0.2, temae_list: [] }
  const ekiC: EkiT = { namae: 'eki_c', saitan_kyori: 0.3, temae_list: [] }
  test('空のリストを渡すと例外をthrowする', () => {
    expect(() => {
      saitanWoBunri([])
    }).toThrow('引数のlistの長さが0です。')
  })

  test('長さ1のリストを渡す', () => {
    expect(saitanWoBunri([ekiA])).toStrictEqual([ekiA, []])
  })

  test('長さ2のリストを渡す', () => {
    expect(saitanWoBunri([ekiA, ekiB])).toStrictEqual([ekiA, [ekiB]])
  })

  test('長さ2のリストを渡す(逆順)', () => {
    expect(saitanWoBunri([ekiB, ekiA])).toStrictEqual([ekiA, [ekiB]])
  })

  test('長さ3のリストを渡す', () => {
    expect(saitanWoBunri([ekiB, ekiA, ekiC])).toStrictEqual([
      ekiA,
      [ekiB, ekiC],
    ])
  })
})

describe('koushin', () => {
  const ekiA: EkiT = { namae: '池袋', saitan_kyori: Infinity, temae_list: [] }
  const ekiB: EkiT = {
    namae: '新大塚',
    saitan_kyori: 1.2,
    temae_list: ['新大塚', '茗荷谷'],
  }
  const ekiC: EkiT = {
    namae: '茗荷谷',
    saitan_kyori: 0,
    temae_list: ['茗荷谷'],
  }
  const ekiD: EkiT = { namae: '後楽園', saitan_kyori: Infinity, temae_list: [] }
  test('未確定の駅がない', () => {
    expect(koushin(ekiB, [])).toStrictEqual([])
  })
  test('未確定の駅がある', () => {
    const updated: EkiT = {
      namae: '池袋',
      saitan_kyori: 3.0,
      temae_list: ['池袋', '新大塚', '茗荷谷'],
    }
    expect(koushin(ekiB, [ekiA, ekiB, ekiC, ekiD])).toStrictEqual([
      updated,
      ekiB,
      ekiC,
      ekiD,
    ])
  })
})
