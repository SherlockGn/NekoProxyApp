<template>
    <div style="width:80%;">
        <el-form :model="project" label-width="180px">
            <el-form-item label="Name">
                <el-input v-model="project.name" :disabled="!isCreate" />
            </el-form-item>
            <el-form-item label="Description">
                <el-input v-model="project.description" />
            </el-form-item>
            <el-form-item label="Repository">
                <el-input v-model="project.repo" :disabled="!isCreate" />
            </el-form-item>
            <el-form-item label="Type">
                <el-select v-model="project.type" placeholder="Select" size="default" :disabled="!isCreate">
                    <el-option
                        v-for="item in ['Static', 'NodeServer']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Script" v-show="project.type==='NodeServer'">
                <el-input v-model="project.script" />
            </el-form-item>
            <el-form-item label="Port" v-show="project.type==='Static'">
                <el-input-number v-model="project.port" />
            </el-form-item>
            <el-form-item label="Args" v-show="project.type==='NodeServer'">
                <el-input v-model="project.args" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="isLoading" @click="createOrUpdate">{{ isCreate ? 'Create': 'Update' }}</el-button>
                <el-button @click="cancel">Cancel</el-button>
            </el-form-item>
            <el-form-item>
                <el-icon class="is-loading" v-show="isLoading"><i-ep-loading/></el-icon>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

import JSON5 from 'json5'

const route = useRoute()
const router = useRouter()

const id = ref(route.query.id)

const isCreate = ref(id.value === undefined)
const isLoading = ref(false)

onMounted(async () => {
    if (!isCreate.value) {
        const pro = await rpc.project.getById(id.value)
        project.value = {
            ...pro
        }
    }
})

const project = ref({
    name: '',
    description: '',
    repo: '',
    type: 'Static',
    script: '',
    port: 8080,
    args: ''
})

const createOrUpdate = async () => {
    isLoading.value = true
    const projToCreate = {
        ...project.value,
        script: project.value.type === 'Static' ? null : project.value.script,
        args: project.value.type === 'Static' ? null : project.value.args,
        port: project.value.type === 'NodeServer' ? null : project.value.port
    }
    if (!isCreate.value) {
        await toastAction(async () => {
            await rpc.project.update(id.value, projToCreate)
        }, 'update property')
    } else {
        await toastAction(async () => {
            await rpc.project.create(projToCreate)
        }, 'create property')
    }
    isLoading.value = false
    router.back()
}

const cancel = () => {
    router.back()
}

</script>

<style scoped>

</style>