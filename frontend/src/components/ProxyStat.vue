<template>
    <div style="width: 100%">
        <edit-element :config="config" />
        <div
            ref="chartEl"
            :style="{
                height,
                border: '#409eff 1px dashed',
                width: '80%'
            }"></div>
    </div>
</template>

<script setup>
import { rpc } from '../utils/rpc'
import { info } from '../utils/info'

import * as echarts from 'echarts'
import JSON5 from 'json5'

const config = ref({
    stay: true,
    customBtn: 'Get statistics',
    hideCancel: true,
    actions: {
        getElById: rpc.project.getById,
        click: {
            func: async el => await stat(el),
            description: 'analyze proxy stat'
        },
        beforeCreate: el => {
            let where = {}
            try {
                where = JSON5.parse(el.filter)
            } catch {}
            return {
                ...el,
                filter: where,
                col: el.func === 'count' ? '*' : el.col
            }
        }
    },
    default: {
        timerange: null,
        filter: '',
        chartType: 'time',
        timeUnit: 'hour',
        func: 'avg',
        col: 'duration',
        groupBy: []
    },
    components: [
        {
            label: 'Time range',
            items: [
                {
                    type: 'date-picker',
                    prop: 'timerange'
                }
            ]
        },
        {
            label: 'Advanced filter',
            hint: info.stat.filter,
            items: [
                {
                    type: 'func-editor',
                    prop: 'filter',
                    attrs: {
                        paramList: [],
                        showHeader: false,
                        placeholder: "e.g. { method: 'GET' }"
                    }
                }
            ]
        },
        {
            label: 'Chart type',
            items: [
                {
                    type: 'el-select',
                    prop: 'chartType',
                    options: [
                        { label: 'Line chart (time)', val: 'time' },
                        { label: 'Line chart', val: 'line' },
                        { label: 'Pie chart', val: 'pie' },
                        { label: 'Bar chart', val: 'bar' }
                    ]
                },
                {
                    type: 'el-select',
                    prop: 'timeUnit',
                    showIf: el => el.chartType === 'time',
                    options: [
                        { label: 'Year', val: 'year' },
                        { label: 'Month', val: 'month' },
                        { label: 'Day', val: 'day' },
                        { label: 'Hour', val: 'hour' },
                        { label: 'Minute', val: 'minute' },
                        { label: 'Second', val: 'second' }
                    ]
                }
            ]
        },
        {
            label: 'Analysis target',
            items: [
                {
                    type: 'el-select',
                    prop: 'func',
                    options: [
                        { label: 'Average', val: 'avg' },
                        { label: 'Max', val: 'max' },
                        { label: 'Min', val: 'min' },
                        { label: 'Count', val: 'count' }
                    ]
                },
                {
                    type: 'el-select',
                    prop: 'col',
                    showIf: el => el.func !== 'count',
                    options: [
                        { label: 'Request length', val: 'reqLength' },
                        { label: 'Response length', val: 'resLength' },
                        { label: 'Duration', val: 'duration' }
                    ]
                }
            ]
        },
        {
            label: 'Group by',
            items: [
                {
                    type: 'el-checkbox-group',
                    prop: 'groupBy',
                    options: [
                        { val: 'url', label: 'URL' },
                        { val: 'method', label: 'Method' },
                        { val: 'status', label: 'Status code' },
                        { val: 'ruleName', label: 'Rule name' }
                    ]
                }
            ]
        }
    ]
})

const height = computed(() => {
    return window.innerHeight - 570 + 'px'
})

const chartEl = ref(null)
let chart = null

onMounted(async () => {
    chart = echarts.init(chartEl.value)
})

const stat = async el => {
    const data = await rpc.proxylog.stat(
        el.timerange,
        el.filter,
        el.chartType === 'time',
        el.timeUnit,
        el.func,
        el.col,
        el.groupBy
    )
    const names = data.map(i => el.groupBy.map(g => i[g]).join(' '))
    let xAxis, yAxis, series, legend
    let yAxisName = `${el.func}(${el.col})`
    let showData
    let type = el.chartType

    yAxis = {
        type: 'value',
        name: yAxisName
    }

    if (el.chartType !== 'time') {
        if (el.chartType === 'pie') {
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
            i = nextDate[el.timeUnit](new Date(i)).getTime()
        ) {
            timeRange.push(new Date(i))
        }
        xAxis = {
            data: timeRange.map(i => i.toLocaleString())
        }

        type = 'line'
        series = names.map(name => {
            const d = data.filter(
                i => el.groupBy.map(g => i[g]).join(' ') === name
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
