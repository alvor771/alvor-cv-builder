import { RouteRecordRaw } from 'vue-router'

// Import views
import Home from '../views/Home.vue'
import CvGenerator from '../views/CvGenerator.vue'
import TemplateBuilder from '../views/TemplateBuilder.vue'
import NotFound from '../views/NotFound.vue'

// Define routes
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cv-generator',
    name: 'CvGenerator',
    component: CvGenerator
  },
  {
    path: '/template-builder',
    name: 'TemplateBuilder',
    component: TemplateBuilder
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]