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
            <el-table-column
                prop="transaction"
                label="Transaction ID"
                width="350px" />
            <el-table-column label="Rule name" width="170px">
                <template #default="scope">
                    <el-text>
                        {{ scope.row.rule?.name ?? '' }}
                    </el-text>
                    <el-text tag="del" style="margin-left: 5px">
                        {{
                            scope.row.rule?.name === scope.row.ruleName
                                ? ''
                                : scope.row.ruleName
                        }}
                    </el-text>
                </template>
            </el-table-column>
            <el-table-column prop="url" label="URL" width="350px" />
            <el-table-column prop="method" label="Method" width="120px" />
            <el-table-column prop="status" label="Status code" width="130px" />
            <el-table-column
                prop="reqLength"
                label="Request length"
                width="130px" />
            <el-table-column
                prop="resLength"
                label="Response length"
                width="140px" />
            <el-table-column prop="duration" label="Duration" width="130px" />
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
    }, 'get proxy logs')
})

const height = computed(() => {
    return window.innerHeight - 320
})

const getData = async () => {
    const res = await rpc.proxylog.get(
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

const getRuleName = el => {
    const newName = el.rule?.name
    const oldName = el.ruleName
}

watch(() => timerange.value, getData)
watch(() => keyword.value, debounce(getData, 500))
</script>
