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

export interface FishOrderProps {
  key: string;
  index: string;
  fish: FishObject;
  count: number;
  removeFromOrder(key: string);
}

export interface OrderProps {
  fishes: Object;
  order: Object;
  removeFromOrder(key: string);
}

export interface UpdateFishProps {
  key: string;
  index: string;
  fish: FishObject;
  updateFish(key: string, attr: string, value: string | number);
  removeFish(key: string);
}