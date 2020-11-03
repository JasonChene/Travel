<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.deploymentName" :placeholder="$t('model.modelName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column :label="$t('model.modelName')" prop="name" />
      <el-table-column :label="$t('model.modelCategory')" prop="modelCategory" />
      <el-table-column :label="$t('model.modelVersion')">
        <template slot-scope="{row}">
          <el-tag v-if="row.modelVersion" type="success">
            {{ 'v' + row.modelVersion }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('model.deploymentTime')" min-width="100px" prop="deploymentTime">
        <template slot-scope="{row}">
          <span>{{ row.deploymentTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="handlePreview(row)">
            <i class="el-icon-view" />{{ $t('process.preview') }}
          </el-button>
          <el-button v-waves type="text" @click="handleDownload(row)">
            <i class="el-icon-download" />{{ $t('common.download') }}
          </el-button>
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

    <el-dialog fullscreen :visible.sync="previewDialogVisible">
      <div v-html="svgSrc" />
    </el-dialog>
  </div>
</template>

<script>
import { queryDeployment, getProcessResource, getProcessImage, deleteDeployment } from '@/api/activiti'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { saveAs } from 'file-saver'

export default {
  name: 'Deployment',
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
        deploymentName: undefined
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
      queryDeployment(this.listQuery).then(response => {
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
      this.listQuery.deploymentName = ''
      this.handleFilter()
    },
    handlePreview(row) {
      this.previewDialogVisible = true
      getProcessResource(row.id).then(response => {
        this.svgSrc = response
      })
    },
    handleDownload(row) {
      getProcessImage(row.id).then(response => {
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
    handleDelete(row, index) {
      deleteDeployment(row.id).then(response => {
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
