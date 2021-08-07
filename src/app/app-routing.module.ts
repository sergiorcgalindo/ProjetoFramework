import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrutaComponent } from './fruta/fruta.component';
import { CompraComponent } from './compra/compra.component';

const routes: Routes = [
  { path: 'fruta', component: FrutaComponent },
  { path: 'compra', component: CompraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 