<template>
<div>
  <el-page-header @back="back" style="margin-bottom: 20px">
    <template #content>
      <span class="text-large font-600 mr-3"> Configure model {{ model.name }} in the database {{ model.dbName }} </span>
    </template>
  </el-page-header>
  <div style="margin-bottom: 30px;">
    <el-row>
      <el-text v-show="list.length===0">Currently there're no defined properties.&nbsp;</el-text>
      <el-link type="success" :underline="false" @click="create">Create</el-link>
      <el-text>&nbsp;a new property. Or&nbsp;</el-text>
      <el-link type="primary" :underline="false" @click="refresh">refresh</el-link>
      <el-text>&nbsp;the list.</el-text>
    </el-row>
  </div>
  <div style="margin-bottom: 30px;" v-for="element in list" :key="element.name">
    <el-descriptions :title="element.name" size="default" border style="margin-bottom: 10px;">
      <template #extra>
        <el-row>
          <el-link type="primary" :underline="false" @click="update(element)">Update</el-link>
          <el-text>&nbsp;or&nbsp;</el-text>
          <el-link type="danger" :underline="false" @click="del(element)">delete</el-link>
          <el-text>&nbsp;this property.</el-text>
        </el-row>
      </template>
      <el-descriptions-item label="Created at">{{ displayTimestamp(element.createdAt) }}</el-descriptions-item>
      <el-descriptions-item label="Updated at">{{ displayTimestamp(element.updatedAt) }}</el-descriptions-item>
      <el-descriptions-item label="Type">{{ element.type }}</el-descriptions-item>
      <el-descriptions-item label="Unique">
        <el-tag size="small" :type="element.unique?'success':'danger'">{{ element.unique }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Allow null">
        <el-tag size="small" :type="element.allowNull?'success':'danger'">{{ element.allowNull }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Default value">
        <el-tag v-if="element.defaultValue===null" size="small" type="info">not specified</el-tag>
        <el-text v-if="element.defaultValue!==null">{{ JSON.parse(element.defaultValue).toString() }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="Validate">
        <el-tag v-if="element.validate===null" size="small" type="info">not specified</el-tag>
        <json-viewer v-if="element.validate!==null" :value="JSON.parse(element.validate)"></json-viewer>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</div>
  
  
</template>

<script setup>

import JsonViewer from 'vue-json-viewer'

import { useRouter, useRoute } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const router = useRouter()
const route = useRoute()

const model = ref({ dbName: '', name: '' })

const list = ref([])

onMounted(async () => {
  model.value = await rpc.model.getById(route.query.modelId)
  refresh()
})

const back = () => {
  router.push({ name: 'Model', query: { db: model.value.dbName } })
}

const refresh = async e => {
  await toastAction(async () => {
    list.value = await rpc.property.get(route.query.modelId)
  }, 'refresh properties')
}

const create = async e => {
  router.push({ name: 'NewProperty', query: { modelId: model.value.id } })
}

const update = el => {
  router.push({ name: 'NewProperty', query: { propertyId: el.id }})
}

const del = async el => {
  try {
    await ElMessageBox.confirm(
      'This property will be permanently deleted. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    toastAction(async () => {
      await rpc.property.del(el.id)
      list.value = await rpc.property.get(route.query.modelId)
    }, 'delete the property')
  }
  catch (e) {
  }
}

const displayTimestamp = el => {
  return new Date(el).toLocaleString()
}

</script>