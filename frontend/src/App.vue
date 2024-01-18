<template>
    <div>
        <el-row>
            <Title />
        </el-row>
        <el-divider />
        <el-row>
            <el-col :span="5">
                <Navbar />
            </el-col>
            <el-col :span="19" class="center padding">
                <router-view />
            </el-col>
        </el-row>
    </div>
</template>

<style scoped>
.center {
    display: flex;
    justify-content: center;
}

.padding {
    padding-left: 20px;
    padding-right: 20px;
}
</style>

<script setup></script>
