<template>
<div style="min-width: 50%">
  <div style="margin-bottom: 30px;">
    <el-row>
      <el-text v-show="list.length===0">Currently there're no defined projects.&nbsp;</el-text>
      <el-link type="success" :underline="false" @click="create">Create</el-link>
      <el-text>&nbsp;a new project. Or&nbsp;</el-text>
      <el-link type="primary" :underline="false" @click="refresh">refresh</el-link>
      <el-text>&nbsp;the list.</el-text>
    </el-row>
  </div>
  <div style="margin-bottom: 30px;" v-for="element in list" :key="element.name">
    <el-descriptions :title="element.name" size="default" border style="margin-bottom: 10px;">
      <template #extra>
        <el-row>
          <el-link type="primary" :underline="false" @click="start(element)">Start</el-link>
          <el-text>,&nbsp;</el-text>
          <el-link type="primary" :underline="false" @click="update(element)">update</el-link>
          <el-text>,&nbsp;</el-text>
          <el-link type="primary" :underline="false" @click="sync(element)">sync</el-link>
          <el-text>&nbsp;or&nbsp;</el-text>
          <el-link type="danger" :underline="false" @click="del(element)">delete</el-link>
          <el-text>&nbsp;this project.</el-text>
        </el-row>
      </template>
      <el-descriptions-item label="Status">{{ element.status }}</el-descriptions-item>
      <el-descriptions-item label="Created at">{{ displayTimestamp(element.createdAt) }}</el-descriptions-item>
      <el-descriptions-item label="Updated at">{{ displayTimestamp(element.updatedAt) }}</el-descriptions-item>
      <el-descriptions-item label="Repo" :span="3">{{ element.repo }}</el-descriptions-item>
      <el-descriptions-item label="Type">{{ element.type }}</el-descriptions-item>
      <el-descriptions-item label="Branch">{{ element.branch }}</el-descriptions-item>
      <el-descriptions-item v-if="element.script!==null" label="Script">{{ element.script }}</el-descriptions-item>
      <el-descriptions-item v-if="element.port!==null" label="Port">{{ element.port }}</el-descriptions-item>
      <el-descriptions-item v-if="element.args!==null" label="Args" :span="3">{{ element.args }}</el-descriptions-item>
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

const start = async el => {
  await toastAction(async () => {
    await rpc.project.start(el.id)
    list.value = await rpc.project.get()
  }, 'start project')
}

const refresh = async e => {
  await toastAction(async () => {
    list.value = await rpc.project.get()
  }, 'refresh project')
}

const create = async e => {
  router.push({ name: 'NewProject' })
}

const update = async el => {
  router.push({ name: 'NewProject', query: { id: el.id } })
}

const sync = async el => {
  await toastAction(async () => {
    await rpc.project.pull(el.id)
    list.value = await rpc.project.get()
  }, 'sync project')
}

const config = el => {
  router.push({ name: 'Model', query: { db: el.name }})
}

const del = async el => {
  try {
    await ElMessageBox.confirm(
      'This project will be permanently deleted. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
    toastAction(async () => {
      await rpc.project.del(el.id)
      list.value = await rpc.project.get()
    }, 'delete the project')
  }
  catch (e) {
  }
}

const displayTimestamp = el => {
  return new Date(el).toLocaleString()
}

</script>