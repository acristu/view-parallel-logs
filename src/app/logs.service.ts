import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as base58 from 'base58';

export interface Log {
  time: moment.Moment;
  threadName: string;
  msg: string;
}
export interface TimeSlot {
  time: moment.Moment;
  logs: Log[];
  threads: {[threadName: string]: Log[]};
}
export interface Thread {
  threadName: string;
  threadId: string;
  txt: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private delimiter = '|';
  private timeField = 0;
  private theadNameField = 1;
  private msgFieldStart = 2;


  private timeSlotIntervalMs = 100;
  public logs: Log[] = [];
  public threads: Set<string> = new Set();
  public timeSlots: TimeSlot[] = [];

  public loadLogFile(fileContents: string) {
    this.logs = [];
    this.threads = new Set();
    for (let line of fileContents.split(/\n/)) {
      this.readLine(line);
    }
    this.splitTimeSlots();
  }

  readLine(line: string) {
    let fields = line.split(this.delimiter);
    let time = moment(fields[this.timeField]),
      threadName = fields[this.theadNameField],
      msg = fields.slice(this.msgFieldStart).join('|');
    if (time.isValid() && threadName != null) {
      this.logs.push({ time, threadName, msg });
      this.threads.add(threadName);
    }
  }

  public setTimeSlotIntervalMs(timeSlotIntervalMs: number) {
    this.timeSlotIntervalMs = timeSlotIntervalMs;
    this.splitTimeSlots();
  }

  splitTimeSlots() {
    if (this.logs.length == 0) this.timeSlots = [];
    let currentTimeSlot: TimeSlot = {time: this.logs[0].time, threads: {}, logs: []};
    let lastLogTimestamp = this.logs[this.logs.length - 1].time.valueOf();
    let currentLogIdx = 0;

    while (currentTimeSlot.time.valueOf() + this.timeSlotIntervalMs < lastLogTimestamp) {
      for (let i = currentLogIdx; i < this.logs.length; i++, currentLogIdx++) {
        let log = this.logs[currentLogIdx];
        if (log.time.valueOf() > currentTimeSlot.time.valueOf() + this.timeSlotIntervalMs) break;
        currentTimeSlot.threads[log.threadName] = currentTimeSlot.threads[log.threadName] || [];
        currentTimeSlot.threads[log.threadName].push(log);
        currentTimeSlot.logs.push(log);
      }

      this.timeSlots.push(currentTimeSlot);
      currentTimeSlot = {time: moment(currentTimeSlot.time.valueOf() + this.timeSlotIntervalMs), threads: {}, logs: []};
    }
  }

