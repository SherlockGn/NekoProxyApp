import { createRouter, createWebHashHistory } from 'vue-router'

import Rule from './components/Rule.vue'
import NewRule from './components/NewRule.vue'
import ProxyLog from './components/ProxyLog.vue'
import ProxyStat from './components/ProxyStat.vue'
import SystemLog from './components/SystemLog.vue'
import ApiLog from './components/ApiLog.vue'

import Database from './components/Database.vue'
import Model from './components/Model.vue'
import Property from './components/Property.vue'
import NewProperty from './components/NewProperty.vue'
import ExploreData from './components/ExploreData.vue'
import ExploreApi from './components/ExploreApi.vue'
import RestLog from './components/RestLog.vue'

import Project from './components/Project.vue'
import NewProject from './components/NewProject.vue'
import ProjectLog from './components/ProjectLog.vue'
import PM2 from './components/PM2.vue'

const routes = [
    {
        path: '/',
        redirect: '/rule'
    },
    {
        path: '/rule',
        name: 'Rule',
        component: Rule
    },
    {
        path: '/newrule',
        name: 'NewRule',
        component: NewRule
    },
    {
        path: '/proxylog',
        name: 'ProxyLog',
        component: ProxyLog
    },
    {
        path: '/proxystat',
        name: 'ProxyStat',
        component: ProxyStat
    },
    {
        path: '/systemlog',
        name: 'SystemLog',
        component: SystemLog
    },
    {
        path: '/apilog',
        name: 'ApiLog',
        component: ApiLog
    },
    {
        path: '/database',
        name: 'Database',
        component: Database
    },
    {
        path: '/model',
        name: 'Model',
        component: Model
    },
    {
        path: '/property',
        name: 'Property',
        component: Property
    },
    {
        path: '/newproperty',
        name: 'NewProperty',
        component: NewProperty
    },
    {
        path: '/exploredata',
        name: 'ExploreData',
        component: ExploreData
    },
    {
        path: '/exploreapi',
        name: 'ExploreApi',
        component: ExploreApi
    },
    {
        path: '/restlog',
        name: 'RestLog',
        component: RestLog
    },
    {
        path: '/project',
        name: 'Project',
        component: Project
    },
    {
        path: '/newproject',
        name: 'NewProject',
        component: NewProject
    },
    {
        path: '/projectlog',
        name: 'ProjectLog',
        component: ProjectLog
    },
    {
        path: '/pm2',
        name: 'PM2',
        component: PM2
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
