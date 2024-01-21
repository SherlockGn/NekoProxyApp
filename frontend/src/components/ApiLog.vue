<template>
    <Log :col="col" :get="get" :clear="clear" />
</template>

<script setup>
const col = [
    {
        prop: 'createdAt',
        label: 'Date',
        type: ['date'],
        width: '200px'
    },
    {
        prop: 'transaction',
        label: 'Transaction ID',
        width: '350px'
    },
    {
        prop: 'status',
        label: 'Status code',
        width: '130px'
    },
    {
        prop: 'module',
        label: 'Module name',
        width: '130px'
    },
    {
        prop: 'func',
        label: 'Function name',
        width: '130px'
    },
    {
        prop: 'user',
        label: 'Username',
        width: '130px'
    },
    {
        prop: 'authType',
        label: 'Auth type',
        width: '130px'
    },
    {
        prop: 'reqLength',
        label: 'Request length',
        width: '130px'
    },
    {
        prop: 'resLength',
        label: 'Response length',
        width: '140px'
    },
    {
        prop: 'duration',
        label: 'Duration',
        width: '130px'
    }
]

const get = ref(rpc.apilog.get)

const clear = ref(rpc.apilog.clear)
</script>
