<template>
    <div style="min-width: 90%">
        <el-page-header @back="back" style="margin-bottom: 20px">
            <template #content>
                <span class="text-large font-600 mr-3">
                    Explore data of {{ model.name }} in the database
                    {{ model.dbName }}
                </span>
            </template>
        </el-page-header>
        <div style="margin-bottom: 10px">
            <el-row>
                <el-link type="primary" :underline="false" @click="refresh"
                    >Refresh</el-link
                >
                <el-text>&nbsp;the list.&nbsp;</el-text>
                <el-link type="success" :underline="false" @click="create"
                    >Create</el-link
                >
                <el-text>&nbsp;a new model instance.&nbsp;</el-text>
                <el-link
                    v-show="selected != null"
                    type="primary"
                    :underline="false"
                    @click="update"
                    >Update</el-link
                >
                <el-text v-show="selected != null">&nbsp;or&nbsp;</el-text>
                <el-link
                    v-show="selected != null"
                    type="danger"
                    :underline="false"
                    @click="del"
                    >delete</el-link
                >
                <el-text v-show="selected != null"
                    >&nbsp;the selected item.</el-text
                >
            </el-row>
        </div>
        <div style="margin-bottom: 30px">
            <el-table
                stripe
                :data="list"
                :border="true"
                empty-text="No data"
                highlight-current-row
                @current-change="e => (selected = e)">
                <el-table-column
                    v-for="pro in properties"
                    :key="pro.id"
                    :label="pro.name"
                    :prop="pro.name"
                    :show-overflow-tooltip="true"
                    :resizable="true">
                    <template #default="scope">
                        <template v-if="scope.row[pro.name] === null">
                            <el-tag size="small" type="info">null</el-tag>
                        </template>
                        <template
                            v-else-if="
                                pro.type === 'DATE' || pro.type === 'DATEONLY'
                            ">
                            <el-tag size="small" type="warning">{{
                                scope.row[pro.name]
                            }}</el-tag>
                        </template>
                        <template v-else>
                            <el-text>{{ scope.row[pro.name] }}</el-text>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog
            v-model="dialogVisible"
            title="Create model instance"
            width="30%"
            destroy-on-close>
            <func-editor
                v-model="editorData"
                :showHeader="false"
                :params="[]"
                :height="1000"></func-editor>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="createOrUpdate">
                        {{ isCreate ? 'Create' : 'Update' }}
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import JsonViewer from 'vue-json-viewer'

import { useRouter, useRoute } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { loadExampleObject } from '../utils/example'

import JSON5 from 'json5'

const router = useRouter()
const route = useRoute()

const model = ref({ dbName: '', name: '' })
const properties = ref([])

const list = ref([])
const selected = ref(null)

const dialogVisible = ref(false)
const editorData = ref('123')

const isCreate = ref(false)

onMounted(async () => {
    model.value = await rpc.model.getById(route.query.modelId)
    properties.value = await rpc.property.get(route.query.modelId)
    properties.value.splice(0, 0, { id: -1, name: 'id', type: 'INTEGER' })
    properties.value.push({ id: 100000, name: 'createdAt', type: 'DATE' })
    properties.value.push({ id: 100001, name: 'updatedAt', type: 'DATE' })
    refresh()
})

const refresh = async e => {
    await toastAction(async () => {
        list.value = await rpc.expdata.get(model.value.id)
    }, 'refresh data')
}

const create = async e => {
    dialogVisible.value = true
    isCreate.value = true
    editorData.value = JSON.stringify(
        loadExampleObject(true, properties.value),
        undefined,
        2
    )
}

const update = async e => {
    dialogVisible.value = true
    isCreate.value = false
    editorData.value = JSON.stringify(
        loadExampleObject(false, properties.value, selected.value),
        undefined,
        2
    )
}

const createOrUpdate = async () => {
    dialogVisible.value = false
    if (isCreate.value) {
        await toastAction(async () => {
            await rpc.expdata.add(model.value.id, JSON5.parse(editorData.value))
        }, 'create data')
        list.value = await rpc.expdata.get(model.value.id)
    } else {
        await toastAction(async () => {
            await rpc.expdata.update(
                model.value.id,
                JSON5.parse(editorData.value)
            )
        }, 'update data')
        list.value = await rpc.expdata.get(model.value.id)
    }
}

const del = async e => {
    try {
        await ElMessageBox.confirm(
            'This item will be permanently deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }
        )
        toastAction(async () => {
            await rpc.expdata.del(model.value.id, selected.value.id)
            list.value = await rpc.expdata.get(model.value.id)
        }, 'delete data')
    } catch (e) {}
}

const back = () => {
    router.back()
}
</script>
