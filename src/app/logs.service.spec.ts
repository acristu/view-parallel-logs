import { TestBed, inject } from '@angular/core/testing';

import { LogsService } from './logs.service';

describe('LogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogsService]
    });
  });

  it('should load log file correctly', inject([LogsService], (service: LogsService) => {
    service.loadLogFile(service.TEST_LOG_FILE);
    expect(service.logs.length).toEqual(60);
    expect(Object.keys(service.timeSlots[0].threads).length).toEqual(12);
    expect(Object.keys(service.timeSlots[1].threads).length).toEqual(3);
  }));
});
