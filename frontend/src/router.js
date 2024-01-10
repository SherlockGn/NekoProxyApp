import { createRouter, createWebHashHistory } from "vue-router"

import Rule from "./components/Rule.vue"
import NewRule from "./components/NewRule.vue"
import ProxyLog from "./components/ProxyLog.vue"
import ProxyStat from "./components/ProxyStat.vue"
import SystemLog from "./components/SystemLog.vue"
import ApiLog from "./components/ApiLog.vue"

import Database from "./components/Database.vue"
import Model from "./components/Model.vue"
import Property from "./components/Property.vue"
import NewProperty from "./components/NewProperty.vue"
import ExploreData from "./components/ExploreData.vue"
import ExploreApi from "./components/ExploreApi.vue"
import RestLog from "./components/RestLog.vue"

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
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router