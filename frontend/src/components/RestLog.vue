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
        label: 'Transaction',
        prop: 'transaction',
        width: '330px'
    },
    {
        label: 'Status code',
        prop: 'status',
        width: '130px'
    },
    {
        label: 'Database',
        prop: 'db',
        width: '130px'
    },
    {
        label: 'Model',
        prop: 'model',
        width: '130px'
    },
    {
        label: 'API type',
        prop: 'type',
        width: '130px'
    },
    {
        label: 'Request length',
        prop: 'reqLength',
        width: '130px'
    },
    {
        label: 'Response length',
        prop: 'resLength',
        width: '150px'
    },
    {
        label: 'Duration',
        prop: 'duration',
        width: '100px'
    }
]

const get = ref(rpc.restlog.get)

const clear = ref(rpc.restlog.clear)
</script>
