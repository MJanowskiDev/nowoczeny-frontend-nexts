export interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count?: number;
}
