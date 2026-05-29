import { Component, OnInit, signal } from "@angular/core";
import { WeatherComponent } from "../weather/weather.component";
import { TestarooneyComponent } from "../testarooney/testarooney.component";
import { UserComponent } from "../user/user.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

 interface empInterface {
    id: number;
    name: string;
    position: string;
}

@Component({
    selector: 'app-home',
    imports: [UserComponent, FormsModule, CommonModule,],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() { } 
    ngOnInit() {
        const hello = "Hello world";
        console.log(hello);
    }

  title = 'testangularapp';
  wordOutput = "";

  theDict = { "title": "cat"}
  bruh = this.theDict.title
  a = 10;
  b = 5;

  ans = this.a + this.b;
  inputValue: string = "Bonjour";
  otherInputValue: string = "Hola";
  isDisabled: boolean = false;
  displayExample: boolean = true;
  nums: number = 20;
  displayElement: boolean = false;
  showEmployees: boolean = true;
  age: number = 18;

  items: string[] = ['Apple', 'Banana', 'Orange', 'Mango'];
  fullStackDev = [
    { id: 1,
      name: 'Angular',
    },
    {
      id: 2,
      name: 'React',
    },
    {      
      id: 3,
      name: 'Vue',
    },
    {
      id: 4,
      name: 'Node.js',
    }
  ]

 

  employees = signal<empInterface[]>([
    {id: 1, name: 'John Doe', position: 'Software Engineer' },
    {id: 2, name: 'Jane Smith', position: 'Product Manager' },
    {id: 3, name: 'Alice Johnson', position: 'UX Designer' }
  ]);

  toggleEmployees() {
    this.showEmployees = !this.showEmployees;
  }


  display(msg: string) {
    alert(msg);
  }

  count = 0;
  counter (type: string) {
    type === 'increment' ? this.count++ : this.count--;
  }

  newCount = 0;
  incr() {
    this.newCount++;
  }

  dragCount = 0;
  onDrag() {
    this.dragCount++;
  }

  onKeyPress(e: any) {
    // this.wordOutput += e.target.value;
    this.wordOutput += e.key;
  }

  isShift(event: any) {
    if (event.shiftKey && event.key === 'Y') {
      console.log('Shift + Y is pressed', event)
    }

  }

  nextCount = 0;
  // Handle keyboard events for arrow keys
  onKeyDown(event: KeyboardEvent) { 
    if(event.key === 'ArrowUp') {
      this.nextCount++;
    } else if (event.key === 'ArrowDown') {
      this.nextCount--;
  };
}

staticInput: string = "Static Input";
dynamicInput: string = '';
quantity: number = 1;
pricePerItem: number = 16.99;

get totalPrice(): number {
  const myTotal = this.quantity * this.pricePerItem;
  if (myTotal > 1000 && myTotal < 10000) {
    return parseFloat(myTotal.toPrecision(6));
  }
  return parseFloat(myTotal.toFixed(4));

}
}