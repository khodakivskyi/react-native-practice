export type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
    description: string;
};

export const products: Product[] = [
    {
        id: '1',
        title: 'Навушники',
        price: 1299,
        image: 'https://picsum.photos/seed/headphones/600/400',
        description: 'Зручні навушники для музики та дзвінків. Хороша якість звуку та мікрофону.',
    },
    {
        id: '2',
        title: 'Смарт-годинник',
        price: 2199,
        image: 'https://picsum.photos/seed/watch/600/400',
        description: 'Відстеження активності, пульсу, повідомлень та сну. Стильний дизайн.',
    },
    {
        id: '3',
        title: 'Клавіатура',
        price: 999,
        image: 'https://picsum.photos/seed/keyboard/600/400',
        description: 'Компактна клавіатура для навчання та роботи. Приємний хід клавіш.',
    }
];