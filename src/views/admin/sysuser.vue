<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.reportName" :placeholder="'项目名称'" clearable class="filter-input filter-item" style="margin-left: 10px; margin-top: 7px" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" style="margin-top: 7px" @click="handleFilter">
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

    <el-table :key="tableKey"     :data="list" border fit highlight-current-row
      style="width: 100%" @sort-change="sortChange" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35" />
      <el-table-column label="项目编号" prop="reportId" width="100"/>
      <el-table-column label="项目负责人" prop="reportPrincipal" />
      <el-table-column label="项目名称" prop="reportName" />
      <el-table-column label="项目类型" prop="reportType" />
      <el-table-column label="申报时间" min-width="100px" prop="reportTime" sortable="custom" 
      :class-name="getSortClass('createTime')" />
      <el-table-column label="申报处理" prop="reportDeal">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('common.operate')" width="400px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="handleUpdate(row)">
            {{ $t("common.edit") }}
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(row, $index)">
            {{ $t("common.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.currentPage"
      style="text-align: center"
      :limit.sync="listQuery.pageSize"
      @pagination="getPage"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item label="项目编号" prop="reportId">
          <el-input v-model="temp.reportId" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" maxlength="32" clearable />
        </el-form-item>
        <el-form-item label="项目负责人" prop="reportPrincipal">
          <el-input v-model="temp.reportPrincipal" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="项目名称" prop="reportName">
          <el-input v-model="temp.reportName" type="textarea" :placeholder="$t('common.enter')" maxlength="256" clearable />
        </el-form-item>
        <el-form-item label="项目类型" prop="reportType">
          <el-select
            v-model="temp.reportType"
            placeholder="请选择"
            style="width: 300px">
            <el-option
              v-for="item in optionsType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('申报时间:')" prop="reportTime">
           <div class="block">
             <el-date-picker
               value-format="yyyy-MM-dd HH:mm:ss"
               v-model="temp.reportTime"
               type="datetime"
               placeholder="选择日期时间">
             </el-date-picker>
           </div>
        </el-form-item>
        <el-form-item label="申报处理" prop="reportDeal">
          <el-input v-model="temp.reportDeal" :placeholder="$t('common.enter')" maxlength="64" clearable />
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

    <el-dialog :title="$t('sysrole.authorize-menu')" :visible.sync="menuTreeDialogFormVisible">
      <el-tree ref="menuTreeRef" :data="menuTree" show-checkbox node-key="id" highlight-current :props="defaultProps" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuTreeDialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="createAuthorizeMenu()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('sysrole.authorize-buttontip')" :visible.sync="menuButtonTreeDialogFormVisible">
      <el-tree ref="menuButtonTreeRef" :data="menuButtonTree" show-checkbox node-key="key" highlight-current :props="defaultProps" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuButtonTreeDialogFormVisible = false">
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" @click="createAuthorizeMenuButton()">
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="项目申报审核"
      :visible.sync="dialog"
      width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="申报处理">
          <el-select v-model="form.region" placeholder="--请选择--">
            <el-option label="--请选择--" />
            <el-option label="审核不通过" />
            <el-option label="审核通过" />
          </el-select>
        </el-form-item>
        <el-form-item label="处理意见">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button @click="showDialog = false">确认</el-button>
          <el-button type="primary" @click="showDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { querySysRole, querySysMenuTree, queryMenuIdByRoleId, authorizeMenuToRole, querySysMenuButtonTree, queryMenuButtonByRoleCode, authorizeMenuButtonToRole, addSysRole, updateSysRole, deleteSysRole, exportSysRole } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import {findProjectReportAll, findProjectReportByCondition, addProjectReport, updateProjectReport,
        deleteProjectReportById, exportProjectReport} from '@/api/student'

export default {
  name: 'SysRole',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      dialogVisible: false,
      showDialog: false,
      dialog: false,
      conAdd: false,
      conDelete: false,
      list:{},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1'
      }],
      optionsType:[
        {
          value: "创新创业项目",
          label: "创新创业项目",
        }
      ],
      valueType:"",
      tableKey: 0,
      labelPosition: 'right',
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        reportName: undefined,
        sorter: 'createTime_descend'
      },
      temp: {
        // id: undefined
      },
      multipleSelection: [],
      menuTreeDialogFormVisible: false,
      menuTree: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      menuButtonTree: [],
      menuButtonTreeDialogFormVisible: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        reportId: [{ required: true, validator: this.checkReportId, trigger: ['blur', 'change'] }],
        reportPrincipal: [{ required: true, validator: this.checkReportPrincipal, trigger: ['blur', 'change'] }],
        reportName: [{ required: true, validator: this.checkReportName, trigger: ['blur', 'change'] }],
        reportType: [{ required: true, validator: this.checkReportType, trigger: ['blur', 'change'] }],
        reportTime: [{ required: true, validator: this.checkReportTime, trigger: ['blur', 'change'] }],
        reportDeal: [{ required: true, validator: this.checkReportDeal, trigger: ['blur', 'change'] }],
      },
      downloadLoading: false
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.getPage()
  },
  methods: {
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss') : '';
    },
    onSubmit() {
      console.log('submit!')
    },
    getList() {
      this.listLoading = true
      findProjectReportAll().then(response => {
        this.list = response.data
        this.total = response.data.length
        this.listLoading = false
        console.log(this.list)
      })
    },
    getPage(){
      findProjectReportByCondition(this.listQuery).then((response) => {
        this.list = response.data.list;
        this.total = response.data.pagination.total;
        this.listLoading = false;
        console.log(this.total);
      });
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getPage()
    },
    handleReset() {
      this.listQuery.reportName = ''
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
      addProjectReport(this.temp).then(response => {
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
      const tempData = {}
          tempData.reportId = this.temp.reportId
          tempData.reportPrincipal = this.temp.reportPrincipal
          tempData.reportName = this.temp.reportName
          tempData.reportType = this.temp.reportType
          tempData.reportTime = this.temp.reportTime
          tempData.reportDeal = this.temp.reportDeal
          updateProjectReport(tempData).then(response => {
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
    },
    handleDelete(row, index) {
      if (row.reportId) {
        this.delete(row.reportId)
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
          this.delete(this.multipleSelection.map(item => { return item.reportId }).join(','))
        }).catch(() => {})
      }
    },
    delete(deleteArray) {
      deleteProjectReportById(deleteArray).then(response => {
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
    handleAuthorizeMenu(roleId) {
      this.roleId = roleId
      querySysMenuTree().then(response => {
        this.menuTree = response.data
      })
      queryMenuIdByRoleId(roleId).then(response => {
        this.$refs.menuTreeRef.setCheckedKeys(response.data)
      })
      this.menuTreeDialogFormVisible = true
    },
    createAuthorizeMenu() {
      this.temp.roleId = this.roleId
      this.temp.menuId = this.$refs.menuTreeRef.getCheckedKeys().join(',')
      authorizeMenuToRole(qs.stringify(this.temp)).then(response => {
        if (response.message === 'success') {
          this.menuTreeDialogFormVisible = false
          this.$message({
            message: this.$t('common.authorize-success'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleAuthorizeMenuButton(roleCode) {
      this.roleCode = roleCode
      querySysMenuButtonTree().then(response => {
        this.menuButtonTree = response.data
      })
      queryMenuButtonByRoleCode(roleCode).then(response => {
        this.$refs.menuButtonTreeRef.setCheckedKeys(response.data)
      })
      this.menuButtonTreeDialogFormVisible = true
    },
    createAuthorizeMenuButton() {
      this.temp.roleCode = this.roleCode
      this.temp.menuButton = this.$refs.menuButtonTreeRef.getCheckedKeys().join(',')
      authorizeMenuButtonToRole(qs.stringify(this.temp)).then(response => {
        if (response.message === 'success') {
          this.menuButtonTreeDialogFormVisible = false
          this.$message({
            message: this.$t('common.authorize-success'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.handleWarning(response)
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      const listQueryData = {}
      listQueryData.reportName = this.listQuery.reportName
      exportProjectReport(qs.stringify(listQueryData)).then(response => {
        saveAs(response, '项目申报管理.xls')
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
    checkReportPrincipal(rule, value, callback){
      if (!value) {
        return callback(new Error(this.$t('generator.moduleName-required')))
      } else {
        callback()
      }
    },
    checkReportId(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入项目编号'))
      } else {
        callback()
      }
    },
    checkReportPrincipalaa(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入项目负责人'))
      } else {
        callback()
      }
    },
    checkReportName(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入项目名称'))
      } else {
        callback()
      }
    },
    checkReportType(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入项目类型'))
      } else {
        callback()
      }
    },
    checkReportTime(rule, value, callback) {
      if (!value) {
        return callback(new Error('请选择申报时间'))
      } else {
        callback()
      }
    },
    checkReportDeal(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入项目处理结果'))
      } else {
        callback()
      }
    }
  }
}
</script>
