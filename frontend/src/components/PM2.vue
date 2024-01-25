<template>
    <Display :config="config" />
</template>

<script setup>
import { rpc } from '../utils/rpc'

const config = ref({
    actions: {
        get: {
            func: rpc.pm.get,
            description: 'refresh processes'
        },
        del: {
            func: async el => await rpc.pm.del(el.pm_id),
            description: 'delete process',
            confirm: true,
            refreshRequired: true
        },
        stop: {
            func: async el => await rpc.pm.stop(el.pm_id),
            description: 'stop process',
            refreshRequired: true
        },
        restart: {
            func: async el => await rpc.pm.restart(el.pm_id),
            description: 'restart process',
            refreshRequired: true
        }
    },
    titles: [
        {
            val: "Currently there're no managed processes. ",
            displayIfEmpty: true
        },
        {
            val: 'Refresh',
            type: 'primary',
            action: 'get'
        },
        {
            val: ' the list.'
        }
    ],
    header: el => ({ name: el.name }),
    extraText: [
        {
            val: 'Stop',
            type: 'primary',
            action: 'stop'
        },
        {
            val: ', '
        },
        {
            val: 'restart',
            type: 'primary',
            action: 'restart'
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
            val: ' this process.'
        }
    ],
    props: [
        {
            label: 'Status',
            prop: el => el.pm2_env.status
        },
        {
            label: 'Created at',
            prop: el => new Date(el.pm2_env.created_at)
        },
        {
            label: 'Updated at',
            prop: el => el.pm2_env.pm_uptime
        },
        {
            label: 'PM ID',
            prop: 'pm_id'
        },
        {
            label: 'CPU',
            prop: el => el.monit.cpu
        },
        {
            label: 'Memory',
            prop: el => el.monit.memory
        },
        {
            label: 'CWD',
            prop: el => el.pm2_env.pm_cwd,
            col: 3
        },
        {
            label: 'Script',
            prop: el => el.pm2_env.pm_exec_path,
            col: 3
        },
        {
            label: 'Args',
            prop: el => el.pm2_env.args.join(' '),
            col: 3
        },
        {
            label: 'Log path',
            prop: el => el.pm2_env.pm_log_path,
            col: 3
        }
    ]
})
</script>
