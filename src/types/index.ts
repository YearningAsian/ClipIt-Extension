// Type definitions for ClipIt
export interface Clip {
  id: string;
  title: string;
  content: string;
  url: string;
  type: 'article' | 'highlight' | 'image' | 'video';
  tags: string[];
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  clipIds: string[];
  description: string;
  createdAt: Date;
}