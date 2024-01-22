<template>
    <el-row style="font-size: 30px; margin-top: 20px; margin-left: 20px">
        <el-text style="font-size: 30px; margin-left: 20px">
            <el-icon><i-ep-promotion /></el-icon>
            Neko Proxy App
            <span style="font-size: 17px; margin-left: 10px" v-if="demo">
                (Demo Mode)
                <el-icon @click="showNotification(info.demo.intro)">
                    <i-ep-question-filled />
                </el-icon>
            </span>
        </el-text>
    </el-row>
</template>

<script setup>
import { info } from '../utils/info'

const demo = ref(demoMode)
const showNotification = message => {
    ElNotification({
        title: 'Hint',
        message,
        type: 'info',
        dangerouslyUseHTMLString: true,
        duration: 0
    })
}
</script>
