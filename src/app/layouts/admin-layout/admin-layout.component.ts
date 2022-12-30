import { Component, OnInit } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';
import { Meta } from '@angular/platform-browser';
import * as $ from 'jquery';
import { CommonService } from '../../services/common.service';
import { distinctUntilChanged, filter, tap, map, subscribeOn } from 'rxjs/operators';

export interface Breadcrumb{
  label: string;
    url: string;
}

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
 // private _router: Subscription;
//  private _router: Subscription;
  private lastPoppedUrl: any;
  private yScrollStack = Array();
  public cartArrData = [];

  // breadcrumbs$ = this.router.events.pipe(
  //   filter(event => event instanceof NavigationEnd),
  //   distinctUntilChanged(),
  //   map(event => this.buildBreadCrumb(this.activatedRoute.root))
  // );
 // public breadcrumbs: Breadcrumb[];
  public breadcrumbs;
  private ActiveRouteStr

  constructor(public common: CommonService, public location: Location,
    private router: Router, private activatedRoute: ActivatedRoute,
    private meta: Meta) { }

  ngOnInit(): void {
    const metaMirror = this.meta;
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function
      document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
    }
    const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
    const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(event => {
        // ... whatever to do with the NavigationEnd event
        elemMainPanel.scrollTop = 0;
      })
    );
    // this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
    //   elemMainPanel.scrollTop = 0;
    //  // elemSidebar.scrollTop = 0;
    // });
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }

    const window_width: any = $(window).width();
    const $sidebar = $('.sidebar');
    const $sidebar_responsive = $('body > .navbar-collapse');
    const $sidebar_img_container = $sidebar.find('.sidebar-background');


    if (window_width > 767) {
      if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
        $('.fixed-plugin .dropdown').addClass('open');
      }

    }

    $('.fixed-plugin a').click(function(event) {
      // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
      if ($(this).hasClass('switch-trigger')) {
        if (event.stopPropagation) {
          event.stopPropagation();
        } else if (window.event) {
          window.event.cancelBubble = true;
        }
      }
    });

    $('.fixed-plugin .badge').click(function() {
      const $full_page_background = $('.full-page-background');


      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      const new_color = $(this).data('color');

      if ($sidebar.length !== 0) {
        $sidebar.attr('data-color', new_color);
        //  $formheadcolor.attr('data-color', new_color);
        localStorage.setItem('data-color', new_color);
        // update meta
        updateMeta(new_color);
        // if (document.querySelector('.form-head-color')) {
        //   document.querySelector('.form-head-color').setAttribute('data-color', new_color);
        // }
        // if (document.querySelector('.navbare-color')) {
        //   document.querySelector('.navbare-color').setAttribute('data-color', new_color);
        // }
      }

      if ($sidebar_responsive.length !== 0) {
        $sidebar_responsive.attr('data-color', new_color);
      }
    });

    $('.fixed-plugin .img-holder').click(function() {
      const $full_page_background = $('.full-page-background');

      $(this).parent('li').siblings().removeClass('active');
      $(this).parent('li').addClass('active');


      const new_image = $(this).find('img').attr('src');

      if ($sidebar_img_container.length !== 0 ) {
        $sidebar_img_container.fadeOut('fast', function() {
          $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
          $sidebar_img_container.fadeIn('fast');
        });
      }

      if ($full_page_background.length !== 0) {
        $full_page_background.fadeOut('fast', function() {
          $full_page_background.css('background-image', 'url("' + new_image + '")');
          $full_page_background.fadeIn('fast');
        });
      }

      if ($sidebar_responsive.length !== 0) {
        $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
      }
    });

    const new_color:  any = localStorage.getItem('data-color');
    this.addMeta(new_color);

    // if (new_color) {
    //   document.querySelector('.badge-' + new_color).classList.add('active');
    // } else {
    //   document.querySelector('.badge-azure').classList.add('active');
    // }

    function updateMeta(color: string) {
      switch (color) {
        case 'azure':
          metaMirror.updateTag({ name: 'theme-color', content: '#00bcd4' });
          break;
        case 'purple':
          metaMirror.updateTag({ name: 'theme-color', content: '#563d7c' });
          break;
        case 'green':
          metaMirror.updateTag({ name: 'theme-color', content: '#4caf50' });
          break;
        case 'orange':
          metaMirror.updateTag({ name: 'theme-color', content: '#ff9800' });
          break;
        case 'danger':
          metaMirror.updateTag({ name: 'theme-color', content: '#f44336' });
          break;
        default:
          metaMirror.updateTag({ name: 'theme-color', content: '#00bcd4' });
      }
    }


    this.breadcrumbs = [];
  
   this.ActiveRouteStr = this.activatedRoute.snapshot['_routerState'].url
   this.breadcrumbs = this.ActiveRouteStr.slice(1).split('/');
  


   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
    //set breadcrumbs
    this.ActiveRouteStr = this.activatedRoute.snapshot['_routerState'].url
    this.breadcrumbs = this.ActiveRouteStr.slice(1).split('/');
  });


  }

  getBredcumValue(breadcrumb) {
    let aa = breadcrumb.split('-')
    let string = '' 
    aa.forEach( (elment, idx) => {
      string += elment + ' '
     
    } )
    return string;
    
  }


/////////////////////////////////////////////////////


 getCartQty(updateQty) {
   if (updateQty > 0) {
     return true;
   } else {
     return false;
   }
 }



 

  ngAfterViewInit() {
    this.runOnRouteChange();
  }

  isMaps(path: string) {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice( 1 );
    if (path === titlee) {
      return false;
    } else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

  addMeta(color: string) {
    // Remove previous theme color if available
    const theme = this.meta.getTag('name=theme-color');
    if (theme) {
      this.meta.removeTag('name="theme-color"');
    }
    // Add new theme color
    switch (color) {
      case 'azure':
        this.meta.addTag({ name: 'theme-color', content: '#00bcd4' });
        break;
      case 'purple':
        this.meta.addTag({ name: 'theme-color', content: '#563d7c' });
        break;
      case 'green':
        this.meta.addTag({ name: 'theme-color', content: '#4caf50' });
        break;
      case 'orange':
        this.meta.addTag({ name: 'theme-color', content: '#ff9800' });
        break;
      case 'danger':
        this.meta.addTag({ name: 'theme-color', content: '#f44336' });
        break;
      default:
        this.meta.addTag({ name: 'theme-color', content: '#00bcd4' });
    }
  }

}
