import Layout from '@/layout'

const activitiRouter = {
  path: '/activiti',
  component: Layout,
  redirect: 'noRedirect',
  name: '旅游团购',
  meta: { title: 'activiti', icon: 'component' },
  children: [
    {
      path: 'model',
      component: () => import('@/views/activiti/model'),
      name: '团购内容',
      meta: { title: 'model', icon: 'el-icon-s-grid' }
    },
    // {
    //   path: 'processdesign',
    //   component: () => import('@/views/activiti/processdesign'),
    //   name: '团购分类',
    //   meta: { title: 'processdesign' },
    //   hidden: true
    // },
    {
      path: 'deployment',
      component: () => import('@/views/activiti/deployment'),
      name: '团购评论',
      meta: { title: 'deployment', icon: 'el-icon-share' }
    },
    {
      path: 'processdefinition',
      component: () => import('@/views/activiti/processdefinition'),
      name: '团购分类',
      meta: { title: 'processdefinition', icon: 'el-icon-s-tools' }
    }
    // {
    //   path: 'processinstance',
    //   component: () => import('@/views/activiti/processinstance'),
    //   name: 'ProcessInstance',
    //   meta: { title: 'processinstance', icon: 'el-icon-service' }
    // },
    // {
    //   path: 'execution',
    //   component: () => import('@/views/activiti/execution'),
    //   name: 'Execution',
    //   meta: { title: 'execution' },
    //   hidden: true
    // },
    // {
    //   path: 'task',
    //   component: () => import('@/views/activiti/task'),
    //   name: 'Task',
    //   meta: { title: 'task', icon: 'skill' }
    // },
    // {
    //   path: 'taskdetails',
    //   component: () => import('@/views/activiti/taskdetails'),
    //   name: 'TaskDetails',
    //   meta: { title: 'taskdetails' },
    //   hidden: true
    // },
    // {
    //   path: 'historicprocessinstance',
    //   component: () => import('@/views/activiti/historicprocessinstance'),
    //   name: 'HistoricProcessInstance',
    //   meta: { title: 'historicprocessinstance', icon: 'el-icon-tickets' }
    // },
    // {
    //   path: 'historicactivityinstance',
    //   component: () => import('@/views/activiti/historicactivityinstance'),
    //   name: 'HistoricActivityInstance',
    //   meta: { title: 'historicactivityinstance' },
    //   hidden: true
    // },
    // {
    //   path: 'historicdetail',
    //   component: () => import('@/views/activiti/historicdetail'),
    //   name: 'HistoricDetail',
    //   meta: { title: 'historicdetail' },
    //   hidden: true
    // }
  ]
}
export default activitiRouter
