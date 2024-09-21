import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const questionnaire: AppRouteModule = {
  path: '/questionnaire',
  name: 'questionnaire',
  component: LAYOUT,
  redirect: '/questionnaire/evaluation',
  meta: {
    roles: [RoleEnum.User],
    orderNo: 11,
    icon: 'ion:git-compare-outline',
    title: t('routes.dashboard.evaluation'),
    hideChildrenInMenu: true,
  },
  children: [
    // {
    //   path: 'writequestionnaire',
    //   name: 'writequestionnaire',
    //   component: () => import('@/views/dashboard/writequestionnaire/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.writequestionnaire'),
    //     roles: [RoleEnum.SUPER],
    //   },
    // },
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
