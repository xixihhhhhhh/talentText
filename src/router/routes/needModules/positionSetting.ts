import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { RoleEnum } from '@/enums/roleEnum';

const positionSetting: AppRouteModule = {
  path: '/position',
  name: 'position',
  component: LAYOUT,
  redirect: '/position/positionSetting',
  meta: {
    roles: [RoleEnum.SUPER],
    orderNo: 13,
    icon: 'ant-design:android-filled',
    title: '岗位设置',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'positionSetting',
      name: 'positionSetting',
      component: () => import('@/views/dashboard/positionSetting/index.vue'),
      meta: {
        title: '岗位设置',
        roles: [RoleEnum.SUPER],
      },
    },
  ],
};

export default positionSetting;
