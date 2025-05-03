<script setup lang="ts">
import { ref } from 'vue'
import { useCvStore } from '../../stores/cvStore'
import { useTemplateStore } from '../../stores/templateStore'

const cvStore = useCvStore()
const templateStore = useTemplateStore()

const { templates } = templateStore
const { selectedTemplate, setTemplate } = cvStore

const selectTemplate = (templateId: string) => {
  setTemplate(templateId)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div 
      v-for="template in templates" 
      :key="template.id"
      class="relative rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] transform"
      :class="{ 'ring-2 ring-accent-orange': selectedTemplate === template.id }"
      @click="selectTemplate(template.id)"
    >
      <!-- Template Preview Card -->
      <div class="bg-primary-light rounded-lg overflow-hidden h-48">
        <!-- Modern template preview -->
        <div v-if="template.id === 'modern'" class="h-full p-4 flex flex-col">
          <div class="h-10 bg-accent-orange mb-3 flex items-center p-2">
            <div class="w-20 h-4 bg-white rounded"></div>
          </div>
          <div class="flex flex-1">
            <div class="w-1/3 bg-primary h-full p-2">
              <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div class="h-3 w-3/4 bg-gray-700 rounded"></div>
            </div>
            <div class="w-2/3 p-2">
              <div class="h-4 w-3/4 bg-gray-700 rounded mb-2"></div>
              <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
              <div class="h-3 w-1/2 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
        
        <!-- Classic template preview -->
        <div v-else-if="template.id === 'classic'" class="h-full p-4 flex flex-col">
          <div class="h-8 mb-3 flex items-center justify-center">
            <div class="h-5 w-32 bg-accent-blue rounded-sm"></div>
          </div>
          <div class="h-0.5 w-full bg-gray-700 mb-3"></div>
          <div class="flex-1 p-2">
            <div class="h-4 w-1/2 bg-gray-700 rounded mb-3"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
            <div class="h-4 w-1/2 bg-gray-700 rounded mb-3 mt-4"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
          </div>
        </div>
        
        <!-- Minimal template preview -->
        <div v-else-if="template.id === 'minimal'" class="h-full p-4 flex flex-col">
          <div class="h-10 flex items-start justify-between mb-4">
            <div class="h-6 w-40 bg-gray-700 rounded-sm"></div>
            <div class="flex flex-col items-end">
              <div class="h-3 w-24 bg-gray-700 rounded-sm mb-1"></div>
              <div class="h-3 w-20 bg-gray-700 rounded-sm"></div>
            </div>
          </div>
          <div class="flex-1 p-2">
            <div class="h-4 w-20 bg-accent-orange rounded-sm mb-2"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-1"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-1"></div>
            <div class="h-4 w-20 bg-accent-orange rounded-sm mb-2 mt-3"></div>
            <div class="h-3 w-full bg-gray-700 rounded mb-1"></div>
          </div>
        </div>
      </div>
      
      <!-- Template name -->
      <div class="p-3 bg-primary text-center">
        <span class="text-text-light font-medium">{{ template.name }}</span>
      </div>
      
      <!-- Selected indicator -->
      <div 
        v-if="selectedTemplate === template.id" 
        class="absolute top-2 right-2 bg-accent-orange text-white rounded-full h-6 w-6 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>