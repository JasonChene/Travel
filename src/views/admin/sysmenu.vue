<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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

    <!--表格显示 -->
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column type="selection" width="40"/>
      <el-table-column
        sortable
        prop="proId"
        label="项目id"
        width="100">
      </el-table-column>
      <el-table-column
        sortable
        prop="projectCommentContent"
        label="评论内容"
        width="260">
      </el-table-column>
      <el-table-column
        sortable
        prop="projectCommentAddman"
        label="评论人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="projectCommentAddtime"
        sortable
        label="评论时间"
        width="160"
        >
      </el-table-column>
      <el-table-column
        prop="projectCommentStatus"
        label="审核状态"
        width="100">
        <template slot-scope="scope">
          {{scope.row.projectCommentStatus?"审核通过":"审核不通过"}}
        </template>
      </el-table-column>
     
      <el-table-column :label="$t('common.operate')" align="center">-->
        <template slot-scope="{row,$index}">
          <el-button size="small" type="primary" @click="handleclick(row)">
            <i class="el-icon-view" />
          </el-button>
          <el-button size="small" type="warning" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
          <el-button size="small" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)" >
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    <pagination :total="11" :page.sync="currentPage"  :page-size="pagesize"/>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" style="width: 70% ; margin:auto">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 90% ; margin:auto">
        <el-form-item label="项目评论id" prop="projectCommentId">
          <el-input  v-model="temp.projectCommentId" :placeholder="$t('common.enter')" :disabled="dialogStatus==='create' ? false : true" maxlength="64" clearable />       
        </el-form-item>
        <el-form-item label="项目id" prop="proId">
          <el-input  v-model="temp.proId" :placeholder="$t('common.enter')" :disabled="dialogStatus==='create' ? false : true" maxlength="64" clearable />       
        </el-form-item>
        <el-form-item label="评论内容" prop="projectCommentContent">
          <el-input  v-model="temp.projectCommentContent" :placeholder="$t('common.enter')" :disabled="dialogStatus==='create' ? false : true" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论者id" prop="projectCommentAddmanid">
          <el-input v-model="temp.projectCommentAddmanid" :placeholder="$t('common.enter')" :disabled="dialogStatus==='create' ? false : true" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论者姓名" prop="projectCommentAddman">
          <el-input v-model="temp.projectCommentAddman" :placeholder="$t('common.enter')" :disabled="dialogStatus==='create' ? false : true" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论时间" prop="projectCommentAddtime">         
          <el-input v-if="dialogStatus==='create'"  v-model="temp.projectCommentAddtime=nowTime" :disabled="dialogStatus==='create'"   maxlength="64" clearable />
          <el-input v-else v-model="temp.projectCommentAddtime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="projectCommentStatus" >
          <el-select v-model="temp.projectCommentStatus" clearable placeholder="请选择" :disabled="dialogStatus==='click'">
            <el-option label="通过" value="通过"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
          <!--<el-input v-model="temp.auditstatus" :placeholder="$t('common.enter')" :disabled="dialogStatus==='click'" maxlength="64" clearable />-->
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
  //import { queryGenerator, addGenerator, updateGenerator, deleteGenerator, generateResource, exportGenerator } from '@/api/devtool'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'
  import { queryprocomAll, addProcom,updateProcom,deleteProcom} from '@/api/project_comment'

 

  export default {
    name: 'Coursereview',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        nowTime:1,
        pagesize: 9,
        currentPage: 1,
        tableKey: 0,
        labelPosition: 'right',
        temp: {
          // id: undefined
        },
        listLoading:'',
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          create:"新增评论",
          click: "查看评论信息",
          update: "修改课程评论"
        },
        downloadLoading: false,

      }
    },
    created() {
      if (window.innerWidth < 700) {
        this.labelPosition = 'top'
      }
   
      this.getList()
    },
    mounted() {

   
    },
    methods: {
      // 获取当前时间函数
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
      getList() {
        this.listLoading = true
        queryprocomAll().then(response => {
          this.list = response.data
          this.listLoading = false

          console.log(this.list)

        

        })


      },
      handleclick(row){
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'click'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
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
          
        }
      },
      handleSelectionChange(val) {

        this.multipleSelection = val
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
        if(this.temp.ccommentStatus=="通过"){
          this.temp.ccommentStatus=true

        }
        else{
          this.temp.ccommentStatus=false
        }
        addProcom(this.temp).then(response => {

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

        if(this.temp.ccommentStatus=="通过"){
          this.temp.ccommentStatus=true
        }
        else{
          this.temp.ccommentStatus=false
        }

        tempData.ccommentId = this.temp.ccommentId
        tempData.courseId = this.temp.courseId
        tempData.ccommentContent = this.temp.ccommentContent
        tempData.studentId = this.temp.studentId
        tempData.cCommentAddtime = this.temp.cCommentAddtime
        tempData.ccommentStatus = this.temp.ccommentStatus
        tempData.ccommentCheckman = this.temp.ccommentCheckman
        updateProcom(tempData).then(response => {
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
        if (row.projectCommentId) {

          this.$confirm(this.$t('common.confirm-batch-delete'), this.$t('common.batch-delete'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
            this.delete(row.projectCommentId)
          }).catch(() => {})

          //this.delete(row.ccommentId)
        } else {
          if (this.multipleSelection.length === 0) {
            console.log(this.multipleSelection)
            this.handleWarning(this.$t('common.choose-delete'))
            return
          }
          this.$confirm(this.$t('common.confirm-batch-delete'), this.$t('common.batch-delete'), {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }).then(() => {
            this.delete(this.multipleSelection.map(item => { return item.projectCommentId }).join(','))
            //this.delete(this.multipleSelection.map(item => { return item.ccommentId }))
          }).catch(() => {})
        }
      },
      delete(deleteArray) {
        deleteProcom(deleteArray).then(response => {
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
        generateResource(this.multipleSelection.map(item => { return item.ccommentId }).join(',')).then(response => {
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
