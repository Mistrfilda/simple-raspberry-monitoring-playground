export interface PaginatorItem {
  id: number;
  label: string;
  offset: number;
  disabled: boolean;
  isFirst: boolean;
  isLast: boolean;
  active: boolean;
}
