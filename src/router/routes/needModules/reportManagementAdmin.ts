import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const reportManagementAdmin: AppRouteModule = {
  path: '/reportUser',
  name: 'reportUser',
  component: LAYOUT,
  redirect: '/reportUser/reportManagementAdmin',
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
