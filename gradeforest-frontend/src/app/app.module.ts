import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { MainPageComponent } from './app-function/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TreeComponent } from './app-function/tree/tree.component';
import { CommonModule } from '@angular/common';
import { AngularTreeGridModule } from './lib/angular-tree-grid.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItemViewerComponent } from './app-function/item-viewer/item-viewer.component';
import { CurrentItemService } from './helpers/services/tree-item-viewer.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddListDialogComponent } from './dialogs/add-list-dialog/add-list-dialog.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFixHeaderGridModule } from 'modern-angular-fix-header-grid';
import { AuthGuard } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { SearchSelectListComponent } from './app-function/search-select-list/search-select-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DeleteListDialogComponent } from './dialogs/delete-list-dialog/delete-list-dialog.component';
import { WhatIfIGetComponent } from './app-function/what-if-i-get/what-if-i-get.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { CumulativeGradesComponent } from './app-function/cumulative-grades/cumulative-grades.component';
import { MainPageOfflineComponent } from './app-function/mainpage-offline/mainpage-offline.component';
import { GpaRulesDialogComponent } from './dialogs/gpa-rules-dialog/gpa-rules-dialog.component';
import { GpaRulesComponent } from './app-function/gpa-rules/gpa-rules.component';
import { GpaRulesCopyDialogComponent } from './dialogs/gpa-rules-copy-dialog/gpa-rules-copy-dialog.component';

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
    WhatIfIGetComponent,
    CumulativeGradesComponent,
    MainPageOfflineComponent,
    GpaRulesDialogComponent,
    GpaRulesComponent,
    GpaRulesCopyDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      {
        path: 'mainpage',
        component: MainPageComponent,
        canActivate: [AuthGuard],
      }, //
      {
        path: 'main-page-offline',
        component: MainPageOfflineComponent,
      }, //
      { path: '**', component: LoginComponent },
  ],{useHash: true}),
    AppRoutingModule,
    AngularTreeGridModule,
    AngularFixHeaderGridModule,
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
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  providers: [
    CurrentItemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
