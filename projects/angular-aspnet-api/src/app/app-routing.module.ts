import { CppComponent } from './cpp/cpp.component';
import { PythonComponent } from "./python/python.component";
import { RustComponent } from "./rust/rust.component";
import { MssqlComponent } from "./mssql/mssql.component";
import { MysqlComponent } from "./mysql/mysql.component";
import { PostgreSQLComponent } from "./postgre-sql/postgre-sql.component";
import { OracleComponent } from "./oracle/oracle.component";
import { NodejsComponent } from "./nodejs/nodejs.component";
import { ReactComponent } from "./react/react.component";
import { AspnetCoreComponent } from "./aspnet-core/aspnet-core.component";
import { DotnetCoreFrameworkComponent } from "./dotnet-core-framework/dotnet-core-framework.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AngularComponent } from "./angular/angular.component";
import { ManagerComponent } from "./data-manager/manager.component";
import { IntroComponent } from "./intro/intro/intro.component";
import { CodeEditorComponent } from "./commons/code-editor/code-editor.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { UserManagementComponent } from "./user/user-management.component";
import { AuthGuardService } from "./guards/auth.service";
import { ExcelVbaComponent } from './excel-vba/excel-vba.component';

export const routes: Routes = [
  { path: "", redirectTo: "/intro", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "intro", component: IntroComponent },

  { path: "dotnet-core-framework", component: DotnetCoreFrameworkComponent },
  { path: "aspnet-core", component: AspnetCoreComponent },
  { path: "angular", component: AngularComponent },
  { path: "react", component: ReactComponent },
  { path: "nodejs", component: NodejsComponent },
  { path: "mssql", component: MssqlComponent },
  { path: "mysql", component: MysqlComponent },
  { path: "oracle", component: OracleComponent },
  { path: "postgre-sql", component: PostgreSQLComponent },
  { path: "rust", component: RustComponent },
  { path: "python", component: PythonComponent },
  { path: "cpp", component: CppComponent },
  { path: "excel-vba", component: ExcelVbaComponent},
  {
    path: "manager",
    component: ManagerComponent,
    canActivate: [AuthGuardService],
  },
  { path: "code-editor", component: CodeEditorComponent },
  {
    path: "user-management",
    component: UserManagementComponent,
    canActivate: [AuthGuardService],
  },
  { path: "**", component: IntroComponent },
];

@NgModule({
  // 시작시 페이 상단 을 스크롤하기
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
