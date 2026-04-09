
interface User {
  name: string;
  age: number;
}


const userB: Partial<User> = {
  name: 'B'
}
