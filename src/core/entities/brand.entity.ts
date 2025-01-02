export class Brand {
  id?: number;
  name!: string;

  constructor(brand: Partial<Brand>) {
    Object.assign(this, brand);
  }
}
