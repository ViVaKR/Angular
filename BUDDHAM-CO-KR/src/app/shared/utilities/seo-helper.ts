import { inject } from "@angular/core";
import { ISeoData } from "@app/core/interfaces/i-seo-data";
import { SeoService } from "@app/core/services/seo-service";


export function setupPageSeo(data: ISeoData) {
  const seoService = inject(SeoService);

  seoService.updateMetaTags({
    title: `${data.title} - Buddhist Scripture`,
    description: data.description,
    keywords: `Buddha, 불교 경전, ${data.keywords}`,
    url: `https://buddham.co.kr/${data.url}`,
    type: 'website',
    twitterCard: 'summary'
  });
}
