import { KatexOptions, MarkedOptions, MermaidAPI } from "ngx-markdown";

export interface IMarkdownPipeOptions {
    decodeHtml?: boolean;
    inline?: boolean;
    emoji?: boolean;
    katex?: boolean;
    katexOptions?: KatexOptions;
    mermaid?: boolean;
    mermaidOptions?: MermaidAPI.Config;
    markedOptions?: MarkedOptions;
    disableSanitizer?: boolean;
}
