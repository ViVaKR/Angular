import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import {
  APP_BASE_HREF,
  HashLocationStrategy,
  LocationStrategy,
} from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  COMPOSITION_BUFFER_MODE,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { IntroComponent } from "./intro/intro/intro.component";
import { DialogVivComponent } from "./commons/dialog-viv/dialog-viv.component";
import { ManagerComponent } from "./data-manager/manager.component";
import { DialogDeleteComponent } from "./commons/dialog-delete.component";
import { CustomerViewComponent } from "./commons/customer-view/customer-view.component";
import { MenubarComponent } from "./commons/menubar/menubar.component";
import { FooterComponent } from "./commons/footer/footer.component";
import { ScrollArrowComponent } from "./commons/scroll-arrow/scroll-arrow.component";
import { CodeEditorComponent } from "./commons/code-editor/code-editor.component";
import { DirectEditorDirective } from "./editor.directive";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { UserManagementComponent } from "./user/user-management.component";
import { UserViewComponent } from "./commons/user-view/user-view.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { ErrorMatcherComponent } from "./commons/error-matcher/error-matcher.component";
import { DotnetCoreFrameworkComponent } from "./dotnet-core-framework/dotnet-core-framework.component";
import { AspnetCoreComponent } from "./aspnet-core/aspnet-core.component";
import { ReactComponent } from "./react/react.component";
import { NodejsComponent } from "./nodejs/nodejs.component";
import { MysqlComponent } from "./mysql/mysql.component";
import { OracleComponent } from "./oracle/oracle.component";
import { PostgreSQLComponent } from "./postgre-sql/postgre-sql.component";
import { AngularComponent } from "./angular/angular.component";
import { MssqlComponent } from "./mssql/mssql.component";
import { UserDataComponent } from './user/user-data/user-data.component';
import { RustComponent } from './rust/rust.component';
import { PythonComponent } from './python/python.component';
import { CppComponent } from './cpp/cpp.component';
import { ExcelVbaComponent } from './excel-vba/excel-vba.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    DialogVivComponent,
    ManagerComponent,
    DialogDeleteComponent,
    CustomerViewComponent,
    MenubarComponent,
    FooterComponent,
    ScrollArrowComponent,
    CodeEditorComponent,
    DirectEditorDirective,
    LoginComponent,
    SignupComponent,
    UserManagementComponent,
    UserViewComponent,
    ErrorMatcherComponent,
    DotnetCoreFrameworkComponent,
    AspnetCoreComponent,
    ReactComponent,
    NodejsComponent,
    MysqlComponent,
    OracleComponent,
    PostgreSQLComponent,
    AngularComponent,
    MssqlComponent,
    UserDataComponent,
    RustComponent,
    PythonComponent,
    CppComponent,
    ExcelVbaComponent,
  ],
  entryComponents: [DialogVivComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClipboardModule,
    MaterialModule,
  ],

  providers: [
    // refress 404 not found 처리 # hash tag
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    // 한글 짤림방지
    { provide: COMPOSITION_BUFFER_MODE, useValue: false },

    // index.html 의 테크 <base href="/"> 과 동일
    { provide: APP_BASE_HREF, useValue: "/" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
