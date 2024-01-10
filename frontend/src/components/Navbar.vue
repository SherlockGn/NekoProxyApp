<template>
    <el-menu style="height: calc(100vh - 150px);">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><i-ep-location /></el-icon>
              <span>Proxy</span>
            </template>
            <el-menu-item>
              <router-link to="/rule">
                <el-icon><i-ep-tickets /></el-icon>
                <span>Proxy rules</span>
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/proxylog">
                <el-icon><i-ep-picture /></el-icon>
                <span>Proxy logs</span>
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/proxystat">
                <el-icon><i-ep-data-line /></el-icon>
                <span>Proxy record statistics</span>
              </router-link>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><i-ep-notebook /></el-icon>
              <span>Logs</span>
            </template>
            <el-menu-item>
              <router-link to="/systemlog">
                <el-icon><i-ep-cpu /></el-icon>
                <span>System logs</span>
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/apilog">
                <el-icon><i-ep-chat-line-round /></el-icon>
                <span>API logs</span>
              </router-link>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><i-ep-files /></el-icon>
              <span>Data center</span>
            </template>
            <el-menu-item>
              <router-link to="/database">
                <el-icon><i-ep-setting /></el-icon>
                <span>Configure</span>
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/restLog">
                <el-icon><i-ep-memo /></el-icon>
                <span>RESTful API logs</span>
              </router-link>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><i-ep-connection /></el-icon>
              <span>CICD</span>
            </template>
            <el-menu-item>
              <el-icon><i-ep-setting /></el-icon>
              <span>Configure</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon><i-ep-phone /></el-icon>
              <span>Heartbeat test</span>
            </template>
            <el-menu-item>
              <el-icon><i-ep-setting /></el-icon>
              <span>Configure</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
</template>