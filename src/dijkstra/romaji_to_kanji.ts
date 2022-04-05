/**
 * 目的:
 * ローマ字の駅名(string)と駅名リスト(ekimei_t list)を受け取って
 * 園駅の漢字表記を文字列で返す
 */
const romajiToKanji = function (str: string, lst: EkimeiT[]): string {
  if (lst.length === 0) {
    return ''
  }
  const first: EkimeiT = lst.shift() as EkimeiT
  if (str === first.romaji) {
    return first.kanji
  }
  return romajiToKanji(str, lst)
}

export { romajiToKanji }
