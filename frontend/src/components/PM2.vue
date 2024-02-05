<template>
    <div>
        <Display :config="config" />
        <el-drawer
            size="70%"
            v-model="showDrawer"
            title="Project logs"
            direction="rtl">
            <el-form>
                <el-form-item label="Last line">
                    <el-input-number v-model="line" />
                </el-form-item>
                <el-form-item>
                    <el-button @click="getLog">Get logs</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input
                        style="font-family: Consolas, monospace"
                        type="textarea"
                        :autosize="{ minRows: 10, maxRows: 30 }"
                        v-model="logContent" />
                </el-form-item>
            </el-form>
        </el-drawer>
    </div>
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
        },
        viewLog: {
            func: el => log(el)
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
            val: ' this process. View the '
        },
        {
            val: 'logs',
            type: 'primary',
            action: 'viewLog'
        },
        {
            val: '.'
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

let currentId = null
const showDrawer = ref(false)
const line = ref(100)
const logContent = ref('')

const log = async el => {
    showDrawer.value = true
    line.value = 100
    currentId = el.pm_id
    logContent.value = ''
}

const getLog = async () => {
    logContent.value = await rpc.pm.getLog(currentId, line.value)
}
</script>
