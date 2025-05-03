
import { createI18n } from "vue-i18n";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import pl from "./locales/pl.json";

const messages = { en, ru, pl };

const userLang = navigator.language.split("-")[0]; // "en", "ru", "pl"
const fallbackLocale = "en";

const i18n = createI18n({
  legacy: false,
  locale: messages[userLang] ? userLang : fallbackLocale,
  fallbackLocale,
  globalInjection: true,
  messages,
});

export default i18n;
