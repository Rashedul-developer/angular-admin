import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery';
import { CommonService } from './../../services/common.service';
import { DataService } from './../../services/data.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  showProgressBar: Boolean = false;
  rootUrl =  this.common.rootUrl + 'uploads/';
  userdata;
  profiledata;
  userImageFile;
  erroeMsg;

  
  
  constructor(location: Location,
    private element: ElementRef,
    private router: Router,
    public auth: AuthService,
    private dataService: DataService,
    public common: CommonService,
    public translate: TranslateService,
    public _languageService: LanguageService
    ) { 

      this.location = location;
      this.sidebarVisible = false;
      common.onBufferEvent.subscribe(
        (showProgressBar) => {
          this.showProgressBar = showProgressBar;
        }
      );
  
    }

    
    
  ngOnInit(): void {
   // this.common.checkCookie();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });
    $('#menu-toggle-2').click(function (e) {
      e.preventDefault();
      $('.sidebar').toggleClass('toggled');
      $('.main-panel').toggleClass('toggled-main');
    });

    const new_color = localStorage.getItem('data-color');
    if (new_color) {
      document.querySelector('.navbare-color').setAttribute('data-color', new_color);
    } else {
      document.querySelector('.navbare-color').setAttribute('data-color', 'azure');
    }
    this.dashboarddata();
  }


 



  dashboarddata() {
    //this.common.onBufferEvent.emit(true);
    // this.dataService.getdata(this.tokenId, 'asscociation/get_profile_dataUni')
    //   .subscribe((result: any) => {
      

    //     if (result.response === 200) {
    //      // this.common.onBufferEvent.emit(false);
    //       this.userdata = result.userdata[0];
    //       this.profiledata = result.profile;
    //       //this.checkUserPromo(this.userdata['membertype']);


    //       this.userImageFile = this.rootUrl + result.profile.memberphoto
    //       //this.checkUserPromo(this.userdata.membertype)
    //       if ( result.profile.memberphoto === '' || result.profile.memberphoto === null) {
    //         // this.userImageFile = './assets/img/image_placeholder.jpg';
    //         this.userImageFile = this.rootUrl+'avater.png';

    //      } else {
    //       // this.userImageFile = this.rootUrl + result.profile.memberphoto;
    //       // this.userImageFile = this.rootUrl+'avater.png';
    //       this.userImageFile = this.rootUrl + result.profile.memberphoto
    //      }

    //     }
    //   }, error => {
    //     this.erroeMsg = error.statusText;
    //     this.common.onBufferEvent.emit(false);
    //   });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    const $toggle = document.getElementsByClassName('navbar-toggler')[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const body = document.getElementsByTagName('body')[0];

    if (this.mobile_menu_visible == 1) {
      body.classList.remove('nav-open');
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove('toggled');
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add('toggled');
      }, 430);

      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');


      if (body.querySelectorAll('.main-panel')) {
        document.getElementsByClassName('main-panel')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);

      $layer.onclick = function () { // asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove('toggled');
        }, 400);
      }.bind(this);

      body.classList.add('nav-open');
      this.mobile_menu_visible = 1;

    }
  };

  getTitle() {
    const path = this.location.prepareExternalUrl(this.location.path());

    for (let i = 0; i < this.listTitles.length; i++) {
      if (this.listTitles[i].path && this.listTitles[i].path === path) {
        return this.listTitles[i].title;
      } else if (this.listTitles[i].subMenus) {
        for (let j = 0; j < this.listTitles[i].subMenus.length; j++) {
          if (this.listTitles[i].subMenus[j].path === path) {
            return this.listTitles[i].title + ' > ' + this.listTitles[i].subMenus[j].title;
          }
        }
      }
    }
    return 'Dashboard';
  }

logoutuser() {
 this.common.bearertoken  = '';
  this.common.username = '';
  this.auth.logOut();
}

seeAnnounce() {
  
}



}
