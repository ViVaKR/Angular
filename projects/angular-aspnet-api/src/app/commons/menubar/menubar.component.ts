import {
  Component,
  HostListener,
  Input,
  isDevMode,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-menubar",
  templateUrl: "./menubar.component.html",
  styleUrls: ["./menubar.component.css"],
})
export class MenubarComponent implements OnInit {
  title: string = "Viv";

  isDevMode(): boolean {
    return isDevMode();
  }
  menuIcon: string = "donut_small";

  @Input() fullName!: string | undefined;
  @Input() loginRole!: string | undefined;

  constructor(private router: Router, public userService: UserService) {}

  ngOnInit(): void {
    
    // 사용자 명 가져오기
    this.userService.loginName.asObservable().subscribe({
      next: (data) => {
        this.fullName = data;
      },
    });
    this.userService.getStorageName();

    // 로그인 권한 가져오기
    this.userService.loginRole.asObservable().subscribe({
      next: (data) => {
        this.loginRole = data;
      },
    });
    this.userService.getRole();
  }

  goTo(url: string) {
    this.router.navigate([`${url}`]);
  }
  logout() {
    this.userService.logOut();
    this.goTo("/logout");
  }
}
