c
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.orgLevel" :placeholder="$t('请选择组织级别')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in lelveOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>

      <el-input v-model="listQuery.orgName" placeholder="组织名称" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.orgLocate" placeholder="归属" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />

      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>

      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
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
      <el-table-column prop="orgId" label="组织ID" width="300"></el-table-column>
      <el-table-column prop="orgName" label="组织名称" width="300"></el-table-column>
      <el-table-column  prop="orgCode"  label="组织代码"   width="150"></el-table-column>
      <el-table-column  prop="orgLevel"  label="组织级别"  width="200"></el-table-column>
      <el-table-column  prop="orgLocate"  label="组织归属"></el-table-column>



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

        <el-form-item label="组织名称"  prop="orgName">
          <el-input type="text" v-model="temp.orgName"  minlength="3" maxlength="64" clearable  />
        </el-form-item>

        <el-form-item label="组织代码" prop="orgCode">
          <el-input type="text" v-model="temp.orgCode"  minlength="3" maxlength="64" clearable  />
        </el-form-item>

        <el-form-item label="组织等级" prop="orgLevel">
          <el-select v-model="temp.orgLevel"  placeholder="请输入" @change="getStudentName" >
            <el-option
              v-for="item in lelveOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="组织归属" prop="orgLocate" >
          <el-input type="text" v-model="temp.orgLocate"  minlength="3" maxlength="64" clearable  />
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
  import { addOrg, deleteOrg, queryAllOrg, updateOrg } from '../../org'

  export default {

    data() {
      return {

        lelveOptions:[{value:"校级",label:'校级'},
          {value:"省级",label:'省级'},
          {value: "国家级",label: "国家级"}],
        labelPosition: 'right',
        list: [],
        conditionListQuery:{
          currentPage: 1,
          pageSize: 10,
          declarestatus:undefined,
          projectName:undefined
        },
        studentList:[],
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
          orgName:undefined,
          orgLevel:undefined,
          orgLocate:undefined
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
          orgCode: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          orgId: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
          orgLevel: [{ required: true, validator: this.checkIsNull, trigger: 'change' }],
          orgLocate:[{ required: true, validator: this.checkIsNull, trigger: 'change' }],
          orgName:[{ required: true, validator: this.checkIsNull, trigger: 'change' }],
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
        queryAllOrg(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
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
        addOrg(this.temp).then(response => {
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

        this.temp = Object.assign({}, row)

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
        tempData.orgName = this.temp.orgName
        tempData.orgCode = this.temp.orgCode
        tempData.orgLevel = this.temp.orgLevel
        tempData.orgLocate = this.temp.orgLocate
        tempData.orgId = this.temp.orgId



        updateOrg(tempData).then(response => {
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
          if (row.orgId) {
            this.delete(row.orgId)
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
              this.delete(this.multipleSelection.map(item => { return item.orgId }).join(','))
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
        deleteOrg(deleteArray).then(response => {
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


      checkIsNull(rule, value, callback) {
        if (!value) {
          return callback(new Error("内容不能为空"))
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
