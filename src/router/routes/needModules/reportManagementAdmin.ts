import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const reportManagementAdmin: AppRouteModule = {
  path: '/reportAdmin',
  name: 'reportAdmin',
  component: LAYOUT,
  redirect: '/reportAdmin/reportManagementAdmin',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 12,
    icon: 'whh:paintroll',
    title: '报告管理',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'reportManagementAdmin',
      name: 'reportManagementAdmin',
      component: () => import('@/views/dashboard/reportManagementAdmin/index.vue'),
      meta: {
        title: '报告管理',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default reportManagementAdmin;
