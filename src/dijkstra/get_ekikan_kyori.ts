import { GLOBAL_EKIKAN_LIST } from '../consts/metro'

/**
 * 漢字の駅名を２つと駅間リストを受け取り、
 * 駅間リストに照らし合わせて2駅間の距離を返す
 * @param {string} ekimei1 - 駅名1
 * @param {string} ekimei2 - 駅名2
 * @param {string} lst - 駅間リスト
 * @returns {number} - 2駅間の距離
 */
const getEkikanKyori = function (
  ekimei1: string,
  ekimei2: string,
  lst: EkikanT[] = GLOBAL_EKIKAN_LIST.concat(),
): number {
  if (lst.length === 0) {
    return Infinity
  }
  const first: EkikanT = lst.shift() as EkikanT
  if (first.kiten === ekimei1 && first.shuten === ekimei2) {
    return first.kyori
  } else if (first.kiten === ekimei2 && first.shuten === ekimei1) {
    return first.kyori
  } else {
    return getEkikanKyori(ekimei1, ekimei2, lst)
  }
}

export { getEkikanKyori }
