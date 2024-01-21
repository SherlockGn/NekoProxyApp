<template>
    <div style="width: 80%">
        <el-form :model="job" label-width="180px">
            <el-form-item label="Name">
                <el-input v-model="job.name" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="job.description" />
            </el-form-item>
            <el-form-item label="Enabled">
                <el-checkbox v-model="job.enabled" />
            </el-form-item>
            <el-form-item label="Cron">
                <el-input v-model="job.cron" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <el-text>
                        Script
                        <el-icon @click="showNotification(info.job.script)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="job.script"
                    funcName="run"
                    :paramList="['utils']"
                    placeholder="" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createOrUpdate">
                    {{ id === undefined ? 'Create' : 'Update' }}
                </el-button>
                <el-button @click="cancel">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { info } from '../utils/info'

import JSON5 from 'json5'

const route = useRoute()
const router = useRouter()

const id = ref(route.query.id)

const isCreate = ref(id.value === undefined)
const isLoading = ref(false)

onMounted(async () => {
    if (!isCreate.value) {
        const j = await rpc.job.getById(id.value)
        job.value = {
            ...j
        }
    }
})

const job = ref({
    name: 'New Job',
    description: '',
    enabled: true,
    cron: '* 0 * * * *',
    script: '    console.log(\'Hello world!\')'
})

const createOrUpdate = async () => {
    const jobToCreate = {
        ...job.value
    }
    if (!isCreate.value) {
        await toastAction(async () => {
            await rpc.job.update(id.value, jobToCreate)
        }, 'update job')
    } else {
        await toastAction(async () => {
            await rpc.job.add(jobToCreate)
        }, 'create job')
    }
    router.back()
}

const showNotification = message => {
    ElNotification({
        title: 'Hint',
        message,
        type: 'info',
        dangerouslyUseHTMLString: true,
        duration: 0
    })
}

const cancel = () => {
    router.back()
}
</script>

<style scoped>
.el-notification {
    --el-notification-width: 1000px !important;
}

.el-icon {
    margin-left: 5px;
}
</style>
