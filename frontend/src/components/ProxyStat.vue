<template>
    <div style="width: 100%">
        <el-form label-width="150px">
            <el-form-item label="Time range">
                <date-picker v-model="timerange" />
            </el-form-item>
            <el-form-item>
                <template #label>
                    <el-text>
                        Advanced filter
                        <el-icon @click="showNotification(info.stat.filter)">
                            <i-ep-info-filled />
                        </el-icon>
                    </el-text>
                </template>
                <func-editor
                    v-model="filter"
                    funcName="filter"
                    :paramList="[]"
                    placeholder="e.g. { method: 'GET' }"
                    :show-header="false"></func-editor>
            </el-form-item>
            <el-form-item label="Chart type">
                <el-select v-model="chartType" placeholder="Select">
                    <el-option
                        key="time"
                        label="Line chart (time)"
                        value="time" />
                    <el-option key="line" label="Line chart" value="line" />
                    <el-option key="pie" label="Pie chart" value="pie" />
                    <el-option key="bar" label="Bar chart" value="bar" />
                </el-select>
                <el-select
                    v-model="timeUnit"
                    placeholder="Select"
                    style="margin-left: 5px"
                    v-show="chartType === 'time'">
                    <el-option key="year" label="Year" value="year" />
                    <el-option key="month" label="Month" value="month" />
                    <el-option key="day" label="Day" value="day" />
                    <el-option key="hour" label="Hour" value="hour" />
                    <el-option key="minute" label="Minute" value="minute" />
                    <el-option key="second" label="Second" value="second" />
                </el-select>
            </el-form-item>
            <el-form-item label="Analysis target">
                <el-select v-model="func" placeholder="Select">
                    <el-option key="avg" label="Average" value="avg" />
                    <el-option key="max" label="Max" value="max" />
                    <el-option key="min" label="Min" value="min" />
                    <el-option key="count" label="Count" value="count" />
                </el-select>
                <el-select
                    v-model="col"
                    placeholder="Select"
                    style="margin-left: 5px"
                    v-show="func !== 'count'">
                    <!-- <el-option key="url" label="URL" value="url" /> -->
                    <!-- <el-option key="method" label="Method" value="method" /> -->
                    <!-- <el-option key="status" label="Status code" value="status" /> -->
                    <!-- <el-option key="transaction" label="Transaction ID" value="transaction" /> -->
                    <el-option
                        key="reqLength"
                        label="Request length"
                        value="reqLength" />
                    <el-option
                        key="resLength"
                        label="Response length"
                        value="resLength" />
                    <!-- <el-option key="ruleName" label="Rule name" value="ruleName" /> -->
                    <el-option
                        key="duration"
                        label="Duration"
                        value="duration" />
                </el-select>
            </el-form-item>
            <el-form-item label="Group by">
                <el-checkbox-group v-model="groupBy">
                    <el-checkbox label="url">URL</el-checkbox>
                    <el-checkbox label="method">Method</el-checkbox>
                    <el-checkbox label="status">Status code</el-checkbox>
                    <el-checkbox label="ruleName">Rule name</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="stat">
                    Get statistics
                </el-button>
            </el-form-item>
        </el-form>

        <div
            ref="chartEl"
            :style="{ height, border: '#409eff 1px dashed' }"></div>
    </div>
</template>

<script setup>
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { info } from '../utils/info'

import * as echarts from 'echarts'
import JSON5 from 'json5'
import { normalizeProps } from 'vue'

const filter = ref('')
const chartType = ref('time')
const timeUnit = ref('hour')

const func = ref('avg')
const col = ref('duration')

const groupBy = ref([])

const height = computed(() => {
    return window.innerHeight - 570 + 'px'
})

const timerange = ref(null)

const chartEl = ref(null)
let chart = null

onMounted(async () => {
    chart = echarts.init(chartEl.value)
})

const showNotification = message => {
    ElNotification({
        title: 'Hint',
        message,
        type: 'info',
        dangerouslyUseHTMLString: true,
        duration: 0
    })
}

const stat = async e => {
    let where = {}
    try {
        where = JSON5.parse(filter.value)
    } catch {}
    const data = await rpc.proxylog.stat(
        timerange.value,
        where,
        chartType.value === 'time',
        timeUnit.value,
        func.value,
        func.value === 'count' ? '*' : col.value,
        groupBy.value
    )
    const names = data.map(i => groupBy.value.map(g => i[g]).join(' '))
    let xAxis, yAxis, series, legend
    let yAxisName = `${func.value}(${func.value === 'count' ? '*' : col.value})`
    let showData
    let type = chartType.value

    yAxis = {
        type: 'value',
        name: yAxisName
    }

    if (chartType.value !== 'time') {
        if (chartType.value === 'pie') {
            showData = data.map((item, index) => {
                return {
                    value: item.stat_target,
                    name: names[index]
                }
            })
            yAxis = undefined
        } else {
            showData = data.map(i => i.stat_target)
            xAxis = {
                data: names
            }
        }
        series = [
            {
                type,
                name: yAxisName,
                data: showData
            }
        ]
    } else {
        const dateNumbers = data.map(i => new Date(i.date_format).getTime())
        const minDateNumber = Math.min(...dateNumbers),
            maxDateNumber = Math.max(...dateNumbers)
        const nextDate = {
            'year': d =>
                new Date(
                    d.getFullYear() + 1,
                    d.getMonth(),
                    d.getDate(),
                    d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()
                ),
            'month': d =>
                new Date(
                    d.getFullYear(),
                    d.getMonth() + 1,
                    d.getDate(),
                    d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()
                ),
            'day': d =>
                new Date(
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate() + 1,
                    d.getHours(),
                    d.getMinutes(),
                    d.getSeconds()
                ),
            'hour': d =>
                new Date(
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate(),
                    d.getHours() + 1,
                    d.getMinutes(),
                    d.getSeconds()
                ),
            'minute': d =>
                new Date(
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate(),
                    d.getHours(),
                    d.getMinutes() + 1,
                    d.getSeconds()
                ),
            'second': d =>
                new Date(
                    d.getFullYear(),
                    d.getMonth(),
                    d.getDate(),
                    d.getHours(),
                    d.getMinutes(),
                    d.getSeconds() + 1
                )
        }
        const timeRange = []
        for (
            let i = minDateNumber;
            i <= maxDateNumber;
            i = nextDate[timeUnit.value](new Date(i)).getTime()
        ) {
            timeRange.push(new Date(i))
        }
        xAxis = {
            data: timeRange.map(i => i.toLocaleString())
        }

        type = 'line'
        series = names.map(name => {
            const d = data.filter(
                i => groupBy.value.map(g => i[g]).join(' ') === name
            )
            return {
                type,
                name,
                data: timeRange.map(
                    t =>
                        d.find(
                            i =>
                                new Date(i.date_format).getTime() ===
                                t.getTime()
                        )?.stat_target ?? 0
                )
            }
        })

        legend = {
            data: names
        }
    }

    chart.clear()
    chart.setOption({
        tooltip: {},
        legend,
        xAxis,
        yAxis,
        series
    })
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
