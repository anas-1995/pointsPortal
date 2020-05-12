import { Image } from "./image.model";

export class Category {
  id: number;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  image: Image
  createdAt: Date;

  constructor(category) {
    this.id = category.id || null;
    this.nameEn = category.nameEn || "";
    this.nameAr = category.nameAr || "";
    this.nameFr = category.nameFr || "";
    if (category.media)
      this.image = new Image(category.media)
    this.createdAt = category.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): Category[] {
    var categoryObject: Category[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        categoryObject.push(new Category(element));
        if (index + 1 == data.length)
          return categoryObject
      }
    else {
      return categoryObject
    }
  }

}

