
<template>
  <select v-model="locale" @change="changeLanguage">
    <option value="en">English</option>
    <option value="ru">Русский</option>
    <option value="pl">Polski</option>
  </select>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function changeLanguage() {
  localStorage.setItem("app-locale", locale.value);
}
</script>
