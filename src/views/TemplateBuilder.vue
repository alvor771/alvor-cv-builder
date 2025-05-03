<script setup lang="ts">
import { ref } from 'vue'
import TemplateCanvas from '../components/template-builder/TemplateCanvas.vue'
import TemplateComponentPanel from '../components/template-builder/TemplateComponentPanel.vue'
import TemplatePreview from '../components/template-builder/TemplatePreview.vue'
import { useTemplateStore } from '../stores/templateStore'

const templateStore = useTemplateStore()
const activeView = ref('edit') // 'edit' or 'preview'

const switchView = (view: string) => {
  activeView.value = view
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <h1 class="text-3xl font-bold text-text-light mb-4 md:mb-0">Template Builder</h1>
      
      <div class="flex space-x-4">
        <button 
          @click="switchView('edit')" 
          class="btn"
          :class="activeView === 'edit' ? 'btn-primary' : 'btn-outline'"
        >
          Edit Mode
        </button>
        <button 
          @click="switchView('preview')" 
          class="btn"
          :class="activeView === 'preview' ? 'btn-primary' : 'btn-outline'"
        >
          Preview
        </button>
      </div>
    </div>
    
    <div v-if="activeView === 'edit'" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Component Panel -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-medium text-text-light mb-6">Components</h2>
          <TemplateComponentPanel />
        </div>
      </div>
      
      <!-- Canvas -->
      <div class="lg:col-span-7">
        <div class="card">
          <h2 class="text-xl font-medium text-text-light mb-6">Canvas</h2>
          <TemplateCanvas />
        </div>
      </div>

      <!-- Preview -->
      <div class="lg:col-span-3">
        <div class="card">
          <h2 class="text-xl font-medium text-text-light mb-6">Preview</h2>
          <TemplatePreview />
        </div>
      </div>
    </div>
    
    <div v-else class="card">
      <h2 class="text-xl font-medium text-text-light mb-6">Template Preview</h2>
      <TemplatePreview />
      
      <!-- Export Buttons -->
      <div class="mt-6 flex flex-wrap gap-4">
        <button 
          @click="templateStore.saveTemplate()" 
          class="btn btn-primary"
        >
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1.586l-.293-.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 10-1.414-1.414l-.293.293V9z" clip-rule="evenodd" />
            </svg>
            Save Template
          </span>
        </button>
        <button class="btn btn-outline">
          <span class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            Export Template
          </span>
        </button>
      </div>
    </div>
  </div>
</template>