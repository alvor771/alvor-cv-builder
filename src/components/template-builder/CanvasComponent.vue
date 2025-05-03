<script setup lang="ts">
import { computed } from 'vue'
import { useTemplateStore } from '../../stores/templateStore'

const props = defineProps<{
  componentId: string
  isDragging: boolean
  isResizing: boolean
}>()

const templateStore = useTemplateStore()
const { activeTemplate, updateComponent, removeComponent } = templateStore

// Get the component data
const component = computed(() => {
  return activeTemplate.components.find(c => c.id === props.componentId) || null
})

// Component type display
const componentTypeDisplay = computed(() => {
  const types = {
    header: 'Header',
    contact: 'Contact Info',
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    divider: 'Divider',
    spacer: 'Spacer'
  }
  
  return types[component.value?.type] || 'Component'
})

// Handle component removal
const handleRemove = () => {
  removeComponent(props.componentId)
}
</script>

<template>
  <div 
    v-if="component"
    class="component-container h-full w-full p-1 relative overflow-hidden"
    :class="{ 'border-2 border-dashed border-accent-orange': isDragging || isResizing }"
  >
    <!-- Component preview based on type -->
    <div class="component-content h-full w-full bg-white rounded p-2 overflow-hidden">
      <!-- Header Component Preview -->
      <div v-if="component.type === 'header'" class="text-center">
        <h3 class="font-bold truncate">{{ component.content?.title || 'Full Name' }}</h3>
        <p class="text-sm text-gray-600 truncate">{{ component.content?.subtitle || 'Job Title' }}</p>
      </div>
      
      <!-- Contact Component Preview -->
      <div v-else-if="component.type === 'contact'" class="flex flex-wrap justify-center gap-1 text-xs">
        <span class="bg-gray-100 px-2 py-1 rounded">{{ $t('form.email') }}</span>
        <span class="bg-gray-100 px-2 py-1 rounded">{{ $t('form.phone') }}</span>
        <span class="bg-gray-100 px-2 py-1 rounded">Location</span>
      </div>
      
      <!-- Summary Component Preview -->
      <div v-else-if="component.type === 'summary'" class="h-full overflow-hidden">
        <p class="text-xs text-gray-500 line-clamp-3">
          {{ component.content?.text || 'Professional summary text...' }}
        </p>
      </div>
      
      <!-- Experience Component Preview -->
      <div v-else-if="component.type === 'experience'" class="h-full overflow-hidden">
        <h4 class="text-sm font-medium mb-1">{{ component.content?.title || 'Experience' }}</h4>
        <div class="bg-gray-100 h-2 w-3/4 rounded mb-1"></div>
        <div class="bg-gray-100 h-2 w-full rounded mb-1"></div>
        <div class="bg-gray-100 h-2 w-1/2 rounded"></div>
      </div>
      
      <!-- Education Component Preview -->
      <div v-else-if="component.type === 'education'" class="h-full overflow-hidden">
        <h4 class="text-sm font-medium mb-1">{{ component.content?.title || 'Education' }}</h4>
        <div class="bg-gray-100 h-2 w-3/4 rounded mb-1"></div>
        <div class="bg-gray-100 h-2 w-full rounded mb-1"></div>
        <div class="bg-gray-100 h-2 w-2/3 rounded"></div>
      </div>
      
      <!-- Skills Component Preview -->
      <div v-else-if="component.type === 'skills'" class="h-full overflow-hidden">
        <h4 class="text-sm font-medium mb-1">{{ component.content?.title || 'Skills' }}</h4>
        <div class="flex items-center mb-1">
          <span class="text-xs mr-1">Skill</span>
          <div class="bg-gray-100 h-1.5 flex-grow rounded"></div>
        </div>
        <div class="flex items-center">
          <span class="text-xs mr-1">Skill</span>
          <div class="bg-gray-100 h-1.5 flex-grow rounded"></div>
        </div>
      </div>
      
      <!-- Divider Component Preview -->
      <div v-else-if="component.type === 'divider'" class="flex items-center justify-center h-full">
        <div class="bg-gray-300 h-0.5 w-full"></div>
      </div>
      
      <!-- Spacer Component Preview -->
      <div v-else-if="component.type === 'spacer'" class="flex items-center justify-center h-full">
        <span class="text-xs text-gray-400">Spacer</span>
      </div>
      
      <!-- Default Component -->
      <div v-else class="flex items-center justify-center h-full">
        <span class="text-xs text-gray-400">{{ componentTypeDisplay }}</span>
      </div>
    </div>
    
    <!-- Component hover controls -->
    <div class="component-controls absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1">
      <button 
        @click="handleRemove" 
        class="bg-accent-orange text-white rounded-full w-5 h-5 flex items-center justify-center"
        title="Remove Component"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Component type label -->
    <div 
      v-if="isDragging || isResizing" 
      class="absolute bottom-0 left-0 bg-accent-orange text-white text-xs px-1"
    >
      {{ componentTypeDisplay }}
    </div>
  </div>
</template>