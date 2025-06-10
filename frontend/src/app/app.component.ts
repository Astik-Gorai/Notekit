import { Component } from '@angular/core';
import { NavBarComponent } from "./Home/nav-bar/nav-bar.component";
import { HeroSectionComponent } from "./Home/hero-section/hero-section.component";
import { FooterComponent } from "./Home/footer/footer.component";
import { LoginComponent } from "./Home/login/login.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent, HeroSectionComponent, FooterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Notekit';
}
