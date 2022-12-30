import { Injectable } from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service'

export class GetPin implements CanActivate {
  constructor(private auth: AuthService,  private router: Router, private common: CommonService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    //  const getasptree = this.common.getasptree;
    //  if (getasptree === true) {
    //      return true;
    //  } else {
    //     this.router.navigate(['/dashboard']);
    //     return false;
    //  }
     //this.router.navigate(['/dashboard']);
        return false;
    }
}
