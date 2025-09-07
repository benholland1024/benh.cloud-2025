import { ref } from 'vue'

export function useTranslation() {
  const selectedLanguage = ref('en')

  function $t(en: string, de: string) {
    return selectedLanguage.value === 'en' ? en : de
  }

  return {
    selectedLanguage,
    $t
  }
}