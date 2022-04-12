import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataStorage: DataStorageService) {}

  ngOnInit(): void {}

  onSaveDataClicked() {
    this.dataStorage.storeRecipies();
  }
  onFetchDataClicked() {
    this.dataStorage.fetchRecipies().subscribe();
  }
}
