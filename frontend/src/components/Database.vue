<template>
    <div style="min-width: 50%">
        <div style="margin-bottom: 30px">
            <el-row>
                <el-text v-show="list.length === 0"
                    >Currently there're no defined databases.&nbsp;</el-text
                >
                <el-link type="success" :underline="false" @click="create"
                    >Create</el-link
                >
                <el-text>&nbsp;a new database. Or&nbsp;</el-text>
                <el-link type="primary" :underline="false" @click="refresh"
                    >refresh</el-link
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
                            type="primary"
                            :underline="false"
                            @click="config(element)"
                            >Configure</el-link
                        >
                        <el-text>&nbsp;or&nbsp;</el-text>
                        <el-link
                            type="danger"
                            :underline="false"
                            @click="del(element)"
                            >delete</el-link
                        >
                        <el-text>&nbsp;this database.</el-text>
                    </el-row>
                </template>
                <el-descriptions-item label="Size"
                    >{{ element.size }} bytes</el-descriptions-item
                >
                <el-descriptions-item label="Created at">{{
                    displayTimestamp(element.createdAt)
                }}</el-descriptions-item>
                <el-descriptions-item label="Updated at">{{
                    displayTimestamp(element.updatedAt)
                }}</el-descriptions-item>
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
        list.value = await rpc.db.get()
    }, 'refresh databases')
}

const create = async e => {
    let name = null
    try {
        name = await ElMessageBox.prompt(
            'Please input the database name',
            'Create database',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel'
            }
        )
    } catch {
        return
    }
    toastAction(async () => {
        await rpc.db.add(name.value)
        await refresh()
    }, 'create database')
}

const config = el => {
    router.push({ name: 'Model', query: { db: el.name } })
}

const del = async el => {
    try {
        await ElMessageBox.confirm(
            'This database will be permanently deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }
        )
        toastAction(async () => {
            await rpc.db.del(el.name)
            list.value = await rpc.db.get()
        }, 'delete the database')
    } catch (e) {}
}

const displayTimestamp = el => {
    return new Date(el).toLocaleString()
}
</script>
