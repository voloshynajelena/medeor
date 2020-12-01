import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { DataService } from 'src/app/services/data.service';
import { Client, User } from 'src/app/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  data: User;
  userId: string;
  clients: Client[];

  // подключаем к классу сервис и роутинг
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
  // достаем ID из адресной строки и записываем в созданную выше переменную
    this.route.params.subscribe(({userId}) => {
      this.userId = userId;
    })

    // используем ID пользователя для получения данных пользователя
    // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    this.dataService.getUserData(this.userId).subscribe(
      (data: User) => {
        this.data = data
      }
    )
    // используем ID пользователя для получения всех клиентов
    // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    this.dataService.getClientsData(this.userId).subscribe(
      (data: any) => {
        this.clients = data.clients
      }
    )
  }

}
