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
        prop: 'ruleName',
        label: 'Rule name',
        width: '170px'
    },
    {
        prop: 'url',
        label: 'URL',
        width: '350px'
    },
    {
        prop: 'method',
        label: 'Method',
        width: '120px'
    },
    {
        prop: 'status',
        label: 'Status code',
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

const get = ref(rpc.proxylog.get)

const clear = ref(rpc.proxylog.clear)
</script>
