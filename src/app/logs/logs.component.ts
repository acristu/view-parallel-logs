import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { ColDef } from 'ag-grid';
import * as base58 from 'base58';

@Component({
  selector: 'vpl-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {


  private columnDefs: ColDef[] = [
    {
      field: "time",
      valueFormatter: params => params.value.format("HH:mm:ss.SSS"),
      width: 100,
      cellStyle: {'font-size': '95%', 'padding': '0', 'line-height': '20px'},
    },
    {
      field: "threadName",
      width: 100,
      cellStyle: {'font-size': '95%', 'padding': '0', 'line-height': '20px'},
    },
    {
      field: "msg",
      width: 400,
      cellStyle: {'font-size': '95%', 'padding': '0', 'line-height': '20px'},
    },
  ];

  constructor(private logsService: LogsService) { }
}
