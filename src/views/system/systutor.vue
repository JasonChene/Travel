<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.teacherName" placeholder="导师姓名" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button type="primary" class="filter-item">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        导入
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button type="danger" plain icon="el-icon-delete" class="filter-item" @click="handleDelete">
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
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"/>
      <el-table-column label="教师工号" prop="teacherId" />
      <el-table-column label="姓名" prop="teacherName" />
      <el-table-column label="性别" prop="teacherSex" />
      <el-table-column label="邮箱" prop="teacherEmail" sortable="custom" width="180"/>
      <el-table-column label="联系方式" prop="teacherContact" sortable="custom" width="150"/>
      <el-table-column label="实验室" prop="libName" />
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

    <pagination v-show="total>0" :total="total" 
      :page.sync="listQuery.currentPage" style="text-align:center;"
      :limit.sync="listQuery.pageSize" @pagination="getPage" />
    
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      style="width: 70%; margin:auto">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 90% ; margin:auto">
        <el-form-item label="工号" prop="teacherId" >
          <el-input v-model="temp.teacherId" :placeholder="$t('common.enter')" style="width:300px" :disabled="dialogStatus==='update'"/>
        </el-form-item>
        <el-form-item label="姓名" prop="teacherName" >
          <el-input v-model="temp.teacherName" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="性别" prop="teacherSex">
          <el-select v-model="temp.teacherSex" :placeholder="$t('common.enter')" maxlength="64" clearable>
            <el-option
            style="width:300px"
              v-for="item in optionsSex"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="邮箱" prop="teacherEmail">
          <el-input v-model="temp.teacherEmail" :placeholder="$t('common.enter')" maxlength="64" clearable/>
        </el-form-item>
        <el-form-item label="联系方式" prop="teacherContact">
          <el-input v-model="temp.teacherContact" :placeholder="$t('common.enter')" maxlength="64" clearable/>
        </el-form-item>
        <el-form-item label="实验室ID" prop="teacherLibid">
          <el-input v-model="temp.teacherLibid" :placeholder="$t('common.enter')" maxlength="64" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t("common.cancel") }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()">
          {{ $t("common.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { querySysRole, querySysMenuTree, queryMenuIdByRoleId, authorizeMenuToRole, querySysMenuButtonTree, queryMenuButtonByRoleCode, authorizeMenuButtonToRole, addSysRole, updateSysRole, deleteSysRole, exportSysRole } from '@/api/admin'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'
  import {findAllTeacher, findTeacherByCondition, addTeacherInfo, findTeacherByTable, updateTeacherInfo, deleteTeacher} from '@/api/teacher'

  export default {
    name: 'SysRole',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        value1: '',
        value2: '',
        list:{},
        tableKey: 0,
        labelPosition: 'right',
        /* 重写的数据开始 */
        dialogVisible: false,
        updatelogVisible: false,
        valueType:'',
        optionsSex: [
          {
            value: '男',
            label: '男'
          },
          {
            value: '女',
            label: '女'
          }
        ],
        valueSex:'',
        /* 重写的数据结束 */
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          teacherName: undefined,
          // roleName: undefined,
          // sorter: 'createTime_descend'
        },
        temp: { 
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
          teacherId: [{ required: true, validator: this.checkTeacherId, trigger: ['blur', 'change'] }],
          teacherName: [{ required: true, validator: this.checkTeacherName, trigger: ['blur', 'change'] }],
          teacherSex: [{ required: true, validator: this.checkTeacherSex, trigger: ['blur', 'change'] }],
          teacherEmail: [{ required: true, validator: this.checkTeacherEmail, trigger: ['blur', 'change'] }],
          teacherContact: [{ required: true, validator: this.checkTeacherContact, trigger: ['blur', 'change'] }],
          // teacherLibid: [{ required: true, validator: this.checkTeacherLibid, trigger: ['blur', 'change'] }]
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
      getList() {
        this.listLoading = true
        findAllTeacher().then(response => {
          this.list = response.data
          this.total = response.data.length
          this.listLoading = false
        })
      },
      getPage(){
        findTeacherByCondition(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
          console.log(this.total)
        })
      },
      
      handleFilter() {
        this.listQuery.currentPage = 1
        this.getPage()
      },
      handleReset() {
        this.listQuery.roleName = ''
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
        console.log(this.temp)
        addTeacherInfo(this.temp).then(response => {
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
        console.log(this.temp);
        // this.$nextTick(() => {
        //   this.$refs['dataForm'].clearValidate()
        // })
      },
      updateData() {
        // this.$refs['dataForm'].validate((valid) => {
          // if (valid) {
            const tempData = {}
            tempData.teacherId = this.temp.teacherId
            tempData.teacherName = this.temp.teacherName
            tempData.teacherSex = this.temp.teacherSex
            tempData.teacherEmail = this.temp.teacherEmail
            tempData.teacherContact = this.temp.teacherContact
            tempData.teacherLibid = this.temp.teacherLibid
            console.log(tempData)
            updateTeacherInfo(tempData).then(response => {
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
        if (row.teacherId) {
          this.delete(row.teacherId)
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
            this.delete(this.multipleSelection.map(item => {return item.teacherId}).join(','))
          }).catch(() => {})
        }
      },
      delete(deleteArray) {
        deleteTeacher(deleteArray).then(response => {
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
        listQueryData.teacherName = this.listQuery.teacherName
        findTeacherByCondition(qs.stringify(listQueryData)).then(response => {
          saveAs(response, this.$t('route.sysrole') + '.xlsx')
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
      checkTeacherId(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入教师工号！'))
        } else {
          callback()
        }
      },
      checkTeacherName(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入教师名字！'))
        } else {
          callback()
        }
      },
      checkTeacherSex(rule, value, callback) {
        if (!value) {
          return callback(new Error('请选择性别！'))
        } else {
          callback()
        }
      },
      checkTeacherEmail(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入邮箱，邮箱不能为空！'))
        } else {
          callback()
        }
      },
      checkTeacherContact(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入联系方式，不能为空！'))
        } else {
          callback()
        }
      },
      checkTeacherLibid(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入实验室编号'))
        } else {
          callback()
        }
      },
    }
  }
</script>