export default {
  route: {
    'dashboard': 'Dashboard',
    'template': 'Template',
    'guide': 'Guide',
    'permission': 'Permission',
    'pagePermission': 'Page Permission',
    'rolePermission': 'Role Permission',
    'directivePermission': 'Directive Permission',
    'icons': 'Icons',
    'components': 'Components',
    'tinymce': 'Tinymce',
    'jsonEditor': 'JSON Editor',
    'dndList': 'Dnd List',
    'splitPane': 'SplitPane',
    'avatarUpload': 'Avatar Upload',
    'dropzone': 'Dropzone',
    'sticky': 'Sticky',
    'countTo': 'Count To',
    'componentMixin': 'Mixin',
    'backToTop': 'Back To Top',
    'dragDialog': 'Drag Dialog',
    'dragSelect': 'Drag Select',
    'dragKanban': 'Drag Kanban',
    'charts': 'Charts',
    'keyboardChart': 'Keyboard Chart',
    'lineChart': 'Line Chart',
    'mixChart': 'Mix Chart',
    'example': 'Example',
    'nested': 'Nested Routes',
    'menu1': 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    'menu2': 'Menu 2',
    'Table': 'Table',
    'dynamicTable': 'Dynamic Table',
    'dragTable': 'Drag Table',
    'inlineEditTable': 'Inline Edit',
    'complexTable': 'Complex Table',
    'tab': 'Tab',
    'form': 'Form',
    'createArticle': 'Create Article',
    'editArticle': 'Edit Article',
    'articleList': 'Article List',
    'errorPages': 'Error Pages',
    'page401': '401',
    'page404': '404',
    'errorLog': 'Error Log',
    'excel': 'Excel',
    'exportExcel': 'Export Excel',
    'selectExcel': 'Export Selected',
    'mergeHeader': 'Merge Header',
    'uploadExcel': 'Upload Excel',
    'zip': 'Zip',
    'pdf': 'PDF',
    'exportZip': 'Export Zip',
    'theme': 'Theme',
    'clipboardDemo': 'Clipboard',
    'i18n': 'I18n',
    'externalLink': 'External Link',
    'profile': 'Profile',
    'distributedlog': 'Distributed Log',
    'kibana': 'ELK Distributed Log',
    'monitors': 'Config Monitor',
    'sentinel': 'Sentinel Monitor',
    'nacos': 'Nacos Config Registry',
    'swagger': 'Swagger Interface Document',
    'authority': 'Authority Manage',
    'sysrole': 'Role Manage',
    'sysurl': 'URL Permission',
    'datapermission': 'Data Permission',
    'admin': 'System Manage',
    'sysuser': 'User Manage',
    'sysmenu': 'Menu Manage',
    'sysorg': 'Org Manage',
    'sysdict': 'Dict Manage',
    'sysregion': 'Region Manage',
    'sysparam': 'Param Manage',
    'appclient': 'App Manage',
    'tenant': 'Multi-tenancy',
    'systenant': 'Tenant Manage',
    'personaloa': 'Personal OA',
    'startprocess': 'Start Process',
    'myprocess': 'My Process',
    'myprocessdetails': 'My Process Details',
    'candidatetask': 'Candidate Task',
    'assigneetask': 'Assignee Task',
    'finishedtask': 'Finished Task',
    'mytaskdetails': 'My Task Details',
    'activiti': 'Workflow Manage',
    'model': 'Model Manage',
    'processdesign': 'Process Design',
    'deployment': 'Deployment Manage',
    'processdefinition': 'Process Definition',
    'processinstance': 'Process Instance',
    'execution': 'Process Instance Execution Path',
    'task': 'Process Instance Task',
    'taskdetails': 'Task Details',
    'historicprocessinstance': 'Process Instance History',
    'historicactivityinstance': 'Activity Execution History',
    'historicdetail': 'Process Activity Detail History',
    'historicvariableinstance': 'Process Instance Variable History',
    'historictaskinstance': 'Process Task History',
    'historictaskdetails': 'Task History Details',
    'devtool': 'Dev Tool',
    'generator': 'Code Generator'
  },
  navbar: {
    'dashboard': 'Dashboard',
    'github': 'Github',
    'logOut': 'Log Out',
    'profile': 'Profile',
    'theme': 'Theme',
    'size': 'Global Size'
  },
  login: {
    'title': 'Back-End Management Platform',
    'logIn': 'Login',
    'username': 'Username',
    'password': 'Password'
  },
  documentation: {
    'documentation': 'Documentation',
    'github': 'Github Repository'
  },
  permission: {
    'addRole': 'New Role',
    'editPermission': 'Edit',
    'roles': 'Your roles',
    'switchRoles': 'Switch roles',
    'tips': 'In some cases, using v-permission will have no effect. For example: Element-UI  el-tab or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.',
    'delete': 'Delete',
    'confirm': 'Confirm',
    'cancel': 'Cancel'
  },
  guide: {
    'description': 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    'button': 'Show Guide'
  },
  components: {
    'documentation': 'Documentation',
    'tinymceTips': 'Rich text is a core feature of the management backend, but at the same time it is a place with lots of pits. In the process of selecting rich texts, I also took a lot of detours. The common rich texts on the market have been basically used, and I finally chose Tinymce. See the more detailed rich text comparison and introduction.',
    'dropzoneTips': 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    'stickyTips': 'when the page is scrolled to the preset position will be sticky on the top.',
    'backToTopTips1': 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    'backToTopTips2': 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    'imageUploadTips': 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    'dynamicTips1': 'Fixed header, sorted by header order',
    'dynamicTips2': 'Not fixed header, sorted by click order',
    'dragTips1': 'The default order',
    'dragTips2': 'The after dragging order',
    'title': 'Title',
    'importance': 'Imp',
    'type': 'Type',
    'remark': 'Remark',
    'search': 'Search',
    'add': 'Add',
    'export': 'Export',
    'reviewer': 'reviewer',
    'id': 'ID',
    'date': 'Date',
    'author': 'Author',
    'readings': 'Readings',
    'status': 'Status',
    'actions': 'Actions',
    'edit': 'Edit',
    'publish': 'Publish',
    'draft': 'Draft',
    'delete': 'Delete',
    'cancel': 'Cancel',
    'confirm': 'Confirm'
  },
  example: {
    'warning': 'Creating and editing pages cannot be cached by keep-alive because keep-alive include does not currently support caching based on routes, so it is currently cached based on component name. If you want to achieve a similar caching effect, you can use a browser caching scheme such as localStorage. Or do not use keep-alive include to cache all pages directly. See details'
  },
  errorLog: {
    'tips': 'Please click the bug icon in the upper right corner',
    'description': 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    'documentation': 'Document introduction'
  },
  excel: {
    'export': 'Export',
    'selectedExport': 'Export Selected Items',
    'placeholder': 'Please enter the file name (default excel-list)'
  },
  zip: {
    'export': 'Export',
    'placeholder': 'Please enter the file name (default file)'
  },
  pdf: {
    'tips': 'Here we use window.print() to implement the feature of downloading PDF.'
  },
  theme: {
    'change': 'Change Theme',
    'documentation': 'Theme documentation',
    'tips': 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    'refresh': 'Refresh',
    'close': 'Close',
    'closeOthers': 'Close Others',
    'closeAll': 'Close All'
  },
  settings: {
    'title': 'Page style setting',
    'theme': 'Theme Color',
    'tagsView': 'Open Tags-View',
    'fixedHeader': 'Fixed Header',
    'sidebarLogo': 'Sidebar Logo'
  },
  common: {
    'yes': 'Yes',
    'no': 'No',
    'able': 'Able',
    'disable': 'Disable',
    'hide': 'Hide',
    'show': 'Show',
    'confirm': 'Submit',
    'cancel': 'Cancel',
    'return': 'Return',
    'save': 'Save',
    'save-success': 'Saved successfully, please deploy.',
    'enter': 'Please enter',
    'required': 'Required',
    'choose': 'Please choose',
    'choose-tooltip': 'If you do not choose the default as the root node',
    'create-time': 'Create Time',
    'operate': 'Operate',
    'export': 'Export',
    'query': 'Query',
    'reset': 'Reset',
    'view': 'View',
    'add': 'Add',
    'add-row': 'Add Row',
    'add-success': 'Added successfully',
    'edit': 'Edit',
    'edit-success': 'Edited successfully',
    'authorize': 'Authorize',
    'authorize-success': 'Authorize successfully',
    'verificationCode': 'Verification code',
    'verificationCode-required': 'Please enter the verification code!',
    'upload': 'Upload',
    'download': 'Download',
    'success': 'Success',
    'warning': 'Warning',
    'delete': 'Delete',
    'batch-delete': 'Batch Delete',
    'delete-success': 'Delete successfully',
    'choose-delete': 'Please check the records you want to delete!',
    'confirm-delete': 'Do you want to delete this record?',
    'confirm-batch-delete': 'Are you sure you want to delete these records?'
  },
  sysrole: {
    'roleCode': 'Role Code',
    'roleName': 'Role Name',
    'roleDescription': 'Role Description',
    'authorize-menu': 'Authorize Menu',
    'authorize-button': 'Authorize Button',
    'authorize-required': 'Please tick the data to authorize!',
    'authorize-buttontip': 'For better design, all buttons are displayed by default. Here you need to hide the buttons',
    'roleCode-required': 'Please enter the role code!',
    'roleName-required': 'Please enter the role name!'
  },
  sysurl: {
    'url': 'URL',
    'description': 'Description',
    'url-required': 'Please enter the url!',
    'url-role-required': 'Please check the role checkbox!'
  },
  sysuser: {
    'username': 'Username',
    'nickname': 'Nickname',
    'password': 'Password',
    'email': 'Email',
    'mobile': 'Mobile',
    'status': 'Status',
    'roleId': 'Role',
    'orgId': 'Belong Org',
    'username-required': 'Please enter your username!',
    'username-length': 'The minimum username length is 3 and the maximum is 64!',
    'password-required': 'Please enter your password!',
    'password-length': 'The minimum password length is 6 and the maximum is 31!',
    'email-required': 'Please enter your email!',
    'email-format': 'Please enter the correct email!',
    'prefix-required': 'Please select the country code!',
    'mobile-required': 'Please enter your phone number!',
    'mobile-format': 'Please enter the correct mobile!',
    'roleId-required': 'Please select the role!',
    'orgId-required': 'Please select the belong org!',
    'status-required': 'Please select the status!'
  },
  sysmenu: {
    'menuCode': 'Menu Code',
    'menuName': 'Menu Name',
    'menuIcon': 'Menu Icon',
    'menuPath': 'Menu Route',
    'menuComponent': 'Menu Component',
    'menuSequence': 'Menu Sequence',
    'menuParent': 'Superior Menu',
    'menuStatus': 'Menu Status',
    'menuButton': 'Menu Button',
    'dataTitle': 'Data Permissions',
    'dataFilter': 'Filter Data Fields, separated by commas (e.g. name, createTime)',
    'dataAdd': 'Add failed. Role code cannot be the same, please separate the filtering data fields with commas',
    'roleCode-required': 'Please select the role code!',
    'dataField-required': 'Please enter the filter data fields!',
    'menuCode-required': 'Please enter the menu code!',
    'menuName-required': 'Please enter the menu name!',
    'menuPath-required': 'Please enter the menu route!',
    'menuParent-required': 'Please select the superior menu!'
  },
  sysorg: {
    'orgType': 'Org Type',
    'orgName': 'Org Name',
    'orgDescription': 'Org Value',
    'orgSequence': 'Sequence',
    'orgParent': 'Superior Org',
    'orgName-required': 'Please enter the organization name!',
    'orgType-required': 'Please enter the organization type!',
    'orgParent-required': 'Please select the superior organization!'
  },
  sysdict: {
    'dictType': 'Dict Type',
    'dictName': 'Dict Name',
    'dictValue': 'Dict Value',
    'dictSequence': 'Sequence',
    'dictParent': 'Superior Dict',
    'dictType-required': 'Please enter the dictionary type!',
    'dictName-required': 'Please enter the dictionary name!',
    'dictValue-required': 'Please enter the dictionary value!',
    'dictParent-required': 'Please select the superior dictionary!'
  },
  sysregion: {
    'regionName': 'Region Name',
    'regionCode': 'Region Code',
    'regionType': 'Region Type',
    'regionParent': 'Superior Region',
    'regionName-required': 'Please enter the region name!',
    'regionName-length': 'The region name length is up to 40, at least 2',
    'regionCode-required': 'Please enter the region code!',
    'regionCode-length': 'The region code length is up to 20, at least 6',
    'regionCode-number': 'The region code must be a number',
    'regionType-required': 'Please select the region type!',
    'regionParent-required': 'Please select the superior region!'
  },
  sysparam: {
    'paramName': 'Param Name',
    'paramKey': 'Param Key',
    'paramValue': 'Param Value',
    'paramName-required': 'Please enter the param name!',
    'paramKey-required': 'Please enter the param key!'
  },
  appclient: {
    'clientCode': 'Client Code',
    'clientSecret': 'Client Secret',
    'authType': 'Auth Type',
    'authScope': 'Auth Scope',
    'tokenSeconds': 'Token Seconds',
    'refreshSeconds': 'Refresh Seconds',
    'fallbackUrl': 'Fallback Url',
    'clientDescription': 'Client Description',
    'clientCode-required': 'Please enter the client code!',
    'clientSecret-required': 'Please enter the client secret!',
    'authType-required': 'Please enter the auth type!',
    'authScope-required': 'Please enter the auth scope!',
    'tokenSeconds-required': 'Please enter the token seconds!',
    'refreshSeconds-required': 'Please enter the refresh seconds!',
    'fallbackUrl-required': 'Please enter the fallback url!'
  },
  systenant: {
    'tenantCode': 'Tenant Code',
    'tenantName': 'Tenant Name',
    'tenantContact': 'Contact',
    'tenantEmail': 'Email',
    'tenantTel': 'Tel',
    'tenantCode-required': 'Please enter the tenant code!',
    'tenantName-required': 'Please enter the tenant name!'
  },
  process: {
    'processDefinitionKey': 'Process Definition Key',
    'processDefinitionName': 'Process Definition Name',
    'processDefinitionResourcename': 'Process Resourcename',
    'processDefinitionVersion': 'Process Definition Version',
    'processDefinitionCategory': 'Process Definition Category',
    'processDefinition-suspendSuccess': 'Suspend process definition successfully',
    'processDefinition-activateSuccess': 'Activate process definition successfully',
    'processInstanceId': 'Process Instance ID',
    'processInstanceName': 'Process Instance Name',
    'processInstanceHistoric': 'Process Instance History',
    'processInstanceExecution': 'Process Instance Execution',
    'processInstance-suspendSuccess': 'Suspend process instance successfully',
    'processInstance-activateSuccess': 'Activate process instance successfully',
    'fold': 'Fold',
    'activity': 'Activity',
    'detail': 'Detail',
    'details': 'Details',
    'variable': 'Variable',
    'activate': 'Activate',
    'suspend': 'Suspend',
    'preview': 'Preview',
    'track': 'Track',
    'execution': 'Execution',
    'startUserId': 'Start UserId',
    'start': 'Start',
    'startProcess': 'Preview flowchart, support custom process form',
    'customField': 'Custom Field',
    'startSuccess': 'Start process successfully',
    'myProcess': 'Highlight the tracking process, showing the specific status of the current process node',
    'candidate': 'Candidate',
    'rangeTime': 'Range Time',
    'description': 'Description',
    'suspended': 'Suspended',
    'ended': 'Ended',
    'status': 'Process Status',
    'running': 'Running',
    'over': 'Over',
    'startTime': 'Start Time',
    'endTime': 'End Time',
    'comments': 'Comments',
    'executionId': 'Execution ID',
    'executionName': 'Execution Name',
    'activityId': 'Activity ID',
    'activityKey': 'Activity Key ',
    'activityName': 'Activity Name',
    'activityType': 'Activity Type',
    'activityAssignee': 'Assignee',
    'activity-starttime': 'Start Time',
    'activity-endtime': 'End Time',
    'activityDetail': 'Process Activity Detail History',
    'variableName': 'Variable Name',
    'variableType': 'Variable Type',
    'variableValue': 'Variable Value',
    'variableInstance': 'Process Instance Variable History',
    'processCandidate-required': 'Please select the candidate!',
    'processRangetime-required': 'Please select the range time!',
    'processDescription-required': 'Please enter the description!',
    'processDescription-length': 'The description length is up to 512'
  },
  task: {
    'id': 'Task ID',
    'name': 'Task Name',
    'status': 'Task Status',
    'current': 'Current Task',
    'startTime': 'Start Time',
    'endTime': 'End Time',
    'description': 'Description',
    'candidatetask': 'Highlight the tracking process, showing the specific status of the current process node',
    'assigneetask': 'Highlight the tracking process, showing the specific status of the current process node',
    'finishedtask': 'Highlight the tracking process, showing the specific status of the current process node',
    'assign': 'Assign',
    'assign-success': 'Assign task successfully',
    'complete': 'Complete',
    'complete-success': 'Complete task successfully',
    'delegate': 'Delegate',
    'delegate-success': 'Delegate task successfully',
    'handle-delegate-success': 'Handle delegate task successfully',
    'regress': 'Regress',
    'regress-success': 'Regress task successfully',
    'reject': 'Reject',
    'reject-success': 'Reject task successfully',
    'terminate': 'Terminate',
    'terminate-success': 'Terminate task successfully',
    'assignee': 'Assignee',
    'claimTime': 'Claim Time',
    'instance': 'Process Instance Task',
    'historic': 'Process Task History',
    'taskComment-required': 'Please enter the comment!'
  },
  model: {
    'modelName': 'Model Name',
    'modelCategory': 'Model Category',
    'modelDescription': 'Model Description',
    'modelVersion': 'Model Version',
    'modelRevision': 'Model Revision',
    'deploy': 'Deploy',
    'deploySuccess': 'Deploy successfully',
    'deploymentTime': 'Deployment Time',
    'modelName-required': 'Please enter the model name!',
    'modelCategory-required': 'Please enter the model category!'
  },
  notification: {
    'title': 'Title',
    'content': 'Content',
    'type': 'Type',
    'priority': 'Priority',
    'publisher': 'Publisher',
    'create-time': 'Publish Time',
    'start-time': 'Start Time',
    'end-time': 'End Time',
    'period': 'Period',
    'period-tooltip': 'If you do not choose the default unrestricted period',
    'publish-object': 'Publish Object',
    'choose-tooltip': 'If you do not choose to publish to all users by default',
    'title-required': 'Please enter the title!',
    'content-required': 'Please enter the content!',
    'type-required': 'Please select the type!',
    'priority-required': 'Please select the priority!'
  },
  file: {
    'upload-download': 'Upload Download',
    'original-filename': 'File Name',
    'file-size': 'File Size(KB)',
    'content-type': 'Content Type',
    'upload-file': 'Upload File',
    'upload-success': 'Upload successfully',
    'isst10m': 'File must smaller than 10MB!',
    'isnotempty': 'The file cannot be empty!',
    'cannotfind': 'The file could not be found'
  },
  generator: {
    'moduleName': 'Module Name',
    'serviceName': 'Service Name',
    'packageName': 'Package Name',
    'entityName': 'Entity Name',
    'tableName': 'Table Name',
    'idName': 'Id Name',
    'generate': 'Generate',
    'choose-generate': 'Please check the records you want to generate!',
    'generate-success': 'Generated successfully',
    'moduleName-required': 'Please enter the module name!',
    'serviceName-required': 'Please enter the service name!',
    'packageName-required': 'Please enter the package name!',
    'entityName-required': 'Please enter the entity name!',
    'tableName-required': 'Please enter the table name!',
    'idName-required': 'Please enter the id name!'
  }
}
