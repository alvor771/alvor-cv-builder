<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCvStore } from '../../stores/cvStore'

const props = defineProps<{
  section: string
}>()

const cvStore = useCvStore()
const { cvData } = cvStore

// Computed property to get the correct data based on section
const currentSection = computed(() => {
  return props.section
})
</script>

<template>
  <!-- Personal Information Form -->
  <div v-if="currentSection === 'personal'" class="animate-fade-in">
    <form class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="fullName" class="label">{{ $t("form.full_name") }}</label>
          <input 
            id="fullName" 
            type="text" 
            v-model="cvData.personal.fullName" 
            class="input w-full"
            :placeholder="$t('form.placeholder_name')"
          />
        </div>
        
        <div>
          <label for="jobTitle" class="label">{{ $t("form.job_title") }}</label>
          <input 
            id="jobTitle" 
            type="text" 
            v-model="cvData.personal.jobTitle" 
            class="input w-full"
            placeholder="Frontend Developer"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="email" class="label">Email</label>
          <input 
            id="email" 
            type="email" 
            v-model="cvData.personal.email" 
            class="input w-full"
            placeholder="john.doe@example.com"
          />
        </div>
        
        <div>
          <label for="phone" class="label">Phone</label>
          <input 
            id="phone" 
            type="tel" 
            v-model="cvData.personal.phone" 
            class="input w-full"
            placeholder="+1 234 567 890"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="location" class="label">Location</label>
          <input 
            id="location" 
            type="text" 
            v-model="cvData.personal.location" 
            class="input w-full"
            placeholder="New York, USA"
          />
        </div>
        
        <div>
          <label for="website" class="label">Website/LinkedIn</label>
          <input 
            id="website" 
            type="url" 
            v-model="cvData.personal.website" 
            class="input w-full"
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
      </div>
      
      <div>
        <label for="summary" class="label">Professional Summary</label>
        <textarea 
          id="summary" 
          v-model="cvData.personal.summary" 
          class="input w-full h-32"
          placeholder="Write a brief summary about your professional background and career objectives..."
        ></textarea>
      </div>
    </form>
  </div>
  
  <!-- Experience Form -->
  <div v-else-if="currentSection === 'experience'" class="animate-fade-in">
    <div class="mb-4 flex justify-between items-center">
      <h3 class="text-lg font-medium text-text-light">Work Experience</h3>
      <button 
        @click="cvStore.addExperience" 
        class="btn btn-primary"
      >
        Add Experience
      </button>
    </div>
    
    <div v-if="cvData.experience.length === 0" class="text-center py-8">
      <p class="text-text-muted mb-4">No work experience added yet</p>
      <button 
        @click="cvStore.addExperience" 
        class="btn btn-outline"
      >
        Add Your First Experience
      </button>
    </div>
    
    <div 
      v-for="(exp, index) in cvData.experience" 
      :key="exp.id"
      class="mb-8 p-4 border border-primary-dark rounded-lg"
    >
      <div class="flex justify-between items-center mb-4">
        <h4 class="font-medium text-text-light">Experience #{{ index + 1 }}</h4>
        <button 
          @click="() => cvStore.removeExperience(exp.id)" 
          class="text-text-muted hover:text-accent-orange transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="label">Company</label>
          <input 
            type="text" 
            v-model="exp.company" 
            class="input w-full"
            placeholder="Company Name"
          />
        </div>
        
        <div>
          <label class="label">Position</label>
          <input 
            type="text" 
            v-model="exp.position" 
            class="input w-full"
            placeholder="Position Title"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Start Date</label>
            <input 
              type="date" 
              v-model="exp.startDate" 
              class="input w-full"
            />
          </div>
          
          <div v-if="!exp.current">
            <label class="label">End Date</label>
            <input 
              type="date" 
              v-model="exp.endDate" 
              class="input w-full"
            />
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            type="checkbox" 
            :id="`current-${exp.id}`" 
            v-model="exp.current" 
            class="mr-2"
          />
          <label :for="`current-${exp.id}`" class="text-text-muted">Current Position</label>
        </div>
        
        <div>
          <label class="label">Description</label>
          <textarea 
            v-model="exp.description" 
            class="input w-full h-32"
            placeholder="Describe your responsibilities and achievements..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Education Form -->
  <div v-else-if="currentSection === 'education'" class="animate-fade-in">
    <div class="mb-4 flex justify-between items-center">
      <h3 class="text-lg font-medium text-text-light">Education</h3>
      <button 
        @click="cvStore.addEducation" 
        class="btn btn-primary"
      >
        Add Education
      </button>
    </div>
    
    <div v-if="cvData.education.length === 0" class="text-center py-8">
      <p class="text-text-muted mb-4">No education added yet</p>
      <button 
        @click="cvStore.addEducation" 
        class="btn btn-outline"
      >
        Add Your First Education
      </button>
    </div>
    
    <div 
      v-for="(edu, index) in cvData.education" 
      :key="edu.id"
      class="mb-8 p-4 border border-primary-dark rounded-lg"
    >
      <div class="flex justify-between items-center mb-4">
        <h4 class="font-medium text-text-light">Education #{{ index + 1 }}</h4>
        <button 
          @click="() => cvStore.removeEducation(edu.id)" 
          class="text-text-muted hover:text-accent-orange transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="grid grid-cols-1 gap-4">
        <div>
          <label class="label">Institution</label>
          <input 
            type="text" 
            v-model="edu.institution" 
            class="input w-full"
            placeholder="University or School Name"
          />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Degree</label>
            <input 
              type="text" 
              v-model="edu.degree" 
              class="input w-full"
              placeholder="Bachelor's, Master's, etc."
            />
          </div>
          
          <div>
            <label class="label">Field of Study</label>
            <input 
              type="text" 
              v-model="edu.field" 
              class="input w-full"
              placeholder="Computer Science, Business, etc."
            />
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="label">Start Date</label>
            <input 
              type="date" 
              v-model="edu.startDate" 
              class="input w-full"
            />
          </div>
          
          <div v-if="!edu.current">
            <label class="label">End Date</label>
            <input 
              type="date" 
              v-model="edu.endDate" 
              class="input w-full"
            />
          </div>
        </div>
        
        <div class="flex items-center">
          <input 
            type="checkbox" 
            :id="`current-edu-${edu.id}`" 
            v-model="edu.current" 
            class="mr-2"
          />
          <label :for="`current-edu-${edu.id}`" class="text-text-muted">Currently Studying</label>
        </div>
        
        <div>
          <label class="label">Description</label>
          <textarea 
            v-model="edu.description" 
            class="input w-full h-24"
            placeholder="Describe your studies, achievements, or thesis..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Skills Form -->
  <div v-else-if="currentSection === 'skills'" class="animate-fade-in">
    <div class="mb-4 flex justify-between items-center">
      <h3 class="text-lg font-medium text-text-light">Skills</h3>
      <button 
        @click="cvStore.addSkill" 
        class="btn btn-primary"
      >
        Add Skill
      </button>
    </div>
    
    <div v-if="cvData.skills.length === 0" class="text-center py-8">
      <p class="text-text-muted mb-4">No skills added yet</p>
      <button 
        @click="cvStore.addSkill" 
        class="btn btn-outline"
      >
        Add Your First Skill
      </button>
    </div>
    
    <div class="space-y-4">
      <div 
        v-for="skill in cvData.skills" 
        :key="skill.id"
        class="flex items-center space-x-4 p-3 border border-primary-dark rounded-lg"
      >
        <div class="flex-grow">
          <input 
            type="text" 
            v-model="skill.name" 
            class="input w-full"
            placeholder="Skill name (e.g., JavaScript, Project Management)"
          />
        </div>
        
        <div class="flex items-center space-x-2">
          <label class="text-text-muted whitespace-nowrap text-sm">Level:</label>
          <select 
            v-model="skill.level" 
            class="input"
          >
            <option value="1">Beginner</option>
            <option value="2">Intermediate</option>
            <option value="3">Advanced</option>
            <option value="4">Expert</option>
            <option value="5">Master</option>
          </select>
        </div>
        
        <button 
          @click="() => cvStore.removeSkill(skill.id)" 
          class="text-text-muted hover:text-accent-orange transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>