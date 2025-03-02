
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface CodeFile {
  id: string;
  name: string;
  html: string;
  css: string;
  js: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Developer {
  name: string;
  role: string;
  image: string;
  links: {
    instagram?: string;
    github?: string;
    telegram?: string;
    website?: string;
    codepen?: string;
  };
}
