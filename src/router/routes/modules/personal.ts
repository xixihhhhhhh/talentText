import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const personal: AppRouteModule = {
  path: '/personal',
  name: 'Personal',
  component: LAYOUT,
  redirect: '/personal/personal',
  meta: {
    orderNo: 30,
    hideChildrenInMenu: true,
    icon: 'ant-design:android-filled',
    title: t('routes.dashboard.personal'),
  },
  children: [
    {
      path: 'personal',
      name: 'personal',
      component: () => import('@/views/dashboard/personal/index.vue'),
      meta: {
        title: t('routes.dashboard.personalCenter'),
      },
    },
  ],
};

export default personal;
