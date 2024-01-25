<template>
    <div style="width: 80%">
        <el-form :model="user" label-width="180px">
            <el-form-item label="Name">
                <el-input v-model="user.name" :disabled="isOnline" />
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="user.password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginOrUpdate">
                    {{ isOnline ? 'Update' : 'Login' }}
                </el-button>
                <el-button @click="logout" v-if="isOnline">Logout</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { rpc } from '../utils/rpc'
import { toastAction } from '../utils/toastAction'
import { info } from '../utils/info'

const route = useRoute()
const router = useRouter()

const reload = inject('reload')

const isOnline = ref(false)
const user = ref({
    name: '',
    password: ''
})

onMounted(async () => {
    try {
        const u = await rpc.user.login()
        isOnline.value = true
        user.value.name = u.name
    } catch {
        isOnline.value = false
    }
})

const loginOrUpdate = async () => {
    if (!isOnline.value) {
        await toastAction(async () => {
            await rpc.user.login(user.value.name, user.value.password)
            reload()
        }, 'login')
    } else {
        await toastAction(async () => {
            await rpc.user.update(user.value.password)
        }, 'update password')
        logout()
    }
}

const logout = async () => {
    await toastAction(() => {
        localStorage.removeItem('token')
    }, 'logout')
    reload()
}
</script>
