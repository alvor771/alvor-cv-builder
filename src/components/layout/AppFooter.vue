<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-primary-light py-6 px-6 mt-auto">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <div class="text-accent-orange font-bold text-xl">
            CV<span class="text-accent-blue">Maker</span>
          </div>
          <p class="text-text-muted text-sm mt-1">Create stunning resumes with ease</p>
        </div>
        
        <div class="text-text-muted text-sm">
          &copy; {{ currentYear }} CVMaker. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>