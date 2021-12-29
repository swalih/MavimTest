import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { ListComponent } from './list/list.component';
import { OrderComponent } from './order/order.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [
   {'path': 'signin', 'component': UserComponent},
   {'path': 'signout', 'component': UserComponent},
   {'path': 'list', 'component':  ListComponent},
   {'path': 'order', 'component': OrderComponent},
   {'path': 'cancel/:id', 'component': CancelComponent},
   {'path': 'cancel', 'component': CancelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
