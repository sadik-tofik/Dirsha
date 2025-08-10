import { Bond } from '../types';

export const bonds: Bond[] = [
  {
    id: 'bond-ggc-teff-1',
    buyerKey: 'buyer_global_grain',
    rating: 5,
    termsKey: 'terms_global_grain',
    deliveryKey: 'delivery_global_grain',
    title: 'Teff Harvest Contract (2-Ton)',
    description: "An opportunity to supply 2 tons of high-quality teff. Global Grain Co. is a reputable international buyer known for prompt payments and fair dealings.",
    requirements: "- Grade 1 Teff\n- Less than 12% moisture content\n- Must pass quality inspection at delivery point in Adama.",
    price: 50000,
    itemPrice: 25000,
    executionTime: '2024-12-31',
    expires: '2024-10-31',
    tags: ['Teff', 'Adama', 'Upfront Payment', 'Export Quality'],
    creator: 'Global Grain Co.'
  },
  {
    id: 'bond-ee-coffee-1',
    buyerKey: 'buyer_ethio_exports',
    rating: 4,
    termsKey: 'terms_ethio_exports',
    deliveryKey: 'delivery_ethio_exports',
    title: 'Premium Coffee Supply (5-Ton)',
    description: "Ethio Exports is looking for a reliable partner to supply 5 tons of premium Arabica coffee beans. This is a great chance to enter a long-term supply agreement.",
    requirements: "- Yirgacheffe or Sidamo origin beans\n- Washed process\n- Grade 1 or 2 specialty coffee.",
    price: 200000,
    itemPrice: 40000,
    executionTime: '2024-11-30',
    expires: '2024-09-30',
    tags: ['Coffee', 'Addis Ababa', 'On Delivery', 'Specialty'],
    creator: 'Ethio Exports'
  },
];
