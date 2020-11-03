<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="姓名" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter"/>
      <el-button type="primary" class="filter-item">
        查询
      </el-button>
      <el-button type="primary" icon="el-icon-refresh-right" class="filter-item">
        重置
      </el-button>
      <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="dialogVisible = true">
        新增
      </el-button>
      <el-button type="primary" class="filter-item">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        导入
      </el-button>
      <el-button type="primary" class="filter-item">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        导出
      </el-button>
      <el-button type="danger" plain icon="el-icon-delete" class="filter-item" @click="delete1">
        删除
      </el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="tableName"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="角色名称" prop="name" />
      <el-table-column label="角色描述" prop="userdescription" />
      <!-- 操作 -->
      <el-table-column label="操作" width="300px">
        <el-button type="primary" icon="el-icon-zoom-in" size="small" />
        <el-button type="success" icon="el-icon-edit" size="small" @click="updatelogVisible = true" />
        <el-button type="danger" icon="el-icon-delete" size="small" @click="delete2"/>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog
      title="增加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="70px" :rules="rules">
        <el-form-item label="角色名称" prop="name" >
          <el-input v-model="editForm.name" style="width:205px"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="type">
          <!-- <el-input v-model="editForm.type" width="40px"/> -->
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> 
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> 

    <el-dialog
      title="修改角色"
      :visible.sync="updatelogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="70px" :rules="rules">
        <el-form-item label="角色名称" prop="name" >
          <el-input v-model="editForm.name" style="width:205px"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="type">
          <!-- <el-input v-model="editForm.type" width="40px"/> -->
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> 
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatelogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatelogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
  import { querySysUser, addSysUser, updateSysUser, queryRoleName, querySysOrgTree, deleteSysUser, exportSysUser } from '@/api/admin'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'
  export default {
    name: 'SysUser',
    components: { Pagination },
    directives: { waves },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: 'success',
          0: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        tableKey: 0,
        labelPosition: 'right',
        list: [],
        dialogVisible: false,
        updatelogVisible: false,
        options:[
          {
            value:'普通用户',
            label:'普通用户'
          },
          {
            value:'管理员',
            label:'管理员'
          },
          {
            value:'超级管理员',
            label:'超级管理员'
          }
        ],
        value:'',
        tableName:[{
          name:'薛冰',
          userdescription: '普通用户'
          },
          {
            name:'吕健豪',
            userdescription: '普通用户'
          },
          {
            name:'王建勋',
            userdescription: '普通用户'
          },
          {
            name:'曹岚',
            userdescription: '管理员'
          },
          {
            name:'刘金磊',
            userdescription: '普通用户'
          },
          {
            name:'梁云飞',
            userdescription: '管理员'
          },
          {
            name:'杨鑫',
            userdescription: '超级管理员'
          }
        ],
        editForm:{
          name: '',
          type: '',
        },
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          username: undefined,
          status: undefined,
          sorter: 'createTime_descend'
        },
        roleIdOptions: [],
        orgIdOptions: [],
        orgName: '',
        statusOptions: [
          { key: '1', display_name: this.$t('common.able') },
          { key: '0', display_name: this.$t('common.disable') }
        ],
        temp: {
          id: undefined,
          status: 1,
          prefix: '86'
        },
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: this.$t('common.edit'),
          create: this.$t('common.add')
        },
        rules: {
          username: [{ required: true, validator: this.checkUsername, trigger: ['blur', 'change'] }],
          password: [{ required: true, validator: this.checkPassword, trigger: ['blur', 'change'] }],
          email: [{ required: true, type: 'email', validator: this.checkEmail, trigger: ['blur', 'change'] }],
          mobile: [{ required: true, validator: this.checkMobile, trigger: ['blur', 'change'] }],
          roleId: [{ required: true, validator: this.checkRoleId, trigger: 'change' }],
          orgId: [{ required: true, validator: this.checkOrgId, trigger: 'change' }],
          status: [{ required: true }]
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
      delete1() {
        this.$confirm('此操作将批量删除已选择的角色信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      delete2() {
        this.$confirm('此操作将永久删除该系统角色信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getList() {
        this.listLoading = true
        querySysUser(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
        })
        queryRoleName().then(response => {
          this.roleIdOptions = response.data
        })
        querySysOrgTree().then(response => {
          this.orgIdOptions = response.data.list
        })
      },
      handleFilter() {
        this.listQuery.currentPage = 1
        this.getList()
      },
      handleReset() {
        this.listQuery.username = ''
        this.listQuery.status = ''
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
          id: undefined,
          status: 1,
          prefix: '86'
        }
      },
      handleCreate() {
        this.resetTemp()
        this.orgName = ''
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        if (this.$refs.selectOrgId.value) {
          this.validateOrgId()
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            addSysUser(this.temp).then(response => {
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
        this.orgName = this.temp.orgIdCn
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        if (this.$refs.selectOrgId.value) {
          this.validateOrgId()
        }
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // const tempData = Object.assign({}, this.temp)
            const tempData = {}
            tempData.id = this.temp.id
            tempData.username = this.temp.username
            tempData.email = this.temp.email
            tempData.mobile = this.temp.mobile
            tempData.prefix = this.temp.prefix
            tempData.roleId = this.temp.roleId
            tempData.orgId = this.temp.orgId
            tempData.status = this.temp.status
            updateSysUser(tempData).then(response => {
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
        deleteSysUser(deleteArray).then(response => {
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
        listQueryData.username = this.listQuery.username
        listQueryData.status = this.listQuery.status
        exportSysUser(qs.stringify(listQueryData)).then(response => {
          saveAs(response, this.$t('route.sysuser') + '.xlsx')
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
      checkUsername(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.username-required')))
        } else {
          if (value.length > 2 && value.length < 65) {
            callback()
          } else {
            return callback(new Error(this.$t('sysuser.username-length')))
          }
        }
      },
      checkPassword(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.password-required')))
        } else {
          if (value.length > 5 && value.length < 32) {
            callback()
          } else {
            return callback(new Error(this.$t('sysuser.password-length')))
          }
        }
      },
      checkEmail(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.email-required')))
        } else {
          const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error(this.$t('sysuser.email-format')))
          }
        }
      },
      checkMobile(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.mobile-required')))
        } else {
          const reg = /^1\d{10}$/
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error(this.$t('sysuser.mobile-format')))
          }
        }
      },
      checkRoleId(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.roleId-required')))
        } else {
          callback()
        }
      },
      checkOrgId(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.orgId-required')))
        } else {
          callback()
        }
      },
      validateOrgId() {
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate('orgId')
        })
      },
      handleNodeClickOrgId(data) {
        this.orgName = data.title
        this.temp.orgId = data.id
        this.$refs.selectOrgId.blur()
        this.validateOrgId()
      },
      handleClearOrgId() {
        this.orgName = ''
        this.temp.orgId = ''
      }
    }
  }
</script>
<style>