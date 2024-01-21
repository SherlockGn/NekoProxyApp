<template>
    <el-menu style="height: calc(100vh - 150px)">
        <el-sub-menu index="User">
            <template #title>
                <el-icon><i-ep-user /></el-icon>
                <span>User</span>
            </template>
            <el-menu-item @click="goto('Login')" index="Login">
                <el-icon><i-ep-credit-card /></el-icon>
                <span>Login</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="Proxy">
            <template #title>
                <el-icon><i-ep-location /></el-icon>
                <span>Proxy</span>
            </template>
            <el-menu-item @click="goto('Rule')" index="Rule">
                <el-icon><i-ep-tickets /></el-icon>
                <span>Proxy rules</span>
            </el-menu-item>
            <el-menu-item @click="goto('ProxyLog')" index="ProxyLog">
                <el-icon><i-ep-picture /></el-icon>
                <span>Proxy logs</span>
            </el-menu-item>
            <el-menu-item @click="goto('ProxyStat')" index="ProxyStat">
                <el-icon><i-ep-data-line /></el-icon>
                <span>Proxy record statistics</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="Logs">
            <template #title>
                <el-icon><i-ep-notebook /></el-icon>
                <span>Logs</span>
            </template>
            <el-menu-item @click="goto('SystemLog')" index="SystemLog">
                <el-icon><i-ep-cpu /></el-icon>
                <span>System logs</span>
            </el-menu-item>
            <el-menu-item @click="goto('ApiLog')" index="ApiLog">
                <el-icon><i-ep-chat-line-round /></el-icon>
                <span>API logs</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="Data center">
            <template #title>
                <el-icon><i-ep-files /></el-icon>
                <span>Data center</span>
            </template>
            <el-menu-item @click="goto('Database')" index="Database">
                <el-icon><i-ep-setting /></el-icon>
                <span>Configure</span>
            </el-menu-item>
            <el-menu-item @click="goto('RestLog')" index="RestLog">
                <el-icon><i-ep-memo /></el-icon>
                <span>RESTful API logs</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="CICD">
            <template #title>
                <el-icon><i-ep-connection /></el-icon>
                <span>CI/CD</span>
            </template>
            <el-menu-item @click="goto('Project')" index="Project">
                <el-icon><i-ep-reading /></el-icon>
                <span>Project</span>
            </el-menu-item>
            <el-menu-item @click="goto('PM2')" index="PM2">
                <el-icon><i-ep-shopping-bag /></el-icon>
                <span>PM2</span>
            </el-menu-item>
            <el-menu-item @click="goto('ProjectLog')" index="ProjectLog">
                <el-icon><i-ep-coin /></el-icon>
                <span>Project Log</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="CRON jobs">
            <template #title>
                <el-icon><i-ep-timer /></el-icon>
                <span>Scheduled jobs</span>
            </template>
            <el-menu-item @click="goto('Job')" index="Job">
                <el-icon><i-ep-sunny /></el-icon>
                <span>Job settings</span>
            </el-menu-item>
            <el-menu-item @click="goto('JobLog')" index="JobLog">
                <el-icon><i-ep-wallet /></el-icon>
                <span>Job logs</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goto = name => {
    router.push({ name })
}
</script>
