import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const reportManagementUser: AppRouteModule = {
  path: '/reportAdmin',
  name: 'reportAdmin',
  component: LAYOUT,
  redirect: '/reportAdmin/reportManagementUser',
  meta: {
    roles: [RoleEnum.User],
    orderNo: 12,
    icon: 'whh:paintroll',
    title: '报告管理',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'reportManagementUser',
      name: 'reportManagementUser',
      component: () => import('@/views/dashboard/reportManagementUser/index.vue'),
      meta: {
        title: '报告管理',
        roles: [RoleEnum.User],
      },
    },
  ],
};

export default reportManagementUser;
