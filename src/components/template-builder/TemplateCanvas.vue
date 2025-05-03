<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTemplateStore } from '../../stores/templateStore'
import { GridLayout, GridItem } from 'vue3-grid-layout'
import CanvasComponent from './CanvasComponent.vue'

const templateStore = useTemplateStore()
const { activeTemplate, updateComponent } = templateStore

// Grid layout properties
const layout = ref([])
const isDragging = ref(false)
const isResizing = ref(false)

// Update layout when components change
onMounted(() => {
  updateLayout()
})

// Update the layout based on components
const updateLayout = () => {
  layout.value = activeTemplate.components.map(comp => ({
    i: comp.id,
    x: comp.x,
    y: comp.y,
    w: comp.w,
    h: comp.h,
    type: comp.type,
    content: comp.content
  }))
}

// Handle layout update
const onLayoutUpdated = (newLayout) => {
  newLayout.forEach(item => {
    const component = activeTemplate.components.find(c => c.id === item.i)
    if (component) {
      updateComponent(item.i, {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h
      })
    }
  })
}

// Drag state handlers
const onDragStart = () => {
  isDragging.value = true
}

const onDragEnd = () => {
  isDragging.value = false
  updateLayout()
}

// Resize state handlers
const onResizeStart = () => {
  isResizing.value = true
}

const onResizeEnd = () => {
  isResizing.value = false
  updateLayout()
}
</script>

<template>
  <div class="canvas-container bg-white rounded-lg min-h-[600px] relative">
    <div v-if="activeTemplate.components.length === 0" class="flex flex-col items-center justify-center h-[600px] text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
      <p class="text-lg">Drag components here to build your template</p>
    </div>
    
    <grid-layout
      v-if="activeTemplate.components.length > 0"
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :margin="[5, 5]"
      :use-css-transforms="true"
      @layout-updated="onLayoutUpdated"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
      @resize-start="onResizeStart"
      @resize-end="onResizeEnd"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <CanvasComponent 
          :component-id="item.i" 
          :is-dragging="isDragging" 
          :is-resizing="isResizing" 
        />
      </grid-item>
    </grid-layout>
  </div>
</template>