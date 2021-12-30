import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { CancelComponent } from './cancel/cancel.component';
import { UserService } from './user.service';

const routes: Routes = [
   {'path': 'signin', 'component': UserComponent},
   {'path': 'signout', 'component': UserComponent},
   {'path': 'list', 'component':  ListComponent, canActivate: [UserService]},
   {'path': 'order', 'component': OrderComponent, canActivate: [UserService]},
   {'path': 'cancel/:id', 'component': CancelComponent, canActivate: [UserService]},
   {'path': 'cancel', 'component': CancelComponent, canActivate: [UserService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
