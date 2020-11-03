
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.declareStatus" :placeholder="$t('选择审核状态')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in lelveOptions2"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>

      <el-input v-model="listQuery.projectName" :placeholder="$t('项目名称')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>

      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('导入') }}
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
      v-loading="listLoading"
      row-key="id"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="declareId" label="申请ID" width="170"></el-table-column>
      <el-table-column prop="pId" label="项目ID" ></el-table-column>
      <el-table-column  prop="projectName"  label="参赛项目"   width="150"></el-table-column>
      <el-table-column  prop="competetionName"  label="竞赛名称"  width="280"></el-table-column>

      <el-table-column  prop="declareTime" :formatter="dateFormat" label="申请时间" width="155">

      </el-table-column>
      <el-table-column  prop="studentName"  label="申请人" width="80"></el-table-column>
      <el-table-column  prop="declareStatus"  width="100" label="申请状态">
        <template slot-scope="scope">
<!--          {{scope.row.declareStatus?"审核通过":"审核未通过"}}-->
          <el-tag v-if="scope.row.declareStatus === true" type="success">通过</el-tag>
          <el-tag v-else-if="scope.row.declareStatus === false" type="danger">待审核</el-tag>
        </template>
      </el-table-column>

      <el-table-column  prop="teacherName"  label="负责教师" width="80"></el-table-column>

      <el-table-column :label="$t('common.operate')" align="center" width="200">
        <template slot-scope="{row,$index}" >
          <el-button type="primary"  size="mini" @click="handleUpdate(row)">
          <i class="el-icon-edit-outline" ></i>
        </el-button>

          <el-button slot="reference" type="danger"  size="mini" @click="handleDelete(row,$index)">
            <i class="el-icon-delete" ></i>
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="dialogStatus==='update'?'修改':'新增'" :visible.sync="dialogFormVisible" >
     <el-form ref="dataForm"  :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">



       <el-form-item label="学生学号" prop="sId">
         <el-select v-model="temp.sId" filterable placeholder="请输入" @change="getStudentName" >
           <el-option
             v-for="item in studentList"
             :key="item.value"
             :value="item.value"
             :label="item.value"
           ></el-option>
         </el-select>


       </el-form-item>

        <el-form-item :label="$t('申报人:')"  prop="studentName">
          <el-input type="text" v-model="temp.studentName"  minlength="3" maxlength="64" clearable  />

        </el-form-item>






       <el-form-item label="项目号" prop="pId">
         <el-select v-model="temp.pId" filterable @change="getProjectName">
           <el-option
             v-for="item in projectList"
             :key="item.value"
             :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>

        <el-form-item v-if="dialogStatus==='update'" label="项目名称" prop="projectName" >
          <el-input  v-model="temp.projectName"  minlength="3" maxlength="64" clearable />
        </el-form-item>




       <el-form-item label="竞赛列表" prop="cId">
         <el-select v-model="temp.cId" placeholder="请选择" filterable>
           <el-option
             v-for="item in competetionList"
             :key="item.competetionId"
             :label="item.competetionName"
             :value="item.competetionId">
           </el-option>
         </el-select>
       </el-form-item>

        <el-form-item :label="$t('申报时间:')"  prop="declareTime">

          <el-input v-if="dialogStatus==='create'"  v-model="temp.declareTime=nowTime" :disabled="dialogStatus==='create'"   maxlength="64" clearable />
<!--          <el-input  v-else v-model="temp.declareTime=nowTime" :formatter="dateFormat" maxlength="64" clearable></el-input>-->
          <el-input v-else v-model="temp.declareTime" :disabled="dialogStatus==='update'"></el-input>
        </el-form-item>
       <el-form-item label="负责教师" prop="tId">
         <el-select v-model="temp.tId" placeholder="请选择" filterable>
           <el-option
             v-for="item in teacherList"
             :key="item.teacherId"
             :label="item.teacherName"
             :value="item.teacherId">
           </el-option>
         </el-select>
       </el-form-item>

       <el-form-item label="审核状态"  prop="declareStatus">

         <el-select v-model="temp.declareStatus" placeholder="请选择">
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
import { querySysMenu, addSysMenu, updateSysMenu, deleteSysMenu, querySysMenuTree, queryMenuButtonCheckbox, queryCheckedMenuButton, exportSysMenu } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import * as fecha from 'element-ui/lib/utils/date';
import {
  deleteDecalre, exportCompetetionDeclare, finAllStudentInfo, findAllProject,
  getCompetetionList,
  queryByCondition,
  queryDeclareByCondition
} from '../../api/competetiondeclare'
import { getTeacherList } from '../../api/competetion'
import {addCompetetionDeclare } from '../../api/competetiondeclare'
import {updateCompetetionDeclare} from '../../api/competetiondeclare'
import {getSuggestionInfo} from '../../api/competetiondeclare'

export default {
  name: 'SysMenu',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(menuStatus) {
      const statusMap = {
        1: 'success',
        0: 'danger'
      }
      return statusMap[menuStatus]
    }
  },
  data() {
    return {
      lelveOptions:[{value:'“互联网+”社会服务',label:'“互联网+”社会服务'}],
      lelveOptions2:[{value:true,label:'审核通过'},
                    {value:false,label:'待审核'}],
      labelPosition: 'right',
      // datalist:[{declarant:'李宇',name:'集结与传承优秀红色文化平台建设',sort:'“互联网+”社会服务',declareTime:'2020-1-1',dealwith:'审核通过'},
      //           {declarant:'张钰凡',name:'让车位更易寻，城区停车服务项目',sort:'“互联网+”社会服务',declareTime:'2020-1-1',dealwith:'审核通过'},
      //           {declarant:'王学城',name:'“寻易通”失物招领app',sort:'“互联网+”社会服务',declareTime:'2020-1-1',dealwith:'审核通过'},
      //           {declarant:'王杨',name:'““关爱医护”线上平台',sort:'“互联网+”社会服务',declareTime:'2021-1-2',dealwith:'审核通过'},
      //           {declarant:'钱宏伟',name:'“共享绿色能源',sort:'“互联网+”社会服务',declareTime:'2021-1-1',dealwith:'待审核'},
      //           {declarant:'邱雨洁',name:'“3D校园通',sort:'“互联网+”社会服务',declareTime:'2021-1-2',dealwith:'待审核'},
      //           {declarant:'杨宗文',name:'“爱享学教育辅导平台',sort:'“互联网+”社会服务',declareTime:'2021-1-2',dealwith:'待审核'}],
      list: [],
      conditionListQuery:{
        currentPage: 1,
        pageSize: 10,
        declarestatus:undefined,
        projectName:undefined
      },
      studentList:[],
      statusList:[
        {label:"审核通过",value:true},
        {label: "审核不通过",value: false}
      ],
      teacherList:[],

      testParams:{
        id:"11"
      },
      testData:[],
      projectList:[],

      nullvalue:'',
      total: 0,
      listLoading: true,
      competetionList:[],
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        declareStatus:undefined,
        projectName:undefined
      },
      multipleSelection: [],
      parentIdOptions: [],
      parentName: '',
      checkedMenuButtonList: [],
      menuButtonList: [],
      nowTime:1,
      temp: {
        id: undefined,
        menuStatus: 1
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        cId: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        declareStatus: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        declareTime: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        pId: [{ required: true ,validator: this.checkIsNull,trigger: ['blur', 'change']}],
        projectName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        sId: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        studentName: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        tId: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],

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
      queryDeclareByCondition(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
      getCompetetionList().then(response=>{
        this.competetionList=response.data

      })
      getTeacherList().then(res=>{
        this.teacherList=res.data
        console.log(this.teacherList)
      })
      finAllStudentInfo().then(res=>{
        this.studentList=res.data
      })
      findAllProject().then(res=>{
        this.projectList=res.data
      })
      // getSuggestionInfo(params).then(res=>{
      //   this.testData=res.data
      //   console.log(testData)
      // })
    },
    // getListByCondition(){
    //   this.listLoading = true
    //   queryByCondition(this.listQuery).then(response=>{
    //     this.list = response.data.list
    //     this.total = response.data.pagination.total
    //     this.listLoading = false
    //   })
    // },
    getStudentName(val){
      let obj={}
      obj = this.studentList.find((item)=>{
        return item.value === val;
      });
      let getName = ''
      getName = obj.studentName;
      this.temp.studentName=getName
      console.log(getName)
    },
    getProjectName(val){
      let obj={}
      obj = this.projectList.find((item)=>{
        return item.value === val;
      });
      let getName = ''
      getName = obj.projectName
      this.temp.projectName=getName
      console.log(getName)
    },


    querySearchAsync(queryString,cb){
        let params={id:queryString}
        getSuggestionInfo(params).then(response=>{
            cb(response.data)
        })
    },

    // querySearchNameAsync(queryS,callback){
    //     let params={studentName:queryS}
    //     getSuggestionName(params).then(response=>{
    //     callback(response.data)
    //     })
    // },




    handleSelect(item) {
      console.log(this.searchName, item);
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
    //列表日期时间格式化
    dateFormat(row, column, cellValue) {
      return cellValue ? fecha.format(new Date(cellValue), 'yyyy-MM-dd HH:mm:ss') : '';
    },
    // dateFormat(row, column, cellValue, index){
    //   const daterc = row[column.property]
    //   if(daterc!=null){
    //     const dateMat= new Date(parseInt(daterc.replace("/Date(", "").replace(")/", ""), 10));
    //     const year = dateMat.getFullYear();
    //     const month = dateMat.getMonth() + 1;
    //     const day = dateMat.getDate();
    //     const hh = dateMat.getHours();
    //     const mm = dateMat.getMinutes();
    //     const ss = dateMat.getSeconds();
    //     const timef= year + "/" + month + "/" + day + " " + hh + ":" + mm + ":" + ss;
    //     return timef;
    //   }
    //
    // },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.conditionListQuery.currentPage=1
      this.getList()
    },
    handleReset() {
      this.listQuery.declareStatus = ''
      this.listQuery.deploymentName = ''
      this.handleFilter()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetTemp() {
      this.temp = {
      }
    },
    createData() {

      this.$refs['dataForm'].validate((valid)=>{
        if (valid) {
      addCompetetionDeclare(this.temp).then(response => {
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
    handleCreate() {
      this.resetTemp()
      this.nowTimes()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {

      this.temp = Object.assign({}, row) // copy obj
      // this.temp.pId=this.temp.projectId
      // this.temp.sId=this.temp.studentId
      // this.temp.cId=this.temp.competetionId
      // this.temp.tId=this.temp.teacherId
      // this.declareStatus=this.temp.declareStatus
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()

      })
      // queryCheckedMenuButton(this.temp.menuCode).then(response => {
      //   this.checkedMenuButtonList = response.data
      // })

    },
    updateData() {

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.declareId = this.temp.declareId
          tempData.declareStatus = this.temp.declareStatus
          tempData.declareTime = this.temp.declareTime
          tempData.projectName = this.temp.projectName
          tempData.studentName = this.temp.studentName
          tempData.sId=this.temp.sId
          tempData.teacherName = this.temp.teacherName
          tempData.tId=this.temp.tId
          tempData.cId=this.temp.cId
          tempData.pId=this.temp.pId
          tempData.projectType = this.temp.projectType


            updateCompetetionDeclare(tempData).then(response => {
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
        if (row.declareId) {
          this.delete(row.declareId)
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
            this.delete(this.multipleSelection.map(item => { return item.declareId }).join(','))
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
      deleteDecalre(deleteArray).then(response => {
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
      listQueryData.menuName = this.listQuery.menuName
      listQueryData.menuPath = this.listQuery.menuPath
      exportCompetetionDeclare(qs.stringify(listQueryData)).then(response => {
        saveAs(response,'双创竞赛申请记录' + '.xls')
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
    validateParentId() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate('parentId')
      })
    },
    handleNodeClickParentId(data) {
      this.parentName = data.title
      this.temp.parentId = data.id
      this.$refs.selectParentId.blur()
      this.validateParentId()
    },
    handleClearParentId() {
      this.parentName = ''
      this.temp.parentId = ''
    },
    checkMenuCode(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysmenu.menuCode-required')))
      } else {
        callback()
      }
    },
    checkMenuName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysmenu.menuName-required')))
      } else {
        callback()
      }
    },

    checkIsNull2(rule,value,callback){
      if (!value) {
        return callback(new Error("内容不能为空"))
      } else {
        callback()
      }
    },


    checkIsNull(rule,value,callback){
      if (!value) {
        return callback(new Error("内容不能为空"))
      } else {
        callback()
      }
    },
    checkMenuPath(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysmenu.menuPath-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
