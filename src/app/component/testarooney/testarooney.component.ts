import { Component, OnInit, Input  } from '@angular/core';

@Component({
    selector: 'app-testarooney',
    imports: [],
    templateUrl: './testarooney.component.html',
    styleUrl: './testarooney.component.css',
    standalone: true,
})
export class TestarooneyComponent implements OnInit {
  @Input() testString: string;

  message: string = "Hello world"
  messageClick = () => {
    console.log('Ive been clicked')
  }

  ngOnInit() {
  }


 

}
