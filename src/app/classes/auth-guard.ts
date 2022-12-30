import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(): boolean {
    return true;
    if (this.auth.loggedIns()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
