import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';
import { RoleEnum } from '@/enums/roleEnum';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 1,
    icon: 'ion:grid-outline',
    title: t('routes.dashboard.workbench'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.workbench'),
        roles: [RoleEnum.SUPER],
      },
    },
    {
      path: 'resultRoute',
      name: 'resultRoute',
      component: () => import('@/views/dashboard/result/resultRoute.vue'),
      meta: {
        title: t('routes.basic.result'),
        roles: [RoleEnum.SUPER],
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
