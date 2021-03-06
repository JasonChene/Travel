<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.taskName" :placeholder="$t('task.current')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
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
      <el-table-column :label="$t('process.processDefinitionName')" prop="processDefinitionName" />
      <el-table-column :label="$t('task.current')" prop="name" />
      <el-table-column :label="$t('task.assignee')" prop="assignee" />
      <el-table-column :label="$t('task.claimTime')" min-width="100px" prop="claimTime">
        <template slot-scope="{row}">
          <span>{{ row.claimTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.startUserId')" prop="startUserId" />
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleTrack(row)">
            <svg-icon icon-class="eye-open" />{{ $t('process.track') }}
          </el-button>
          <router-link :to="{path: '/activiti/execution', query: { processInstanceId: row.processInstanceId, flag: 'Task' } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-time" />{{ $t('process.execution') }}
            </el-button>
          </router-link>
          <router-link :to="{path: '/activiti/taskdetails', query: { processInstanceId: row.processInstanceId, processDefinitionName: row.processDefinitionName, name: row.name, assignee: row.assignee, claimTime: row.claimTime, startUserId: row.startUserId } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-info" />{{ $t('process.details') }}
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog fullscreen :visible.sync="trackDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryTask, getHighLightedProcessDiagram } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Task',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        taskName: undefined
      },
      temp: {
        id: undefined
      },
      trackDialogVisible: false,
      svgSrc: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryTask(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.taskName = ''
      this.handleFilter()
    },
    handleTrack(row) {
      getHighLightedProcessDiagram(row.processInstanceId).then(response => {
        if (response.message === 'success') {
          this.svgSrc = response.data
          this.trackDialogVisible = true
        } else {
          this.svgSrc = ''
          this.handleWarning(response)
        }
      })
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    }
  }
}
</script>
