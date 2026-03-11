import {News} from '../types/News';

export const newsData: News[] = Array.from({length: 20}).map((_, i) => ({
    id: String(i),
    title: `News ${i + 1}`,
    description: `Description for news ${i + 1}`,
    image: "https://picsum.photos/200"
}));