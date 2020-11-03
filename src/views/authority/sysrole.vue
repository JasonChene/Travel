<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.newsTitle" placeholder="标题" clearable class="filter-input filter-item"  @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.newsStatus" placeholder="审核状态" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.display_name" :value="item.value" />
      </el-select>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button type="primary" icon="el-icon-refresh-right" class="filter-item" @click="handleReset">
        重置
      </el-button>
      <el-button type="primary" icon="el-icon-plus" class="filter-item" @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button type="danger" plain icon="el-icon-delete" class="filter-item" @click="handleDelete">
        删除
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
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column
        width="200"
        prop="newsTitle"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="newsType"
        label="分类"
        width="80">
      </el-table-column>
      <el-table-column
      label="内容"
      >
        <template slot-scope="scope">
          <el-link type="primary"  @click="handleHref(scope.row.newsContent)">{{scope.row.newsContent}}</el-link>
        </template>
<!--        :href="scope.row.newsContent"-->
    </el-table-column>

      <el-table-column
        label="审核状态"
        width="100">
        <template slot-scope="scope">
          {{scope.row.newsStatus?"通过":"未通过"}}
        </template>
      </el-table-column>
      <el-table-column
        width="50"
        label="添加人"
        prop="newsAddTeacher" >
      </el-table-column>

      <el-table-column
        width="160"

        prop="newsAddtime"
        label="添加时间"
      >
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="180">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
          <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)">
            <i class="el-icon-delete" />
          </el-button>
          <el-button size="mini" slot="reference" type="primary" style="margin-left: 10px"  @click="getView(row)" >
            <i class="el-icon-view"/>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item label="资讯标题"  prop="newsTitle">
          <el-input v-model="temp.newsTitle" placeholder="请输入" minlength="3" maxlength="64" clearable />
        </el-form-item>
        <el-form-item  label="分类" prop="newsType">
          <el-select v-model="temp.newsType" placeholder="请选择"  @change="getNewsTypeId" >
            <el-option v-for="item in type"
                       :key="item.typeId"
                       :label="item.typeName"
                       :value="item.typeName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="内容" prop="newsContent">
          <el-input v-model="temp.newsContent" placeholder="请输入"  :rows="5"  clearable />
        </el-form-item>
        <el-form-item  label="添加人" >
            <el-input v-model="temp.newsAddTeacher" placeholder="请输入" :disabled="dialogStatus==='update'||dialogStatus==='create'"  minlength="6" maxlength="31" clearable />
        </el-form-item>
        <el-form-item  label="审核结果"  prop="newsStatus">
          <el-select   v-model="temp.newsStatus"   placeholder="请选择" >
            <el-option v-for="item in statusOptions"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="添加时间" >
          <el-input v-if="dialogStatus==='create'" ：v-model="temp.newsAddtime=nowTime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||dialogStatus==='create'" maxlength="100" clearable >
          </el-input>
          <el-input  v-else  v-model="temp.newsAddtime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||dialogStatus==='create'" maxlength="100" clearable >
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
<!--    查看详细信息-->
    <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="FormVisible">
    <el-form  :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
      <el-form-item label="资讯标题" >
        <el-input v-model="temp.newsTitle" placeholder="请输入" minlength="3" maxlength="64" clearable />
      </el-form-item>
      <el-form-item  label="分类" >
        <el-select v-model="temp.newsType" placeholder="请选择"  @change="getNewsTypeId" >
          <el-option v-for="item in type"
                     :key="item.typeId"
                     :label="item.typeName"
                     :value="item.typeName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="内容" >
        <el-input v-model="temp.newsContent" placeholder="请输入"  minlength="6" maxlength="31" clearable />
      </el-form-item>
      <el-form-item  label="添加人" >
        <el-select v-model="temp.newsAddTeacher" placeholder="请选择">
          <el-option v-for="item in tId"
                     :key="item.teacherId"
                     :label="item.teacherName"
                     :value="item.teacherId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="审核结果" >
        <el-select   v-model="temp.newsStatus"   placeholder="请选择" >
          <el-option v-for="item in statusOptions"
                     :key="item.key"
                     :label="item.display_name"
                     :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间" >
        <el-input v-if="dialogStatus==='create'" ：v-model="temp.newsAddtime=nowTime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||dialogStatus==='create'" maxlength="100" clearable >
        </el-input>
        <el-input  v-else  v-model="temp.newsAddtime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||dialogStatus==='create'" maxlength="100" clearable >
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible = false">
        {{ $t('common.cancel') }}
      </el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
  import {
    findNewsByCondition,
    addNews,
    updateNews,
    deleteNewsById,
    deleteNewsByIds,
    findNewsTypeAll,
    getTeacherId,
    exportNews
  } from '../../api/authority'
  import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'

