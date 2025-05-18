import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  isSubmitting: boolean = false;
  loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  login() {
    this.isSubmitting = true;
    this.apiService
      .post('auth', this.loginFormGroup.value)
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('authorization', data['token']);
          localStorage.setItem('name', data['name']);

          this.router.navigate(['/Administrator']);
        },
        error: (error) => {
          this.snackBar.open(
            'Mohon maaf terjadi kesalahan. Mohon coba kembali beberapa saat lagi.',
            'Tutup',
            {
              duration: 1000,
            }
          );
        },
      })
      .add(() => {
        this.isSubmitting = false;
      });
  }
}
