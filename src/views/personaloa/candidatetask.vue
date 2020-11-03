<template>
  <div class="app-container">
     <div class="filter-container">
<!--     <el-select v-model="temp.regionType" :placeholder="$t('选择项目类别')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >-->
<!--        <el-option v-for="item in lelveOptions" :key="item.value" :label="item.name" :value="item.value" />-->
<!--      </el-select>-->
      <el-select v-model="listQuery.competetionCommentStatus" :placeholder="$t('选择审核状态')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in lelveOptions2" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
<!--      <el-input v-model="listQuery.menuPath" :placeholder="$t('关键字')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />-->
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
<!--      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">-->
<!--        {{ $t('common.add') }}-->
<!--      </el-button>-->
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
      <el-table-column prop="competetionCommentId"  label="评论ID"  width="150"></el-table-column>
      <el-table-column  prop="competetionName"  label="竞赛名称"  width="250"></el-table-column>
      <el-table-column  prop="competetionCommentContent"  label="评论内容" width="350"></el-table-column>
      <el-table-column  prop="competetionCommentAddman"  label="评论人" width="80"></el-table-column>
      <el-table-column  prop="competetionCommentAddtime"  label="评论时间"></el-table-column>

      <el-table-column  prop="adminName"  label="审核人"></el-table-column>
      <el-table-column  prop="competetionCommentStatus"  label="评论状态" width="80">
        <template slot-scope="scope">
          <!--          {{scope.row.competetionCommentStatus?"审核通过":"待审核"}}-->
          <el-tag v-if="scope.row.competetionCommentStatus === true" type="success">通过</el-tag>
          <el-tag v-else-if="scope.row.competetionCommentStatus === false" type="danger">待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center">
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
<!--        <el-form-item :label="$t('sysuser.username')" prop="username">-->
<!--          <el-input v-model="temp.username" :placeholder="请输入" :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />-->
<!--        </el-form-item>-->
        <el-form-item :label="$t('评论内容')" prop="competetionCommentContent">
          <el-input v-model="temp.competetionCommentContent" :placeholder="请输入"  minlength="3" maxlength="64" clearable />
        </el-form-item>
        <el-form-item :label="$t('评论人')" prop="level">
          <el-input v-model="temp.competetionCommentAddman" :placeholder="请输入" :disabled="dialogStatus==='update'"  clearable />
        </el-form-item>
        <el-form-item :label="$t('评论时间')" prop="level">
<!--          <el-input  v-model="temp.competetionCommentAddtime" :placeholder="请输入" :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />-->
          <el-input v-if="dialogStatus==='create'"  v-model="temp.competetionCommentAddtime=nowTime" :disabled="dialogStatus==='create'"   maxlength="64" clearable />
          <!--          <el-input  v-else v-model="temp.declareTime=nowTime" :formatter="dateFormat" maxlength="64" clearable></el-input>-->
          <el-input v-else v-model="temp.competetionCommentAddtime" :disabled="dialogStatus==='update'"></el-input>
        </el-form-item>
        <el-form-item :label="$t('状态')" prop="competetionCommentStatus">
<!--          <el-input  v-model="temp.competetionCommentStatus" :placeholder="请输入"  minlength="3" maxlength="64" clearable />-->

          <el-select v-model="temp.competetionCommentStatus" placeholder="请选择">
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
import { querySysOrg, queryOrgType, querySysOrgTree, addSysOrg, updateSysOrg, deleteSysOrg, exportSysOrg } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import {
  createComComment,
  deleteComComment,
  exportCompetetionComment,
  queryPageAll,
  queryStatus,
  updateComComment
} from '../../api/comcomment'

