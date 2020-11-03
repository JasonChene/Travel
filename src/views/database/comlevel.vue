<template>
  <div class="app-container">
    <div class="filter-container">

      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
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
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column
        prop="levelId"
        sortable
        label="分类ID">
      </el-table-column>
      <el-table-column
        prop="levelName"
        label="分类名称">
      </el-table-column>

      <el-table-column
        width="120"
        fixed="right"
        :label="$t('common.operate')" align="center">-->
        <template slot-scope="{row,$index}">

          <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)" >
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>


    </el-table>



    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">

        <el-form-item label="新增级别" prop="levelName">
          <el-input v-model="temp.levelName" :placeholder="$t('common.enter')"  minlength="3" maxlength="64" clearable />
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
  import { querySysUser, addSysUser, updateSysUser, queryRoleName, querySysOrgTree, deleteSysUser, exportSysUser } from '@/api/admin'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'
  import { addNewLib, deleteLib, exportLib, findAllOrg, findLibByCondition, updateLib } from '../../api/lib'
  import { addNewLevel, deleteLevel, findLevelByCondition } from '../../api/level'

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

        nowTime:1,
        tableKey: 0,
        labelPosition: 'right',
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          libName:undefined,
          orgId:undefined,
          sorter: 'createTime_descend'
        },

        statusOptions: [
          { key: '1', display_name: this.$t('common.able') },
          { key: '0', display_name: this.$t('common.disable') }
        ],
        temp: {
          id: undefined,
          status: 1,
          prefix: '86'
        },
        orgList:[],
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: this.$t('common.edit'),
          create: this.$t('common.add')
        },
        rules: {
          levelName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
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
      open() {
        this.$confirm('此操作将永久删除该实验室信息, 是否继续?', '提示', {
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
      handleClick(row) {
        console.log(row);
      },
      getList() {
        this.listLoading = true
        findLevelByCondition(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
        })
        findAllOrg().then(response=>{
          this.orgList=response.data
        })
      },

      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        this.nowTime = year + "-" + month + "-" + date +" "+hh+":"+mm +":"+ss;
        // console.log(this.nowTime);
        return this.nowTime
      },
// 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,30*1000);
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
        this.nowTimes()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid)=>{
          if (valid) {
        addNewLevel(this.temp).then(response => {
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


        // const tempData = Object.assign({}, this.temp)
        const tempData = {}

        tempData.libName=this.temp.libName
        tempData.adminName=this.temp.adminName
        tempData.adminId=this.temp.adminId
        tempData.libAbout=this.temp.libAbout
        tempData.libAddAdmin=this.temp.libAddAdmin
        tempData.libAddtime=this.temp.libAddtime
        tempData.libContact=this.temp.libContact
        tempData.libId=this.temp.libId
        tempData.libPrincipal=this.temp.libPrincipal
        tempData.orgName=this.temp.orgName


        // tempData.id = this.temp.id
        // tempData.username = this.temp.username
        // tempData.email = this.temp.email
        // tempData.mobile = this.temp.mobile
        // tempData.prefix = this.temp.prefix
        // tempData.roleId = this.temp.roleId
        // tempData.orgId = this.temp.orgId
        // tempData.status = this.temp.status
        updateLib(tempData).then(response => {
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.levelId) {
            this.delete(row.levelId)
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
              this.delete(this.multipleSelection.map(item => { return item.levelId }).join(','))
            }).catch(() => {})
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      delete(deleteArray) {
        deleteLevel(deleteArray).then(response => {
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
        listQueryData.libName = this.listQuery.libName
        listQueryData.orgId = this.listQuery.orgId
        exportLib(qs.stringify(listQueryData)).then(response => {
          saveAs(response, '实验室信息表' + '.xls')
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
      checkIsNull(rule,value,callback)
      {
        if (!value) {
          return callback(new Error(this.$t('sysuser.username-required')))
        } else {
          callback()
        }
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
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
