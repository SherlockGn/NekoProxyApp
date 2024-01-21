<template>
    <Log :col="col" :get="get" :clear="clear" />
</template>

<script setup>
const col = [
    {
        label: 'Date',
        prop: 'createdAt',
        type: ['date'],
        width: '200px'
    },
    {
        label: 'Name',
        prop: 'name',
        width: '150px'
    },
    {
        label: 'Status',
        prop: 'status',
        width: '80px'
    },
    {
        label: 'Transaction',
        prop: 'transaction',
        width: '330px'
    },
    {
        label: 'Output',
        prop: 'output',
        type: ['media', 'json', 'text'],
        width: '290px'
    },
    {
        label: 'Error',
        prop: 'error',
        type: ['media', 'json', 'text'],
        width: '290px'
    },
    {
        label: 'Duration',
        prop: 'duration',
        width: '100px'
    }
]

const get = ref(rpc.joblog.get)

const clear = ref(rpc.joblog.clear)
</script>
