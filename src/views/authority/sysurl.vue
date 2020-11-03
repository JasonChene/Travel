<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.typeName" placeholder="类别名" clearable class="filter-input filter-item"  @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        {{ $t('common.reset') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        {{ $t('common.add') }}
      </el-button>
      <el-button v-waves  type="primary" class="filter-item" @click="handleDownload">
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="id" prop="typeId" />
      <el-table-column label="类别名称" prop="typeName" />
      <el-table-column label="添加人" prop="typeAddAdminid">
      </el-table-column>

      <!-- 操作 -->
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" @click="handleUpdate(row)">
            <i class="el-icon-edit-outline" />
          </el-button>
          <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm"  :model="temp" :rules="rules" :label-position="labelPosition" label-width="90px" style="width: 100%">
        <el-form-item label="类别id"  prop="typeId">
          <el-input v-model="temp.typeId" placeholder="请输入id"  :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="类别名称"  prop="typeName">
          <el-input v-model="temp.typeName" placeholder="请输入课程名称"  minlength="3" maxlength="64" clearable />
        </el-form-item>
        <el-form-item  label="管理员id" >
          <el-input v-model="temp.typeAddAdminid" placeholder="请输入" :disabled="dialogStatus==='update'||dialogStatus==='create'" minlength="6" maxlength="31" clearable />
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
import { findNewsTypeByCondition,addNewsType,deleteNewsTypeById,deleteNewsTypeByIds,updateNewsType,findNewsTypeByName,exportNewsType} from '../../api/authority'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { deleteCourseById, deleteCourseByIds, exportCourse, updateCourse } from '../../api/course'
import { saveAs } from 'file-saver'

export default {
  name: 'DataPermission',
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
        typeName:"",
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
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add')
      },
      rules: {
        typeName: [{ required: true, validator: this.checkTypeName, trigger: ['blur', 'change'] }],
        typeId: [{ required: true, validator: this.checkTypeId, trigger: ['blur', 'change'] }],
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    getList() {
      this.listLoading = true
      findNewsTypeByCondition(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    findByName(){
      this.listLoading = true
      findNewsTypeByName(this.listQuery.typeName).then(res => {
        this.list = res.data
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.typeName = ''
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
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = {}
          tempData.typeId = this.temp.typeId
          tempData.typeName = this.temp.typeName
          updateNewsType(tempData).then(response => {
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
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addNewsType(this.temp).then(response => {
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
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.typeId) {
          deleteNewsTypeById(row.typeId).then(response => {
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
            deleteNewsTypeByIds(this.multipleSelection.map(item => { return item.typeId}).join(',')).then(response => {
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
      exportNewsType(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.sysurl') + '.xls')
      })
      this.downloadLoading = false
    },
    checkTypeName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysuser.username-required')))
      }else {
        callback()
      }
    },
    checkTypeId(rule, value, callback) {
      if (!value) {
        return callback(new Error("选择任课老师"))
      }else {
        callback()
      }
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
    }
  }
}
</script>
<style>
  .el-drawer__header {
    padding: 10px;
  }
</style>
