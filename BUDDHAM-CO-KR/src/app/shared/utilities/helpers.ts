import { FormGroup } from "@angular/forms";

export function trimString(value: string | undefined): string {
  return value?.replace(/^\s+|\s+$/g, '') ?? '';
}

export function appendPx(value: number | string | undefined): string {
  return value !== undefined ? `${value}px` : '';
}

export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function allowedImageExtensions(): string[] {
  return [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".tif", ".tfff", ".avif"];
}

export function allowedCompressExtensions(): string[] {
  return [
    ".zip", ".tar", ".7z", ".rar", ".gzip",
    ".txt", ".csv", ".json", ".xml",
    ".xls", ".xlsx", ".pptx", ".ppt", ".docs", ".doc"
  ]
}

export function allowedContentTypes(): string[] {
  return [
    "image/jpeg",
    "image/jpg",
    "image/mpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg",
    "image/x-icon",
    "image/svg+xml",
    "image/tif",
    "image/tiff",
    "image/avif",

    "audio/mpeg",
    "audio/wav",
    "audio/ogg",

    "text/plain",
    "text/csv",

    // 문서
    "application/json",
    "application/pdf",
    "application/xml",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",

    // 압축
    "application/zip",
    "application/x-zip-compressed",
    "application/x-7z-compressed",
    "application/x-tar",
    "application/gzip",
    "application/x-gzip",
    "application/vnd.rar",
    "application/x-rar-compressed",
    "application/x-bzip",
    "application/x-bzip2"
  ]
}

export function getFileIcon(fileName: string | undefined): string {

  if (!fileName) return 'description';
  const extension = fileName.split('.').pop()?.toLowerCase();
  const iconMap: { [key: string]: string } = {
    // 이미지
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'svg': 'image',
    'webp': 'image',

    // 문서
    'pdf': 'picture_as_pdf',
    'doc': 'description',
    'docx': 'description',
    'txt': 'description',

    // 스프레드시트
    'xls': 'table_chart',
    'xlsx': 'table_chart',
    'csv': 'table_chart',

    // 프레젠테이션
    'ppt': 'slideshow',
    'pptx': 'slideshow',

    // 압축
    'zip': 'folder_zip',
    'rar': 'folder_zip',
    '7z': 'folder_zip',

    // 비디오
    'mp4': 'video_library',
    'avi': 'video_library',
    'mov': 'video_library',

    // 오디오
    'mp3': 'audio_file',
    'wav': 'audio_file',

    // 코드
    'js': 'code',
    'ts': 'code',
    'html': 'code',
    'css': 'code',
    'json': 'code',
  };

  return iconMap[extension || ''] || 'insert_drive_file';
}

// 확장자 추출 헬퍼 함수
export function getFileExtension(fileName: string | undefined): string {
  if (!fileName) return '';
  return fileName.split('.').pop()?.toLowerCase() || '';
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { 'mismatch': true };
}
// MenuService 내부

// 🎯 역할 체크 유틸리티들
export const roleUtils = {
  // 최소 하나라도 일치 (OR 조건)
  hasAnyRole: (userRoles: string[] = [], requiredRoles: string[] = []): boolean => {
    if (requiredRoles.length === 0) return true;
    return requiredRoles.some(role => userRoles.includes(role));
  },

  // 모두 일치 (AND 조건)
  hasAllRoles: (userRoles: string[] = [], requiredRoles: string[] = []): boolean => {
    if (requiredRoles.length === 0) return true;
    return requiredRoles.every(role => userRoles.includes(role));
  },

  // 특정 역할만 (정확히 일치)
  hasExactRoles: (userRoles: string[] = [], requiredRoles: string[] = []): boolean => {
    if (userRoles.length !== requiredRoles.length) return false;
    return requiredRoles.every(role => userRoles.includes(role));
  }
};

export function includesIgnoreCase(source: readonly string[], targets: readonly string[]): boolean {
  const set = new Set(targets.map(x => x.toLowerCase()));
  return source.some(x => set.has(x.toLowerCase()));
}
