import { Image } from "./image.model";

export class User {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  apartmentNumber	: string;
  streetName: string;
  civicNumber: string;
  city: string;
  postalCode: string;

  birthdate: Date
  image: Image
  points:number
  createdAt: Date;

  constructor(user) {
    this.id = user.id || null;
    this.name = user.name || "";
    this.email = user.email || "";
    this.gender = user.gender || "";
    this.phone = user.phone || "";
    this.apartmentNumber = user.apartmentNumber || "";
    this.streetName = user.streetName || "";
    this.civicNumber = user.civicNumber || "";
    this.city = user.city || "";
    this.postalCode = user.postalCode || "";
    this.points=user.points||0
    this.birthdate = new Date(user.birthdate)
    if (user.media)
      this.image = new Image(user.media)
    this.createdAt = user.createdAt || new Date()
  }

  static arrayConstructor(data: any[]): User[] {
    var userObject: User[] = []
    if (data.length > 0)
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        userObject.push(new User(element));
        if (index + 1 == data.length)
          return userObject
      }
    else {
      return userObject
    }
  }

}

