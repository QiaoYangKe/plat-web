import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'home', affix: true  }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/teach-manager',
    component: Layout,
    meta: { title: '教学管理', icon: 'teach-manager', affix: true, sqlRouter: 'UserInfo' },
    children: [
      {
        path: '/class-manager',
        component: () => import('@/views/teach-manager/class-manager'),
        name: 'ClassManager',
        meta: { title: '班级管理', affix: true, sqlRouter: 'UserInfo' }
      },
      {
        path: '/student-manager',
        component: () => import('@/views/teach-manager/student-manager'),
        name: 'StudentManager',
        meta: { title: '学生管理', affix: true, sqlRouter: 'UserInfo' }
      }
    ]
  },
  {
    path: '/course-setting',
    component: Layout,
    redirect: '/course-setting',
    children: [
      {
        path: '/course-setting',
        component: () => import('@/views/course-setting'),
        name: 'CourseSetting',
        meta: { title: '课程设置', sqlRouter: 'CourseInfo', icon: 'course-setting', affix: true }
      }
    ]
  },
  {
    path: '/course-manager',
    component: Layout,
    redirect: '/course-manager',
    children: [
      {
        path: '/course-manager',
        component: () => import('@/views/course-manager'),
        name: 'CourseManager',
        meta: { title: '课程管理', sqlRouter: 'CourseInfo', icon: 'course-manager', affix: true }
      }
    ]
  },
  {
    path: '/log-manager',
    component: Layout,
    redirect: '/log-manager',
    children: [
      {
        path: '/log-manager',
        component: () => import('@/views/log-manager'),
        name: 'LogManager',
        meta: { title: '日志管理', sqlRouter: 'LogInfo', icon: 'log-manager', affix: true }
      }
    ]
  },
  {
    path: '/course-learn',
    component: Layout,
    redirect: '/course-learn',
    children: [
      {
        path: '/course-learn',
        component: () => import('@/views/course-learn'),
        name: 'CourseLearn',
        meta: { title: '课程学习', sqlRouter: 'UserInfo', icon: 'course-learn', affix: true }
      }
    ]
  },
  {
    path: '/lab-report',
    component: Layout,
    redirect: '/lab-report',
    children: [
      {
        path: '/lab-report',
        component: () => import('@/views/lab-report'),
        name: 'LabReport',
        meta: { title: '实验报告', sqlRouter: 'ScoreInfo', icon: 'lab-report', affix: true }
      }
    ]
  },
  {
    path: '/report-view',
    component: () => import('@/views/lab-report/report-view'),
    name: 'ReportView',
    hidden: true,
    meta: { title: '实验报告预览', sqlRouter: 'ScoreInfo' }
  },
  {
    path: '/question-answer',
    component: Layout,
    redirect: '/question-answer',
    children: [
      {
        path: '/question-answer',
        component: () => import('@/views/question-answer'),
        name: 'QuestionAnswer',
        meta: { title: '问题解答', sqlRouter: 'FeedBackInfo', icon: 'question-answer', affix: true }
      },
      {
        path: '/answer-detail/:id',
        component: () => import('@/views/question-answer/answerDetail.vue'),
        name: 'AnswerDetail',
        hidden: true,
        meta: { title: '反馈详情', affix: true }
      },
    ]
  },
  {
    path: '/question-feedback',
    component: Layout,
    redirect: '/question-feedback',
    children: [
      {
        path: '/question-feedback',
        component: () => import('@/views/question-feedback'),
        name: 'QuestionFeedback',
        meta: { title: '问题反馈', sqlRouter: 'FeedBackInfo', icon: 'question-feedback', affix: true }
      }
    ]
  },
  {
    path: '/student-grade',
    component: Layout,
    redirect: '/student-grade',
    children: [
      {
        path: '/student-grade',
        component: () => import('@/views/student-grade'),
        name: 'LabReport',
        meta: { title: '成绩展示', sqlRouter: 'UserInfo', icon: 'student-grade', affix: true }
      }
    ]
  },
  {
    path: '/teacher-manager',
    component: Layout,
    redirect: '/teacher-manager',
    children: [
      {
        path: '/teacher-manager',
        component: () => import('@/views/teacher-manager'),
        name: 'TeacherManager',
        meta: { title: '教师管理', sqlRouter: 'UserInfo', icon: 'teacher-manager', affix: true }
      }
    ]
  },
  {
    path: '/jurisdiction-manager',
    component: Layout,
    redirect: '/jurisdiction-manager',
    children: [
      {
        path: '/jurisdiction-manager',
        component: () => import('@/views/jurisdiction-manager'),
        name: 'TeacherManager',
        meta: { title: '权限管理', sqlRouter: 'UserInfo', icon: 'jurisdiction-manager', affix: true }
      }
    ]
  },
  {
    path: '/platform-management',
    component: Layout,
    redirect: '/platform-management',
    children: [
      {
        path: '/platform-management',
        component: () => import('@/views/platform-management'),
        name: 'PlatformManagement',
        meta: { title: '平台管理', sqlRouter: 'WebIntroduce', icon: 'platform-management', affix: true}
      }
    ]
  },
  {
    path: '/system-detection',
    component: Layout,
    redirect: '/system-detection',
    children: [
      {
        path: '/system-detection',
        component: () => import('@/views/system-detection'),
        name: 'SystemDetection',
        meta: { title: '系统运行检测', sqlRouter: 'UserInfo', icon: 'system-detection', affix: true }
      }
    ]
  },
  {
    path: '/data-backup',
    component: Layout,
    redirect: '/data-backup',
    children: [
      {
        path: '/data-backup',
        component: () => import('@/views/data-backup'),
        name: 'DataBackup',
        meta: { title: '数据备份', sqlRouter: 'UserInfo', icon: 'data-backup', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
