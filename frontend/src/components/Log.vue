<template>
    <div style="width: 100%">
        <el-row style="martin-top: 10px; margin-bottom: 10px">
            <el-link type="primary" :underline="false" @click="refresh">
                Refresh
            </el-link>
            <el-text>&nbsp;or&nbsp;</el-text>
            <el-link type="danger" :underline="false" @click="clear">
                clear
            </el-link>
            <el-text>&nbsp;the logs.</el-text>
        </el-row>
        <el-form label-width="100px">
            <el-form-item label="Time range">
                <date-picker v-model="timerange" />
            </el-form-item>
            <el-form-item label="Keyword">
                <el-input v-model="keyword" />
            </el-form-item>
        </el-form>

        <el-table :data="data" :height="height">
            <el-table-column
                v-for="(c, index) in col"
                :key="index"
                :label="c.label"
                :width="c.width">
                <template #default="scope">
                    <span v-if="getColType(scope, c) === 'date'">
                        {{ new Date(scope.row[c.prop]).toLocaleString() }}
                    </span>
                    <span v-if="getColType(scope, c) === 'text'">
                        {{ scope.row[c.prop] }}
                    </span>
                    <template v-if="getColType(scope, c) === 'media'">
                        <component
                            style="width: 100%"
                            :is="toComponent(scope.row[c.prop]).component"
                            :controls="true"
                            :src="toComponent(scope.row[c.prop]).src" />
                    </template>
                    <template v-if="getColType(scope, c) === 'json'">
                        <json-viewer
                            :value="
                                JSON.parse(scope.row[c.prop])
                            "></json-viewer>
                    </template>
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

import { toastAction } from '../utils/toastAction'

const props = defineProps({
    col: {
        type: Array
        // type: media, date, text, json
        // prop:
        // label:
        // width:
    },
    get: {
        type: Function
        // timerange, keyword, offset, limit
    },
    clear: {
        type: Function
    }
})

const keyword = ref('')
const data = ref([])
const page = ref(1)
const pageSize = ref(50)
const total = ref(0)

const timerange = ref(null)

onMounted(() => {
    refresh()
})

const height = computed(() => {
    return window.innerHeight - 340
})

const refresh = async () => {
    await toastAction(async () => {
        await getData()
    }, 'get the logs')
}

const getData = async () => {
    const res = await props.get(
        timerange.value,
        keyword.value,
        (page.value - 1) * pageSize.value,
        pageSize.value
    )
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

const getColType = (scope, c) => {
    const types = c.type ?? ['text']
    if (types.includes('date')) {
        return 'date'
    }
    if (types.includes('media') && toComponent(scope.row[c.prop])) {
        return 'media'
    }
    if (types.includes('json') && isObject(scope.row[c.prop])) {
        return 'json'
    }
    return 'text'
}

const toComponent = item => {
    if (!isObject(item)) {
        return false
    }
    const parsed = JSON.parse(item)
    if (parsed.component && parsed.src) {
        return parsed
    }
    return null
}

const isObject = item => {
    if (item === null) {
        return false
    }
    try {
        const parsed = JSON.parse(item)
        return typeof parsed === 'object'
    } catch {}
    return false
}

const clear = async () => {
    try {
        await ElMessageBox.confirm(
            'All the logs will be permanently deleted. Continue?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }
        )
        toastAction(async () => {
            await props.clear()
            await getData()
        }, 'clear the logs')
    } catch (e) {}
}

watch(() => timerange.value, getData)
watch(() => keyword.value, debounce(getData, 500))
</script>
