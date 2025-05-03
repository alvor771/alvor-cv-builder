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
  <div class="modern-template min-h-full text-gray-800 font-sans">
    <!-- Header -->
    <header class="bg-accent-orange text-white p-8">
      <h1 class="text-3xl font-bold mb-2">{{ data.personal.fullName || 'Your Name' }}</h1>
      <h2 class="text-xl mb-4">{{ data.personal.jobTitle || 'Your Position' }}</h2>
      
      <div class="flex flex-wrap gap-4 text-sm">
        <div v-if="data.personal.email" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          {{ data.personal.email }}
        </div>
        
        <div v-if="data.personal.phone" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          {{ data.personal.phone }}
        </div>
        
        <div v-if="data.personal.location" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          {{ data.personal.location }}
        </div>
        
        <div v-if="data.personal.website" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
          </svg>
          {{ data.personal.website }}
        </div>
      </div>
    </header>
    
    <div class="flex flex-col md:flex-row">
      <!-- Sidebar -->
      <aside class="w-full md:w-1/3 bg-gray-100 p-6">
        <!-- Summary -->
        <section v-if="data.personal.summary" class="mb-8">
          <h3 class="text-lg font-semibold mb-2 text-accent-orange">{{ $t('form.summary') }}</h3>
          <p class="text-sm">{{ data.personal.summary }}</p>
        </section>
        
        <!-- Skills -->
        <section v-if="data.skills.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold mb-3 text-accent-orange">{{ $t('form.skills') }}</h3>
          <ul class="space-y-3">
            <li v-for="skill in data.skills" :key="skill.id" class="text-sm">
              <div class="flex justify-between mb-1">
                <span class="font-medium">{{ skill.name }}</span>
                <span class="text-xs">{{ ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][skill.level - 1] }}</span>
              </div>
              <div class="w-full bg-gray-300 rounded-full h-1.5">
                <div 
                  class="bg-accent-orange h-1.5 rounded-full" 
                  :style="{ width: `${skill.level * 20}%` }"
                ></div>
              </div>
            </li>
          </ul>
        </section>
      </aside>
      
      <!-- Main Content -->
      <main class="w-full md:w-2/3 p-6">
        <!-- Experience -->
        <section v-if="data.experience.length > 0" class="mb-8">
          <h3 class="text-xl font-semibold border-b-2 border-accent-orange pb-2 mb-4">{{ $t('form.experience') }}</h3>
          
          <div 
            v-for="exp in data.experience" 
            :key="exp.id"
            class="mb-6"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold">{{ exp.position }}</h4>
                <h5 class="text-gray-600">{{ exp.company }}</h5>
              </div>
              <div class="text-sm text-gray-500 whitespace-nowrap">
                {{ formatDateRange(exp.startDate, exp.endDate, exp.current) }}
              </div>
            </div>
            <p class="mt-2 text-sm">{{ exp.description }}</p>
          </div>
        </section>
        
        <!-- Education -->
        <section v-if="data.education.length > 0">
          <h3 class="text-xl font-semibold border-b-2 border-accent-orange pb-2 mb-4">{{ $t('form.education') }}</h3>
          
          <div 
            v-for="edu in data.education" 
            :key="edu.id"
            class="mb-6"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold">{{ edu.degree }}{{ edu.field ? ` in ${edu.field}` : '' }}</h4>
                <h5 class="text-gray-600">{{ edu.institution }}</h5>
              </div>
              <div class="text-sm text-gray-500 whitespace-nowrap">
                {{ formatDateRange(edu.startDate, edu.endDate, edu.current) }}
              </div>
            </div>
            <p v-if="edu.description" class="mt-2 text-sm">{{ edu.description }}</p>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>