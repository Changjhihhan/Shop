export interface MenuNode {
  route: string;
  content: string;
  style?: string;
  child?: MenuNode[];
}
