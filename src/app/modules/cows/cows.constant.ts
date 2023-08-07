import { IBreed, ICowCategory, ICowLabel, ILocation } from './cow.interface';

export const loaction: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const breed: IBreed[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const cowFilterableFields = ['searchTerm', 'location'];

export const cowSearchableFields = ['location', 'breed', 'category'];

export const label: ICowLabel[] = ['for sale', 'sold out'];

export const category: ICowCategory[] = ['Dairy', 'Beef', 'Dual Purpose'];
