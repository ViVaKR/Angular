export enum PostType {
  Draft = 1, // 초안
  Review = 2, // 검토
  Published = 3, // 게시
  Hidden = 4 // 숨김
}

export interface PostTypeOption {
  value: PostType;
  label: string;
  displayText: string;
}

export const POSTTYPE_OPTIONS: PostTypeOption[] = [
  { value: PostType.Draft, label: '초안', displayText: 'Draft (초안)' },
  { value: PostType.Review, label: '검토', displayText: 'Review (검토)' },
  { value: PostType.Published, label: '게시', displayText: 'Published (게시)' },
  { value: PostType.Hidden, label: '숨김', displayText: 'Hidden (숨김)' },
]
