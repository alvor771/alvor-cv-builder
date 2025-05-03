import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'

export interface TemplateComponent {
  id: string
  type: string
  x: number
  y: number
  w: number
  h: number
  content: any
  style: Record<string, any>
}

export interface Template {
  id: string
  name: string
  components: TemplateComponent[]
  previewImageUrl?: string
  isCustom?: boolean
}

export const useTemplateStore = defineStore('template', () => {
  // State
  const templates = ref<Template[]>([
    {
      id: 'modern',
      name: 'Modern',
      components: [],
      previewImageUrl: '',
      isCustom: false
    },
    {
      id: 'classic',
      name: 'Classic',
      components: [],
      previewImageUrl: '',
      isCustom: false
    },
    {
      id: 'minimal',
      name: 'Minimal',
      components: [],
      previewImageUrl: '',
      isCustom: false
    }
  ])
  
  const activeTemplate = ref<Template>({
    id: nanoid(),
    name: 'Untitled Template',
    components: [],
    isCustom: true
  })

  // Actions
  const addComponent = (component: Omit<TemplateComponent, 'id'>) => {
    const newComponent: TemplateComponent = {
      id: nanoid(),
      ...component
    }
    activeTemplate.value.components.push(newComponent)
    return newComponent.id
  }

  const updateComponent = (id: string, data: Partial<TemplateComponent>) => {
    const index = activeTemplate.value.components.findIndex(comp => comp.id === id)
    if (index !== -1) {
      activeTemplate.value.components[index] = { 
        ...activeTemplate.value.components[index], 
        ...data 
      }
    }
  }

  const removeComponent = (id: string) => {
    activeTemplate.value.components = activeTemplate.value.components.filter(comp => comp.id !== id)
  }

  const saveTemplate = () => {
    const existingIndex = templates.value.findIndex(t => t.id === activeTemplate.value.id)
    
    if (existingIndex !== -1) {
      templates.value[existingIndex] = { ...activeTemplate.value }
    } else {
      templates.value.push({ ...activeTemplate.value })
    }
  }

  const loadTemplate = (templateId: string) => {
    const template = templates.value.find(t => t.id === templateId)
    if (template) {
      activeTemplate.value = JSON.parse(JSON.stringify(template))
    }
  }

  const createNewTemplate = () => {
    activeTemplate.value = {
      id: nanoid(),
      name: 'Untitled Template',
      components: [],
      isCustom: true
    }
  }

  // Return store
  return {
    templates,
    activeTemplate,
    addComponent,
    updateComponent,
    removeComponent,
    saveTemplate,
    loadTemplate,
    createNewTemplate
  }
})