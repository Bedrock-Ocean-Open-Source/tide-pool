import { Order } from '@/shared/types/sort';
import { Survey } from './types';

export const sortByKey = <T,>(a: T, b: T, order: Order, sortKey: keyof(T)) => {
  const aValue = a[sortKey];
  const bValue = b[sortKey];

  if ( order === 'asc') {
    if (!aValue) {
      return 1
    } else if (!bValue) {
      return -1
    } else {
      return (aValue < bValue) ? 1 : (aValue > bValue) ? -1 : 0;
    }
  }

  if ( order === 'desc') {
    if (!aValue) {
      return -1
    } else if (!bValue) {
      return 1
    } else {
      return (aValue < bValue) ? -1 : (aValue > bValue) ? 1 : 0;
    }
  }

  return 0;
};

export const getTotalArea = (surveys: Survey[]) => {
  const areaMap = surveys.map(survey => {
    const numb = Number(survey?.total_area);
    return Number.isNaN(numb) ? 0 : numb;
  })

  const totalArea = areaMap.reduce((prev, curr) => {
    return prev + curr
  }, 0);

  return totalArea;
};
