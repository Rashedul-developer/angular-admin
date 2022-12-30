import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonService } from '../services/common.service'



@Injectable()
export class AppRole implements CanActivate {
  constructor(private auth: AuthService,  private router: Router, private common: CommonService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    // const found = this.common.rolelist.find(function(element) { 
    //   if ( route.data.role ==  element.role) {
    //     sessionStorage.setItem('pageurl', element.pageurl)
    //     return element.pageaccess;
    //   }
    // });

    // if (found) {
    //   return true;
    // } else {
    //   this.router.navigate(['/dashboard']);
    //   return false;
    // }
    return true;

  }



}
