<script setup lang="ts">
import { computed } from 'vue'
import type { CvData } from '../../stores/cvStore'

defineProps<{
  data: CvData
}>()

// Format date range
const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
  let start = startDate ? new Date(startDate).getFullYear() : ''
  let end = current ? 'Present' : (endDate ? new Date(endDate).getFullYear() : '')
  
  if (!start) return ''
  return `${start} - ${end}`
}
</script>

<template>
  <div class="minimal-template min-h-full text-gray-800 font-sans p-8">
    <!-- Header -->
    <header class="flex justify-between items-start mb-10">
      <div>
        <h1 class="text-3xl font-bold">{{ data.personal.fullName || 'Your Name' }}</h1>
        <h2 class="text-xl text-gray-600 mt-1">{{ data.personal.jobTitle || 'Your Position' }}</h2>
      </div>
      
      <div class="text-right">
        <div v-if="data.personal.email" class="mb-1 text-sm">{{ data.personal.email }}</div>
        <div v-if="data.personal.phone" class="mb-1 text-sm">{{ data.personal.phone }}</div>
        <div v-if="data.personal.location" class="mb-1 text-sm">{{ data.personal.location }}</div>
        <div v-if="data.personal.website" class="text-sm">{{ data.personal.website }}</div>
      </div>
    </header>
    
    <!-- Summary -->
    <section v-if="data.personal.summary" class="mb-8">
      <p class="leading-relaxed">{{ data.personal.summary }}</p>
    </section>
    
    <!-- Experience -->
    <section v-if="data.experience.length > 0" class="mb-8">
      <h3 class="text-lg text-accent-orange font-medium mb-4">{{ $t('form.experience') }}</h3>
      
      <div 
        v-for="exp in data.experience" 
        :key="exp.id"
        class="mb-6"
      >
        <div class="flex justify-between items-baseline">
          <h4 class="font-semibold">{{ exp.position }}</h4>
          <span class="text-gray-500 text-sm">{{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}</span>
        </div>
        <div class="text-gray-600 mb-2">{{ exp.company }}</div>
        <p class="text-sm">{{ exp.description }}</p>
      </div>
    </section>
    
    <!-- Education -->
    <section v-if="data.education.length > 0" class="mb-8">
      <h3 class="text-lg text-accent-orange font-medium mb-4">{{ $t('form.education') }}</h3>
      
      <div 
        v-for="edu in data.education" 
        :key="edu.id"
        class="mb-6"
      >
        <div class="flex justify-between items-baseline">
          <h4 class="font-semibold">{{ edu.degree }}{{ edu.field ? ` in ${edu.field}` : '' }}</h4>
          <span class="text-gray-500 text-sm">{{ formatDateRange(edu.startDate, edu.endDate, edu.current) }}</span>
        </div>
        <div class="text-gray-600 mb-2">{{ edu.institution }}</div>
        <p v-if="edu.description" class="text-sm">{{ edu.description }}</p>
      </div>
    </section>
    
    <!-- Skills -->
    <section v-if="data.skills.length > 0">
      <h3 class="text-lg text-accent-orange font-medium mb-4">{{ $t('form.skills') }}</h3>
      
      <div class="grid grid-cols-2 gap-y-2 gap-x-4">
        <div 
          v-for="skill in data.skills" 
          :key="skill.id"
          class="flex items-center"
        >
          <span class="mr-2">{{ skill.name }}</span>
          <div class="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full bg-accent-orange"
              :style="{ width: `${skill.level * 20}%` }"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>