export default {
  name: 'SysRole',
  components: { Pagination },
  directives: { waves },
  data() {

    return {

      list:[],
      tId:[],
      type:[],
      nowTime:1,
      tableKey: 0,
      labelPosition: 'right',
      total: 0,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        newsTitle:undefined,
        newsStatus:undefined
      },
      statusOptions: [
        { key: '1', display_name: "通过",value:true},
        { key: '0', display_name: "未通过",value:false}
      ],
      temp: {
        // id: undefined
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
      FormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add'),
        click: "查看"
      },
      rules: {
        newsContent:[{ required: true, validator: this.checkNewsContent, trigger: ['blur', 'change'] }],
        newsTitle: [{ required: true, validator: this.checkNewsTitle, trigger: ['blur', 'change'] }],
        newsType: [{ required: true, validator: this.checkNewsType, trigger: ['blur', 'change'] }],
        newsStatus: [{ required: true, validator: this.checkNewsStatus, trigger: ['blur', 'change'] }]
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
  methods: {
    handleHref(val){
      let reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
      if (!reg.test(val)) {
          this.$message({
            message: "这不是一个链接",
            type: 'warning',
            duration: 2000
          })
        }else {
        window.open(val)
      }
    },
    getNewsTypeId(val){
      let obj={}
      obj = this.type.find((item)=>{
        return item.typeName === val;
      });
      let getId = ''
      getId = obj.typeId;
      this.temp.newsTypeId=getId
      console.log(getId)
    },
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
    getType(){
      findNewsTypeAll().then(response => {
        this.type = response.data
        console.log(this.type)
      })
    },
    getList() {
      this.listLoading = true
      findNewsByCondition(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    getTeacher(){
      // console.log(this.$store.getters.user)
      getTeacherId().then(res=>{
        this.tId=res.data
      })
    },

    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      // this.listQuery.roleName = ''
      this.listQuery.newsStatus=''
      this.listQuery.newsTitle=''
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
        // id: undefined
      }
    },
    getView(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'click'
      this.FormVisible = true
    },
    handleCreate() {
      this.getTeacher()
      this.getType()
      this.resetTemp()
      this.nowTimes()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.type.forEach(t => {
            if (t.typeName == this.temp.typeName) {
              this.temp.newsTypeId = t.typeId
            }
          })
          addNews(this.temp).then(response => {
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
      this.getTeacher()
      this.getType()
      this.temp = Object.assign({}, row) // copy obj
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
          tempData.newsId = this.temp.newsId
          tempData.newsTitle = this.temp.newsTitle
          tempData.newsType = this.temp.newsType
          tempData.newsContent = this.temp.newsContent
          tempData.newsStatus = this.temp.newsStatus
          updateNews(tempData).then(response => {
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
        if (row.newsId) {
          deleteNewsById(row.newsId).then(response => {
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
            deleteNewsByIds(this.multipleSelection.map(item => { return item.newsId}).join(',')).then(response => {
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
      exportNews(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.sysrole') + '.xls')
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
    checkNewsContent(rule, value, callback) {
      if (!value) {
        return callback(new Error("无法为空"))
      } else {
        callback()
      }
    },
    checkNewsTitle(rule, value, callback) {
      if (!value) {
        return callback(new Error("无法为空"))
      } else {
        callback()
      }
    },
    checkNewsType(rule, value, callback) {
      if (!value) {
        return callback(new Error("无法为空"))
      } else {
        callback()
      }
    },
    checkNewsStatus(rule, value, callback) {
      if (value==null) {
        return callback(new Error("无法为空"))
      } else {
        callback()
      }
    },
  }
}
</script>
