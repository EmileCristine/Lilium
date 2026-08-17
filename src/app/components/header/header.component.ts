// import { Component, computed, inject, signal } from '@angular/core';
// import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// import {
//   Router,
//   NavigationEnd,
//   RouterLink,
//   RouterLinkActive,
// } from '@angular/router';
// import { filter } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   private router = inject(Router);

//   currentRoute = signal('')
//   isMenuOpen = signal(false)

//   constructor() {
//     this.router.events.pipe(
//       filter((event): event is NavigationEnd => event instanceof NavigationEnd),
//       takeUntilDestroyed() 
//     ).subscribe(event => {
//       this.currentRoute.set(event.url);
//     });
//   }

//   headerClass = computed(() => {
//     const route = this.currentRoute();
//     let baseClass = 'header-default'

//     if (route.includes('/flores') || route.includes('/significado')) {
//       baseClass = 'header-flores'
//     }
//     return this.isMenuOpen() ? `${baseClass} menu-open` : baseClass;
//   });


//   toggleMenu() {
//     this.isMenuOpen.update((open => !open));
//   }

//   closeMenu() {
//     this.isMenuOpen.set(false);
//   }
// }

import { Component, computed, inject, signal, effect } from '@angular/core'; // Adicione o effect aqui
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private router = inject(Router);

  currentRoute = signal('')
  isMenuOpen = signal(false)

  constructor() {
    // Reage às mudanças do menu para travar/destravar o scroll da página
    effect(() => {
      if (this.isMenuOpen()) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed() 
    ).subscribe(event => {
      this.currentRoute.set(event.url);
    });
  }

  headerClass = computed(() => {
    const route = this.currentRoute();
    let baseClass = 'header-default'

    if (route.includes('/flores') || route.includes('/significado')) {
      baseClass = 'header-flores'
    }
    return this.isMenuOpen() ? `${baseClass} menu-open` : baseClass;
  });

  toggleMenu() {
    this.isMenuOpen.update((open => !open));
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
