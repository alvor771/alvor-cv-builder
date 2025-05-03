<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const navigateTo = (path: string) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="bg-primary-light py-4 px-6 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <router-link to="/" class="text-accent-orange font-bold text-2xl tracking-tight">
          CV<span class="text-accent-blue">Maker</span>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-8">
        <router-link 
          to="/" 
          class="text-text-muted hover:text-text-light transition-colors"
          active-class="text-text-light"
        >
          Home
        </router-link>
        <router-link 
          to="/cv-generator" 
          class="text-text-muted hover:text-text-light transition-colors"
          active-class="text-text-light"
        >
          CV Generator
        </router-link>
        <router-link 
          to="/template-builder" 
          class="text-text-muted hover:text-text-light transition-colors"
          active-class="text-text-light"
        >
          Template Builder
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden text-text-light"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden bg-primary-light py-2 px-4 mt-2 rounded-md animate-fade-in absolute w-full left-0 z-50"
    >
      <div class="flex flex-col space-y-4 py-2">
        <a 
          @click="navigateTo('/')" 
          class="text-text-muted hover:text-text-light transition-colors py-2"
        >
          Home
        </a>
        <a 
          @click="navigateTo('/cv-generator')" 
          class="text-text-muted hover:text-text-light transition-colors py-2"
        >
          CV Generator
        </a>
        <a 
          @click="navigateTo('/template-builder')" 
          class="text-text-muted hover:text-text-light transition-colors py-2"
        >
          Template Builder
        </a>
      </div>
    </div>
  </header>
</template>