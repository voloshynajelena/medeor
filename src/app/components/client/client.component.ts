import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/types';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {

  // подготавливаем переменные для записи в них данных
  clientId: string;
  client: Client;

  // подключаем к классу сервис и роутинг
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    // достаем ID клиента из адресной строки и записываем в созданную выше переменную
    this.route.params.subscribe(({clientId}) => {
      this.clientId = clientId;
    });

    // используем ID клиента для получения данных клиента
    // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    this.dataService.getClientData(this.clientId).subscribe(
      (data: any) => {
        this.client = data;
      }
    );
  }
}
