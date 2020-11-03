<template>
  <div class="app-container">
    <div class="filter-container">

      <el-select v-model="listQuery.competetionLevel" :placeholder="$t('选择赛事级别')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.label" />
      </el-select>

      <el-input v-model="listQuery.competetionName" :placeholder="$t('关键字')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="competetionName" label="赛事名称" width="300"></el-table-column>

      <el-table-column  prop="competetionLevel"  label="赛事级别"  width="130"></el-table-column>

      <el-table-column prop="competetionStarttime"  label="申报开始时间"></el-table-column>

      <el-table-column  prop="competetionEndtime"  label="申报结束时间"></el-table-column>

      <el-table-column  prop="competetionAddman"  label="添加人" width="150"></el-table-column>

      <el-table-column  prop="competetionAddtime"  label="添加时间"></el-table-column>

      <el-table-column  prop="competetionStatus"  label="审核状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.competetionStatus === true" type="success">通过审核</el-tag>
          <el-tag v-else-if="scope.row.competetionStatus === false" type="danger">待审核</el-tag>
        </template>
      </el-table-column>


      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="success" size="mini" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
          <el-button slot="reference" type="danger" size="mini" style="margin-left: 10px" @click="handleDelete(row,$index)">
              <i class="el-icon-delete" ></i>
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0"
                :total="total"

                :page.sync="listQuery.currentPage"
                :limit.sync="listQuery.pageSize"
                @pagination="getList" />



    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" :rules="rules" :label-position="labelPosition" label-width="90px" style="width: 100%">

        <el-form-item :label="$t('赛事名称')" prop="competetionName">
          <el-input v-model="temp.competetionName" :placeholder="$t('请输入')"   minlength="3" maxlength="64" clearable />
        </el-form-item>

        <el-form-item :label="$t('比赛级别:')" prop="competetionLevel" >
          <el-select v-model="temp.competetionLevel" :placeholder="$t('请选择')"  clearable style="width: 100%" >
            <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>

         <el-form-item :label="$t('开始时间:')" prop="competetionStarttime" >
           <div class="block">
             <el-date-picker
               value-format="yyyy-MM-dd HH:mm:ss"
               v-model="temp.competetionStarttime"
               type="datetime"
               placeholder="选择日期时间">
             </el-date-picker>
           </div>

        </el-form-item>
        <el-form-item :label="$t('结束时间:')" prop="competetionEndtime">
