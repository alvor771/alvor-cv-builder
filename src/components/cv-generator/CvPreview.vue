<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCvStore } from '../../stores/cvStore'
import ModernTemplate from '../templates/ModernTemplate.vue'
import ClassicTemplate from '../templates/ClassicTemplate.vue'
import MinimalTemplate from '../templates/MinimalTemplate.vue'
import html2pdf from 'html2pdf.js'

const cvStore = useCvStore()
const { cvData, selectedTemplate } = cvStore

// Map of template components
const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate
}

// Computed property to get the current template component
const currentTemplate = computed(() => {
  return templates[selectedTemplate] || templates.modern
})

// Export to PDF
const exportToPDF = async () => {
  const element = document.querySelector('.cv-preview')
  if (!element) return

  const opt = {
    margin: 1,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  }

  try {
    await html2pdf().set(opt).from(element).save()
  } catch (error) {
    console.error('Error exporting PDF:', error)
  }
}
</script>

<template>
  <div class="relative">
    <!-- Template Toolbar -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex space-x-2">
        <button 
          v-for="(_, id) in templates" 
          :key="id"
          @click="cvStore.setTemplate(id)"
          class="btn"
          :class="selectedTemplate === id ? 'btn-primary' : 'btn-outline'"
        >
          {{ id.charAt(0).toUpperCase() + id.slice(1) }}
        </button>
      </div>
      
      <button 
        @click="exportToPDF"
        class="btn btn-primary flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        Export PDF
      </button>
    </div>

    <!-- CV Preview -->
    <div class="cv-preview bg-white rounded-lg overflow-hidden shadow-lg min-h-[500px] max-h-[700px] overflow-y-auto">
      <component :is="currentTemplate" :data="cvData" />
    </div>
  </div>
</template>