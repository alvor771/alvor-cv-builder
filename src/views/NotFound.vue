<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="text-center max-w-lg">
      <h1 class="text-6xl font-bold text-accent-orange mb-6">404</h1>
      <h2 class="text-2xl font-medium text-text-light mb-4">Page Not Found</h2>
      <p class="text-text-muted mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button @click="goHome" class="btn btn-primary">
        Return to Home
      </button>
    </div>
  </div>
</template>