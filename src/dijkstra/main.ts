import { GLOBAL_EKIKAN_LIST } from '../consts/metro'
import { getEkikanKyori } from './get_ekikan_kyori'

/**
 * 目的: EkiT[]型の変数 lst を受け取り、
 * 「最短距離最小の駅」、「最短距離最小の駅以外の駅以外のリスト」を返却する
 * @param {EkiT[]} lst
 * @returns {[EkiT, EkiT[]]}
 */
const saitanWoBunri = function (lst: EkiT[]): [EkiT, EkiT[]] {
  if (lst.length === 0) {
    throw new Error('引数のlistの長さが0です。')
  }
  if (lst.length === 1) {
    return [lst[0], []]
  }
  const result: { first: EkiT; rest: EkiT[] } = {
    first: {
      namae: 'unkown',
      saitan_kyori: Infinity,
      temae_list: [],
    },
    rest: [],
  }
  lst.reduceRight((accumulator, currentValue, idx) => {
    if (accumulator.saitan_kyori < currentValue.saitan_kyori) {
      result.first = accumulator
      result.rest.unshift(currentValue)
      return accumulator
    }
    result.first = currentValue
    result.rest.unshift(accumulator)
    return currentValue
  })
  return [result.first, result.rest]
}

/**
 * 直前に確定した駅と未確定の駅リストをもとに更新作業を実施し、
 * 未確定の駅リストを返却する。
 * 利用する駅間リストを指定する事もできる。
 * @param {EkiT} p - 直前に確定した駅
 * @param {EkiT[]} v - 未確定の駅のリスト
 * @param {EkikanT[]} ekikanList - 利用する駅間リストマスタ
 * @returns {EkiT[]} - 更新済みの未確定の駅リスト
 */
const koushin = function (
  p: EkiT,
  v: EkiT[],
  ekikanList: EkikanT[] = GLOBAL_EKIKAN_LIST.concat(),
): EkiT[] {
  return v.map((q: EkiT) => {
    // 各ループでekikanListを使うので、別のオブジェクトにするためにekikanList.concat()を行う
    const ekikanKyori = getEkikanKyori(p.namae, q.namae, ekikanList.concat())
    if (ekikanKyori + p.saitan_kyori < q.saitan_kyori) {
      return {
        namae: q.namae,
        saitan_kyori: ekikanKyori + p.saitan_kyori,
        temae_list: [q.namae].concat(p.temae_list),
      }
    }
    return q
  })
}

/**
 * 未確定の駅リストと駅間リストを受け取り、
 * ダイクストラのアルゴリズムに従って各駅についての最短距離と、
 * 最短距離が入ったリストを返却する
 * @param {EkiT[]} ekiTList - 未確定の駅リスト
 * @param {EkikanT[]} ekikanTList - 駅間リスト
 * @returns {EkiT[]}
 */
const dijkstraMain = function (
  ekiTList: EkiT[],
  ekikanTList: EkikanT[] = GLOBAL_EKIKAN_LIST.concat(),
): EkiT[] {
  if (ekiTList.length === 0) {
    return []
  }
  const [saitan, nokori] = saitanWoBunri(ekiTList)
  console.log('saitan, nokori: ', [saitan, nokori])
  const updated = koushin(saitan, nokori, ekikanTList.concat())
  console.log('updated: ', updated)
  return [saitan].concat(dijkstraMain(updated, ekikanTList.concat()))
}

export { saitanWoBunri, koushin, dijkstraMain }
