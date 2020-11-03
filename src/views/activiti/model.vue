<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.courseName" placeholder="课程名" clearable class="filter-input filter-item"  @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.courseStatus" placeholder="审核状态" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.display_name" :value="item.value" />
      </el-select>
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
        prop="courseName"
        label="课程名称"
      >
      </el-table-column>
      <el-table-column
        label="课程状态"
        sortable
        width="100">
        <template slot-scope="scope">
          {{scope.row.courseStatus?"开课中":"未开课"}}
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="courseAddman"
        label="添加人"
      >
      </el-table-column>
      <el-table-column
        width="100"
        prop="teacherId"
        label="老师id"
      >
      </el-table-column>
      <el-table-column
        width="200"
        sortable
        prop="courseAddtime"
        label="添加时间"
      >
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
            <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)">
              <i class="el-icon-delete" />
            </el-button>
          <el-button size="mini" slot="reference" type="primary" style="margin-left: 10px"  @click="findComment(row)" >
            <i class="el-icon-view"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog width="40%" :title="textMap[dialogStatus]"   :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item label="课程名称" prop="courseName" >
          <el-input v-model="temp.courseName" placeholder="请输入课程名称"  minlength="3" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="课程状态" prop="courseStatus" >
          <el-select    v-model="temp.courseStatus"   placeholder="请选择" >
            <el-option v-for="item in statusOptions"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="添加人" >
          <el-input v-model="temp.courseAddman" placeholder="请输入" :disabled="dialogStatus==='update' ||'create'" minlength="6" maxlength="31" clearable />
        </el-form-item>
        <el-form-item label="老师"  prop="teacherId">
         <el-select v-model="temp.teacherId" placeholder="请选择">
           <el-option v-for="item in tId"
                      :key="item.teacherId"
                      :label="item.teacherName"
                      :value="item.teacherId"></el-option>
         </el-select>
        </el-form-item>
        <el-form-item label="添加时间" >
          <el-input v-if="dialogStatus==='create'" v-model="temp.courseAddtime=nowTime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'create'" maxlength="100" clearable >
          </el-input>
          <el-input  v-else  v-model="temp.courseAddtime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'create'" maxlength="100" clearable >
          </el-input>
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
    <el-dialog width="40%" title="评论" :visible.sync="dFormVisible">
    <el-table
      :key="tKey"
      v-loading="lLoading"
      :data="review"
      border
      fit
      highlight-current-row
      style="width:100%">
      <el-table-column type="selection" width="200">
       课程id: {{course}}
      </el-table-column>
      <el-table-column
      sortable
      prop="cCommentId"
      label="评论id"
      width="200"
    >
    </el-table-column>

      <el-table-column
        prop="cCommentContent"
        label="评论内容"
        width="500"
      >
      </el-table-column>
<!--        <el-table-column :label="$t('common.operate')" align="center">-->
<!--          <template slot-scope="{row,$index}">-->

<!--            <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)">-->
<!--              <i class="el-icon-delete" />-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
    </el-table>
  </el-dialog>

  </div>
</template>

<script>
  import {findCourseByCondition,deleteCourseById,deleteCourseByIds,addCourse,updateCourse,findCourseCommentById,getTeacherId,exportCourse} from '../../api/course'
  import {deleteGenerator} from '../../api/devtool'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'

  export default {
    name: 'Course',
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
        username:'',
        course:"",
        nowTime:1,
        tableKey: 0,
        tKey: 0,
        labelPosition: 'right',
        list: [],
        tId:{},
        review:{},
        total: 0,
        listLoading: true,
        lLoading:true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          // username: undefined,
          // status: undefined,
          // sorter: 'createTime_descend'
          courseName:undefined,
          courseStatus:undefined,
        },
        roleIdOptions: [],
        orgIdOptions: [],
        orgName: '',
        statusOptions: [
          { key: '1', display_name: "开课中",value:true},
          { key: '0', display_name: "未开课",value:false}
        ],
        temp: {
          // id: undefined,
          // status: 1,
          // prefix: '86'
          courseId:"",
        },
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: this.$t('common.edit'),
          create: this.$t('common.add')
        },
        rules: {
          courseName: [{ required: true, validator: this.checkCourseName, trigger: ['blur', 'change'] }],
          teacherId: [{ required: true, validator: this.checkTeacherId, trigger: ['blur', 'change'] }],
          courseStatus: [{ required: true, validator: this.checkCourseStatus, trigger: ['blur', 'change'] }],
        },
        dFormVisible:false,
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
      // 获取当前时间函数
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        this.nowTime = year + '-' + month + '-' + date + ' ' + hh + ':' + mm + ':' + ss
        // console.log(this.temp.courseAddtime);
      },
