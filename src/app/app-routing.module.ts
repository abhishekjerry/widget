import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportListComponent } from './demo-export-list/export-list.component';

const routes: Routes = [
  { path: 'exportList', component: ExportListComponent },
  { path: '**', redirectTo:'exportList' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
