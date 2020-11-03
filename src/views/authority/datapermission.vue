<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.newsCommentAddman" placeholder="评论人" clearable class="filter-input filter-item"  @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.newsCommentStatus" placeholder="审核状态" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >
        <el-option v-for="item in statusOptions" :key="item.value" :label="item.display_name" :value="item.value" />
      </el-select>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        重置
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button type="danger" plain class="filter-item" icon="el-icon-delete" @click="handleDelete">
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
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40" />
      <el-table-column label="评论人" prop="newsCommentAddman" />
      <el-table-column label="评论内容" prop="newsCommentContent" fit />
      <el-table-column label="评论时间" min-width="100px" prop="newsCommentAddtime" sortable />
      <el-table-column label="审核处理">
        <template slot-scope="scope">
        {{scope.row.newsCommentStatus?scope.row.newsCommentStatus="通过":scope.row.newsCommentStatus="未通过"}}
        </template>
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" /> <el-dialog width="40%" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form ref="dataForm"  :model="temp" :label-position="labelPosition" label-width="90px" style="width: 100%">
      <el-form-item label="评论人" >
        <el-input v-model="temp.newsCommentAddman"   :disabled="dialogStatus==='update'" minlength="3" maxlength="64" clearable />
      </el-form-item>
      <el-form-item label="评论内容" >
        <el-input v-model="temp.newsCommentContent"   minlength="3" :disabled="dialogStatus==='update'" maxlength="64" clearable />
      </el-form-item>
      <el-form-item  label="评论时间" >
        <el-input v-model="temp.newsCommentAddtime"  :disabled="dialogStatus==='update'" minlength="6" maxlength="31" clearable />
      </el-form-item>
      <el-form-item  label="审核状态" >
        <el-select    v-model="temp.newsCommentStatus"   placeholder="请选择" >
          <el-option label="通过" value="true"></el-option>
          <el-option label="不通过" value="false"></el-option>
        </el-select>
    </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">
        {{ $t('common.cancel') }}
      </el-button>
      <el-button type="primary" @click="updateData">
        {{ $t('common.confirm') }}
      </el-button>
    </div>
  </el-dialog>

  </div>
</template>

<script>
  import {
    findNewsCommentByCondition,
    updateNewsComment,
    deleteNewsCommentById,
    deleteNewsCommentByIds,
    exportNewsComment
  } from '../../api/authority'
  import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
  import qs from 'qs'
  import { saveAs } from 'file-saver' // secondary package based on el-pagination

export default {
  name: 'SysUrl',
  components: { Pagination },
  directives: { waves },
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
        newsCommentAddman:undefined,
        newsCommentStatus:undefined
      },
      roleIdOptions: [],
      orgIdOptions: [],
      orgName: '',
      statusOptions: [
        { key: '1', display_name: "通过",value:true},
        { key: '0', display_name: "未通过",value:false}
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
      findNewsCommentByCondition(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.newsCommentAddman = ''
      this.listQuery.newsCommentStatus = ''
      this.handleFilter()
    },
    handleAuthorize(menuCode) {
      this.menuCode = menuCode
      queryRoleCode().then(response => {
        this.roleCodeList = response.data
      })
      queryDataFieldByMenuCode(menuCode).then(response => {
        this.roleFieldDataSourceList = response.data.list
        this.roleFieldDataSourceCount = response.data.count
      })
      this.drawerTableVisible = true
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetTemp() {
      this.temp = {
        // id: undefined
      }
    },
    // handleCreate() {
    //   this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
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
      tempData.newsCommentId=this.temp.newsCommentId
      tempData.newsCommentStatus=this.temp.newsCommentStatus
      updateNewsComment(tempData).then(response => {
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
    // createData() {
    //   addNewsType(this.temp).then(response => {
    //     if (response.message === 'success') {
    //       this.list.unshift(this.temp)
    //       this.dialogFormVisible = false
    //       this.$message({
    //         message: this.$t('common.add-success'),
    //         type: 'success',
    //         duration: 2000
    //       })
    //       this.handleReset()
    //     } else {
    //       this.handleWarning(response)
    //     }
    //   })
    // },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.newsCommentId) {
          deleteNewsCommentById(row.newsCommentId).then(response => {
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
            deleteNewsCommentByIds(this.multipleSelection.map(item => { return item.newsCommentId}).join(',')).then(response => {
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
      exportNewsComment(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.datapermission') + '.xls')
      })
      this.downloadLoading = false
    },

    checkRoleCode(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysmenu.roleCode-required')))
      } else {
        callback()
      }
    },
    checkDataField(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysmenu.dataField-required')))
      } else {
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
