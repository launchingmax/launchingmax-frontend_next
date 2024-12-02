export class ILink {
  constructor(public title: string, public href: string) {}
}

export interface IPagination<T> {
  items?: T[];
  itemsCount: number;
  page: number;
  pages: number;
  total: number;
}
