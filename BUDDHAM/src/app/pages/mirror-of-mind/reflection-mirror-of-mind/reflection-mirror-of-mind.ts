import { Component, inject } from '@angular/core';
import { LocationService } from '@app/core/services/location-service';
import { BodyTitle } from "@app/shared/body-title/body-title";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'reflection-mirror-of-mind',
  imports: [BodyTitle, MatAnchor],
  templateUrl: './reflection-mirror-of-mind.html',
  styleUrl: './reflection-mirror-of-mind.scss',
})
export class ReflectionMirrorOfMind {

  readonly locationService = inject(LocationService);

  async onSubmit() {
    try {
      const pos = await this.locationService.getCurrentLocation();

      const payload = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      }
      console.log('-> location:', payload.latitude, payload.longitude);
    } catch (error) {
      console.error('위치 정보를 가져오지 못했습니다. 위치 없이 저장 합니다.');
    }
  }
}
