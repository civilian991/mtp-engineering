import { Locale } from './i18n'
import enDict from './dictionaries/en.json'
import arDict from './dictionaries/ar.json'

const dictionaries = {
  en: enDict,
  ar: arDict,
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.en
}