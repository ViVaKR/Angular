// ══════════════════════════════════════════════════════════════
// app.config.ts - Markdown 관련 부분만 발췌
// ══════════════════════════════════════════════════════════════
import {
    provideMarkdown,
    MARKED_OPTIONS,
    MERMAID_OPTIONS,
    SANITIZE,
} from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';
import { MermaidAPI } from 'ngx-markdown';
import DOMPurify from 'dompurify';

// ── 🔥 핵심: Mermaid SVG + KaTeX 수식을 허용하는 sanitize 함수 ──
function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        // 🔥 Mermaid 가 생성하는 SVG 태그 허용
        ADD_TAGS: [
            'svg', 'g', 'path', 'polygon', 'polyline', 'line',
            'rect', 'circle', 'ellipse', 'text', 'tspan',
            'defs', 'marker', 'use', 'symbol', 'clipPath',
            'linearGradient', 'radialGradient', 'stop',
            'foreignObject', 'image',
            // 🔥 KaTeX 수식 태그 허용
            'math', 'semantics', 'mrow', 'mi', 'mo', 'mn',
            'msup', 'msub', 'mfrac', 'msqrt', 'mover', 'munder',
            'annotation',
        ],
        // 🔥 Mermaid / KaTeX 필수 속성 허용
        ADD_ATTR: [
            // SVG 공통
            'viewBox', 'xmlns', 'width', 'height',
            'fill', 'stroke', 'stroke-width', 'stroke-dasharray',
            'transform', 'opacity', 'd', 'points',
            'x', 'y', 'x1', 'y1', 'x2', 'y2',
            'cx', 'cy', 'r', 'rx', 'ry',
            'text-anchor', 'dominant-baseline', 'font-size',
            'font-family', 'font-weight',
            // Mermaid 전용
            'marker-end', 'marker-start', 'marker-mid',
            'refX', 'refY', 'markerWidth', 'markerHeight',
            'orient', 'markerUnits',
            'gradientUnits', 'gradientTransform',
            'offset', 'stop-color', 'stop-opacity',
            'clip-path', 'clip-rule', 'fill-rule',
            'dy', 'dx',
            // KaTeX 전용
            'encoding', 'display',
            // 스타일
            'style', 'class', 'id',
            // data 속성 (math-block placeholder)
            'data-tex',
        ],
        // SVG, HTML 모두 허용
        FORCE_BODY: false,
    });
}

// ── provideMarkdown ────────────────────────────────────────────
export const markdownConfig = provideMarkdown({
    loader: HttpClient,

    sanitize: {
        provide: SANITIZE,
        useValue: sanitizeHtml, // 🔥 함수 참조로 전달
    },

    markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
            gfm: true,
            breaks: true,
        },
    },

    mermaidOptions: {
        provide: MERMAID_OPTIONS,
        useValue: {
            theme: 'neutral',
            look: 'classic',
            securityLevel: 'loose', // 🔥 DOMPurify 가 있으니 loose 로
        } as MermaidAPI.MermaidConfig,
    },
});
