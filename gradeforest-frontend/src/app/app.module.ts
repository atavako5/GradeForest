import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TreeComponent } from './tree/tree.component';
import { CommonModule } from '@angular/common';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule } from '@angular/material/form-field';
import { ItemViewerComponent } from './item-viewer/item-viewer.component';
import { TreeItemViewerService } from './shared/tree-item-viewer.service';
import {MatInputModule} from '@angular/material/input'
import {MatDialogModule} from '@angular/material/dialog';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { SearchSelectListComponent } from './search-select-list/search-select-list.component';
import {MatSelectModule} from '@angular/material/select'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DeleteListDialogComponent } from './delete-list-dialog/delete-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    TreeComponent,
    ItemViewerComponent,
    AddListDialogComponent,
    SearchSelectListComponent,
    DeleteListDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent },
      {path: 'mainpage', component: MainPageComponent,canActivate: [AuthGuard] }, //
      {path: '**', component: LoginComponent }
    ]),
    AppRoutingModule,
    AngularTreeGridModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [`/api/*`],
      },
    }),
    FormsModule,
    MatDividerModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule

  ],
  providers: [
    TreeItemViewerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
