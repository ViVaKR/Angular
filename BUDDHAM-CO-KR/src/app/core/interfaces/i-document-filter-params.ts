import { DocumentType } from "@app/core/enums/document-type";

export interface IDocumentFilterParams {

    documentType?: DocumentType;
    isFreatured?: boolean;
    tradition?: string;
    targetLevel?: string;
}
