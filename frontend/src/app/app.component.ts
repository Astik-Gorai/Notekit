import { Component } from '@angular/core';
import { NavBarComponent } from "./Home/nav-bar/nav-bar.component";
import { HeroSectionComponent } from "./Home/hero-section/hero-section.component";
import { FooterComponent } from "./Home/footer/footer.component";
import { LoginComponent } from "./Home/login/login.component";
import { RouterOutlet } from '@angular/router';
import { ExploreComponent } from './Home/explore/explore.component';



interface Comment {
  user: string;
  text: string;
  timestamp: Date;
}

interface Note {
  id: number;
  user: string;
  content: string;
  fileName: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent, HeroSectionComponent, FooterComponent, LoginComponent, ExploreComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Notekit';

  sampleNote: Note = {
  id: 1,
  user: 'JohnDoe',
  content: 'This is a sample note\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6',
  fileName: 'sample.txt',
  likes: 10,
  comments: [
    { user: 'Jane', text: 'Great note!', timestamp: new Date() }
  ],
  createdAt: new Date()
};
}
