<template>
    <div style="width: 100%">
        <el-form label-width="100px">
            <el-form-item label="Time range">
                <el-date-picker
                    v-model="timerange"
                    type="datetimerange"
                    :shortcuts="shortcuts"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date" />
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
            <el-table-column prop="status" label="Status code" width="130px" />
            <el-table-column prop="module" label="Module name" width="130px" />
            <el-table-column prop="func" label="Function name" width="130px" />
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
const shortcuts = ref([
    {
        text: 'Last 5 mins',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 60 * 5), d]
        }
    },
    {
        text: 'Last 15 mins',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 60 * 15), d]
        }
    },
    {
        text: 'Last 1 hour',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600), d]
        }
    },
    {
        text: 'Last 24 hours',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24), d]
        }
    },
    {
        text: 'Last 7 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 7), d]
        }
    },
    {
        text: 'Last 30 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 30), d]
        }
    },
    {
        text: 'Last 365 days',
        value: () => {
            const d = new Date()
            return [new Date(d.getTime() - 1000 * 3600 * 24 * 365), d]
        }
    }
])

onMounted(async () => {
    await toastAction(async () => {
        await getData()
    }, 'get API logs')
})

const height = computed(() => {
    return window.innerHeight - 320
})

const getData = async () => {
    const res = await rpc.apilog.get(
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
