import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { GestionService } from './services/gestion.service';
import { AddPcComponent } from './add-pc/add-pc.component';
import { UpdateComputerComponent } from './update-computer/update-computer.component';
import { UsersService } from './services/users.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { MycomputersComponent } from './mycomputers/mycomputers.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AuthService } from './services/auth.service';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UnAuthGuard } from './un-auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    SignInComponent,
    NavBarComponent,
    FooterComponent,
    AddPcComponent,
    UpdateComputerComponent,
    UserProfileComponent,
    LoginComponent,
    MycomputersComponent,
    SignInComponent,
    UpdateUserComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