<!--          <el-input type="date" v-model="temp.competetionEndtime"    maxlength="64" clearable />-->
          <div class="block">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="temp.competetionEndtime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item  :label="$t('添加人:')" prop="competetionAddman">
          <el-input v-model="temp.competetionAddman" :placeholder="$t('请输入')"   maxlength="64"  clearable />
        </el-form-item>

        <el-form-item :label="$t('添加时间:')" >
          <el-input v-if="dialogStatus==='update'"  v-model="temp.competetionAddtime" :disabled="dialogStatus==='update'"  maxlength="64" clearable />
          <el-input  v-else v-model="temp.competetionAddtime=nowTime" maxlength="64" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责教师" prop="teacherId">
            <el-select v-model="temp.teacherId" placeholder="请选择">
              <el-option
                v-for="item in teacherList"
                :key="item.teacherId"
                :label="item.teacherName"
                :value="item.teacherId">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="审核状态"  prop="competetionStatus">


          <el-select v-model="temp.competetionStatus" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

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
import {
  addCompetetion,
  deleteCompetetion,
  findAllLevel,
  findCompetetionByCondition,
  getTeacherList,
  updateCompetetion
} from '../../api/competetion'
import{queryListByNameLevel} from '../../api/competetion'
import list from '../example/list'

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

      teacherList:[],
      nowTime:1,
      levelList:[],
      list: [],
      statusList:[{value:true,label:"审核通过"},
        {value: false,label: "待审核"}],
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        competetionName: undefined,
        competetionLevel: undefined,
        sorter: 'createTime_descend'
      },



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
        competetionName: [{ required: true, validator: this.checkCompetetionName, trigger: ['blur', 'change'] }],
        competetionLevel: [{ required: true,validator:this.checkCompetetionLevel,trigger: ['blur', 'change'] }],
        competetionStarttime: [{ required: true ,validator:this.checkTime,trigger: ['blur', 'change'] }],
        competetionEndtime: [{ required: true,validator:this.checkTime,trigger: ['blur', 'change'] }],
        competetionAddman: [{ required: true, validator:this.checkAddman ,trigger: ['change','blur' ]}],
        competetionAddtime: [{ required: true,validator:this.checkTime, trigger:  ['change','blur' ] }],
        competetionStatus: [{ required: true ,validator:this.checkSelect,trigger: ['change','blur' ]}],
        teacherId:[{required:true,validator:this.checkSelect,trigger:['change','blur']}]

      },
      downloadLoading: false
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.getList()
    // this.getTeacher()
  },
  methods: {
    queryList(){
      this.listLoading=true
      queryListByNameLevel(this.listQuery).then(response=>{
        this.list=response.data
        this.listLoading=false
      })
    },
    getList() {
      this.listLoading = true
      findCompetetionByCondition(this.listQuery).then(response => {
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
      getTeacherList().then(res=>{
        this.teacherList=res.data
        console.log(this.teacherList)
      })

      findAllLevel().then(res=>{
        this.levelList=res.data
      })


    },
    // getTeacher(){
    //   getTeacherList().then(response=>{
    //     this.teacherList=response.data
    //   })
    // },


    handleFilter() {
      this.listQuery.currentPage = 1
      this.queryList()
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
    },
// 定时器函数
    nowTimes(){
      this.timeFormate(new Date());
      setInterval(this.nowTimes,30*1000);
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
          addCompetetion(this.temp).then(response => {
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

      // this.orgName = this.temp.orgIdCn
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // if (this.$refs.selectOrgId.value) {
      //   this.validateOrgId()
      // }
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.competetionName = this.temp.competetionName
          tempData.competetionLevel= this.temp.competetionLevel
          tempData.competetionStarttime = this.temp.competetionStarttime
          tempData.competetionEndtime= this.temp.competetionEndtime
          tempData.competetionAddman = this.temp.competetionAddman
          tempData.competetionAddtime = this.temp.competetionAddtime
          tempData.competetionStatus = this.temp.competetionStatus
          tempData.competetionId=this.temp.competetionId

          tempData.teacherId=this.temp.teacherId
          updateCompetetion(tempData).then(response => {
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
      //   }
      // }
      // )
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.competetionId) {
          this.delete(row.competetionId)
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
            this.delete(this.multipleSelection.map(item => { return item.competetionId }).join(','))
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
      deleteCompetetion(deleteArray).then(response => {
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
      listQueryData.competetionName = this.listQuery.competetionName
      listQueryData.competetionLevel = this.listQuery.competetionLevel
      exportSysUser(qs.stringify(listQueryData)).then(response => {
        saveAs(response, "双创竞赛表" + '.xls')
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

    checkCompetetionName(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入比赛名称"))
      } else {
        if (value.length > 2 && value.length < 65) {
          callback()
        } else {
          return callback(new Error("名称长度应在2到25个字符之间"))
        }
      }
    },
    checkTime(rule,value,callback){
      if(!value){
        return callback(new Error("请输入时间"))
      }else{
        callback()
      }
    },
    checkCompetetionLevel(rule,value,callback){
      if(!value){
        return callback(new Error("请选择比赛等级"))
      }else
      {
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
    checkSelect(rule,value,callback){
      if(!value)
      {
        return callback(new Error("选择不能为空"))
      }else{
        callback()
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
    checkAddman(rule,value,callback){
      if(!value)
      {
        return callback(new Error("不能为空"))
      }else{
        callback()
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
