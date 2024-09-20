import { Pipe, PipeTransform } from '@angular/core';
import { UtcToLocalTimeFormat } from '@app/types/utc-to-local-time-format';

@Pipe({
  name: 'utcToLocalTime',
  standalone: true
})
export class UtcToLocalTimePipe implements PipeTransform {

  transform(
    utcDate: string,
    format: UtcToLocalTimeFormat | string): string | null {

    const browserLanguage = navigator.language;

    switch (format) {
      case UtcToLocalTimeFormat.FULL:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
          hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short'
        });
      case UtcToLocalTimeFormat.LONG:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
          hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
      case UtcToLocalTimeFormat.MEDIUM:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
      case UtcToLocalTimeFormat.SHORT:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: '2-digit', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric'
        });
      case UtcToLocalTimeFormat.SHORT_DATE:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: '2-digit', month: 'numeric', day: 'numeric'
        });
      case UtcToLocalTimeFormat.SHORT_TIME:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          hour: 'numeric', minute: 'numeric'
        });
      case UtcToLocalTimeFormat.DATE:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: 'numeric', month: 'numeric', day: 'numeric'
        });
      case UtcToLocalTimeFormat.TIME:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          hour: 'numeric', minute: 'numeric', second: 'numeric'
        });
      case UtcToLocalTimeFormat.DAY:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          weekday: 'long'
        });
      case UtcToLocalTimeFormat.MONTH:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          month: 'long'
        });
      case UtcToLocalTimeFormat.YEAR:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          year: 'numeric'
        });
      case UtcToLocalTimeFormat.HOUR:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          hour: 'numeric'
        });
      case UtcToLocalTimeFormat.MINUTE:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          minute: 'numeric'
        });
      case UtcToLocalTimeFormat.SECOND:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          second: 'numeric'
        });
      case UtcToLocalTimeFormat.KST:
        return new Date(utcDate).toLocaleString(browserLanguage, {
          timeZoneName: 'short'
        });
      default:
        return null;
    }
  }

}
