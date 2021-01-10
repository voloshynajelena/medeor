import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/types';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {

  clientId: string;
  client: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
) { }

  ngOnInit(): void {
    // достаем ID клиента из адресной строки и записываем в созданную выше переменную
    this.route.params.subscribe(({clientId}) => {
      this.clientId = clientId;
    });

    // используем ID клиента для получения данных клиента
    // поскольку данные нужно ждать - подписываемся на сервис и когда данные прийдут - запишем их
    this.clientService.getClientData(this.clientId).subscribe(
      (data: any) => {
        this.client = data;
      }
    );
  }
}