// 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,30*1000);
      },
      handleClick(row) {
        console.log(row);
      },
      getList() {
        this.listLoading = true
        findCourseByCondition(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
        })
        //   this.roleIdOptions = response.data
        // })
        // querySysOrgTree().then(response => {
        //   this.orgIdOptions = response.data.list
        // })
      },
      handleFilter() {
        this.listQuery.currentPage = 1
        this.getList()
      },
      handleReset() {
        // this.listQuery.username = ''
        // this.listQuery.status = ''
        this.listQuery.courseStatus=''
        this.listQuery.courseName=''
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
          // id: undefined,
          // status: 1,
          // prefix: '86'
        }
      },
      getTeacher(){
        // console.log(this.$store.getters.user)
        getTeacherId().then(res=>{
          this.tId=res.data
        })
      },
      handleCreate() {
        this.getTeacher()
        this.resetTemp()
        this.nowTimes()
        this.orgName = ''
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            // if(this.temp.courseName!=null&&this.temp.teacherId!=null){
            addCourse(this.temp).then(response => {
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
        //   else {
        //   this.$message({
        //     message: "数据不完整",
        //     type: 'warning',
        //     duration: 2000
        //   })
        // }
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.getTeacher()
        // this.orgName = this.temp.orgIdCn
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = {}
            tempData.courseId = this.temp.courseId
            tempData.courseName = this.temp.courseName
            tempData.courseStatus = this.temp.courseStatus
            tempData.courseAddman = this.temp.courseAddman
            tempData.teacherId = this.temp.teacherId
            updateCourse(tempData).then(response => {
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
          if (row.courseId) {
            findCourseCommentById(row.courseId).then(res=>{
              this.review=res.data
              deleteGenerator(this.review.map(item => { return item.cCommentId}).join(',')).then(res=>{
                deleteCourseById(row.courseId).then(response => {
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
              })
            })
          } else {
            if (this.multipleSelection.length === 0) {
              this.handleWarning(this.$t('common.choose-delete'))
              return
            }
            this.$confirm(this.$t('common.confirm-batch-delete'), this.$t('common.batch-delete'), {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deleteCourseByIds(this.multipleSelection.map(item => { return item.courseId}).join(',')).then(response => {
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
            }).catch(() => {})
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
       handleDownload() {
        this.downloadLoading = true
        const listQueryData = {}
        listQueryData.courseNAme=""
        listQueryData.courseStatus=""
        exportCourse(qs.stringify(listQueryData)).then(response => {
          saveAs(response, this.$t('route.model') + '.xls')
        })
        this.downloadLoading = false
      },

      findComment(row){
        this.course=row.courseId
        this.dFormVisible = true
        this.lLoading=true
        findCourseCommentById(row.courseId).then(res=>{
          this.review=res.data
          this.lLoading=false
        })
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
      checkCourseName(rule, value, callback) {
        if (!value) {
          return callback(new Error(this.$t('sysuser.username-required')))
        }else {
          callback()
        }
      },
      checkTeacherId(rule, value, callback) {
        if (!value) {
          return callback(new Error("选择任课老师"))
        }else {
          callback()
        }
      },
      checkCourseStatus(rule, value, callback) {
        if (value==null) {
          return callback(new Error("选择课程状态"))
        }else {
          callback()
        }
      },
    }
  }
</script>
<style>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
