<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'

const config = ref({
    actions: {
        newElRouter: {
            name: 'NewProject',
            queryName: 'id'
        },
        get: {
            func: rpc.project.get,
            description: 'refresh projects'
        },
        del: {
            func: async el => await rpc.project.del(el.id),
            description: 'delete project',
            confirm: true,
            refreshRequired: true
        },
        start: {
            func: el => rpc.project.start(el.id),
            description: 'start project',
            refreshRequired: true
        },
        sync: {
            func: async el => await rpc.project.pull(el.id),
            description: 'sync project',
            refreshRequired: true
        }
    },
    titles: [
        {
            val: "Currently there're no defined projects. ",
            displayIfEmpty: true
        },
        {
            val: 'Create',
            type: 'success',
            action: 'add'
        },
        {
            val: ' a new project. Or '
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
            val: ', '
        },
        {
            val: 'sync',
            type: 'primary',
            action: 'sync'
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
            val: ' this project.'
        }
    ],
    props: [
        {
            label: 'Status',
            prop: 'status'
        },
        {
            label: 'Created at',
            prop: 'createdAt'
        },
        {
            label: 'Updated at',
            prop: 'updatedAt'
        },
        {
            label: 'Repo',
            prop: 'repo',
            col: 3
        },
        {
            label: 'Type',
            prop: 'type'
        },
        {
            label: 'Branch',
            prop: 'branch'
        },
        {
            label: 'Script',
            prop: el => el.script ?? undefined
        },
        {
            label: 'Port',
            prop: el => el.port ?? undefined
        },
        {
            label: 'Args',
            prop: el => el.args ?? undefined,
            col: 3
        }
    ]
})
</script>
