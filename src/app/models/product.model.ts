import { Image } from "./image.model";

export class Product {
  id: number;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  descriptionFr: string;
  descriptionAr: string;
  descriptionEn: string;
  quantity: number
  price: number
  purchaseCount: number
  categoryId: number
  categoryName: number
  images: Image[]
  createdAt: Date;

  constructor(product) {
    this.id = product.id || null;
    this.nameEn = product.nameEn || "";
    this.nameAr = product.nameAr || "";
    this.nameFr = product.nameFr || "";
    this.descriptionEn = product.descriptionEn || "";
    this.descriptionAr = product.descriptionAr || "";
    this.descriptionFr = product.descriptionFr || "";
    this.quantity = product.quantity || "Out of stock";
    this.purchaseCount = product.purchaseCount || 0
    this.price = product.price || 0;
    this.categoryId = product.categoryId || "";
    this.categoryName = product.category.nameEn || "";
    if (product.media)
      this.images = Image.arrayconstructor(product.media)
    this.createdAt = product.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): Product[] {
    var productObject: Product[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        productObject.push(new Product(element));
        if (index + 1 == data.length)
          return productObject
      }
    else {
      return productObject
    }
  }

}

