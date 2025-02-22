import { Routes } from '@angular/router';
import { } from './routes/admin/declarations/declarations.component';
import { AuthGuard } from './core/providers/auth.guard';
import { PublicLayoutComponent } from './core/layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './core/layout/private-layout/private-layout.component';
import { RequesterGuard } from './core/providers/requester.guard';
import { AdminGuard } from './core/providers/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-orders',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./routes/auth/login/login.component').then(m => m.LoginComponent),
        title: 'Login'
      },
      {
        path: 'register',
        loadComponent: () => import('./routes/auth/register/register.component').then(m => m.RegisterComponent),
        title: 'Criar conta',
      },
      {
        path: 'success',
        loadComponent: () => import('./routes/auth/register/success/success.component').then(m => m.SuccessComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./routes/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
        title: 'Esqueceu senha',
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./routes/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
        title: 'Recuperar senha',
      },
    ],
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'my-orders',
        loadComponent: () => import('./routes/requester/my-orders/my-orders.component').then(m => m.MyOrdersComponent),
        title: 'Minhas solicitações',
        canActivate: [RequesterGuard],
      },
      {
        path: 'requests',
        title: 'Solicitações',
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./routes/admin/requests/requests.component').then(m => m.RequestsComponent),
            title: 'Gestão de solicitações',
          },

          {
            path: 'summary',
            loadComponent: () => import('./routes/admin/requests/summary/summary.component').then(m => m.SummaryComponent),
            title: 'Declarações geradas',
          },
        ],
      },
      {
        path: 'management',
        title: 'Gerenciamento de usuários',
        canActivate: [AdminGuard],
        children: [

          {
            path: 'create-acount',
            loadComponent: () => import('./routes/admin/user-registration/user-registration.component').then(m => m.UserRegistrationComponent),
            title: 'Cadastrar usuário',
          },

          {
            path: 'search',
            loadComponent: () => import('./routes/admin/users/users.component').then(m => m.UsersComponent),
            title: 'Usuários',
            canActivate: [AdminGuard],
          },
        ]
      },
      {
        path: 'completed-declarations',
        loadComponent: () => import('./routes/admin/completed-declarations/completed-declarations.component').then(m => m.CompletedDeclarationsComponent),
        title: 'Declarações geradas',
        canActivate: [AdminGuard],
      },
      {
        path: 'profile',
        title: 'Meu perfil',
        canActivate: [RequesterGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./routes/requester/profile/profile.component').then(m => m.ProfileComponent),
            title: 'Meu Perfil',
          },
          {
            path: 'update',
            loadComponent: () => import('./routes/requester/user-update/user-update.component').then(m => m.UserUpdateComponent),
            title: 'Atualizar meus dados',
          },
        ],
      },
      {
        path: 'declarations',
        title: 'Declarações',
        canActivate: [AdminGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./routes/admin/declarations/declarations.component').then(m => m.DeclarationsComponent),
            title: 'Declarações cadastradas',
          },
          {
            path: 'create',
            loadComponent: () => import('./routes/admin/declarations/declaration-create/declaration-create.component').then(m => m.DeclarationCreateComponent),
            title: 'Criar declaração',
          },
          {
            path: ':id/edit',
            loadComponent: () => import('./routes/admin/declarations/declaration-edit/declaration-edit.component').then(m => m.DeclarationEditComponent),
            title: 'Editar declaração',
          },
        ],
      },

      {
        path: 'dashboard',
        loadComponent: () => import('./routes/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'Relatório',
        canActivate: [AdminGuard],
      },

      // {
      //   path: 'declarations',
      //   component: DeclarationsComponent,
      //   title: 'Declarações',
      // },
      // {
      //   path: 'address',
      //   component: AddressComponent,
      //   title: 'Endereço',
      // },
      // {
      //   path: 'clients',
      //   component: ClientsComponent,
      //   title: 'Clientes',
      // },
      // {
      //   path: 'other-declarations',
      //   component: OtherDeclarationsComponent,
      //   title: 'Outras Declarações',
      // },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./routes/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];
