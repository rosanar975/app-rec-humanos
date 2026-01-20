
export interface Company {
    id: string;
    name: string;
    accessCode: string;
    photoUrl: string;
}

export const companies: Company[] = [
    {
        id: '1',
        name: 'Pachy Central',
        accessCode: '7551',
        photoUrl: 'https://picsum.photos/seed/pachy/400'
    },
    {
        id: '2',
        name: 'Adhoc S.A',
        accessCode: '5678',
        photoUrl: 'https://picsum.photos/seed/adhoc/400'
    }
];
