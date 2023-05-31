import { IRegister } from "./../../models/i-register";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { FormBuilder } from "@angular/forms";
import { Component, AfterViewInit, Inject } from "@angular/core";

@Component({
  selector: "app-user-data",
  templateUrl: "./user-data.component.html",
  styleUrls: ["./user-data.component.css"],
})
export class UserDataComponent implements AfterViewInit {
  title: string = "회원관리";

  public hide: boolean = true;
  public roles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IRegister,
    private fb: FormBuilder,
    private UserService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.title = `${this.data.fullName}`;
    this.userForm.controls['fullName'].setValue(data.fullName);
    this.userForm.controls['email'].setValue(data.email);
    this.userForm.controls['password'].setValue(data.password);
    this.userForm.controls['role'].setValue(data.role);
  }

  ngAfterViewInit(): void {
    this.getAllRoles();
    this.getUserData();
  }

  getUserData() {}

  public userForm: FormGroup = this.fb.group({
    fullName: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    role: ["", Validators.required],
  });

  getAllRoles() {
    this.UserService.getAllRole().subscribe({
      next: (data) => {
        this.roles = data;
      },
    });
  }

  onSubmit() {
    this.UserService.putUser(this.userForm.value).subscribe({
      next: (data) => {
        this.openSnackBar(`${data.fullName}`, "회원정보 수정완료");
      },
    });
  }

  onClose() {
    this.dialogRef.close(this.data.email);
  }

  getErrorMessage() {
    if (this.userForm.controls["email"].hasError("required")) {
      return "You must enter a value";
    }

    return this.userForm.controls["email"].hasError("email")
      ? "Not a valid email"
      : "";
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      horizontalPosition: "center",
    });
  }
}
