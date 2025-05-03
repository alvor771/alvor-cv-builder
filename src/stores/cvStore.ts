import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'
import { useTemplateStore } from './templateStore'

export interface CvData {
  personal: {
    fullName: string
    jobTitle: string
    email: string
    phone: string
    location: string
    website: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  skills: Array<{
    id: string
    name: string
    level: number
  }>
}

export const useCvStore = defineStore('cv', () => {
  const templateStore = useTemplateStore()
  
  // State
  const selectedTemplate = ref('modern')
  const cvData = ref<CvData>({
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  })

  // Computed
  const availableTemplates = computed(() => {
    return templateStore.templates.filter(t => !t.isCustom || t.components.length > 0)
  })

  // Actions
  const updatePersonalInfo = (data: Partial<CvData['personal']>) => {
    cvData.value.personal = { ...cvData.value.personal, ...data }
  }

  const addExperience = () => {
    cvData.value.experience.push({
      id: nanoid(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    })
  }

  const updateExperience = (id: string, data: Partial<CvData['experience'][0]>) => {
    const index = cvData.value.experience.findIndex(exp => exp.id === id)
    if (index !== -1) {
      cvData.value.experience[index] = { ...cvData.value.experience[index], ...data }
    }
  }

  const removeExperience = (id: string) => {
    cvData.value.experience = cvData.value.experience.filter(exp => exp.id !== id)
  }

  const addEducation = () => {
    cvData.value.education.push({
      id: nanoid(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    })
  }

  const updateEducation = (id: string, data: Partial<CvData['education'][0]>) => {
    const index = cvData.value.education.findIndex(edu => edu.id === id)
    if (index !== -1) {
      cvData.value.education[index] = { ...cvData.value.education[index], ...data }
    }
  }

  const removeEducation = (id: string) => {
    cvData.value.education = cvData.value.education.filter(edu => edu.id !== id)
  }

  const addSkill = () => {
    cvData.value.skills.push({
      id: nanoid(),
      name: '',
      level: 3
    })
  }

  const updateSkill = (id: string, data: Partial<CvData['skills'][0]>) => {
    const index = cvData.value.skills.findIndex(skill => skill.id === id)
    if (index !== -1) {
      cvData.value.skills[index] = { ...cvData.value.skills[index], ...data }
    }
  }

  const removeSkill = (id: string) => {
    cvData.value.skills = cvData.value.skills.filter(skill => skill.id !== id)
  }

  const setTemplate = (templateId: string) => {
    selectedTemplate.value = templateId
  }

  // Return store
  return {
    cvData,
    selectedTemplate,
    availableTemplates,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill,
    setTemplate
  }
})