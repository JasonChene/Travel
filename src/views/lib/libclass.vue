<template>
  <div class="app-container">
    <div class="filter-container">

        <el-select v-model="listQuery.orgId"  placeholder="请选择所属单位" clearable class="filter-input filter-item" >
          <el-option v-for="item in orgList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>

      <el-input v-model="listQuery.libName" placeholder="实验室名" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />

      <!--      <el-select v-model="listQuery.status" :placeholder="$t('sysuser.status')" clearable class="filter-input filter-item">-->
      <!--        <el-option v-for="item in statusOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
      <!--      </el-select>-->
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
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40">

      </el-table-column>
      <el-table-column
        prop="libId"
        sortable
        label="实验室ID">
      </el-table-column>
      <el-table-column
        prop="libName"
        label="实验室名称">
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="所属单位">
      </el-table-column>
      <el-table-column
        prop="libPrincipal"
        label="负责人"
        width="80">
      </el-table-column>
      <el-table-column
        prop="libContact"
        label="联系电话"
        width="110px"
      >
      </el-table-column>
      <el-table-column
        prop="libAbout"
        label="简介"
        width="500">
      </el-table-column>
      <el-table-column
        prop="adminName"
        label="添加人"
        width="60px">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="libAddtime"
        label="添加时间"
        width="160">
      </el-table-column>

      <el-table-column
        width="120"
        fixed="right"
        :label="$t('common.operate')" align="center">-->
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
          <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)" >
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>

      <!--      <el-table-column-->
      <!--        fixed="right"-->
      <!--        label="操作"-->
      <!--        width="190">-->
      <!--        <div >-->
      <!--          <el-button type="danger"   size="mini" style="margin-left: 15px" @click="open">-->
      <!--            <i class="el-icon-delete" />删除</el-button>-->
      <!--          <el-button type="success" size="mini" @click="handleCreate">-->
      <!--            <i class="el-icon-edit-outline" />编辑</el-button>-->
      <!--        </div>-->
      <!--      </el-table-column>-->
    </el-table>



    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">

        <el-form-item label="实验室名称" prop="libName">
          <el-input v-model="temp.libName" :placeholder="$t('common.enter')"  minlength="3" maxlength="64" clearable />
        </el-form-item>


        <el-form-item label="所属单位" prop="libOrg">
          <el-select v-model="temp.libOrg"  :placeholder="temp.orgName" clearable class="filter-input filter-item" >
            <el-option v-for="item in orgList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="负责人" prop="libPrincipal">
          <el-input v-model="temp.libPrincipal" :placeholder="$t('common.enter')" minlength="3" maxlength="64" clearable />

        </el-form-item>




        <el-form-item label="联系电话" prop="libContact">
          <el-row>

            <el-form-item prop="mobile">
              <el-input v-model="temp.libContact" :placeholder="$t('common.enter')" class="input-with-select" maxlength="20" clearable />
            </el-form-item>

          </el-row>
        </el-form-item>

        <el-form-item label="简介" prop="libAbout">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="temp.libAbout">
          </el-input>
        </el-form-item>

        <el-form-item label="添加人" prop="adminId" >
          <el-input v-model="temp.adminId" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />
        </el-form-item>

        <el-form-item label="添加时间"  prop="libAddtime">
          <el-input v-if="dialogStatus==='create'" v-model="temp.libAddtime=nowTime" :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />
          <el-input v-else v-model="temp.libAddtime" :disabled="dialogStatus==='update'"  minlength="3" maxlength="64" clearable></el-input>
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
          pageSize: 5,
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
          adminName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          libAbout: [{ required: true, validator: this.checkIsNull,trigger: ['blur', 'change'] }],
          libAddAdmin: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          libContact: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          LibId: [{ required: true, validator: this.checkIsNull,trigger: ['blur', 'change'] }],
          libName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          libPrincipal: [{ required: true ,validator: this.checkIsNull,trigger: ['blur', 'change']}],
          orgName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }]
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
        findLibByCondition(this.listQuery).then(response => {
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
            addNewLib(this.temp).then(response => {
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
        this.$refs['dataForm'].validate((valid)=>{
          if (valid) {
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
            tempData.libOrg=this.temp.libOrg
            tempData.libPrincipal=this.temp.libPrincipal
            tempData.orgName=this.temp.orgName


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
          }
        })
      },
      handleDelete(row, index) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.libId) {
            this.delete(row.libId)
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
              this.delete(this.multipleSelection.map(item => { return item.libId }).join(','))
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
        deleteLib(deleteArray).then(response => {
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
      checkIsNull(rule, value, callback) {
        if (!value) {
          return callback(new Error("内容不能为空"))
        } else {
          callback()
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
