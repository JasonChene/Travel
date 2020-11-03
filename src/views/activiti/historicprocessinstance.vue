<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.processInstanceName" :placeholder="$t('process.processInstanceName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('process.processDefinitionKey')" prop="processDefinitionKey" />
      <el-table-column :label="$t('process.processDefinitionName')" prop="processDefinitionName" />
      <el-table-column :label="$t('process.processDefinitionVersion')">
        <template slot-scope="{row}">
          <el-tag v-if="row.processDefinitionVersion" type="success">
            <span>{{ 'v' + row.processDefinitionVersion }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.processInstanceName')" prop="name" />
      <el-table-column :label="$t('process.status')">
        <template slot-scope="{row}">
          <span v-if="row.endTime === null">{{ $t('process.running') }}</span>
          <span v-else>{{ $t('process.over') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.startUserId')" prop="startUserId" />
      <el-table-column :label="$t('process.startTime')" min-width="60px" prop="startTime">
        <template slot-scope="{row}">
          <span>{{ row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.endTime')" min-width="60px" prop="endTime">
        <template slot-scope="{row}">
          <span>{{ row.endTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="100px" align="center">
        <template slot-scope="{row,$index}">
          <router-link :to="{path: '/activiti/historicactivityinstance', query: { processInstanceId: row.processInstanceId } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-tickets" />{{ $t('process.activity') }}
            </el-button>
          </router-link>
          <router-link :to="{path: '/activiti/historicdetail', query: { processInstanceId: row.processInstanceId } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-info" />{{ $t('process.detail') }}
            </el-button>
          </router-link>
          <router-link :to="{path: '/activiti/historicvariableinstance', query: { processInstanceId: row.processInstanceId } }">
            <el-button type="text" style="margin-left: 10px">
              <i class="el-icon-c-scale-to-original" />{{ $t('process.variable') }}
            </el-button>
          </router-link>
          <el-popover :ref="'popover-' + row.id" placement="top" width="160" :title="$t('common.confirm-delete')" trigger="click">
            <div>
              <el-button size="mini" @click="$refs[`popover-` + row.id].doClose()">{{ $t('common.cancel') }}</el-button>
              <el-button type="primary" size="mini" @click="$refs[`popover-` + row.id].doClose();handleDelete(row,$index)">{{ $t('common.confirm') }}</el-button>
            </div>
            <el-button slot="reference" type="text" style="margin-left: 10px">
              <i class="el-icon-delete" />{{ $t('common.delete') }}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { queryHistoricProcessInstance, deleteHistoricProcessInstance } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HistoricProcessInstance',
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
        processInstanceName: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryHistoricProcessInstance(this.listQuery).then(response => {
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
      this.listQuery.processInstanceName = ''
      this.handleFilter()
    },
    handleDelete(row, index) {
      deleteHistoricProcessInstance(row.processInstanceId).then(response => {
        if (response.message === 'success') {
          this.$message({
            message: this.$t('common.delete-success'),
            type: 'success',
            duration: 2000
          })
          this.handleReset()
        } else {
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