  public TEST_LOG_FILE = `
  bla bla
  bli bli
  2018-07-14T13:00:30.773Z|2rFNvcb5PQe586owdCLxHx| some log 773 from 2rFNvcb5PQe586owdCLxHx
  2018-07-14T13:00:30.775Z|2rFNvcb5PQe586owdCLxHx| some log 775 from 2rFNvcb5PQe586owdCLxHx
  2018-07-14T13:00:30.808Z|sZuDxtfA9zTBYuB9HBB3wt| some log 808 from sZuDxtfA9zTBYuB9HBB3wt
  2018-07-14T13:00:30.809Z|sZuDxtfA9zTBYuB9HBB3wt| some log 809 from sZuDxtfA9zTBYuB9HBB3wt
  2018-07-14T13:00:30.814Z|3qnxjmSWbgC5dSaqBAEp9q| some log 814 from 3qnxjmSWbgC5dSaqBAEp9q
  2018-07-14T13:00:30.816Z|3qnxjmSWbgC5dSaqBAEp9q| some log 816 from 3qnxjmSWbgC5dSaqBAEp9q
  2018-07-14T13:00:30.824Z|uXzpk55BTc3CeBdceAFDte| some log 824 from uXzpk55BTc3CeBdceAFDte
  2018-07-14T13:00:30.827Z|uXzpk55BTc3CeBdceAFDte| some log 827 from uXzpk55BTc3CeBdceAFDte
  2018-07-14T13:00:30.834Z|r9xwPFuAWuMAekRiUKRwz8| some log 834 from r9xwPFuAWuMAekRiUKRwz8
  2018-07-14T13:00:30.837Z|r9xwPFuAWuMAekRiUKRwz8| some log 837 from r9xwPFuAWuMAekRiUKRwz8
  2018-07-14T13:00:30.843Z|iTaakptLEG4Wdd4XiFTCrB| some log 843 from iTaakptLEG4Wdd4XiFTCrB
  2018-07-14T13:00:30.844Z|iTaakptLEG4Wdd4XiFTCrB| some log 844 from iTaakptLEG4Wdd4XiFTCrB
  2018-07-14T13:00:30.848Z|2pUTUTX2FFSeyBcJg86Zcd| some log 848 from 2pUTUTX2FFSeyBcJg86Zcd
  2018-07-14T13:00:30.849Z|2pUTUTX2FFSeyBcJg86Zcd| some log 849 from 2pUTUTX2FFSeyBcJg86Zcd
  2018-07-14T13:00:30.852Z|ibUd8GuLdncE591ByQNNSM| some log 852 from ibUd8GuLdncE591ByQNNSM
  2018-07-14T13:00:30.853Z|ibUd8GuLdncE591ByQNNSM| some log 853 from ibUd8GuLdncE591ByQNNSM
  2018-07-14T13:00:30.857Z|44s8b4VHrXvig934tSZxQ6| some log 857 from 44s8b4VHrXvig934tSZxQ6
  2018-07-14T13:00:30.858Z|44s8b4VHrXvig934tSZxQ6| some log 858 from 44s8b4VHrXvig934tSZxQ6
  2018-07-14T13:00:30.861Z|5o8eoLWgzFD2vJvM1398uC| some log 861 from 5o8eoLWgzFD2vJvM1398uC
  2018-07-14T13:00:30.862Z|5o8eoLWgzFD2vJvM1398uC| some log 862 from 5o8eoLWgzFD2vJvM1398uC
  2018-07-14T13:00:30.865Z|p5cjDL4ZigwkXG1w3EypD3| some log 865 from p5cjDL4ZigwkXG1w3EypD3
  2018-07-14T13:00:30.866Z|p5cjDL4ZigwkXG1w3EypD3| some log 866 from p5cjDL4ZigwkXG1w3EypD3
  2018-07-14T13:00:30.870Z|3Lz7X25tLYMrtzNyGDFgZY| some log 870 from 3Lz7X25tLYMrtzNyGDFgZY
  2018-07-14T13:00:30.871Z|3Lz7X25tLYMrtzNyGDFgZY| some log 871 from 3Lz7X25tLYMrtzNyGDFgZY
  2018-07-14T13:00:30.874Z|xgqa5Di5CXZrHMX4DtjRMp| some log 874 from xgqa5Di5CXZrHMX4DtjRMp
  2018-07-14T13:00:30.875Z|xgqa5Di5CXZrHMX4DtjRMp| some log 875 from xgqa5Di5CXZrHMX4DtjRMp
  2018-07-14T13:00:30.878Z|fk6WRjr6nLWa83yVwfHdW7| some log 878 from fk6WRjr6nLWa83yVwfHdW7
  2018-07-14T13:00:30.879Z|fk6WRjr6nLWa83yVwfHdW7| some log 879 from fk6WRjr6nLWa83yVwfHdW7
  2018-07-14T13:00:30.882Z|mC6ZMhSaxCEEkK6wK8aqPz| some log 882 from mC6ZMhSaxCEEkK6wK8aqPz
  2018-07-14T13:00:30.883Z|mC6ZMhSaxCEEkK6wK8aqPz| some log 883 from mC6ZMhSaxCEEkK6wK8aqPz
  2018-07-14T13:00:43.952Z|2rFNvcb5PQe586owdCLxHx| some log 952 from 2rFNvcb5PQe586owdCLxHx
  
  null: TypeError: 
  2018-07-14T13:00:43.959Z|2rFNvcb5PQe586owdCLxHx| some log 959 from 2rFNvcb5PQe586owdCLxHx
  2018-07-14T13:00:43.962Z|sZuDxtfA9zTBYuB9HBB3wt| some log 962 from sZuDxtfA9zTBYuB9HBB3wt
  
  null: TypeError: 
  2018-07-14T13:00:43.968Z|sZuDxtfA9zTBYuB9HBB3wt| some log 968 from sZuDxtfA9zTBYuB9HBB3wt
  2018-07-14T13:00:43.971Z|uXzpk55BTc3CeBdceAFDte| some log 971 from uXzpk55BTc3CeBdceAFDte
  
  null: TypeError: 
  2018-07-14T13:00:43.973Z|uXzpk55BTc3CeBdceAFDte| some log 973 from uXzpk55BTc3CeBdceAFDte
  2018-07-14T13:00:43.976Z|3qnxjmSWbgC5dSaqBAEp9q| some log 976 from 3qnxjmSWbgC5dSaqBAEp9q
  
  null: TypeError: 
  2018-07-14T13:00:43.978Z|3qnxjmSWbgC5dSaqBAEp9q| some log 978 from 3qnxjmSWbgC5dSaqBAEp9q
  2018-07-14T13:00:43.980Z|r9xwPFuAWuMAekRiUKRwz8| some log 980 from r9xwPFuAWuMAekRiUKRwz8
  
  null: TypeError: 
  2018-07-14T13:00:43.982Z|r9xwPFuAWuMAekRiUKRwz8| some log 982 from r9xwPFuAWuMAekRiUKRwz8
  2018-07-14T13:00:43.986Z|iTaakptLEG4Wdd4XiFTCrB| some log 986 from iTaakptLEG4Wdd4XiFTCrB
  
  null: TypeError: 
  2018-07-14T13:00:43.988Z|iTaakptLEG4Wdd4XiFTCrB| some log 988 from iTaakptLEG4Wdd4XiFTCrB
  2018-07-14T13:00:43.990Z|ibUd8GuLdncE591ByQNNSM| some log 990 from ibUd8GuLdncE591ByQNNSM
  
  null: TypeError: 
  2018-07-14T13:00:43.992Z|ibUd8GuLdncE591ByQNNSM| some log 992 from ibUd8GuLdncE591ByQNNSM
  2018-07-14T13:00:43.995Z|2pUTUTX2FFSeyBcJg86Zcd| some log 995 from 2pUTUTX2FFSeyBcJg86Zcd
  
  bla
  
  null: TypeError: 
  2018-07-14T13:00:43.996Z|2pUTUTX2FFSeyBcJg86Zcd| some log 996 from 2pUTUTX2FFSeyBcJg86Zcd
  2018-07-14T13:00:43.998Z|44s8b4VHrXvig934tSZxQ6| some log 998 from 44s8b4VHrXvig934tSZxQ6
  
  null: TypeError: 
  2018-07-14T13:00:44.000Z|44s8b4VHrXvig934tSZxQ6| some log 000 from 44s8b4VHrXvig934tSZxQ6
  2018-07-14T13:00:44.002Z|5o8eoLWgzFD2vJvM1398uC| some log 002 from 5o8eoLWgzFD2vJvM1398uC
  
  null: TypeError: 
  2018-07-14T13:00:44.004Z|5o8eoLWgzFD2vJvM1398uC| some log 004 from 5o8eoLWgzFD2vJvM1398uC
  2018-07-14T13:00:44.008Z|p5cjDL4ZigwkXG1w3EypD3| some log 008 from p5cjDL4ZigwkXG1w3EypD3
  
  null: TypeError: 
  2018-07-14T13:00:44.010Z|p5cjDL4ZigwkXG1w3EypD3| some log 010 from p5cjDL4ZigwkXG1w3EypD3
  2018-07-14T13:00:44.012Z|3Lz7X25tLYMrtzNyGDFgZY| some log 012 from 3Lz7X25tLYMrtzNyGDFgZY
  
  null: TypeError: 
  2018-07-14T13:00:44.014Z|3Lz7X25tLYMrtzNyGDFgZY| some log 014 from 3Lz7X25tLYMrtzNyGDFgZY
  2018-07-14T13:00:44.017Z|xgqa5Di5CXZrHMX4DtjRMp| some log 017 from xgqa5Di5CXZrHMX4DtjRMp
  
  null: TypeError: 
  2018-07-14T13:00:44.019Z|xgqa5Di5CXZrHMX4DtjRMp| some log 019 from xgqa5Di5CXZrHMX4DtjRMp
  2018-07-14T13:00:44.021Z|fk6WRjr6nLWa83yVwfHdW7| some log 021 from fk6WRjr6nLWa83yVwfHdW7
  
  null: TypeError: 
  2018-07-14T13:00:44.023Z|fk6WRjr6nLWa83yVwfHdW7| some log 023 from fk6WRjr6nLWa83yVwfHdW7
  2018-07-14T13:00:44.027Z|mC6ZMhSaxCEEkK6wK8aqPz| some log 027 from mC6ZMhSaxCEEkK6wK8aqPz
  
  null: TypeError: 
  2018-07-14T13:00:44.028Z|mC6ZMhSaxCEEkK6wK8aqPz| some log 028 from mC6ZMhSaxCEEkK6wK8aqPz
  bla 
  bli
  blu
  blo
  `
  
}
