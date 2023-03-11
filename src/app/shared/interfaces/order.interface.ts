export interface Order {
  'id': number;
  'date-assignment': string;
  'date-execution'?: string;
  'suscriptor': any;
  'meter'?: any;
  'order-status': any;
  'causal'?: any;
  'order-type': any;
  'operating-unit': any;
  'observation'?: string;
  items?: any;
  'additional-data'?: any;
  'pictures'?: any;
  latitud: number;
  longitud: number;
  limite: number;
  'cantidad-soporte': number;
}

export interface OrderType {
  id: number;
  description: string;
  items?: any;
  'additional-data'?: any;
}

export interface Item {
  id: number;
  description: string;
  'quantity-min'?: number;
  'quantity-max'?: number;
  'quantity': number;
}

export interface OrderUpdateOffline {
  id: number;
  status: number;
  order: any;
  'old-order': any;
  time: any;
}
