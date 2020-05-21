import { AuthGuardService } from './service/auth-guard.service';
import { Routes } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { loginComponent } from './pages/login/login.component';
import { AddCategoryComponent } from './pages/categories/add-category/add-category.component';
import { ListCategoryComponent } from './pages/categories/list-category/list-category.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { ListProductComponent } from './pages/products/list-product/list-product.component';
import { ListUserComponent } from './pages/users/list-user/list-user.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { ListPurchasesComponent } from './pages/purchases/list-purchases/list-purchases.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: loginComponent,
    data: {
      "pageTitle": "LOGIN"
    }
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'list-category',
        component: ListCategoryComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LISTCATEGORY"
        }
      },

      {
        path: 'add-category',
        component: AddCategoryComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ADDCATEGORY"
        }
      },
      {
        path: 'edit-category/:id',
        component: AddCategoryComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "EDITCATEGORY"
        }
      },

      {
        path: 'list-product',
        component: ListProductComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LISTPRODUCT"
        }
      },

      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ADDPRODUCT"
        }
      },
      {
        path: 'edit-product/:id',
        component: AddProductComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "EDITPRODUCT"
        }
      },


      {
        path: 'list-user',
        component: ListUserComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "LISTUSER"
        }
      },

      {
        path: 'add-user',
        component: AddUserComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ADDUSER"
        }
      },
      {
        path: 'edit-user/:id',
        component: AddUserComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "EDITUSER"
        }
      },

      {
        path: 'all-purchases',
        component: ListPurchasesComponent,
        canActivate: [AuthGuardService],
        data: {
          "pageTitle": "ALLPURCHASES"
        }
      },
      // {
      //   path: 'list-user',
      //   component: ListUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTUSER"
      //   }

      // },
      // {
      //   path: 'list-staf-user',
      //   component: ListStafUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTSTAFUSER"
      //   }

      // },
      // {
      //   path: 'add-user',
      //   component: AddUserComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "ADDUSER"
      //   }
      // },
      // {
      //   path: 'add-center-product/:centerId',
      //   component: AddCenterProductComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "ADDCENTERPRODUCT"
      //   }
      // },
      // {
      //   path: 'edit-center-product/:centerId/:id',
      //   component: AddCenterProductComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "EDITCENTERPRODUCT"
      //   }
      // },
      // {
      //   path: 'list-order',
      //   component: ListOrderComponent,
      //   canActivate: [AuthGuardService],
      //   data: {
      //     "pageTitle": "LISTORDER"
      //   }
      // },



      // {
      //   path: 'dashboard',
      //   loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      // }, {
      //   path: 'widget',
      //   loadChildren: './pages/widget/widget.module#WidgetModule'
      // }, {
      //   path: 'basic',
      //   loadChildren: './pages/ui-elements/basic/basic.module#BasicModule'
      // }, {
      //   path: 'advance',
      //   loadChildren: './pages/ui-elements/advance/advance.module#AdvanceModule'
      // }, {
      //   path: 'animations',
      //   loadChildren: './pages/animations/animations.module#AnimationsModule'
      // },
      // {
      //   path: 'forms',
      //   loadChildren: './pages/ui-elements/forms/forms.module#FormsModule'
      // },
      //  {
      //   path: 'bootstrap-table',
      //   loadChildren: './pages/ui-elements/tables/bootstrap-table/bootstrap-table.module#BootstrapTableModule',
      // }, {
      //   path: 'data-table',
      //   loadChildren: './pages/ui-elements/tables/data-table/data-table.module#DataTableModule',
      // }, {
      //   path: 'charts',
      //   loadChildren: './pages/charts/charts.module#ChartsModule',
      // }, {
      //   path: 'map',
      //   loadChildren: './pages/map/map.module#MapModule',
      // }, {
      //   path: 'maintenance/error',
      //   loadChildren: './pages/maintenance/error/error.module#ErrorModule'
      // }, {
      //   path: 'maintenance/coming-soon',
      //   loadChildren: './pages/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      // }, {
      //   path: 'user',
      //   loadChildren: './pages/user/user.module#UserModule'
      // }, {
      //   path: 'crm-contact',
      //   loadChildren: './pages/ui-elements/crm-contact/crm-contact.module#CrmContactModule'
      // }, {
      //   path: 'task',
      //   loadChildren: './pages/task/task.module#TaskModule'
      // }, {
      //   path: 'editor',
      //   loadChildren: './pages/ui-elements/editor/editor.module#EditorModule'
      // }, {
      //   path: 'invoice',
      //   loadChildren: './pages/invoice/invoice.module#InvoiceModule'
      // }, {
      //   path: 'file-upload',
      //   loadChildren: './pages/ui-elements/file-upload/file-upload.module#FileUploadUIModule'
      // }, {
      //   path: 'change-log',
      //   loadChildren: './pages/change-log/change-log.module#ChangeLogModule'
      // }, {
      //   path: 'simple-page',
      //   loadChildren: './pages/simple-page/simple-page.module#SimplePageModule'
      // },

    ]
  },

  // { path: '/', component: ListOrderComponent, pathMatch: 'full' }
  //  {
  //   path: '',
  //   component: AuthComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
  //     }, {
  //       path: 'maintenance/offline-ui',
  //       loadChildren: './pages/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
  //     }
  //   ]
  // }

];
