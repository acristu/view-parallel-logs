import { Component } from '@angular/core';
import { LogsService, TimeSlot, Thread } from './logs.service';

@Component({
  selector: 'vpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  logsStr: string = null;
  selectedTimeSlotTime: number = 0;
  selectedThreadId: string = '';

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

  selectTimeSlot(timeSlot: TimeSlot) {
    this.selectedTimeSlotTime = timeSlot.time.valueOf();
    this.selectedThreadId = '';
  }

  selectTimeSlotThread(timeSlot: TimeSlot, thread: Thread) {
    this.selectedTimeSlotTime = timeSlot.time.valueOf();
    this.selectedThreadId = thread.threadId;
  }
}
