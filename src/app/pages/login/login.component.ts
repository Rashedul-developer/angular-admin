import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Meta } from '@angular/platform-browser';
import { CommonService } from './../../services/common.service';
import { DataService } from '../../services/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //userLoginForm: FormGroup;
  userLoginForm: any;
  usernamelControl: any;
  userPasswordControl: any;

  /* RS work file  */
  loader = false;
  showres = false;
  submit = 'Login';
  showSpin = false;
  loginError = false;
  failedMessage = '';
  ipAddress = '';
  loginresult = '';
  thisyear: Date = new Date();
  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService, private dataService: DataService,
    private meta: Meta, private common: CommonService, public dialog: MatDialog, private https: HttpClient) {
    this.buildLoginForm();
    if (this.auth.loggedIns())
      this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
  }

  getIPAddress() {
    this.https.get("https://api.ipify.org/?format=json").subscribe((res: any) => {
      this.ipAddress = res.ip;
    });
  }

  buildLoginForm() {
    this.userLoginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', Validators.required)
    });
    this.usernamelControl = this.userLoginForm.get('email') as FormControl;
    this.userPasswordControl = this.userLoginForm.get('password') as FormControl;
  }

  openResetModel() {

  }

  loginErroraa() {

  }

  submitLoginForm() {
    this.loginresult = 'success';
    this.router.navigate(['dashboard']);
  }

  // submitLoginForm() {
  //   this.loader = true;
  //   const data = this.userLoginForm.value;
  //   this.auth.login(data);
  //   this.submit = 'Submitting....';
  //   this.showSpin = true;
  //   this.auth.login(data).subscribe(
  //     res => {
  //       if (res.code == 200) {
  //         this.submit = 'Login';
  //         this.showSpin = false;

  //         let token = res.data.token;
  //         const response = res['response'];
  //         // if (response === 200) {

  //         const cvalue = { 'bearertoken': token }
  //         const cvalue1 = { 'user': this.userLoginForm.value.email }
  //         const cvalue2 = res.data.permissions;
  //         this.common.permissionsAll = res.data.all_componet_permission;
  //         let env = this.common.environmentObj
  //         this.auth.setCookie(env.tokenKey, encodeURIComponent(JSON.stringify(cvalue)), 10);
  //         localStorage.setItem(env.componentGroupPermission, encodeURIComponent(JSON.stringify(cvalue2)));
  //         localStorage.setItem(env.allComponentPermission, encodeURIComponent(JSON.stringify(res.data.all_componet_permission)));
  //         this.loginresult = 'success';
  //         this.router.navigate(['dashboard']);

  //         //  } else if (response === 400) {
  //         //    this.loginError = true;
  //         //   // this.failedMessage = result;
  //         //  }
  //         //  this.common.AClicked('Component A is clicked!!');
  //         if (!res) {

  //           this.loginresult = 'error';
  //           this.loginError = true;
  //         } else {


  //         }
  //       }
  //       else {
  //         this.submit = 'Login';
  //         this.common.openSnackBar(res.message, 'Close', 'submit-warning');
  //       }

  //     },
  //     // error => this.loader = false,
  //     // () => this.loader = false
  //     error => {
  //       this.submit = 'Login';
  //       this.showSpin = false;
  //       this.loginError = true;

  //     }
  //   );
  // }

}
