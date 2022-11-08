import { AdminPageComponent } from './pages/admin-page/admin-page.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component'

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
  },
  {
    path: 'articulos',
    component: ArticlesPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
