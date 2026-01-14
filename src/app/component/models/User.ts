export interface User {
    firstName: string,
    lastName: string,
    age: number,  
    address: {
        city: string,
        street: string,
        state: string
    }
  }