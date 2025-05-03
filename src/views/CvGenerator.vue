<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CvForm from '../components/cv-generator/CvForm.vue'
import CvPreview from '../components/cv-generator/CvPreview.vue'
import CvTemplateSelector from '../components/cv-generator/CvTemplateSelector.vue'
import { useCvStore } from '../stores/cvStore'

const cvStore = useCvStore()
const selectedSection = ref('personal')
const showPreview = ref(window.innerWidth >= 1024)

// Handle responsive preview toggle
const togglePreview = () => {
  showPreview.value = !showPreview.value
}

// Handle window resize for responsive layout
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      showPreview.value = true
    }
  }
  
  window.addEventListener('resize', handleResize)
  
  return () => {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-text-light mb-8">Create Your Resume</h1>
    
    <!-- Template Selector -->
    <div class="mb-10">
      <h2 class="text-xl font-medium text-text-light mb-4">Choose a Template</h2>
      <CvTemplateSelector />
    </div>
    
    <!-- Main Content Area - Responsive Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Form Section -->
      <div class="card">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-medium text-text-light">Resume Information</h2>
          <button 
            @click="togglePreview" 
            class="lg:hidden btn btn-outline"
          >
            {{ showPreview ? 'Hide Preview' : 'Show Preview' }}
          </button>
        </div>
        
        <!-- Form Navigation -->
        <div class="flex overflow-x-auto mb-6 pb-2 gap-2">
          <button 
            @click="selectedSection = 'personal'" 
            class="btn whitespace-nowrap"
            :class="selectedSection === 'personal' ? 'btn-primary' : 'btn-outline'"
          >
            Personal
          </button>
          <button 
            @click="selectedSection = 'experience'" 
            class="btn whitespace-nowrap"
            :class="selectedSection === 'experience' ? 'btn-primary' : 'btn-outline'"
          >
            Experience
          </button>
          <button 
            @click="selectedSection = 'education'" 
            class="btn whitespace-nowrap"
            :class="selectedSection === 'education' ? 'btn-primary' : 'btn-outline'"
          >
            Education
          </button>
          <button 
            @click="selectedSection = 'skills'" 
            class="btn whitespace-nowrap"
            :class="selectedSection === 'skills' ? 'btn-primary' : 'btn-outline'"
          >
            Skills
          </button>
        </div>
        
        <!-- Form Content -->
        <CvForm :section="selectedSection" />
      </div>
      
      <!-- Preview Section - Conditionally shown on mobile -->
      <div v-if="showPreview" class="card">
        <h2 class="text-xl font-medium text-text-light mb-6">Resume Preview</h2>
        <CvPreview />
        
        <!-- Export Buttons -->
        <div class="mt-6 flex flex-wrap gap-4">
          <button class="btn btn-primary">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              Export as PDF
            </span>
          </button>
          <button class="btn btn-outline">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clip-rule="evenodd" />
              </svg>
              Export as HTML
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>