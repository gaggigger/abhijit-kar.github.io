import {
  Component,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef
} from "@angular/core";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { MatSnackBar } from "@angular/material";

import { LinkHandlerService } from "../shared";

interface Route {
  url: string;
  label: string;
  message: string;
  reply: string;
}

@Component({
  selector: "ak-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"]
})
export class HeaderComponent {
  @ViewChildren("tabs") tabs: QueryList<ElementRef>;
  @Output()
  onHamburgerClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentUrl: any;
  isHamburgerOpen: boolean;
  loading: boolean;
  routeMap: any = {};

  routes: Route[] = [
    {
      url: "/",
      label: "Home",
      message: "Chat with Me",
      reply: "Sure"
    },
    {
      url: "/about",
      label: "About",
      message: "Tech Aficionado",
      reply: "Awesome"
    },
    {
      url: "/blog",
      label: "Blog",
      message: "Blog on Medium",
      reply: "Really?"
    },
    {
      url: "/faq",
      label: "FAQ",
      message: "Stack Overflow, Sure?",
      reply: "Wonderful"
    },
    {
      url: "/skills",
      label: "Skills",
      message: "I can Touch Type",
      reply: "Great"
    },
    {
      url: "/projects",
      label: "Projects",
      message: "Don't Let Him Poo",
      reply: "Hehe Poo!"
    },
    {
      url: "/experience",
      label: "Experience",
      message: "Extensively Experienced",
      reply: "Excellent"
    },
    {
      url: "/awards",
      label: "Awards",
      message: "Digital Superstar!",
      reply: "Outstanding"
    },
    {
      url: "/education",
      label: "Education",
      message: "Software Engineer",
      reply: "Marvellous"
    }
  ];

  contact = {
    name: "Contact",
    category: "Addresses",
    url:
      "https://docs.google.com/forms/d/e/1FAIpQLSfxFTIJXHWlBSU9xJZVL-K9OydR_ooJ69Sp4Sq571_Llp7X4g/viewform?usp=sf_link"
  };

  constructor(
    private router: Router,
    public linkHandlerService: LinkHandlerService,
    private snackBar: MatSnackBar
  ) {
    for (let i = 0; i < this.routes.length; i++) {
      this.routeMap[this.routes[i].url] = i;
    }

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.currentUrl = event.url;

      this.tabs
        .toArray()
        [this.routeMap[this.currentUrl]].nativeElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center"
        });

      const route: Route = this.routes[this.routeMap[this.currentUrl]];

      const snackBarRef = this.snackBar.open(route.message, route.reply, {
        duration: 2000
      });

      this.loading = true;
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loading = false;
    }
  }

  handleHamburgerClick() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
    this.onHamburgerClick.emit(this.isHamburgerOpen);
  }
}
