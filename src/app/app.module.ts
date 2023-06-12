import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { ErrorInterceptor, JwtInterceptor } from './auth';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './modules/_material/material.module';
import { SharedModule } from './modules/_shared/shared.module';
import { ClientListModule } from './modules/client-list/client-list.module';
import { ClientProfileModule } from './modules/client-profile/client-profile.module';
import { ConstructorTestModule } from './modules/constructor-test/constructor-test.module';
import { LayoutModule } from './modules/layout/layout.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,

    AuthModule,
    SharedModule,
    ClientListModule,
    ClientProfileModule,
    ConstructorTestModule,
    LayoutModule,
    UserProfileModule,
    GraphQLModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
