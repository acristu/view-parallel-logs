import { Component } from '@angular/core';
import { LogsService } from './logs.service';

@Component({
  selector: 'vpl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private logsService: LogsService) {
    logsService.loadLogFile(logsService.TEST_LOG_FILE);
  }
}
