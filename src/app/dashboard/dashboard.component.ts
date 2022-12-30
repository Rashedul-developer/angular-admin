import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import * as Chartist from 'chartist';
import { CommonService } from '../services/common.service';
import { DataService } from '../services/data.service';
import { BadInput } from '../core_classes/bad-input';
import { AppError } from '../core_classes/app-error';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../services/language.service';

export interface DialogData {
  mobile: string;
  save_type: string;
  change_name: string;
  otpcode: string;
  title: string;
  change_cost: string;
  countdate: string;
}

export interface DialogDataexpair {
  mobile: string;
  save_type: string;
  change_name: string;
  otpcode: string;
  title: string;
  change_cost: string;
  countdate: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalearning: number = .00;


  //tokenId = this.common.mycookie.bearertoken ;
  rootUrl = this.common.rootUrl + 'uploads/';
  erroeMsg = ''


  userdata: {
    username: string,
    sponsor: string,
    upline: string,
    entrydate: string,
    mobile: string,
    rcf: string,
    lcf: string,
    membertype: string
  };

  userImageFile = './assets/img/image_placeholder.jpg';
  tableBuffer = true;
  showTable = false;
  allnotice = []
  // totalearning;




  announceArrive: number = 0;
  @Output() messageEvent = new EventEmitter<number>();
  constructor(public common: CommonService, private dataService: DataService, public dialog: MatDialog, public _languageService: LanguageService) { }
  // startAnimationForLineChart(chart) {
  //   let seq: any, delays: any, durations: any;
  //   seq = 0;
  //   delays = 80;
  //   durations = 500;

  //   chart.on('draw', function (data) {
  //     if (data.type === 'line' || data.type === 'area') {
  //       data.element.animate({
  //         d: {
  //           begin: 600,
  //           dur: 700,
  //           from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //           to: data.path.clone().stringify(),
  //           easing: Chartist.Svg.Easing.easeOutQuint
  //         }
  //       });
  //     } else if (data.type === 'point') {
  //       seq++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq * delays,
  //           dur: durations,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq = 0;
  // };
  // startAnimationForBarChart(chart) {
  //   let seq2: any, delays2: any, durations2: any;

  //   seq2 = 0;
  //   delays2 = 80;
  //   durations2 = 500;
  //   chart.on('draw', function (data) {
  //     if (data.type === 'bar') {
  //       seq2++;
  //       data.element.animate({
  //         opacity: {
  //           begin: seq2 * delays2,
  //           dur: durations2,
  //           from: 0,
  //           to: 1,
  //           easing: 'ease'
  //         }
  //       });
  //     }
  //   });

  //   seq2 = 0;
  // };
  ngOnInit(): void {
    //this.common.checkCookie();
    // this.openUpdateMobile();
    // this.common.aClickedEvent
    // .subscribe((data:string) => {
    // //  this.openUpdateMobile();

    // });
    // this.stepdetails();
    //this.userTodayTeamCount();


    // this.common.checkCookie();
  }

  info() {
    this.common.openSnackBar('Success Created', 'Close', 'submit-info');
  }
  success() {
    this.common.openSnackBar('Success Created', 'Close', 'submit-success');
  }
  warning() {
    this.common.openSnackBar('Warning Created', 'Close', 'submit-warning');
  }
  danger() {
    this.common.openSnackBar('Error Created', 'Close', 'submit-error');
  }









  forPreques() {

    if (Number(this.userdata.membertype) > 1) {
      return 'Prerequisites :';
    } else {
      return '&nbsp;'
    }
  }


  forBsDev() {

    if (Number(this.userdata.membertype) > 3) {
      return 'col-lg-6 col-md-6 col-sm-12 col-12';
    } else {
      return 'col-lg-12 col-md-12 col-sm-12 col-12';
    }
  }







  getDataDiff(startDate) {
    var endDate = new Date();
    var specifiedTime = new Date(startDate);
    var diff = endDate.getTime() - specifiedTime.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));

    //var timae = { day: days, hour: hours, minute: minutes, second: seconds };
    let timae = 'You last logined ';
    if (days > 0) {
      timae = timae + days + ' days ';
    }

    if (hours > 0) {
      timae = timae + hours + ' hour ';
    }

    if (minutes > 0) {
      timae = timae + minutes + ' minute ';
    }

    if (seconds > 0) {
      timae = timae + seconds + ' second ago. ';
    }

    return timae
  }


}