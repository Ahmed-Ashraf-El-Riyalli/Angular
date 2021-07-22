export class Product {
  ID: number;
  Name: string;
  Quantity: number;
  Price: number;
  ImageName: string;

  constructor(id: number, name: string,
              quantity: number, price: number,
              imageName: string) {

    this.ID = id;
    this.Name = name;
    this.Price = price;
    this.Quantity = quantity;
    this.ImageName = imageName;
  }
}
