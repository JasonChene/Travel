<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.subjectName" placeholder="学科名称" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column type="selection" width="35" />
      <el-table-column
        sortable
        prop= "subjectId"
        label= "学科序号"
        width= "180">
      </el-table-column>
      <el-table-column
        prop= "subjectName"
        label= "学科名称"
        width= "180">
      </el-table-column>
      <el-table-column
        prop= "subjectTeachers"
        label= "教师人数"
        width= "180">
      </el-table-column>
      <el-table-column
        prop= "subjectStudents"
        sortable
        label= "学生"
        width= "180">
      </el-table-column>
      <el-table-column
        prop= "subjectClasses"
        sortable
        label= "班级数"
        width= "180">
      </el-table-column>
      <el-table-column
        prop= "subjectOrg"
        label= "所属院系">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('common.operate')" width="400px">
        <template slot-scope="{ row, $index }">
          <el-button
            type="success"
            icon="el-icon-edit"
            size="small"
            @click="handleUpdate(row)">
            {{ $t("common.edit")}}
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="handleDelete(row, $index)">
            {{ $t("common.delete") }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" 
      :page.sync="listQuery.currentPage" style="text-align:center;"
      :limit.sync="listQuery.pageSize" @pagination="getList()"/>
      
    <el-dialog :title="textMap[dialogStatus]" 
    :visible.sync="dialogFormVisible" 
    style="width: 70%; margin:auto">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 90% ; margin:auto">
        <el-form-item label="学科序号" prop="subjectId">
          <el-input  v-model="temp.subjectId" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="学科名称" prop="subjectName">
          <el-input v-model="temp.subjectName" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="教师人数" prop="subjectTeachers">
          <el-input v-model="temp.subjectTeachers" :placeholder="$t('common.enter')" maxlength="64"  clearable />
        </el-form-item>
        <el-form-item label="学生人数" prop="subjectStudents">
          <el-input v-model="temp.subjectStudents" :placeholder="$t('common.enter')" maxlength="64"  clearable />
        </el-form-item>
        <el-form-item label="班级数" prop="subjectClasses">
          <el-input v-model="temp.subjectClasses" :placeholder="$t('common.enter')" maxlength="64"  clearable />
        </el-form-item>
        <el-form-item label="所属院系" prop="subjectOrg">
          <el-input v-model="temp.subjectOrg" :placeholder="$t('common.enter')" maxlength="64"  clearable />
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
  import { queryGenerator, addGenerator, updateGenerator, deleteGenerator, generateResource, exportGenerator } from '@/api/devtool'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'
  import { findAllSubject, findSubjectByCondition,addSubjectInfo,updateSubjectInfo,deleteSubject,exportSubject} from '@/api/subject'
 
  export default {
    name: 'College',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        tableKey: 0,
        list:{},
        // pagesize: 10,//limit 每页记录数
        // currentPage: 1, //当前页
        total:0,//总记录数
        listLoading: true,
        listQuery: {
          currentPage: 1,
          pageSize: 10,
          subjectName: undefined,
          // menuName: undefined,
          // menuPath: undefined
        },
        ableKey: 0,
        labelPosition: 'right',
        temp: {
          // id: undefined
        },
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: "修改学科信息",
          create: "新增学科"
        },
        rules: {
          subjectId: [{ required: true, validator: this.checkSubjectId, trigger: ['blur', 'change'] }],
          subjectName: [{ required: true, validator: this.checkSubjectName, trigger: ['blur', 'change'] }],
          subjectTeachers: [{ required: true, validator: this.checkSubjectTeachers, trigger: ['blur', 'change'] }],
          subjectStudents: [{ required: true, validator: this.checkSubjectStudents, trigger: ['blur', 'change'] }],
          subjectClasses: [{ required: true, validator: this.checkSubjectClasses, trigger: ['blur', 'change'] }],
          subjectOrg: [{ required: true, validator: this.checkSubjectOrg, trigger: ['blur', 'change'] }]
        },
        downloadLoading: false,
      }
    },
    created() {
      if (window.innerWidth < 700) {
        this.labelPosition = 'top'
      }
      this.getPage()
    },
    methods: {
      getList() {
      this.listLoading = true
      findAllSubject().then(response => {
        this.list = response.data
        this.total = response.data.length
        this.listLoading = false
        console.log(this.list)
        console.log(this.total)
      })
      },
      getPage(){
        findSubjectByCondition(this.listQuery).then(response => {
          this.list = response.data.list
          this.total = response.data.pagination.total
          this.listLoading = false
          console.log(this.total)
        })
      },
      handleFilter() {
        this.listQuery.currentPage = 1
        this.getPage()
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
          // id: undefined
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        console.log(this.temp)
        addSubjectInfo(this.temp).then(response => {
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
      },
      updateData() {
        const tempData = {}
        tempData.subjectId = this.temp.subjectId
        tempData.subjectName = this.temp.subjectName
        tempData.subjectTeachers = this.temp.subjectTeachers
        tempData.subjectStudents = this.temp.subjectStudents
        tempData.subjectClasses = this.temp.subjectClasses
        tempData.subjectOrg = this.temp.subjectOrg
            console.log(tempData)
        updateSubjectInfo(tempData).then(response => {
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
        if (row.subjectId) {
          this.delete(row.subjectId)
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
            this.delete(this.multipleSelection.map(item => { return item.subjectId }).join(','))
          }).catch(() => {})
        }
      },
      delete(deleteArray) {
        deleteSubject(deleteArray).then(response => {
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
      listQueryData.subjectName = this.listQuery.subjectName
      // listQueryData.serviceName = this.listQuery.serviceName
      findSubjectByCondition(qs.stringify(listQueryData)).then(response => {
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
      checkSubjectId(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学科ID！'))
        } else {
          callback()
        }
      },
      checkSubjectName(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学科名字！'))
        } else {
          callback()
        }
      },
      checkSubjectTeachers(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学科的教师人数！'))
        } else {
          callback()
        }
      },
      checkSubjectStudents(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入学生人数！'))
        } else {
          callback()
        }
      },
      checkSubjectClasses(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入班级数！'))
        } else {
          callback()
        }
      },
      checkSubjectOrg(rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入所属的学科！'))
        } else {
          callback()
        }
      }
    }
  }
</script>
