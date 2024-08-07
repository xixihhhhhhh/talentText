import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const questionnaire: AppRouteModule = {
  path: '/questionnaire',
  name: 'questionnaire',
  component: LAYOUT,
  redirect: '/questionnaire/writequestionnaire',
  meta: {
    roles: [RoleEnum.SUPER, RoleEnum.User],
    orderNo: 10,
    icon: 'ant-design:android-filled',
    title: t('routes.dashboard.questionnaire'),
  },
  children: [
    {
      path: 'writequestionnaire',
      name: 'writequestionnaire',
      component: () => import('@/views/dashboard/writequestionnaire/index.vue'),
      meta: {
        title: t('routes.dashboard.writequestionnaire'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'evaluation',
      name: 'evaluation',
      component: () => import('@/views/dashboard/evaluation/index.vue'),
      meta: {
        title: t('routes.dashboard.evaluation'),
        roles: [RoleEnum.SUPER, RoleEnum.User],
      },
    },
    {
      path: 'reportManagementUser',
      name: 'reportManagement',
      component: () => import('@/views/dashboard/reportManagementUser/index.vue'),
      meta: {
        title: '报告管理',
        roles: [RoleEnum.User],
      },
    },
    {
      path: 'reportManagementAdmin',
      name: 'reportManagement',
      component: () => import('@/views/dashboard/reportManagementAdmin/index.vue'),
      meta: {
        title: '报告管理',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'organizationStructure',
      name: 'organizationStructure',
      component: () => import('@/views/dashboard/organizationStructure/index.vue'),
      meta: {
        title: '组织架构',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'selectPeopleByPosition',
      name: 'selectPeopleByPosition',
      component: () => import('@/views/dashboard/selectPeopleByPosition/index.vue'),
      meta: {
        title: '以岗选人',
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'result',
      name: 'result',
      component: () => import('@/views/dashboard/result/index.vue'),
      meta: {
        title: t('routes.basic.result'),
        hideMenu: true,
      },
    },
    {
      path: 'resultRoute',
      name: 'resultRoute',
      component: () => import('@/views/dashboard/result/resultRoute.vue'),
      meta: {
        title: t('routes.basic.result'),
        hideMenu: true,
      },
    },
  ],
};

export default questionnaire;
