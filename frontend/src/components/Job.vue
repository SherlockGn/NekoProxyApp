<template>
    <div style="min-width: 50%">
        <div style="margin-bottom: 30px">
            <el-row>
                <el-text v-show="list.length === 0">
                    Currently there're no defined scheduled jobs.&nbsp;
                </el-text>
                <el-link type="success" :underline="false" @click="create">
                    Create
                </el-link>
                <el-text>&nbsp;a new job. Or&nbsp;</el-text>
                <el-link type="primary" :underline="false" @click="refresh">
                    refresh
                </el-link>
                <el-text>&nbsp;the list.</el-text>
            </el-row>
        </div>
        <div
            style="margin-bottom: 30px"
            v-for="element in list"
            :key="element.name">
            <el-descriptions size="default" border style="margin-bottom: 10px">
                <template #title>
                    {{ element.name }}&nbsp;
                    <el-text type="info">{{ element.description }}</el-text>
                </template>
                <template #extra>
                    <el-row>
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="start(element)">
                            Start
                        </el-link>
                        <el-text>,&nbsp;</el-text>
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="update(element)">
                            update
                        </el-link>
                        <el-text>&nbsp;or&nbsp;</el-text>
                        <el-link
                            type="danger"
                            :underline="false"
                            @click="del(element)">
                            delete
                        </el-link>
                        <el-text>&nbsp;this job.</el-text>
                    </el-row>
                </template>
                <el-descriptions-item label="Created at">
                    {{ displayTimestamp(element.createdAt) }}
                </el-descriptions-item>
                <el-descriptions-item label="Updated at">
                    {{ displayTimestamp(element.updatedAt) }}
                </el-descriptions-item>
                <el-descriptions-item label="Enabled">
                    <el-tag
                        size="small"
                        :type="element.enabled ? 'success' : 'danger'">
                        {{ element.enabled }}
                    </el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Cron">
                    {{ element.cron }}
                </el-descriptions-item>
                <el-descriptions-item label="Status">
                    {{ element.status }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const router = useRouter()

const list = ref([])

onMounted(async () => {
    refresh()
})

const refresh = async e => {
    await toastAction(async () => {
        list.value = await rpc.job.get()
    }, 'refresh job')
}

const create = async e => {
    router.push({ name: 'NewJob' })
}

const update = async el => {
    router.push({ name: 'NewJob', query: { id: el.id } })
}

const start = async el => {
    await toastAction(async () => {
        await rpc.job.start(el)
    }, 'start job')
}

const del = async el => {
    try {
        await ElMessageBox.confirm(
            'This job will be permanently deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }
        )
        toastAction(async () => {
            await rpc.job.del(el.id)
            list.value = await rpc.job.get()
        }, 'delete the job')
    } catch (e) {}
}

const displayTimestamp = el => {
    return new Date(el).toLocaleString()
}
</script>
