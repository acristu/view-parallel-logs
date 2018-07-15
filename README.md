# ParallelLogsViewer

ParallelLogsViewer is a very simple tool that makes it easy to visualize and navigate multi-threaded and multi-process logs.

Features:

* configurable time slot interval for the timeline visualisationn
* configurable types of "events" using regexps and color them differently

# Usage

Just open [dist/parallel-logs-viewer/index.html](dist/parallel-logs-viewer/index.html) in your browser and copy paste the logs into the text box.

If you have logs from multiple processes you need to have a field in your log events with the process id.

# TODOs

* integrate with the Elastic Stack, perhaps a Kibana plugin OR just pull data from Elasticsearch instead 

# Contributors

This is a standard angular-cli project...
