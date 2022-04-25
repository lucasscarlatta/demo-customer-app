import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path:'', loadChildren: ()=> import('./users/users.module').then(m=>m.UsersModule),
  },
  { path: 'accounts/:customerId', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
  { path: 'loader', loadChildren: () => import('./loader/loader.module').then(m => m.LoaderModule) },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
