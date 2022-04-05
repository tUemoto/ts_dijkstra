import { makeInitialEkiList } from '../../dijkstra/make_ekimei_list'
import { GLOBAL_EKIMEI_LIST } from '../../consts/metro'

let ekimei_list: EkimeiT[]
beforeEach(() => {
  // 実行時に定数を直接利用しないようにリストをコピーして変数に格納し直す
  ekimei_list = GLOBAL_EKIMEI_LIST.slice(0, 3)
})

test('set empty list, empty string', () => {
  expect(makeInitialEkiList([], '')).toStrictEqual([])
})

test('set empty list, invalid string', () => {
  expect(makeInitialEkiList([], 'hoge')).toStrictEqual([])
})

test('set valid list, empty string', () => {
  expect(makeInitialEkiList(ekimei_list, '')).toStrictEqual([
    { namae: '代々木上原', saitan_kyori: Infinity, temae_list: [] },
    { namae: '代々木公園', saitan_kyori: Infinity, temae_list: [] },
    { namae: '明治神宮前', saitan_kyori: Infinity, temae_list: [] },
  ])
})

test('set valid list, invalid string', () => {
  expect(makeInitialEkiList(ekimei_list, 'hoge')).toStrictEqual([
    { namae: '代々木上原', saitan_kyori: Infinity, temae_list: [] },
    { namae: '代々木公園', saitan_kyori: Infinity, temae_list: [] },
    { namae: '明治神宮前', saitan_kyori: Infinity, temae_list: [] },
  ])
})

test('set valid list, valid string', () => {
  expect(makeInitialEkiList(ekimei_list, '代々木公園')).toStrictEqual([
    { namae: '代々木上原', saitan_kyori: Infinity, temae_list: [] },
    { namae: '代々木公園', saitan_kyori: 0, temae_list: ['代々木公園'] },
    { namae: '明治神宮前', saitan_kyori: Infinity, temae_list: [] },
  ])
})
