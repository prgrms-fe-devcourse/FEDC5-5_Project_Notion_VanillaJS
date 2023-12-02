export interface DocumentResponse {
  id: number;
  title: string;
  documents: DocumentResponse[];
}

export interface DocumentDetailResponse {
  id: number;
  title: string;
  content: string;
  documents: DocumentMeta[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentMeta {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPostResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentPutResponse {
  id: number;
  title: string;
  content: string;
  parent: number | null;
  createdAt: Date;
  updatedAt: Date;
  username: string;
}

export interface DocumentDeleteResponse {
  id: number;
  title: string;
  content: string;
  parent: DocumentDeleteResponse;
  createdAt: Date;
  updatedAt: Date;
  username: string;
}

export interface DocumentPostRequest {
  title: string;
  parent: number | null;
}

export interface DocumentPutRequest {
  id: number;
  title: string;
  content: string;
}
