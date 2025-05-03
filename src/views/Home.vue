<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<template>
  <div class="min-h-[80vh] w-full">
    <div class="container mx-auto px-6 py-16">
      <!-- Hero Section -->
      <section class="flex flex-col md:flex-row items-center justify-between">
        <div class="w-full md:w-1/2 mb-10 md:mb-0">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-text-light mb-6 leading-tight">
            Create Your Perfect 
            <span class="text-accent-orange">Resume</span>
          </h1>
          <p class="text-lg text-text-muted mb-8 max-w-lg">
            Design professional CVs with our easy-to-use generator or create your own custom templates with our Template Builder.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="navigateTo('/cv-generator')" 
              class="btn btn-primary text-lg px-8 py-3"
            >
              Create Resume
            </button>
            <button 
              @click="navigateTo('/template-builder')" 
              class="btn btn-outline text-lg px-8 py-3"
            >
              Design Template
            </button>
          </div>
        </div>
        
        <div class="w-full md:w-1/2 flex justify-center md:justify-end">
          <div class="relative">
            <div class="w-64 h-80 md:w-80 md:h-96 bg-primary-light rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div class="p-6">
                <div class="h-8 w-32 bg-accent-orange rounded-md mb-4"></div>
                <div class="h-4 w-48 bg-gray-700 rounded mb-3"></div>
                <div class="h-4 w-40 bg-gray-700 rounded mb-8"></div>
                
                <div class="h-6 w-32 bg-accent-blue rounded mb-3"></div>
                <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
                <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
                <div class="h-3 w-3/4 bg-gray-700 rounded mb-6"></div>
                
                <div class="h-6 w-32 bg-accent-blue rounded mb-3"></div>
                <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
                <div class="h-3 w-full bg-gray-700 rounded mb-2"></div>
                <div class="h-3 w-2/3 bg-gray-700 rounded"></div>
              </div>
            </div>
            <div class="absolute -bottom-4 -right-4 w-64 h-80 md:w-80 md:h-96 bg-accent-orange opacity-10 rounded-lg transform rotate-6"></div>
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="py-20">
        <h2 class="text-3xl font-bold text-text-light text-center mb-16">Key Features</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Feature 1 -->
          <div class="card hover:shadow-lg transition-shadow animate-fade-in">
            <div class="rounded-full bg-accent-orange bg-opacity-20 p-4 w-16 h-16 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-text-light mb-3">CV Generator</h3>
            <p class="text-text-muted mb-4">
              Create professional resumes with our user-friendly interface. Input your information and watch your CV come to life in real-time.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="card hover:shadow-lg transition-shadow animate-fade-in [animation-delay:150ms]">
            <div class="rounded-full bg-accent-blue bg-opacity-20 p-4 w-16 h-16 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-blue" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-text-light mb-3">Template Builder</h3>
            <p class="text-text-muted mb-4">
              Design your own custom templates with our drag-and-drop interface. Create unique layouts tailored to your specific needs.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="card hover:shadow-lg transition-shadow animate-fade-in [animation-delay:300ms]">
            <div class="rounded-full bg-accent-orange bg-opacity-20 p-4 w-16 h-16 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-accent-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-text-light mb-3">Export Options</h3>
            <p class="text-text-muted mb-4">
              Export your resume in multiple formats including PDF, HTML, and SVG. Share your CV with potential employers easily.
            </p>
          </div>
        </div>
      </section>
      
      <!-- CTA Section -->
      <section class="py-16">
        <div class="bg-primary-light rounded-xl p-10 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-accent-orange to-accent-blue opacity-10"></div>
          <h2 class="text-3xl font-bold text-text-light mb-6 relative z-10">Ready to create your professional resume?</h2>
          <p class="text-text-muted mb-8 max-w-xl mx-auto relative z-10">
            Start building your CV today and take the next step in your career journey.
          </p>
          <button 
            @click="navigateTo('/cv-generator')" 
            class="btn btn-primary text-lg px-8 py-3 relative z-10"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  </div>
</template>