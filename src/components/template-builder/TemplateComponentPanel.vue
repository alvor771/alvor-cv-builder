<script setup lang="ts">
import { ref } from 'vue'
import { useTemplateStore } from '../../stores/templateStore'

const templateStore = useTemplateStore()

// Component categories
const categories = [
  {
    name: 'Header',
    components: [
      {
        type: 'header',
        name: 'Name & Title',
        icon: 'user',
        defaultContent: {
          title: 'Full Name',
          subtitle: 'Job Title'
        },
        defaultStyle: {},
        initialSize: { w: 12, h: 3 }
      },
      {
        type: 'contact',
        name: 'Contact Info',
        icon: 'mail',
        defaultContent: {
          items: [
            { type: 'email', value: 'email@example.com' },
            { type: 'phone', value: '+1 234 567 890' },
            { type: 'location', value: 'City, Country' },
            { type: 'website', value: 'www.example.com' }
          ]
        },
        defaultStyle: {},
        initialSize: { w: 12, h: 3 }
      }
    ]
  },
  {
    name: 'Content',
    components: [
      {
        type: 'summary',
        name: 'Summary',
        icon: 'document-text',
        defaultContent: {
          text: 'Professional summary goes here. Write a short, engaging paragraph about your professional background and career objectives.'
        },
        defaultStyle: {},
        initialSize: { w: 12, h: 4 }
      },
      {
        type: 'experience',
        name: 'Experience',
        icon: 'briefcase',
        defaultContent: {
          title: 'Experience',
          items: [
            {
              position: 'Job Position',
              company: 'Company Name',
              startDate: '2020',
              endDate: 'Present',
              description: 'Job description and achievements'
            }
          ]
        },
        defaultStyle: {},
        initialSize: { w: 12, h: 6 }
      },
      {
        type: 'education',
        name: 'Education',
        icon: 'academic-cap',
        defaultContent: {
          title: 'Education',
          items: [
            {
              degree: 'Degree',
              institution: 'Institution Name',
              startDate: '2016',
              endDate: '2020',
              description: 'Details about your education'
            }
          ]
        },
        defaultStyle: {},
        initialSize: { w: 12, h: 5 }
      },
      {
        type: 'skills',
        name: 'Skills',
        icon: 'chip',
        defaultContent: {
          title: 'Skills',
          items: [
            { name: 'Skill 1', level: 4 },
            { name: 'Skill 2', level: 3 },
            { name: 'Skill 3', level: 5 }
          ]
        },
        defaultStyle: {},
        initialSize: { w: 6, h: 5 }
      }
    ]
  },
  {
    name: 'Design',
    components: [
      {
        type: 'divider',
        name: 'Divider',
        icon: 'minus',
        defaultContent: {},
        defaultStyle: {},
        initialSize: { w: 12, h: 1 }
      },
      {
        type: 'spacer',
        name: 'Spacer',
        icon: 'arrows-expand',
        defaultContent: {},
        defaultStyle: {},
        initialSize: { w: 12, h: 2 }
      }
    ]
  }
]

// Drag event handlers
const onDragStart = (event, component) => {
  event.dataTransfer.setData('component', JSON.stringify(component))
}

// Add new component to the canvas
const addComponent = (component) => {
  templateStore.addComponent({
    type: component.type,
    x: 0,
    y: 0,
    w: component.initialSize.w,
    h: component.initialSize.h,
    content: component.defaultContent,
    style: component.defaultStyle
  })
}
</script>

<template>
  <div class="component-panel">
    <div v-for="category in categories" :key="category.name" class="mb-6">
      <h4 class="text-sm font-medium text-text-muted mb-3">{{ category.name }}</h4>
      
      <div class="grid grid-cols-2 gap-2">
        <div 
          v-for="component in category.components" 
          :key="component.type"
          class="component-item p-3 bg-primary border border-primary-light rounded-md hover:border-accent-orange transition-colors cursor-pointer"
          draggable="true"
          @dragstart="onDragStart($event, component)"
          @click="addComponent(component)"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Icon -->
            <div class="mb-2">
              <svg v-if="component.icon === 'user'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <svg v-else-if="component.icon === 'mail'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <svg v-else-if="component.icon === 'document-text'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
              </svg>
              <svg v-else-if="component.icon === 'briefcase'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
              </svg>
              <svg v-else-if="component.icon === 'academic-cap'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <svg v-else-if="component.icon === 'chip'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 7H7v6h6V7z" />
                <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
              </svg>
              <svg v-else-if="component.icon === 'minus'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
              <svg v-else-if="component.icon === 'arrows-expand'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <!-- Component name -->
            <span class="text-xs text-text-muted">{{ component.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>