<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.moduleName" :placeholder="$t('generator.moduleName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.serviceName" :placeholder="$t('generator.serviceName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-circle-plus-outline" @click="handleGenerateClick">
        {{ $t('generator.generate') }}
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
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35" />
      <el-table-column :label="$t('generator.moduleName')" prop="moduleName" />
      <el-table-column :label="$t('generator.serviceName')" prop="serviceName" />
      <el-table-column :label="$t('generator.packageName')" prop="packageName" />
      <el-table-column :label="$t('generator.entityName')" prop="entityName" />
      <el-table-column :label="$t('generator.tableName')" prop="tableName" />
      <el-table-column :label="$t('generator.idName')" prop="idName" />
      <el-table-column :label="$t('common.create-time')" min-width="100px" prop="createTime" sortable="custom" :class-name="getSortClass('createTime')">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />{{ $t('common.edit') }}
          </el-button>
          <el-popover :ref="'popover-' + row.id" placement="top" width="160" :title="$t('common.confirm-delete')" trigger="click">
            <div>
              <el-button size="mini" @click="$refs[`popover-` + row.id].doClose()">{{ $t('common.cancel') }}</el-button>
              <el-button type="primary" size="mini" @click="$refs[`popover-` + row.id].doClose(),handleDelete(row,$index)">{{ $t('common.confirm') }}</el-button>
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
        <el-form-item :label="$t('generator.moduleName')" prop="moduleName">
          <el-input v-model="temp.moduleName" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('generator.serviceName')" prop="serviceName">
          <el-input v-model="temp.serviceName" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('generator.packageName')" prop="packageName">
          <el-input v-model="temp.packageName" :placeholder="$t('common.enter')" maxlength="256" clearable />
        </el-form-item>
        <el-form-item :label="$t('generator.entityName')" prop="entityName">
          <el-input v-model="temp.entityName" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('generator.tableName')" prop="tableName">
          <el-input v-model="temp.tableName" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('generator.idName')" prop="idName">
          <el-input v-model="temp.idName" :placeholder="$t('common.enter')" maxlength="32" clearable />
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
import { queryGenerator, addGenerator, updateGenerator, deleteGenerator, generateResource, exportGenerator } from '@/api/devtool'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'

export default {
  name: 'Generator',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      labelPosition: 'right',
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        moduleName: undefined,
        serviceName: undefined,
        sorter: 'createTime_descend'
      },
      temp: {
        id: undefined
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        moduleName: [{ required: true, validator: this.checkModuleName, trigger: ['blur', 'change'] }],
        serviceName: [{ required: true, validator: this.checkServiceName, trigger: ['blur', 'change'] }],
        packageName: [{ required: true, validator: this.checkPackageName, trigger: ['blur', 'change'] }],
        entityName: [{ required: true, validator: this.checkEntityName, trigger: ['blur', 'change'] }],
        tableName: [{ required: true, validator: this.checkTableName, trigger: ['blur', 'change'] }],
        idName: [{ required: true, validator: this.checkIdName, trigger: ['blur', 'change'] }]
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
      queryGenerator(this.listQuery).then(response => {
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
      this.listQuery.moduleName = ''
      this.listQuery.serviceName = ''
      this.handleFilter()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'createTime') {
        this.sortByCreateTime(order)
      }
    },
    sortByCreateTime(order) {
      if (order === 'ascending') {
        this.listQuery.sorter = 'createTime_ascend'
      } else {
        this.listQuery.sorter = 'createTime_descend'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
          addGenerator(this.temp).then(response => {
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
          tempData.moduleName = this.temp.moduleName
          tempData.serviceName = this.temp.serviceName
          tempData.packageName = this.temp.packageName
          tempData.entityName = this.temp.entityName
          tempData.tableName = this.temp.tableName
          tempData.idName = this.temp.idName
          updateGenerator(tempData).then(response => {
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
      deleteGenerator(deleteArray).then(response => {
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
    handleGenerateClick() {
      if (this.multipleSelection.length === 0) {
        this.handleWarning(this.$t('generator.choose-generate'))
        return
      }
      generateResource(this.multipleSelection.map(item => { return item.id }).join(',')).then(response => {
        saveAs(response, this.$t('generator.generate') + '.zip')
      })
    },
    handleDownload() {
      this.downloadLoading = true
      const listQueryData = {}
      listQueryData.moduleName = this.listQuery.moduleName
      listQueryData.serviceName = this.listQuery.serviceName
      exportGenerator(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.generator') + '.xlsx')
      })
      this.downloadLoading = false
    },
    getSortClass: function(key) {
      const sorter = this.listQuery.sorter
      return sorter === `${key}_ascend` ? 'ascending' : 'descending'
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    },
    checkModuleName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.moduleName-required')))
      } else {
        callback()
      }
    },
    checkServiceName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.serviceName-required')))
      } else {
        callback()
      }
    },
    checkPackageName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.packageName-required')))
      } else {
        callback()
      }
    },
    checkEntityName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.entityName-required')))
      } else {
        callback()
      }
    },
    checkTableName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.tableName-required')))
      } else {
        callback()
      }
    },
    checkIdName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('generator.idName-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
