/**
 * 駅名リスト(EkimetiT[])をもとに、始点を明示した経由駅リスト(EkiT[])を作る
 * @param lst
 * @param kiten
 */
const makeInitialEkiList = function (lst: EkimeiT[], kiten: string): EkiT[] {
  return lst.map((ekimei): EkiT => {
    if (ekimei.kanji === kiten) {
      return {
        namae: ekimei.kanji,
        saitan_kyori: 0,
        temae_list: [ekimei.kanji],
      }
    }
    return {
      namae: ekimei.kanji,
      saitan_kyori: Infinity,
      temae_list: [],
    }
  })
}

export { makeInitialEkiList }
