import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputDataUserComponent } from './input-data-user/input-data-user.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputDataUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular-App';
}
