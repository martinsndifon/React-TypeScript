const userID: string | number = 'abc1';

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
}
/* type User1 = {
  name: string;
  age: number;
  isAdmin: boolean;
  id: string | number;
}; */

// Object type
const user: User = {
  name: 'Max',
  age: 23,
  isAdmin: true,
  id: 12345,
};

// Array type
/* The below could also be written as string[], others are number[], boolean[], {name: string; age: number}[] */
const hobbies: Array<string> = ['Sports', 'Cooking', 'Reading'];

console.log(user, hobbies, userID);

function add(a: number, b: number): void {
  const result = a + b;
  console.log(result);
}

type AddFn = (a: number, b: number) => void;

function calculate(a: number, b: number, calcFn: AddFn) {
  calcFn(a, b);
}

calculate(2, 3, add);

// interface vs type
interface Credentials {
  email: string;
  password: string;
}

const creds: Credentials = {
  email: 'Martins',
  password: 'examplepass',
};

class AuthCredentials implements Credentials {
  email: string;
  password: string;
  userName: string;
}

function login(credentials: Credentials) {
  console.log(credentials);
}

login(creds);
login(new AuthCredentials());

// Merging Types
/* type Admin = {
  permissions: string[];
};

type AppUser = {
  userName: string;
};

type AppAdmin = Admin & AppUser;

const admin: AppAdmin = {
  permissions: ['login'],
  userName: 'Martins',
}; */

interface Admin {
  permissions: string[];
}

interface AppUser {
  userName: string;
}

interface AppAdmin extends Admin, AppUser {}

const admin: AppAdmin = {
  permissions: ['login'],
  userName: 'Martins',
};

console.log(admin);

// Literal types
type Role = 'admin' | 'user' | 'editor';
let role: Role;

role = 'admin';
role = 'user';
role = 'editor';
// role = 'abc'

// Type guards
function performAction(action: string | number, role: Role) {
  if (role === 'admin' && typeof action === 'string') {
    // ...
  }
}

// Generic types
let roles: Array<Role>;
roles = ['admin', 'editor'];

type DataStorage<T> = {
  storage: T[];
  add: (data: T) => void;
};

const textStorage: DataStorage<string> = {
  storage: [],
  add(data) {
    this.storage.push(data);
  },
};

const userStorage: DataStorage<User> = {
  storage: [],
  add(user) {},
};

//Generic functions

function merge<T, U>(a: T, b: U) {
  return {
    ...a,
    ...b,
  };
}

const newUser = merge<{ name: string }, { age: number }>(
  { name: 'Martins' },
  { age: 27 }
);
