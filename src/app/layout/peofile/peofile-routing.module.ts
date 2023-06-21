import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeofileComponent } from './peofile.component';

const routes: Routes = [{ path: '', component: PeofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeofileRoutingModule { }
