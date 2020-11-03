<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.consultationPersonName" placeholder="咨询人" clearable class="filter-input filter-item"  @keyup.enter.native="handleFilter" />
<!--      <el-select v-model="listQuery.courseStatus" placeholder="解答人" clearable class="filter-input filter-item" @keyup.enter.native="handleFilter" >-->
<!--        <el-option v-for="item in statusOptions" :key="item.value" :label="item.display_name" :value="item.value" />-->
<!--      </el-select>-->
      <el-button v-waves type="primary" class="filter-item" icon="el-icon-search" @click="handleFilter">
        {{ $t('common.query') }}
      </el-button>
      <el-button type="primary" icon="el-icon-refresh-right" class="filter-item" @click="handleReset">
        重置
      </el-button>
      <el-button v-waves :loading="downloadLoading" type="primary" class="filter-item" @click="handleDownload">
        <svg-icon icon-class="excel" style="margin-right: 5px" />
        {{ $t('common.export') }}
      </el-button>
      <el-button type="danger" plain class="filter-item" icon="el-icon-delete" @click="handleDelete">
        {{ $t('common.delete') }}
      </el-button>
      <el-button type="primary" icon="el-icon-refresh-right" class="filter-item" @click="handleUp">
        审核
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column label="咨询内容" prop="title" />
      <el-table-column label="解答" prop="consultationResolve" />
      <el-table-column label="咨询人" prop="consultationPersonName" />
      <el-table-column label="解答老师" prop="teacherId" />
      <el-table-column label="添加时间" min-width="100px" prop="addtime" sortable />
      <el-table-column label="审核状态" >
        <template slot-scope="scope">
          {{scope.row.reviewStatus?"通过":"未通过"}}
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column :label="$t('common.operate')" align="center">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="warning" @click="handleUpdate(row)">
            审核
          </el-button>
          <el-button size="mini" slot="reference" type="danger" style="margin-left: 10px" @click="handleDelete(row,$index)">
            <i class="el-icon-delete" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
  import {findConsultByCondition,deleteConsultById,deleteConsultByIds,updateConsult,updateConsults,exportConsult} from '../../api/consult'
  import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
  import qs from 'qs'
  import { saveAs } from 'file-saver' // secondary package based on el-pagination

export default {
  name: 'Consult',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      consultation:{
        consultationId:undefined,
        reviewStatus:undefined,
      },
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
        consultationPersonName:undefined
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
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.add'),
        click: "查看"
      },
      rules: {
        roleCode: [{ required: true, validator: this.checkRoleCode, trigger: ['blur', 'change'] }],
        roleName: [{ required: true, validator: this.checkRoleName, trigger: ['blur', 'change'] }]
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

    getList() {
      this.listLoading = true
      findConsultByCondition(this.listQuery).then(response => {
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
      // this.listQuery.roleName = ''
      this.listQuery.consultationPersonName=''
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
      this.multipleSelection=[]
      for(let i=0;i<val.length;i++) {
        this.consultation.consultationId=val[i].consultationId
        if (val[i].reviewStatus) {
          this.consultation.reviewStatus = false
        } else {
          this.consultation.reviewStatus = true
        }
        this.multipleSelection.push(this.consultation)
        this.consultation={}
      }
      console.log(this.multipleSelection)
    },
    resetTemp() {
      this.temp = {
        // id: undefined
      }
    },
    getView(row){
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'click'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.$confirm('此操作将改变审核状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tempData = {}
        tempData.consultationId = this.temp.consultationId
        console.log(this.temp.reviewStatus)
        if(this.temp.reviewStatus){
          tempData.reviewStatus = false
        }else {
          tempData.reviewStatus=true
        }
        console.log(tempData.reviewStatus)
        updateConsult(tempData).then(response => {
          if (response.message === 'success') {
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
      }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消修改'
      });
    });
    },
    handleUp(){
      if (this.multipleSelection.length === 0) {
        this.handleWarning(this.$t('common.choose-delete'))
        return
      }
      this.$confirm('此操作将改变审核状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateConsults(this.multipleSelection).then(response => {
          if (response.message === 'success') {
            this.multipleSelection=[],
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    handleDelete(row, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (row.consultationId) {
         deleteConsultById(row.consultationId).then(response => {
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
            deleteConsultByIds(this.multipleSelection.map(item => { return item.consultationId}).join(',')).then(response => {
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
     exportConsult(qs.stringify(listQueryData)).then(response => {
        saveAs(response, this.$t('route.consult') + '.xls')
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
    checkRoleCode(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysrole.roleCode-required')))
      } else {
        callback()
      }
    },
    checkRoleName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('sysrole.roleName-required')))
      } else {
        callback()
      }
    }
  }
}
</script>
