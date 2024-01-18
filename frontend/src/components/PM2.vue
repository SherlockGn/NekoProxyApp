<template>
    <div style="min-width: 50%">
        <div style="margin-bottom: 30px">
            <el-row>
                <el-text v-show="list.length === 0"
                    >Currently there're no managed processes.&nbsp;</el-text
                >
                <el-link type="primary" :underline="false" @click="refresh"
                    >Refresh</el-link
                >
                <el-text>&nbsp;the list.</el-text>
            </el-row>
        </div>
        <div
            style="margin-bottom: 30px"
            v-for="element in list"
            :key="element.name">
            <el-descriptions
                :title="element.name"
                size="default"
                border
                style="margin-bottom: 10px">
                <template #extra>
                    <el-row>
                        <el-link
                            type="warning"
                            :underline="false"
                            @click="stop(element)"
                            >Stop</el-link
                        >
                        <el-text>,&nbsp;</el-text>
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="restart(element)"
                            >restart</el-link
                        >
                        <el-text>&nbsp;or&nbsp;</el-text>
                        <el-link
                            type="danger"
                            :underline="false"
                            @click="del(element)"
                            >delete</el-link
                        >
                        <el-text>&nbsp;this process. Check the&nbsp;</el-text>
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="log(element)"
                            >logs</el-link
                        >
                        <el-text>.</el-text>
                    </el-row>
                </template>
                <el-descriptions-item label="Status">{{
                    element.pm2_env.status
                }}</el-descriptions-item>
                <el-descriptions-item label="Created at">{{
                    displayTimestamp(element.pm2_env.created_at)
                }}</el-descriptions-item>
                <el-descriptions-item label="Updated at">{{
                    displayTimestamp(element.pm2_env.pm_uptime)
                }}</el-descriptions-item>
                <el-descriptions-item label="PM ID">{{
                    element.pm_id
                }}</el-descriptions-item>
                <el-descriptions-item label="CPU">{{
                    element.monit.cpu
                }}</el-descriptions-item>
                <el-descriptions-item label="Memory">{{
                    element.monit.memory
                }}</el-descriptions-item>
                <el-descriptions-item label="CWD" :span="3">{{
                    element.pm2_env.pm_cwd
                }}</el-descriptions-item>
                <el-descriptions-item label="Script" :span="3">{{
                    element.pm2_env.pm_exec_path
                }}</el-descriptions-item>
                <el-descriptions-item label="Args" :span="3">{{
                    element.pm2_env.args.join(' ')
                }}</el-descriptions-item>
                <el-descriptions-item label="Log path" :span="3">{{
                    element.pm2_env.pm_log_path
                }}</el-descriptions-item>
            </el-descriptions>
        </div>
        <el-drawer
            size="70%"
            v-model="showDrawer"
            title="Project logs"
            direction="rtl">
            <el-form>
                <el-form-item label="Last line">
                    <el-input-number v-model="line" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="getLog">Get logs</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input
                        style="font-family: Consolas, monospace"
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 30 }"
                        v-model="logContent" />
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const router = useRouter()

const list = ref([])
const showDrawer = ref(false)
const line = ref(100)
const logContent = ref('')

onMounted(async () => {
    refresh()
})

const refresh = async e => {
    await toastAction(async () => {
        list.value = await rpc.pm.get()
    }, 'refresh processes')
}

const stop = async el => {
    await toastAction(async () => {
        await rpc.pm.stop(el.pm_id)
        list.value = await rpc.pm.get()
    }, 'stop processes')
}

const restart = async el => {
    await toastAction(async () => {
        await rpc.pm.restart(el.pm_id)
        list.value = await rpc.pm.get()
    }, 'restart processes')
}

const del = async el => {
    try {
        await ElMessageBox.confirm(
            'This process will be deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }
        )
        toastAction(async () => {
            await rpc.pm.del(el.pm_id)
            list.value = await rpc.pm.get()
        }, 'delete the process')
    } catch (e) {}
}

let currentId = null
const log = async el => {
    showDrawer.value = true
    line.value = 100
    currentId = el.pm_id
    logContent.value = ''
}

const getLog = async () => {
    logContent.value = await rpc.pm.getLog(currentId, line.value)
}

const displayTimestamp = el => {
    return new Date(el).toLocaleString()
}
</script>
