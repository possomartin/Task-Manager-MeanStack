import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginComponent } from './pages/login/login.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'lists', component: TaskViewComponent},
  {path: 'lists/:listId', component: TaskViewComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'edit-list/:listId', component: EditListComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent},
  {path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
