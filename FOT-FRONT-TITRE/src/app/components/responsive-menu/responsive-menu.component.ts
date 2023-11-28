import { Component, EventEmitter, Output } from '@angular/core';
import { faBars, faHome, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { UserLog } from 'src/app/models/user-log';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-responsive-menu',
  templateUrl: './responsive-menu.component.html',
  styleUrls: ['./responsive-menu.component.css']
})
export class ResponsiveMenuComponent {
  isAdmin$!: Observable<boolean>;
  isAuth$!: Observable<boolean>;
  user$!: UserLog;
  activeTab!: number;
  faHome = faHome;
  faHamburger = faBars;
  faXmark = faXmark;
  faLogout = faRightFromBracket;
  @Output() closeResponsiveMenu = new EventEmitter<boolean>();


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.isAuth$ = this.auth.isAuth$;
    this.isAdmin$ = this.auth.admin$;
    this.auth.user$.subscribe(result => {
      this.user$ = result;
      console.log(result)
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
  }

  closeMenu() {
    this.closeResponsiveMenu.emit(true);
  }

  deconnect(){
    localStorage.clear();
    this.auth.logout();
    this.router.navigate(['/home']);
    this.closeResponsiveMenu.emit(true);
  }
}
