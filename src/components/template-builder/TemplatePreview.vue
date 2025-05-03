<script setup lang="ts">
import { computed } from 'vue'
import { useTemplateStore } from '../../stores/templateStore'

const templateStore = useTemplateStore()
const { activeTemplate } = templateStore

// Example CV data for preview
const exampleData = {
  personal: {
    fullName: 'Alex Johnson',
    jobTitle: 'Senior Frontend Developer',
    email: 'alex.johnson@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    website: 'www.alexjohnson.dev',
    summary: 'Experienced frontend developer with 7+ years of expertise in building responsive web applications. Proficient in Vue.js, React, and modern JavaScript. Passionate about creating intuitive user interfaces and optimizing web performance.'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: 'Lead developer for client-facing web applications. Implemented modern frontend architecture using Vue.js and improved performance by 40%.'
    },
    {
      id: '2',
      company: 'Digital Innovation Lab',
      position: 'Frontend Developer',
      startDate: '2017-03',
      endDate: '2019-12',
      current: false,
      description: 'Developed interactive web applications and collaborated with UX designers to create intuitive user interfaces.'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2013-09',
      endDate: '2017-05',
      current: false,
      description: 'Graduated with honors. Focus on web development and user interface design.'
    }
  ],
  skills: [
    {
      id: '1',
      name: 'Vue.js',
      level: 5
    },
    {
      id: '2',
      name: 'JavaScript',
      level: 5
    },
    {
      id: '3',
      name: 'HTML/CSS',
      level: 4
    },
    {
      id: '4',
      name: 'React',
      level: 3
    },
    {
      id: '5',
      name: 'TypeScript',
      level: 4
    }
  ]
}
</script>

<template>
  <div class="template-preview">
    <div v-if="activeTemplate.components.length === 0" class="bg-white rounded-lg p-8 text-center">
      <p class="text-gray-500">No components added to the template yet.</p>
      <p class="text-gray-500 mt-2">Switch to Edit Mode to add components.</p>
    </div>
    
    <div v-else class="bg-white rounded-lg p-8 min-h-[600px]">
      <!-- This is a simplified preview. In a real implementation, you would render the template 
           with the example data based on the components arrangement and configuration -->
      <div 
        v-for="component in activeTemplate.components" 
        :key="component.id"
        class="mb-4"
      >
        <!-- Header Component -->
        <div v-if="component.type === 'header'" class="text-center mb-6">
          <h1 class="text-3xl font-bold">{{ exampleData.personal.fullName }}</h1>
          <h2 class="text-xl text-gray-600 mt-1">{{ exampleData.personal.jobTitle }}</h2>
        </div>
        
        <!-- Contact Component -->
        <div v-else-if="component.type === 'contact'" class="flex justify-center gap-4 text-sm">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            {{ exampleData.personal.email }}
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {{ exampleData.personal.phone }}
          </div>
          
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            {{ exampleData.personal.location }}
          </div>
        </div>
        
        <!-- Summary Component -->
        <div v-else-if="component.type === 'summary'" class="mb-6">
          <p>{{ exampleData.personal.summary }}</p>
        </div>
        
        <!-- Experience Component -->
        <div v-else-if="component.type === 'experience'" class="mb-6">
          <h3 class="text-xl font-semibold border-b border-accent-orange pb-2 mb-4">{{ $t('form.experience') }}</h3>
          
          <div 
            v-for="exp in exampleData.experience" 
            :key="exp.id"
            class="mb-4"
          >
            <div class="flex justify-between items-baseline">
              <h4 class="font-semibold">{{ exp.position }}</h4>
              <span class="text-gray-600 text-sm">
                {{ new Date(exp.startDate).getFullYear() }} - {{ exp.current ? 'Present' : new Date(exp.endDate).getFullYear() }}
              </span>
            </div>
            <h5 class="text-gray-700 mb-1">{{ exp.company }}</h5>
            <p class="text-sm">{{ exp.description }}</p>
          </div>
        </div>
        
        <!-- Education Component -->
        <div v-else-if="component.type === 'education'" class="mb-6">
          <h3 class="text-xl font-semibold border-b border-accent-orange pb-2 mb-4">{{ $t('form.education') }}</h3>
          
          <div 
            v-for="edu in exampleData.education" 
            :key="edu.id"
            class="mb-4"
          >
            <div class="flex justify-between items-baseline">
              <h4 class="font-semibold">{{ edu.degree }} in {{ edu.field }}</h4>
              <span class="text-gray-600 text-sm">
                {{ new Date(edu.startDate).getFullYear() }} - {{ edu.current ? 'Present' : new Date(edu.endDate).getFullYear() }}
              </span>
            </div>
            <h5 class="text-gray-700 mb-1">{{ edu.institution }}</h5>
            <p class="text-sm">{{ edu.description }}</p>
          </div>
        </div>
        
        <!-- Skills Component -->
        <div v-else-if="component.type === 'skills'" class="mb-6">
          <h3 class="text-xl font-semibold border-b border-accent-orange pb-2 mb-4">{{ $t('form.skills') }}</h3>
          
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="skill in exampleData.skills" 
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
        </div>
        
        <!-- Divider Component -->
        <div v-else-if="component.type === 'divider'" class="border-t border-gray-300 my-4"></div>
        
        <!-- Spacer Component -->
        <div v-else-if="component.type === 'spacer'" class="h-8"></div>
      </div>
    </div>
  </div>
</template>