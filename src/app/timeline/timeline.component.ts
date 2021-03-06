import { Component, OnInit } from '@angular/core';
import { LogsService } from '../logs.service';
import { ColDef } from "ag-grid";
import * as base58 from 'base58';

@Component({
  selector: 'vpl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  private columnDefs: ColDef[] = ([
    {
      field: "time",
      valueFormatter: params => params.value.format("HH:mm:ss.SSS"),
      width: 100,
      cellStyle: {'font-size': '70%', 'padding': '0', 'line-height': '10px'},
      pinned: "left",
    }
  ] as ColDef[]).concat(Array.from(this.logsService.threads).map(t => {
    let ret: ColDef = {
      field: 'threads',
      valueGetter: params => {
        return (params.data.threads[t] || []).length;
      },
      width: 20,
      cellStyle: {'font-size': '70%', 'padding': '0', 'line-height': '10px'},
    };
    return ret;
  }));

  constructor(private logsService: LogsService) {
  }
}
