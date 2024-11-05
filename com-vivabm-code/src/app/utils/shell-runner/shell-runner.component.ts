import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '@app/services/loading.service';

@Component({
  selector: 'app-shell-runner',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './shell-runner.component.html',
  styleUrl: './shell-runner.component.scss'
})
export class ShellRunnerComponent {

  loadingService = inject(LoadingService);

  onLoadCourses() {
    try {
      console.log('Loading courses...');
      this.loadingService.loadingOn();
      // Load courses
    } catch (error) {
      // Handle error
    } finally {
      setTimeout(() => {
        this.loadingService.loadingOff();

      }, 4000);
    }
  }
}
