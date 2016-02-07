export interface FishDataProps {
  key: number;
  index: number;
  details: FishData;
  addToOrder(key: number);
}

export interface FishData {
  name: string;
  price: number;
  status: string;
  desc: string;
  image: string;
}

export interface FishOrderProps {
  key: string;
  index: string;
  fish: FishData;
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
  fish: FishData;
  updateFish(key: string, attr: string, value: string | number);
  removeFish(key: string);
}

export interface InventoryProps {
  addFish(fish: FishData);
  loadSamples();
  fishes: Object;
  updateFish(key: string, attr: string, value: string | number);
  removeFish(key: string);
}