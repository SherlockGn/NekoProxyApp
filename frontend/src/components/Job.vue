<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'

const config = ref({
    actions: {
        newElRouter: {
            name: 'NewJob',
            queryName: 'id'
        },
        get: {
            func: rpc.job.get,
            description: 'refresh jobs'
        },
        del: {
            func: async el => await rpc.job.del(el.id),
            description: 'delete job',
            confirm: true,
            refreshRequired: true
        },
        start: {
            func: rpc.job.start,
            description: 'start job'
        }
    },
    titles: [
        {
            val: "Currently there're no defined jobs. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new job. Or '
        },
        {
            val: 'refresh',
            type: 'primary',
            action: 'get'
        },
        {
            val: ' the list.'
        }
    ],
    header: el => ({ name: el.name, description: el.description }),
    extraText: [
        {
            val: 'Start',
            type: 'primary',
            action: 'start'
        },
        {
            val: ', '
        },
        {
            val: 'update',
            type: 'primary',
            action: 'update'
        },
        {
            val: ' or '
        },
        {
            val: 'delete',
            type: 'danger',
            action: 'del'
        },
        {
            val: ' this job.'
        }
    ],
    props: [
        {
            label: 'Created at',
            prop: 'createdAt'
        },
        {
            label: 'Updated at',
            prop: 'updatedAt'
        },
        {
            label: 'Enabled',
            prop: 'enabled'
        },
        {
            label: 'Cron',
            prop: 'cron'
        },
        {
            label: 'Status',
            prop: 'status'
        }
    ]
})
</script>
