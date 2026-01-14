import { Component, OnInit, Input  } from '@angular/core';
import { User } from '../models/User'
import { BrowserModule } from '@angular/platform-browser';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-user',
    imports: [NgFor],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[];
  message: string = "Friyay";  
 
  
  constructor() {
    
  }
  // console.log('hello User ...')
  // this.sayHello()
  // sayHello() {
  //   console.log(`Hello ${this.user.firstName} ${this.user.lastName}`)
  // }

  ngOnInit() {
    
    this.users = [
      {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        address: {
            street: "50 Main st",
            city: "Boston",
            state: "MA"
        }
    },
    {
      firstName: "notJohn",
      lastName: "notDoe",
      age: 35,
      address: {
          street: "51 Main st",
          city: "NotBoston",
          state: "ZA"
      }
  },
  {
    firstName: "pineapple",
    lastName: "ringBoy",
    age: 22,
    address: {
        street: "99 Fifth st",
        city: "NYC",
        state: "NY"
    }
}

  ]
  this.addUser({ firstName: "Bram",
    lastName: "Stoker",
    age: 225,
    address: {
        street: "55 Mill st",
        city: "Miami",
        state: "FL"
    } })
  }

addUser(user: User) {
  this.users.push(user)
}
 

}