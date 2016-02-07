export interface FishDataProps {
  key: number;
  index: number;
  details: FishObject;
  addToOrder(key: number);
}

export interface FishObject {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
}