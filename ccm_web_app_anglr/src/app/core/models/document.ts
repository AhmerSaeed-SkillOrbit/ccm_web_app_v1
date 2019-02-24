export class Document {

    id: number;
    documentId: number;
    documentUploadId: string;
    documentOriginalName: string;
    documentName: string;
    documentExtension: string;
    documentUrl: string;
    // documentType: CaseDocumentType = new CaseDocumentType();
    documentType: string;
    documentTypeId: number;
    selected: boolean;
    documentCode: string;
    documentDescription: string;
    documentTooltip: string;    
    value: string;

}
