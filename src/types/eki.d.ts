/**
 * 駅名の情報を格納する型
 */
interface EkimeiT {
  kanji: string // 駅名
  kana: string // 読み
  romaji: string // ローマ字
  shozoku: string // 所属線名
}

/**
 * 駅間の情報を格納する型
 */
interface EkikanT {
  kiten: string // 起点
  shuten: string // 終点
  keiyu: string // 経由線名
  kyori: number // 距離
  jikan: number // 時間
}

/**
 * グラフの頂点の情報を格納する型
 */
interface EkiT {
  namae: string // 駅名（漢字）
  saitan_kyori: number // 最短距離
  temae_list: string[] // 経由した駅のリスト
}
