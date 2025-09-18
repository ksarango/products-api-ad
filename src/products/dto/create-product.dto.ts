export class CreateProductDto {
  readonly sku: string;
  readonly name: string;
  readonly brand: string;
  readonly model: string;
  readonly category: string;
  readonly color: string;
  readonly price?: number;
  readonly currency: string;
  readonly stock: number;
}
