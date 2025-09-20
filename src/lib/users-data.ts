// Geçici kullanıcı verisi (gerçek uygulamada veritabanı olacak)

export interface User {
  id: number;
  email: string;
  password: string;
  companyName: string;
  fullName: string;
  phone: string;
  isActive: boolean;
  createdAt: Date;
}

// Başlangıç kullanıcıları
let users: User[] = [
  {
    id: 1,
    email: 'test@test.com',
    password: '$2a$10$cOUFPTVcJ0S4WH1Y3tDh0ehr.pvcXZyl69rCZ3JAiJgUhCg/Ya5ze', // test123
    companyName: 'Test Şirketi',
    fullName: 'Test Kullanıcı',
    phone: '555-123-4567',
    isActive: true,
    createdAt: new Date('2024-01-01')
  }
];

export const getUsers = () => users;

export const findUserByEmail = (email: string) => {
  return users.find(u => u.email === email);
};

export const addUser = (user: Omit<User, 'id'>) => {
  const newUser: User = {
    ...user,
    id: users.length + 1
  };
  users.push(newUser);
  return newUser;
};

export const getUserById = (id: number) => {
  return users.find(u => u.id === id);
};
