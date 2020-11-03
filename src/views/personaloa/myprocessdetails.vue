<template>
  <div class="app-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      {{ $t('common.return') }}
    </el-button>
    <el-divider />
    <div style="margin:10px 0 5px 0px">
      {{ $t('route.myprocessdetails') }}
    </div>
    <el-row class="el-row-item">
      <el-col :span="12">{{ $t('process.processInstanceId') }}：{{ this.$route.query && this.$route.query.processInstanceId }}</el-col>
      <el-col :span="12">{{ $t('process.processDefinitionKey') }}：{{ this.$route.query && this.$route.query.processDefinitionKey }}</el-col>
    </el-row>
    <el-row class="el-row-item">
      <el-col :span="12">{{ $t('process.processDefinitionName') }}：{{ this.$route.query && this.$route.query.processDefinitionName }}</el-col>
      <el-col :span="12">{{ $t('process.processDefinitionVersion') }}：<el-tag v-if="this.$route.query.processDefinitionVersion" type="success" size="mini">{{ this.$route.query && 'v' + this.$route.query.processDefinitionVersion }}</el-tag></el-col>
    </el-row>
    <el-row class="el-row-item">
      <el-col :span="12">{{ $t('process.status') }}：{{ this.$route.query && this.$route.query.processStatus }}</el-col>
      <el-col :span="12">{{ $t('process.startTime') }}：{{ this.$route.query && this.$route.query.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
    </el-row>
    <el-row class="el-row-item">
      <el-col :span="12">{{ $t('process.startUserId') }}：{{ this.$route.query && this.$route.query.startUserId }}</el-col>
      <el-col :span="12">{{ $t('process.endTime') }}：{{ this.$route.query && this.$route.query.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</el-col>
    </el-row>
    <el-divider />
    <div style="margin:10px 0 5px 0px">
      {{ $t('process.comments') }}
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('process.candidate')">
        <template slot-scope="{row}">
          <span>{{ row.userId }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('notification.content')">
        <template slot-scope="{row}">
          <span>{{ row.fullMessage }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryTaskComment } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'MyProcessDetails',
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      listLoading: true,
      listQuery: {}
    }
  },
  activated() {
    const processInstanceId = this.$route.query && this.$route.query.processInstanceId
    this.getList(processInstanceId)
  },
  methods: {
    getList(processInstanceId) {
      this.listLoading = true
      this.listQuery.processInstanceId = processInstanceId
      queryTaskComment(this.listQuery).then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
  .el-row-item {
    color: #606266;
    margin: 10px 10px 10px 0px;
    font-size: 14px;
  }
</style>
