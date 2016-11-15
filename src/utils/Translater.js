import CONFIG from '../constants/Config';
import LANG_RU from '../constants/lang/ru';
import LANG_EN from '../constants/lang/en';

export default class Translater {

  static t(key) {
    const lang = CONFIG.lang === 'ru' ? LANG_RU : LANG_EN;
    return lang[key] ? lang[key] : key;
  }

}
