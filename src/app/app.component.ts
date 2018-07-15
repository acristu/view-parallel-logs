import { Component } from '@angular/core';
import { LogsService, TimeSlot } from './logs.service';

@Component({
  selector: 'vpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  logsStr: string = null;

  constructor(private logsService: LogsService) {
    this.logsStr = logsService.TEST_LOG_FILE;
    this.logsService.loadLogFile(this.logsStr);
  }

  get logs() {
    return this.logsStr;
  }
  set logs(txt: string) {
    this.logsStr = txt;
    this.logsService.loadLogFile(this.logsStr);
  }

  getThreads(timeSlot: TimeSlot) {
    let ret = [];
    for (let threadName of this.logsService.threads) {
      ret.push(timeSlot.threads[threadName] ? timeSlot.threads[threadName].length : '');
    }
    return ret;
  }
}
