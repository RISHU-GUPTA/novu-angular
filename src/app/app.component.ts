import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Novu } from '@novu/js';
import { environment } from '../../environment';
import { CardComponent } from './card/card.component';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,CardComponent,UserCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'novu-inbox-angular';
  novu: any;
  allNotifications: any[] = [];
  constructor() {}
  ngOnInit(): void {
    this.novu = new Novu({
      subscriberId: environment.subscriberId,
      applicationIdentifier: environment.applicationIdentifier,
      useCache:false
    });
    this.getAllData();
  }

  async getAllData(): Promise<any> {
    const response = await this.novu.notifications.list({
      limit: 10,
    });

    const notifications = response.data.notifications;
    console.log(notifications);
    this.allNotifications = notifications;
  }
  async handleNotificationRead(data: any) {
    if (data?.isRead) {
      const unreadNotification1 = await this.novu.notifications.unread({
        notificationId: data?.id,
      });
      console.log(unreadNotification1);
    } else {
      const unreadNotification2 = await this.novu.notifications.read({
        notificationId: data?.id,
      });
      console.log(unreadNotification2);
    }
    await this.getAllData();
  }

  async handleNotificationArchive(data: any) {
    if (data?.isArchived) {
      const unarchivedNotification3 = await this.novu.notifications.unarchive({
        notificationId: data?.id,
      });
      console.log(unarchivedNotification3);
    } else {
      const unarchivedNotification4 = await this.novu.notifications.archive({
        notificationId: data?.id,
      });
      console.log(unarchivedNotification4);
    }
    await this.getAllData();
  }
}
