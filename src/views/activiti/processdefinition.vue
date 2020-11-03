<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.processDefinitionName" :placeholder="$t('process.processDefinitionName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('process.processDefinitionKey')" prop="key" />
      <el-table-column :label="$t('process.processDefinitionName')" prop="name" />
      <el-table-column :label="$t('process.processDefinitionCategory')" prop="category" />
      <el-table-column :label="$t('process.processDefinitionVersion')">
        <template slot-scope="{row}">
          <el-tag v-if="row.version" type="success">
            <span>{{ 'v' + row.version }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('process.suspended')">
        <template slot-scope="{row}">
          <span v-if="row.suspended === false">{{ $t('common.no') }}</span>
          <span v-else>{{ $t('common.yes') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" min-width="120px" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handlePreview(row)">
            <i class="el-icon-view" />{{ $t('process.preview') }}
          </el-button>
          <el-button v-waves type="text" @click="handleDownload(row)">
            <i class="el-icon-download" />{{ $t('common.download') }}
          </el-button>
          <el-button type="text" @click="handleSuspend(row.id)">
            <i class="el-icon-video-pause" />{{ $t('process.suspend') }}
          </el-button>
          <el-button type="text" @click="handleActivate(row.id)">
            <i class="el-icon-video-play" />{{ $t('process.activate') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog fullscreen :visible.sync="previewDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryProcessDefinition, getProcessResource, getProcessImage, suspendProcessDefinition, activateProcessDefinition } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { saveAs } from 'file-saver'

export default {
  name: 'ProcessDefinition',
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
        processDefinitionName: undefined
      },
      temp: {
        id: undefined
      },
      previewDialogVisible: false,
      svgSrc: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      queryProcessDefinition(this.listQuery).then(response => {
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
      this.listQuery.processDefinitionName = ''
      this.handleFilter()
    },
    handlePreview(row) {
      this.previewDialogVisible = true
      getProcessResource(row.deploymentId).then(response => {
        this.svgSrc = response
      })
    },
    handleDownload(row) {
      getProcessImage(row.deploymentId).then(response => {
        if (response.size === 0) {
          this.$message({
            message: this.$t('file.cannotfind'),
            type: 'warning',
            duration: 2000
          })
        } else {
          saveAs(response, row.name + '.svg')
        }
      })
    },
    handleSuspend(id) {
      suspendProcessDefinition(id).then(response => {
        if (response.message === 'success') {
          this.$message({
            message: this.$t('process.processDefinition-suspendSuccess'),
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleActivate(id) {
      activateProcessDefinition(id).then(response => {
        if (response.message === 'success') {
          this.$message({
            message: this.$t('process.processDefinition-activateSuccess'),
            type: 'success',
            duration: 2000
          })
          this.handleFilter()
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
