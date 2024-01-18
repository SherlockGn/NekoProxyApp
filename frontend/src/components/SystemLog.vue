<template>
    <div style="width: 100%">
        <el-form label-width="100px">
            <el-form-item label="Time range">
                <date-picker v-model="timerange" />
            </el-form-item>
            <el-form-item label="Keyword">
                <el-input v-model="keyword" />
            </el-form-item>
        </el-form>

        <el-table :data="data" style="width: 100%" :height="height">
            <el-table-column prop="createdAt" label="Date" width="200px" />
            <el-table-column prop="level" label="Level" width="100px" />
            <el-table-column label="Content">
                <template #default="scope">
                    <span v-if="scope.row.type === 'string'">
                        {{ scope.row.content }}
                    </span>
                    <json-viewer
                        v-if="scope.row.type === 'object'"
                        :value="JSON.parse(scope.row.content)"></json-viewer>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            style="margin-top: 20px"
            layout="prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :current-page="page"
            @update:current-page="e => (page = e)"
            @change="getData" />
    </div>
</template>

<script setup>
import JsonViewer from 'vue-json-viewer'

import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'

const keyword = ref('')
const data = ref([])
const page = ref(1)
const pageSize = ref(50)
const total = ref(0)

const timerange = ref(null)

onMounted(async () => {
    await toastAction(async () => {
        await getData()
    }, 'get system logs')
})

const height = computed(() => {
    return window.innerHeight - 320
})

const getData = async () => {
    const res = await rpc.syslog.get(
        timerange.value,
        keyword.value,
        (page.value - 1) * pageSize.value,
        pageSize.value
    )
    res.data.forEach(item => {
        item.createdAt = new Date(item.createdAt).toLocaleString()
    })
    data.value = res.data
    total.value = res.count
}

const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

watch(() => timerange.value, getData)
watch(() => keyword.value, debounce(getData, 500))
</script>
