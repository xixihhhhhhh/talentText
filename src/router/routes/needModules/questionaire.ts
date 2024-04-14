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
      path: 'quesList',
      name: 'quesList',
      component: () => import('@/views/dashboard/quesList/index.vue'),
      meta: {
        title: t('routes.basic.quesList'),
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
  ],
};

export default questionnaire;
