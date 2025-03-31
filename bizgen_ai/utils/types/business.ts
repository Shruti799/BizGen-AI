// business state type
interface BusinessState {
    _id: string;
    userEmail: string;
    name: string;
    category: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    hours: string;
    logo: string;
    abn: string;
    slug: string;
    published?: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}
   