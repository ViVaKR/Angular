import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ResponseModel } from "src/app/models/response-model";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  title: string = "Login";
  hide = true;

  public loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  goToSignUp() {
    this.router.navigate(["/signup"]);
  }

  onSubmit() {
    this.userService.loginRequest(this.loginForm.value).subscribe({
      next: (data: ResponseModel) => {
        if (data.responseCode === 1) {
          this.userService.logIn(data.dataSet);
          this.openSnackBar(
            `${data.dataSet.fullName}님 환영합니다!`,
            "Login Success"
          );
          this.router.navigate(["/intro"]);
        }
      },
      error: (err) => {
        this.openSnackBar(err.message, "Login Failed!");
      },
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: 'center'
    });
  }
}
