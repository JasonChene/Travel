(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb25a180"],{"340f":function(e,t,a){"use strict";a.d(t,"e",(function(){return i})),a.d(t,"f",(function(){return l})),a.d(t,"c",(function(){return r})),a.d(t,"d",(function(){return o})),a.d(t,"g",(function(){return s})),a.d(t,"b",(function(){return c})),a.d(t,"a",(function(){return u}));var n=a("b775");function i(){return Object(n["a"])({url:"/api/competetion/competetion/findTeacherInfo",method:"get"})}function l(e){return Object(n["a"])({url:"/api/competetion/competetion/getCompetetionListFuzzy",method:"get",params:e})}function r(){return Object(n["a"])({url:"/api/competetion/competetion/findAllLevel",method:"get"})}function o(e){return Object(n["a"])({url:"/api/competetion/competetion/findCompetetionByCondition",method:"get",params:e})}function s(e){return Object(n["a"])({url:"/api/competetion/competetion/updateCompetetion",method:"put",data:e})}function c(e){return Object(n["a"])({url:"/api/competetion/competetion/deleteCompetetionByIds",method:"post",params:{id:e}})}function u(e){return Object(n["a"])({url:"/api/competetion/competetion/addCompetetion",method:"post",data:e})}},"7db0":function(e,t,a){"use strict";var n=a("23e7"),i=a("b727").find,l=a("44d2"),r=a("ae40"),o="find",s=!0,c=r(o);o in[]&&Array(1)[o]((function(){s=!1})),n({target:"Array",proto:!0,forced:s||!c},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),l(o)},c092:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-select",{staticClass:"filter-input filter-item",attrs:{placeholder:e.$t("选择审核状态"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.declareStatus,callback:function(t){e.$set(e.listQuery,"declareStatus",t)},expression:"listQuery.declareStatus"}},e._l(e.lelveOptions2,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),a("el-input",{staticClass:"filter-input filter-item",attrs:{placeholder:e.$t("项目名称"),clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.projectName,callback:function(t){e.$set(e.listQuery,"projectName",t)},expression:"listQuery.projectName"}}),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v(" "+e._s(e.$t("common.query"))+" ")]),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleCreate}},[e._v(" "+e._s(e.$t("common.add"))+" ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary"},on:{click:e.handleDownload}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"excel"}}),e._v(" "+e._s(e.$t("导入"))+" ")],1),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary"},on:{click:e.handleDownload}},[a("svg-icon",{staticStyle:{"margin-right":"5px"},attrs:{"icon-class":"excel"}}),e._v(" "+e._s(e.$t("common.export"))+" ")],1),a("el-button",{staticClass:"filter-item",attrs:{type:"danger",plain:"",icon:"el-icon-delete"},on:{click:e.handleDelete}},[e._v(" "+e._s(e.$t("common.delete"))+" ")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{"row-key":"id",data:e.list,border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"50"}}),a("el-table-column",{attrs:{prop:"declareId",label:"申请ID",width:"170"}}),a("el-table-column",{attrs:{prop:"pId",label:"项目ID"}}),a("el-table-column",{attrs:{prop:"projectName",label:"参赛项目",width:"150"}}),a("el-table-column",{attrs:{prop:"competetionName",label:"竞赛名称",width:"280"}}),a("el-table-column",{attrs:{prop:"declareTime",formatter:e.dateFormat,label:"申请时间",width:"155"}}),a("el-table-column",{attrs:{prop:"studentName",label:"申请人",width:"80"}}),a("el-table-column",{attrs:{prop:"declareStatus",width:"100",label:"申请状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[!0===t.row.declareStatus?a("el-tag",{attrs:{type:"success"}},[e._v("通过")]):!1===t.row.declareStatus?a("el-tag",{attrs:{type:"danger"}},[e._v("待审核")]):e._e()]}}])}),a("el-table-column",{attrs:{prop:"teacherName",label:"负责教师",width:"80"}}),a("el-table-column",{attrs:{label:e.$t("common.operate"),align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,i=t.$index;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(n)}}},[a("i",{staticClass:"el-icon-edit-outline"})]),a("el-button",{attrs:{slot:"reference",type:"danger",size:"mini"},on:{click:function(t){return e.handleDelete(n,i)}},slot:"reference"},[a("i",{staticClass:"el-icon-delete"})])]}}])})],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.currentPage,limit:e.listQuery.pageSize},on:{"update:page":function(t){return e.$set(e.listQuery,"currentPage",t)},"update:limit":function(t){return e.$set(e.listQuery,"pageSize",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:"update"===e.dialogStatus?"修改":"新增",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"100%"},attrs:{rules:e.rules,model:e.temp,"label-position":e.labelPosition,"label-width":"90px"}},[a("el-form-item",{attrs:{label:"学生学号",prop:"sId"}},[a("el-select",{attrs:{filterable:"",placeholder:"请输入"},on:{change:e.getStudentName},model:{value:e.temp.sId,callback:function(t){e.$set(e.temp,"sId",t)},expression:"temp.sId"}},e._l(e.studentList,(function(e){return a("el-option",{key:e.value,attrs:{value:e.value,label:e.value}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("申报人:"),prop:"studentName"}},[a("el-input",{attrs:{type:"text",minlength:"3",maxlength:"64",clearable:""},model:{value:e.temp.studentName,callback:function(t){e.$set(e.temp,"studentName",t)},expression:"temp.studentName"}})],1),a("el-form-item",{attrs:{label:"项目号",prop:"pId"}},[a("el-select",{attrs:{filterable:""},on:{change:e.getProjectName},model:{value:e.temp.pId,callback:function(t){e.$set(e.temp,"pId",t)},expression:"temp.pId"}},e._l(e.projectList,(function(e){return a("el-option",{key:e.value,attrs:{value:e.value}})})),1)],1),"update"===e.dialogStatus?a("el-form-item",{attrs:{label:"项目名称",prop:"projectName"}},[a("el-input",{attrs:{minlength:"3",maxlength:"64",clearable:""},model:{value:e.temp.projectName,callback:function(t){e.$set(e.temp,"projectName",t)},expression:"temp.projectName"}})],1):e._e(),a("el-form-item",{attrs:{label:"竞赛列表",prop:"cId"}},[a("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.temp.cId,callback:function(t){e.$set(e.temp,"cId",t)},expression:"temp.cId"}},e._l(e.competetionList,(function(e){return a("el-option",{key:e.competetionId,attrs:{label:e.competetionName,value:e.competetionId}})})),1)],1),a("el-form-item",{attrs:{label:e.$t("申报时间:"),prop:"declareTime"}},["create"===e.dialogStatus?a("el-input",{attrs:{disabled:"create"===e.dialogStatus,maxlength:"64",clearable:""},model:{value:e.temp.declareTime=e.nowTime,callback:function(t){e.$set(e.temp,"declareTime=nowTime",t)},expression:"temp.declareTime=nowTime"}}):a("el-input",{attrs:{disabled:"update"===e.dialogStatus},model:{value:e.temp.declareTime,callback:function(t){e.$set(e.temp,"declareTime",t)},expression:"temp.declareTime"}})],1),a("el-form-item",{attrs:{label:"负责教师",prop:"tId"}},[a("el-select",{attrs:{placeholder:"请选择",filterable:""},model:{value:e.temp.tId,callback:function(t){e.$set(e.temp,"tId",t)},expression:"temp.tId"}},e._l(e.teacherList,(function(e){return a("el-option",{key:e.teacherId,attrs:{label:e.teacherName,value:e.teacherId}})})),1)],1),a("el-form-item",{attrs:{label:"审核状态",prop:"declareStatus"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.temp.declareStatus,callback:function(t){e.$set(e.temp,"declareStatus",t)},expression:"temp.declareStatus"}},e._l(e.statusList,(function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" "+e._s(e.$t("common.cancel"))+" ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v(" "+e._s(e.$t("common.confirm"))+" ")])],1)],1)],1)},i=[],l=(a("7db0"),a("a15b"),a("d81d"),a("50fc"),a("6724")),r=a("333d"),o=a("4328"),s=a.n(o),c=a("21a6"),u=a("d7d1"),d=a("b775");function m(){return Object(d["a"])({url:"/api/competetiondeclare/competetiondeclare/findAllCompetetion",method:"get"})}function p(e){return Object(d["a"])({url:"/api/competetiondeclare/competetiondeclare/addCompetetionDeclare",method:"post",data:e})}function h(e){return Object(d["a"])({url:"/api/competetiondeclare/competetiondeclare/updateCompetetionDeclare",method:"put",data:e})}function f(e){return Object(d["a"])({url:"/api/student/student/findAllStudents",method:"get",params:e})}function g(e){return Object(d["a"])({url:"api/competetiondeclare/competetiondeclare/deleteCompetetionDeclareByIds",method:"post",params:{declareId:e}})}function b(e){return Object(d["a"])({url:"/api/competetiondeclare/competetiondeclare/findCompetetionDeclareByCondition",method:"get",params:e})}function v(e){return Object(d["a"])({url:"/api/competetiondeclare/competetiondeclare/exportCompetetionDeclare",method:"post",responseType:"blob",data:e})}function y(){return Object(d["a"])({url:"/api/student/student/findStudentAll",method:"get"})}function w(){return Object(d["a"])({url:"/api/projects/project/findProjectAll",method:"get"})}var I=a("340f"),k={name:"SysMenu",components:{Pagination:r["a"]},directives:{waves:l["a"]},filters:{statusFilter:function(e){var t={1:"success",0:"danger"};return t[e]}},data:function(){return{lelveOptions:[{value:"“互联网+”社会服务",label:"“互联网+”社会服务"}],lelveOptions2:[{value:!0,label:"审核通过"},{value:!1,label:"待审核"}],labelPosition:"right",list:[],conditionListQuery:{currentPage:1,pageSize:10,declarestatus:void 0,projectName:void 0},studentList:[],statusList:[{label:"审核通过",value:!0},{label:"审核不通过",value:!1}],teacherList:[],testParams:{id:"11"},testData:[],projectList:[],nullvalue:"",total:0,listLoading:!0,competetionList:[],listQuery:{currentPage:1,pageSize:10,declareStatus:void 0,projectName:void 0},multipleSelection:[],parentIdOptions:[],parentName:"",checkedMenuButtonList:[],menuButtonList:[],nowTime:1,temp:{id:void 0,menuStatus:1},dialogFormVisible:!1,dialogStatus:"",textMap:{update:this.$t("common.edit"),create:this.$t("common.add")},rules:{cId:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],declareStatus:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],declareTime:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],pId:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],projectName:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],sId:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],studentName:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}],tId:[{required:!0,validator:this.checkIsNull,trigger:["blur","change"]}]},downloadLoading:!1}},created:function(){window.innerWidth<700&&(this.labelPosition="top"),this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,b(this.listQuery).then((function(t){e.list=t.data.list,e.total=t.data.pagination.total,e.listLoading=!1})),m().then((function(t){e.competetionList=t.data})),Object(I["e"])().then((function(t){e.teacherList=t.data,console.log(e.teacherList)})),y().then((function(t){e.studentList=t.data})),w().then((function(t){e.projectList=t.data}))},getStudentName:function(e){var t={};t=this.studentList.find((function(t){return t.value===e}));var a="";a=t.studentName,this.temp.studentName=a,console.log(a)},getProjectName:function(e){var t={};t=this.projectList.find((function(t){return t.value===e}));var a="";a=t.projectName,this.temp.projectName=a,console.log(a)},querySearchAsync:function(e,t){var a={id:e};f(a).then((function(e){t(e.data)}))},handleSelect:function(e){console.log(this.searchName,e)},timeFormate:function(e){var t=new Date(e).getFullYear(),a=new Date(e).getMonth()+1<10?"0"+(new Date(e).getMonth()+1):new Date(e).getMonth()+1,n=new Date(e).getDate()<10?"0"+new Date(e).getDate():new Date(e).getDate(),i=new Date(e).getHours()<10?"0"+new Date(e).getHours():new Date(e).getHours(),l=new Date(e).getMinutes()<10?"0"+new Date(e).getMinutes():new Date(e).getMinutes(),r=new Date(e).getSeconds()<10?"0"+new Date(e).getSeconds():new Date(e).getSeconds();return this.nowTime=t+"-"+a+"-"+n+" "+i+":"+l+":"+r,this.nowTime},nowTimes:function(){this.timeFormate(new Date),setInterval(this.nowTimes,3e4)},dateFormat:function(e,t,a){return a?u["format"](new Date(a),"yyyy-MM-dd HH:mm:ss"):""},handleFilter:function(){this.listQuery.currentPage=1,this.conditionListQuery.currentPage=1,this.getList()},handleReset:function(){this.listQuery.declareStatus="",this.listQuery.deploymentName="",this.handleFilter()},handleSelectionChange:function(e){this.multipleSelection=e},resetTemp:function(){this.temp={}},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){t&&p(e.temp).then((function(t){"success"===t.message?(e.list.unshift(e.temp),e.dialogFormVisible=!1,e.$message({message:e.$t("common.add-success"),type:"success",duration:2e3}),e.handleReset()):e.handleWarning(t)}))}))},handleCreate:function(){var e=this;this.resetTemp(),this.nowTimes(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},handleUpdate:function(e){var t=this;this.temp=Object.assign({},e),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var a={};a.declareId=e.temp.declareId,a.declareStatus=e.temp.declareStatus,a.declareTime=e.temp.declareTime,a.projectName=e.temp.projectName,a.studentName=e.temp.studentName,a.sId=e.temp.sId,a.teacherName=e.temp.teacherName,a.tId=e.temp.tId,a.cId=e.temp.cId,a.pId=e.temp.pId,a.projectType=e.temp.projectType,h(a).then((function(t){"success"===t.message?(e.dialogFormVisible=!1,e.$message({message:e.$t("common.edit-success"),type:"success",duration:2e3}),e.handleReset()):e.handleWarning(t)}))}}))},handleDelete:function(e,t){var a=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){if(e.declareId)a.delete(e.declareId);else{if(0===a.multipleSelection.length)return void a.handleWarning(a.$t("common.choose-delete"));a.$confirm(a.$t("common.confirm-batch-delete"),a.$t("common.batch-delete"),{confirmButtonText:a.$t("common.confirm"),cancelButtonText:a.$t("common.cancel"),type:"warning"}).then((function(){a.delete(a.multipleSelection.map((function(e){return e.declareId})).join(","))})).catch((function(){}))}})).catch((function(){a.$message({type:"info",message:"已取消删除"})}))},delete:function(e){var t=this;g(e).then((function(e){"success"===e.message?(t.$message({message:t.$t("common.delete-success"),type:"success",duration:2e3}),t.handleReset()):t.handleWarning(e)}))},handleDownload:function(){this.downloadLoading=!0;var e={};e.menuName=this.listQuery.menuName,e.menuPath=this.listQuery.menuPath,v(s.a.stringify(e)).then((function(e){Object(c["saveAs"])(e,"双创竞赛申请记录.xls")})),this.downloadLoading=!1},handleWarning:function(e){this.$message({message:e.message||e,type:"warning",duration:2e3})},validateParentId:function(){var e=this;this.$nextTick((function(){e.$refs["dataForm"].clearValidate("parentId")}))},handleNodeClickParentId:function(e){this.parentName=e.title,this.temp.parentId=e.id,this.$refs.selectParentId.blur(),this.validateParentId()},handleClearParentId:function(){this.parentName="",this.temp.parentId=""},checkMenuCode:function(e,t,a){if(!t)return a(new Error(this.$t("sysmenu.menuCode-required")));a()},checkMenuName:function(e,t,a){if(!t)return a(new Error(this.$t("sysmenu.menuName-required")));a()},checkIsNull2:function(e,t,a){if(!t)return a(new Error("内容不能为空"));a()},checkIsNull:function(e,t,a){if(!t)return a(new Error("内容不能为空"));a()},checkMenuPath:function(e,t,a){if(!t)return a(new Error(this.$t("sysmenu.menuPath-required")));a()}}},N=k,$=a("2877"),S=Object($["a"])(N,n,i,!1,null,null,null);t["default"]=S.exports}}]);