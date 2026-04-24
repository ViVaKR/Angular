export interface ISeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile' | 'scripture' | 'chat';
  twitterCard?: 'summary' | 'summary_large_image';
}
