<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="学院名" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
<!--      <el-input v-model="listQuery.serviceName" :placeholder="$t('generator.serviceName')" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />-->
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        刷新
      </el-button>
      <el-button type="primary" class="filter-item" icon="el-icon-plus" @click="handleCreate">
        新增
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        导出
      </el-button>
      <el-button type="danger" plain class="filter-item" icon="el-icon-delete" @click="handleDelete">
        删除
      </el-button>
    </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column type="selection" width="35" />
        <el-table-column
          sortable
          prop="order"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="college"
          label="学院名称"
          width="180">
        </el-table-column>
        <el-table-column
        prop="teachernum"
        label="教师人数"
        width="180">
      </el-table-column>
        <el-table-column
          prop="student"
          sortable
          label="学生"
          width="180">
        </el-table-column>

        <el-table-column :label="$t('common.operate')" align="center">-->
          <template slot-scope="{row,$index}">
            <el-button size="mini" type="primary" @click="handleUpdate(row)">
              <i class="el-icon-edit-outline" />
            </el-button>
              <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)" >
                <i class="el-icon-delete" />
              </el-button>
          </template>
        </el-table-column>
      </el-table>

    <pagination :total="11" :page.sync="currentPage"  :page-size="pagesize"/>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" style="width: 70% ; margin:auto">
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 90% ; margin:auto">
        <el-form-item label="序号" prop="order">
          <el-input  v-model="temp.order" :placeholder="$t('common.enter')"  :disabled="dialogStatus==='update'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="学院名称" prop="college">
<!--          <el-input v-model="temp.college" :placeholder="$t('common.enter')" maxlength="64" clearable />-->
          <el-select v-model="temp.college" clearable placeholder="请选择">
            <el-option label="计科院" value="计科院"></el-option>
            <el-option label="石工院" value="石工院"></el-option>
            <el-option label="理学院" value="理学院"></el-option>
            <el-option label="电信院" value="电信院"></el-option>
            <el-option label="机电院" value="机电院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教师人数" prop="college">
          <el-input v-model="temp.teachernum" :placeholder="$t('common.enter')" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="学生人数" prop="college">
          <el-input v-model="temp.student" :placeholder="$t('common.enter')"  maxlength="64" clearable />
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

export default {
  name: 'College',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      pagesize:9,//每页的数据条数
      currentPage:1,//默认开始页面
      ableKey: 0,
      labelPosition: 'right',

      temp: {
        id: undefined
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: "修改院系信息",
        create: "新增院系"
      },
      downloadLoading: false,
      tableData: [{
        order: '2',
        college: '石工院',
        teachernum:'200',
        student:'3000',
      },{
        order: '4',
        college: '地科院',
        teachernum:'150',
        student:'2000',
      },{
        order: '5',
        college: '计科院',
        teachernum:'200',
        student:'2500',
      }, {
        order: '3',
        college: '电信院',
        teachernum:'300',
        student:'1200',
      }, {
        order: '1',
        college: '机电院',
        teachernum:'200',
        student:'2200',
      }, {
        order: '7',
        college: '艺术院',
        teachernum:'200',
        student:'2000',
      }]
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
      queryGenerator(this.listQuery).then(response => {
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
        id: undefined
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
    // createData() {
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       addGenerator(this.temp).then(response => {
    //         if (response.message === 'success') {
    //           this.list.unshift(this.temp)
    //           this.dialogFormVisible = false
    //           this.$message({
    //             message: this.$t('common.add-success'),
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.handleReset()
    //         } else {
    //           this.handleWarning(response)
    //         }
    //       })
    //     }
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
    // updateData() {
      // this.$refs['dataForm'].validate((valid) => {
        // if (valid) {
        //   // const tempData = Object.assign({}, this.temp)
        //   const tempData = {}
        //   tempData.id = this.temp.id
        //   tempData.moduleName = this.temp.moduleName
        //   tempData.serviceName = this.temp.serviceName
        //   tempData.packageName = this.temp.packageName
        //   tempData.entityName = this.temp.entityName
        //   tempData.tableName = this.temp.tableName
        //   tempData.idName = this.temp.idName
        //   updateGenerator(tempData).then(response => {
        //     if (response.message === 'success') {
        //       this.dialogFormVisible = false
        //       this.$message({
        //         message: this.$t('common.edit-success'),
        //         type: 'success',
        //         duration: 2000
        //       })
        //       this.handleReset()
        //     } else {
        //       this.handleWarning(response)
        //     }
        //   })
        // }
      // })
    // },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      // if (row.id) {
      //   this.delete(row.id)
      // } else {
      //   if (this.multipleSelection.length === 0) {
      //     this.handleWarning(this.$t('common.choose-delete'))
      //     return
      //   }
      //   this.$confirm(this.$t('common.confirm-batch-delete'), this.$t('common.batch-delete'), {
      //     confirmButtonText: this.$t('common.confirm'),
      //     cancelButtonText: this.$t('common.cancel'),
      //     type: 'warning'
      //   }).then(() => {
      //     this.delete(this.multipleSelection.map(item => { return item.id }).join(','))
      //   }).catch(() => {})
      // }
    },
    // delete(deleteArray) {
    //   deleteGenerator(deleteArray).then(response => {
    //     if (response.message === 'success') {
    //       this.$message({
    //         message: this.$t('common.delete-success'),
    //         type: 'success',
    //         duration: 2000
    //       })
    //       this.handleReset()
    //     } else {
    //       this.handleWarning(response)
    //     }
    //   })
    // },
    // handleGenerateClick() {
    //   if (this.multipleSelection.length === 0) {
    //     this.handleWarning(this.$t('generator.choose-generate'))
    //     return
    //   }
    //   generateResource(this.multipleSelection.map(item => { return item.id }).join(',')).then(response => {
    //     saveAs(response, this.$t('generator.generate') + '.zip')
    //   })
    // },
    // handleDownload() {
    //   this.downloadLoading = true
    //   const listQueryData = {}
    //   listQueryData.moduleName = this.listQuery.moduleName
    //   listQueryData.serviceName = this.listQuery.serviceName
    //   exportGenerator(qs.stringify(listQueryData)).then(response => {
    //     saveAs(response, this.$t('route.generator') + '.xlsx')
    //   })
    //   this.downloadLoading = false
    // },
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
