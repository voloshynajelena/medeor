import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/app/types';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { ClientService } from 'src/app/services/client.service';
import { TESTS } from 'src/app/components/clients-table/clients-table.component';
// import { TestBedStatic } from '@angular/core/testing';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {

  // подготавливаем переменные для записи в них данных
  clientId: string;
  client: Client;

  tests = TESTS;

  editMode = false;
  sending = false;

  clientForm: FormGroup;
  clientChipTags: string[] = [];

  // подключаем к классу сервис и роутинг
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private clientService: ClientService
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
        this.resetFormData();

        console.log(data)
      }
    );
  }

  getAge(dob: string): number {
    const dobDate = new Date(dob).getFullYear();
    const nowDate = new Date().getFullYear();

    return nowDate - dobDate;
  }

  addTag(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value.trim();

    if (value) this.clientChipTags.push(value);

    input.value = '';
  }

  removeTag(tagName: string) {
    const tags = this.clientChipTags;
    const index = tags.indexOf(tagName);

    if (index != -1) {
      tags.splice(index, 1);
    }
  }

  enableEditMode() {
    this.resetFormData();
    this.editMode = true;
  }

  disableEditMode() {
    this.editMode = false;
  }

  resetFormData() {
    this.clientForm = new FormGroup({     
      'surname': new FormControl(this.client.surname, [Validators.required]),
      'name': new FormControl(this.client.name, [Validators.required]),
      'sex': new FormControl(this.client.sex),
      'birthday': new FormControl(this.client.birthday, [Validators.required]),
      'email': new FormControl(this.client.email, [Validators.required, Validators.email]),
      'phone': new FormControl(this.client.phone, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(12)]),
      'pregnancy': new FormControl(this.client.pregnancy)
    });

    this.clientChipTags = this.client.tags.map(t => t);
  }

  submit() {
    this.sending = true;

    const user = JSON.parse(localStorage.getItem('currentUser'));
    const controls = this.clientForm.controls;

    const formData = JSON.parse(JSON.stringify(this.client));

    for (const key in controls) {
      formData[key] = controls[key].value;
    }

    this.clientService.updatePatient({
      userId: user.userId,
      token: user.token,
      ...formData,
      tags: this.clientChipTags.map(t => t)
    }).subscribe(data => {
      this.sending = false;

      for (const key in controls) {
        if (Object.prototype.hasOwnProperty.call(controls, key)) {
          this.client[key] = controls[key].value;
        }
      }

      this.client.tags = this.clientChipTags.map(t => t);

      this.disableEditMode();
    });
  }

  // TODO: Добавить удаление пациента
}
