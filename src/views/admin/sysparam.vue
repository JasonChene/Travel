<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.paramName" :placeholder="$t('sysparam.paramName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.paramKey" :placeholder="$t('sysparam.paramKey')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.paramValue" :placeholder="$t('sysparam.paramValue')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button type="danger" plain class="filter-item" icon="el-icon-delete" @click="handleDelete">
        {{ $t('common.delete') }}
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35" />
      <el-table-column :label="$t('sysparam.paramName')" prop="paramName" />
      <el-table-column :label="$t('sysparam.paramKey')" prop="paramKey" />
      <el-table-column :label="$t('sysparam.paramValue')" prop="paramValue" />
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />{{ $t('common.edit') }}
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

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item :label="$t('sysparam.paramName')" prop="paramName">
          <el-input v-model="temp.paramName" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysparam.paramKey')" prop="paramKey">
          <el-input v-model="temp.paramKey" :placeholder="$t('common.enter')" maxlength="256" clearable />
        </el-form-item>
        <el-form-item :label="$t('sysparam.paramValue')" prop="paramValue">
          <el-input v-model="temp.paramValue" type="textarea" :placeholder="$t('common.enter')" maxlength="2048" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { querySysParam, addSysParam, updateSysParam, deleteSysParam, exportSysParam } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'

export default {
  name: 'SysParam',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      labelPosition: 'right',
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        paramName: undefined,
        paramKey: undefined,
        paramValue: undefined
      },
      multipleSelection: [],
      temp: {
        id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        paramName: [{ required: true, validator: this.checkParamName, trigger: ['blur', 'change'] }],
        paramKey: [{ required: true, validator: this.checkParamKey, trigger: ['blur', 'change'] }]
      },
      downloadLoading: false
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      querySysParam(this.listQuery).then(response => {
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
      this.listQuery.paramName = ''
      this.listQuery.paramKey = ''
      this.listQuery.paramValue = ''
      this.handleFilter()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addSysParam(this.temp).then(response => {
            if (response.message === 'success') {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$message({
                message: this.$t('common.add-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.id = this.temp.id
          tempData.paramName = this.temp.paramName
          tempData.paramKey = this.temp.paramKey
          tempData.paramValue = this.temp.paramValue
          updateSysParam(tempData).then(response => {
            if (response.message === 'success') {
              this.dialogFormVisible = false
              this.$message({
                message: this.$t('common.edit-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      if (row.id) {
        this.delete(row.id)
      } else {
        if (this.multipleSelection.length === 0) {
          this.handleWarning(this.$t('common.choose-delete'))
          return
        }
        this.$confirm(this.$t('common.confirm-batch-delete'), this.$t('common.batch-delete'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          this.delete(this.multipleSelection.map(item => { return item.id }).join(','))
        }).catch(() => {})
      }
    },
    delete(deleteArray) {
      deleteSysParam(deleteArray).then(response => {
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
    handleDownload() {
      this.downloadLoading = true
      const listQueryData = {}
      listQueryData.paramName = this.listQuery.paramName
      listQueryData.paramKey = this.listQuery.paramKey
      listQueryData.paramValue = this.listQuery.paramValue
      exportSysParam(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.sysparam') + '.xlsx')
      })
      this.downloadLoading = false
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    },
    checkParamName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysparam.paramName-required')))
      } else {
        callback()
      }
    },
    checkParamKey(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysparam.paramKey-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
