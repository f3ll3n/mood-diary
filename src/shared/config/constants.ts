export const APP_NAME = 'bipolarity-2 reborn'
export const APP_SLOGAN = 'всё ещё бета, напоминаю'

export const MOOD_MIN = -5
export const MOOD_MAX = 5

export const STORAGE_KEY = 'bipolarity-2-reborn'
export const IDB_NAME = 'bipolarity-2-reborn'
export const IDB_STORE = 'diary'

export const MOOD_LABELS: Record<number, string> = {
  [-5]: 'абсолютный тильт',
  [-4]: 'глубокий даун',
  [-3]: 'серый экран загрузки',
  [-2]: 'AFK на лайне',
  [-1]: 'лёгкий минус',
  [0]: 'нейтральная катка',
  [1]: 'микро-плюс',
  [2]: 'хороший фарм',
  [3]: 'доминируешь',
  [4]: 'рампage mode',
  [5]: 'beyond godlike',
}

export const NETWORTH_LABELS = [
  { max: 1000, label: 'крип без предметов' },
  { max: 2500, label: 'фармишь, но не доминируешь' },
  { max: 4000, label: 'mid diff' },
  { max: 5500, label: 'carry diff' },
  { max: Infinity, label: 'смурф в пабе' },
] as const
