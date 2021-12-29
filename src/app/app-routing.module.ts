import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AddPcComponent } from './add-pc/add-pc.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { MycomputersComponent } from './mycomputers/mycomputers.component';
import { AuthService } from './services/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { UnAuthGuard } from './un-auth.guard';

import { UpdateComputerComponent } from './update-computer/update-computer.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  
  {path:'myprofile/:id',component:UserProfileComponent},
  {path:'myprofile',component:UserProfileComponent,canActivate:[AuthGuardGuard]},
  {path:'acceuil', component:AccueilComponent},
  {path:'signin',component:SignInComponent,canActivate:[UnAuthGuard]},
  {path:'mycomputers',component:MycomputersComponent,canActivate:[AuthGuardGuard]},
  {path:'addComputer',component:AddPcComponent,canActivate:[AuthGuardGuard]},
  {path:'updateComputer',component:UpdateComputerComponent,canActivate:[AuthGuardGuard]},
  {path:'updateComputer/:id',component:UpdateComputerComponent,canActivate:[AuthGuardGuard]},
  {path:'updateUser/:id',component:UpdateUserComponent,canActivate:[AuthGuardGuard]},
  {path:'login',component:LoginComponent,canActivate:[UnAuthGuard]},
  {path:'logout',redirectTo:'/login'},
  {path:'',component:AccueilComponent},
  {path:'**',redirectTo:'/acceuil'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
