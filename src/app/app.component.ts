import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestarooneyComponent } from './component/testarooney/testarooney.component';
import { UserComponent } from './component/user/user.component'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TestarooneyComponent, UserComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
})
export class AppComponent {
  title = 'testangularapp';

  theDict = { "title": "cat"}
  bruh = this.theDict.title
  a = 10;
  b = 5;

  ans = this.a + this.b;
  inputValue: string = "Bonjour";
  otherInputValue: string = "Hola";
  isDisabled: boolean = false;
}
