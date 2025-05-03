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
  <div class="classic-template min-h-full text-gray-800 font-serif p-8">
    <!-- Header -->
    <header class="text-center mb-8">
      <h1 class="text-3xl font-bold text-accent-blue">{{ data.personal.fullName || 'Your Name' }}</h1>
      <h2 class="text-lg text-gray-600 mt-1">{{ data.personal.jobTitle || 'Your Position' }}</h2>
      
      <div class="flex flex-wrap justify-center gap-x-6 mt-3 text-sm">
        <div v-if="data.personal.email" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-blue" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {{ data.personal.email }}
        </div>
        
        <div v-if="data.personal.phone" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-blue" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {{ data.personal.phone }}
        </div>
        
        <div v-if="data.personal.location" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-blue" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          {{ data.personal.location }}
        </div>
        
        <div v-if="data.personal.website" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-blue" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
          {{ data.personal.website }}
        </div>
      </div>
    </header>
    
    <div class="border-t border-b border-gray-300 my-6"></div>
    
    <!-- Summary -->
    <section v-if="data.personal.summary" class="mb-8">
      <h3 class="text-xl font-bold mb-3 text-accent-blue">Professional Summary</h3>
      <p>{{ data.personal.summary }}</p>
    </section>
    
    <!-- Experience -->
    <section v-if="data.experience.length > 0" class="mb-8">
      <h3 class="text-xl font-bold mb-4 text-accent-blue">Professional Experience</h3>
      
      <div 
        v-for="exp in data.experience" 
        :key="exp.id"
        class="mb-6"
      >
        <div class="flex justify-between items-baseline mb-1">
          <h4 class="font-bold text-lg">{{ exp.position }}</h4>
          <span class="text-gray-600 text-sm">{{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}</span>
        </div>
        <h5 class="font-semibold text-gray-700 mb-2">{{ exp.company }}</h5>
        <p class="text-sm">{{ exp.description }}</p>
      </div>
    </section>
    
    <!-- Education -->
    <section v-if="data.education.length > 0" class="mb-8">
      <h3 class="text-xl font-bold mb-4 text-accent-blue">{{ $t('form.education') }}</h3>
      
      <div 
        v-for="edu in data.education" 
        :key="edu.id"
        class="mb-6"
      >
        <div class="flex justify-between items-baseline mb-1">
          <h4 class="font-bold text-lg">{{ edu.degree }}{{ edu.field ? ` in ${edu.field}` : '' }}</h4>
          <span class="text-gray-600 text-sm">{{ formatDateRange(edu.startDate, edu.endDate, edu.current) }}</span>
        </div>
        <h5 class="font-semibold text-gray-700 mb-2">{{ edu.institution }}</h5>
        <p v-if="edu.description" class="text-sm">{{ edu.description }}</p>
      </div>
    </section>
    
    <!-- Skills -->
    <section v-if="data.skills.length > 0">
      <h3 class="text-xl font-bold mb-4 text-accent-blue">{{ $t('form.skills') }}</h3>
      
      <div class="flex flex-wrap gap-2">
        <div 
          v-for="skill in data.skills" 
          :key="skill.id"
          class="bg-gray-100 px-3 py-1 rounded-full text-sm"
        >
          {{ skill.name }}
          <span class="ml-1 text-gray-500">({{ ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][skill.level - 1] }})</span>
        </div>
      </div>
    </section>
  </div>
</template>