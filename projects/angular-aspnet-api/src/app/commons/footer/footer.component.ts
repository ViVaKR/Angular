import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  goToExpert() {
    
    const expertUrl = "https://m.expert.naver.com/expert/profile/home?storeId=100034322";
    window.open(expertUrl, "_blank");
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }
}