export default {
  name: 'SysOrg',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      // lelveOptions:[{value:'“互联网+”社会服务',label:'“互联网+”社会服务'}],
      lelveOptions2:[{value:true,label:'审核通过'},
                    {value:false,label:'待审核'}],
      labelPosition: 'right',
      // datalist:[{name:'三支首西南石油店',commentContent:'很好',commentator:'张钰凡',commentTime:'2020-1-1',status:'审核通过'},
      //           {name:'共享绿色能源',commentContent:'很好',commentator:'李宇',commentTime:'2020-1-1',status:'审核通过'},
      //           {name:'“视界”VR旅游',commentContent:'很好',commentator:'曹朔',commentTime:'2020-1-1',status:'审核通过'},
      //           {name:'“逐梦飞翔健康餐项目',commentContent:'很好',commentator:'杨洪鑫',commentTime:'2020-1-1',status:'审核通过'},
      //           {name:'“聚朋友',commentContent:'很好',commentator:'陈志强',commentTime:'2020-1-2',status:'待审核'},
      //           {name:'“冷冻干燥技术处理食品',commentContent:'很好',commentator:'文浩',commentTime:'2020-1-2',status:'待审核'},
      //           {name:'“衣物穿试模型平台',commentContent:'很好',commentator:'杨帆',commentTime:'2020-1-2',status:'待审核'}],
      list: [],
      total: 0,
      statusList:[{value:true,label:"审核通过"},
        {value: false,label: "待审核"}],
      listLoading: true,
      nowTime:'',
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        competetionCommentStatus:undefined
      },
      multipleSelection: [],
      orgTypeOptions: [],
      parentIdOptions: [],
      parentName: '',
      temp: {
        id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        competetionCommentContent: [{ required: true, validator: this.checkIsNull, trigger: ['blur', 'change'] }],
        competetionCommentStatus: [{ required: true, validator: this.checkIsNull, trigger: 'change' }]
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
      queryPageAll(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
      queryOrgType().then(response => {
        this.orgTypeOptions = response.data.list
      })
      querySysOrgTree().then(response => {
        this.parentIdOptions = response.data.list
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getQueryList()
    },
    getQueryList(){
      this.listLoading=true
      queryStatus(this.listQuery).then(response=>{
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    handleReset() {
      this.listQuery.orgName = ''
      this.listQuery.orgType = ''
      this.listQuery.orgDescription = ''
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
      this.nowTimes()
      this.parentName = ''
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {

      this.$refs['dataForm'].validate((valid)=>{
        if (valid) {


      // if (this.$refs.selectParentId.value) {
      //   this.validateParentId()
      // }
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     if (!this.temp.parentId) {
      //       this.temp.parentId = 0
      //     }

      createComComment(this.temp).then(response => {
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
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        if (this.temp.parentId === '0') {
          this.parentName = this.$t('common.choose')
        } else {
          this.parentName = this.$refs.treeParentId.getNode(this.temp.parentId).label
        }
      })
    },
    updateData() {
      // if (this.$refs.selectParentId.value) {
      //   this.validateParentId()
      // }
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.competetionCommentId= this.temp.competetionCommentId
          tempData.competetionCommentContent = this.temp.competetionCommentContent
          tempData.competetionCommentAddtime = this.temp.competetionCommentAddtime
          tempData.competetionCommentAddman = this.temp.competetionCommentAddman
          tempData.adminName = this.temp.adminName
          tempData.competetionCommentStatus= this.temp.competetionCommentStatus
          tempData.competetionName= this.temp.competetionName

      updateComComment(tempData).then(response => {
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
      // })
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
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.competetionCommentId) {
          this.delete(row.competetionCommentId)
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
            this.delete(this.multipleSelection.map(item => { return item.competetionCommentId }).join(','))
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
      deleteComComment(deleteArray).then(response => {
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
      exportCompetetionComment(qs.stringify(listQueryData)).then(response => {
        saveAs(response, '双创竞赛评论表' + '.xls')
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
    checkIsNull(rule, value, callback) {
      if (!value) {
        return callback(new Error("内容不能为空"))
      } else {
        callback()
      }
    },
    checkOrgType(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysorg.orgType-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
