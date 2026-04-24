import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ISeoData } from '@app/core/interfaces/i-seo-data';

@Injectable({
  providedIn: 'root',
})
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  updateMetaTags(data: ISeoData): void {

    // Title
    this.title.setTitle(data.title);

    // Basic Meta Tags
    this.meta.updateTag({ name: 'description', content: data.description });
    if (data.keywords)
      this.meta.updateTag({ name: 'keywords', content: data.keywords });

    // Open Graph Meta Tags
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    if (data.image)
      this.meta.updateTag({ property: 'og:image', content: data.image });
    this.meta.updateTag({ property: 'og:type', content: data.type || 'website' });
    if (data.url)
      this.meta.updateTag({ property: 'og:url', content: data.url });

    // Twitter Card Meta Tags
    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    if (data.image)
      this.meta.updateTag({ name: 'twitter:image', content: data.image });

  }
}
