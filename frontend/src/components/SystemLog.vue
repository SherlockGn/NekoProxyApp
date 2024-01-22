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
        prop: 'level',
        label: 'Level',
        width: '100px'
    },
    {
        prop: 'content',
        label: 'Content',
        type: ['json', 'text'],
        width: 'auto'
    }
]

const get = ref(rpc.syslog.get)

const clear = ref(rpc.syslog.clear)
</script>
