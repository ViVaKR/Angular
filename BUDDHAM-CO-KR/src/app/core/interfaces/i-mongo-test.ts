export interface IMongoTest {
    id: string;
    name: string;
    age: number;
    role: string;
    createAt: { $date: string };
}
