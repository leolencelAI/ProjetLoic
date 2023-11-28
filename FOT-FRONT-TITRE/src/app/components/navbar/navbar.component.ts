import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { faBars, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { UserLog } from 'src/app/models/user-log';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit{
  isAdmin$!: Observable<boolean>;
  isAuth$!: Observable<boolean>;
  user$!: UserLog;
  activeTab!: number;
  responsiveDesign!: boolean;
  responsiveMenu!: boolean;
  faHome = faHome;
  faHamburger = faBars;
  faLogout = faRightFromBracket;

  constructor(private auth: AuthService,
              private router: Router,
              private responsiveService: BreakpointObserver) { }

  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$;
    this.isAdmin$ = this.auth.admin$;
    this.auth.user$.subscribe(result => {
      this.user$ = result;
    })

    //Listen Url change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/home':
            this.activeTab = 1;
            break;
          case '/ma-collection':
            this.activeTab = 2;;
            break;
          case '/ma-liste':
            this.activeTab = 3;
            break;
          case '/connexion':
            this.activeTab = 4;
            break;
          case '/admin':
            this.activeTab = 5;
            break;
          default:
            this.activeTab = 0;
            break;
        }
        window.scrollTo(0, 0);
      }
    });

    //Responsive for small screen
    this.responsiveService.observe('(max-width: 1150px)')
    .subscribe(result => {
      if (result.matches) {
        this.responsiveDesign = true;
      } else {
        this.responsiveDesign = false;
      }
    });
  }

  deconnect(){
    localStorage.clear();
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}

