import { romajiToKanji } from '../../dijkstra/romaji_to_kanji'
import { GLOBAL_EKIMEI_LIST } from '../../consts/metro'

let ekimei_list: EkimeiT[]
beforeEach(() => {
  ekimei_list = GLOBAL_EKIMEI_LIST.concat()
})

test('set empty string, empty list', () => {
  expect(romajiToKanji('', [])).toBe('')
})

test('set invalid string, empty list', () => {
  expect(romajiToKanji('hoge', [])).toBe('')
})

test('set empty string, non empty list', () => {
  expect(romajiToKanji('', ekimei_list)).toBe('')
})

test('set invalid string, non empty list', () => {
  expect(romajiToKanji('hoge', ekimei_list)).toBe('')
})

test('set valid string, non empty list', () => {
  expect(romajiToKanji('shirokanedai', ekimei_list)).toBe('白金台')
})
