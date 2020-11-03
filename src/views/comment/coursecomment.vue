<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="评论人id" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-refresh-right" @click="handleReset">
        刷新
      </el-button>
      <el-button type="danger" plain class="filter-item" icon="el-icon-delete" @click="handleDelete">
        删除
      </el-button>
    </div>
    <!--表格显示    -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="selection" width="35" />
      <el-table-column
        sortable
        prop="review"
        label="评论"
        width="240">
      </el-table-column>
      <el-table-column
        sortable
        prop="id"
        label="评论id"
        width="150">
      </el-table-column>
      <el-table-column
        prop="reviewer"
        label="评论人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="reviewtime"
        sortable
        label="评论时间"
        width="100">
      </el-table-column>
      <el-table-column
        prop="auditstatus"
        label="审核状态"
        width="100">
      </el-table-column>\
      <el-table-column
        prop="auditer"
        label="审核人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="audittime"
        sortable
        label="审核时间"
        width="100">
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" style="width: 70% ; margin:auto" >
      <el-form ref="dataForm" :rules="rules" :model="temp" :label-position="labelPosition" label-width="90px" style="width: 90% ; margin:auto">
        <el-form-item label="评论" prop="review">
          <el-input  v-model="temp.review" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'click'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论id" prop="id" >
          <el-input  v-model="temp.id" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'click'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论人" prop="reviewer">
          <el-input v-model="temp.reviewer" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'click'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="评论时间" prop="reviewtime">
          <el-input v-model="temp.reviewtime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'click'" maxlength="64" clearable />
        </el-form-item>
        <el-form-item label="审核状态" prop="auditstatus">
<!--          <el-input v-model="temp.auditstatus" :placeholder="$t('common.enter')" :disabled="dialogStatus==='click'" maxlength="64" clearable />-->
          <el-select v-model="temp.auditstatus" clearable placeholder="请选择" :disabled="dialogStatus==='click'">
            <el-option label="通过" value="通过"></el-option>
            <el-option label="不通过" value="不通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人" prop="auditer">
<!--          <el-input v-model="temp.auditer" :placeholder="$t('common.enter')" :disabled="dialogStatus==='click'" maxlength="64" clearable />-->
          <el-select v-model="temp.auditer" clearable placeholder="请选择" :disabled="dialogStatus==='click'">
            <el-option label="赵彬" value="赵彬"></el-option>
            <el-option label="陈龙" value="陈龙"></el-option>
            <el-option label="高俊龙" value="高俊龙"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间" prop="audittime">
          <el-input v-model="nowTime" :placeholder="$t('common.enter')" :disabled="dialogStatus==='update'||'click'" maxlength="256" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button >
          {{ $t('common.cancel') }}
        </el-button>
        <el-button type="primary" >
          {{ $t('common.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import { queryGenerator, addGenerator, updateGenerator, deleteGenerator, generateResource, exportGenerator } from '@/api/devtool'
  import waves from '@/directive/waves' // waves directive
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  import qs from 'qs'
  import { saveAs } from 'file-saver'

  export default {
    name: 'Classreview',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        nowTime:1,
        pagesize: 9,
        currentPage: 1,
        ableKey: 0,
        labelPosition: 'right',

        temp: {
          id: undefined
        },
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: "修改课程评论",
          click: "查看评论信息"
        },
        downloadLoading: false,
        tableData: [{
          review: '课程有很多新知识，对我帮助很多',
          id: '2017310624289889',
          reviewer: '陈龙',
          reviewtime: '2020/9/15',
          auditstatus: '通过',
          auditer:'赵彬',
          audittime: '2020/9/16'
        },{
          review: '此课程是入门课程',
          id: '20173106717496851',
          reviewer: '赵彬',
          reviewtime: '2020/9/15',
          auditstatus: '通过',
          auditer:'高俊龙',
          audittime: '2020/9/16'
        },{
          review: '非常不错的课程',
          id: '20173116674',
          reviewer: '陈龙',
          reviewtime: '2020/9/15',
          auditstatus: '通过',
          auditer:'高俊龙',
          audittime: '2020/9/16'
        },{
          review: '这个课程十分不错',
          id: '20173106248948',
          reviewer: '世界近代史',
          reviewtime: '2020/9/15',
          auditstatus: '通过',
          auditer:'撒旦撒',
          audittime: '2020/9/16'
        },{
          review: '课程对学入门帮助很大',
          id: '2017310624884',
          reviewer: '阿斯顿撒',
          reviewtime: '2020/9/15',
          auditstatus: '通过',
          auditer:'大飒飒',
          audittime: '2020/9/16'
        }]
      }
    },
    created() {
      if (window.innerWidth < 700) {
        this.labelPosition = 'top'
      }
      this.nowTimes();
      this.getList()
    },
    mounted() {
      this.nowTimes();
    },
    methods: {
      // 获取当前时间函数
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        this.nowTime = year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        // console.log(this.nowTime);
      },
// 定时器函数
      nowTimes(){
        this.timeFormate(new Date());
        setInterval(this.nowTimes,30*1000);
      },
      // getList() {
      //   this.listLoading = true
      //   queryGenerator(this.listQuery).then(response => {
      //     this.list = response.data.list
      //     this.total = response.data.pagination.total
      //     this.listLoading = false
      //   })
      // },
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
