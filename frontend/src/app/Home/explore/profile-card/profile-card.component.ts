import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  @Input() userName: string = 'John Doe';
  @Input() userEmail: string = 'john.doe@example.com';

  startChat() {
    console.log(`Starting chat with ${this.userName}`);
    // Implement your chat logic here
  }
}
