import { IRegister } from "../models/i-register";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AfterViewInit, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBarHorizontalPosition } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import { Role } from "../models/role";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements AfterViewInit {
  hide: boolean = true;

  registerResult?: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.getAllRoles();
  }

  public registerForm: FormGroup = this.fb.group({
    fullName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    role: ["User", Validators.required],
  });

  onSubmit() {
    this.userService.registerRequest(this.registerForm.value).subscribe({
      next: (data: IRegister) => {
        this.registerResult = data.fullName;
      },
      error: (err) => {
        this.registerResult = err;
      },
      complete: () => {
        this.openSnackBar(
          "회원가입이 완료되었습니다.",
          "회원가입 완료",
          "center"
        );
      },
    });
  }

  openSnackBar(
    message: string,
    action: string,
    hPosition: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: hPosition,
    });

    this.router.navigate(["/login"]);
  }

  roles: string[] = [];
  getAllRoles() {
    this.userService.getAllRole().subscribe({
      next: (data) => {
        this.roles = data;
      },
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
