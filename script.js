google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Task ID");
  data.addColumn("string", "Task Name");
  data.addColumn("string", "Resource");
  data.addColumn("date", "Start Date");
  data.addColumn("date", "End Date");
  data.addColumn("number", "Duration");
  data.addColumn("number", "Percent Complete");
  data.addColumn("string", "Dependencies");

  var releases = [
    // {
    //   taskID: "0.9",
    //   taskName: "Django 0.9",
    //   resource: "dead",
    //   start: new Date(2005, 11, 16),
    //   end: new Date(2013, 02, 26)
    // },
    // {
    //   taskID: "1.0",
    //   taskName: "Django 1.0",
    //   resource: "dead",
    //   start: new Date(2008, 09, 03),
    //   end: new Date(2013, 02, 26)
    // },
    // {
    //   taskID: "1.1",
    //   taskName: "Django 1.1",
    //   resource: "dead",
    //   start: new Date(2009, 07, 29),
    //   end: new Date(2013, 02, 26)
    // },
    // {
    //   taskID: "1.2",
    //   taskName: "Django 1.2",
    //   resource: "dead",
    //   start: new Date(2010, 05, 17),
    //   end: new Date(2013, 02, 26)
    // },
    // {
    //   taskID: "1.3",
    //   taskName: "Django 1.3",
    //   resource: "dead",
    //   start: new Date(2011, 03, 23),
    //   end: new Date(2013, 02, 26)
    // },
    {
      taskID: "1.4",
      taskName: "Django 1.4 LTS",
      resource: "dead",
      start: new Date(2012, 03, 23),
      end: new Date(2015, 10, 01)
    },
    {
      taskID: "1.5",
      taskName: "Django 1.5",
      resource: "dead",
      start: new Date(2013, 03, 26),
      end: new Date(2014, 09, 02)
    },
    {
      taskID: "1.6",
      taskName: "Django 1.6",
      resource: "dead",
      start: new Date(2013, 11, 03),
      end: new Date(2015, 04, 01)
    },
    {
      taskID: "1.7",
      taskName: "Django 1.7",
      resource: "dead",
      start: new Date(2014, 09, 02),
      end: new Date(2015, 12, 01)
    },
    {
      taskID: "1.8",
      taskName: "Django 1.8 LTS",
      resource: "dead",
      start: new Date(2015, 04, 01),
      end: new Date(2018, 04, 01)
    },
    {
      taskID: "1.9",
      taskName: "Django 1.9",
      resource: "dead",
      start: new Date(2015, 12, 01),
      end: new Date(2017, 04, 04)
    },
    {
      taskID: "1.10",
      taskName: "Django 1.10",
      resource: "dead",
      start: new Date(2016, 08, 01),
      end: new Date(2017, 12, 02)
    },
    {
      taskID: "1.11",
      taskName: "Django 1.11 LTS",
      resource: "security",
      start: new Date(2017, 04, 04),
      end: new Date(2020, 04, 01)
    },
    {
      taskID: "2.0",
      taskName: "Django 2.0",
      resource: "dead",
      start: new Date(2017, 12, 02),
      end: new Date(2019, 04, 01)
    },
    {
      taskID: "2.1",
      taskName: "Django 2.1",
      resource: "dead",
      start: new Date(2018, 08, 01),
      end: new Date(2019, 12, 02)
    },
    {
      taskID: "2.2",
      taskName: "Django 2.2 LTS",
      resource: "bugfix",
      start: new Date(2019, 01, 01),
      end: new Date(2022, 04, 01)
    },
    {
      taskID: "3.0",
      taskName: "Django 3.0",
      resource: "bugfix",
      start: new Date(2019, 12, 02),
      end: new Date(2021, 04, 01)
    },
    {
      taskID: "3.1",
      taskName: "Django 3.1",
      resource: "prerelease",
      start: new Date(2020, 08, 01),
      end: new Date(2021, 12, 01)
    },
    {
      taskID: "3.2",
      taskName: "Django 3.2 LTS",
      resource: "prerelease",
      start: new Date(2021, 04, 01),
      end: new Date(2024, 04, 01)
    },
    {
      taskID: "4.0",
      taskName: "Django 4.0",
      resource: "prerelease",
      start: new Date(2021, 12, 01),
      end: new Date(2023, 04, 01)
    }
  ];

  for (var release of releases) {
    data.addRow([
      release.taskID,
      release.taskName,
      release.resource,
      release.start,
      release.end,
      null,
      Math.floor(
        Math.max(
          ((Math.min(new Date(), release.end) - release.start) /
            (release.end - release.start)) *
            100,
          0
        ) * 100
      ) / 100,
      null
    ]);
  }

  var options = {
    height: 600,
    gantt: {
      trackHeight: 30,
      palette: [
        {
          // Red
          color: "#db4437",
          dark: "#a52714",
          light: "#f4c7c3"
        },
        {
          // Yellow
          color: "#f2a600",
          dark: "#ee8100",
          light: "#fce8b2"
        },
        {
          // Green
          color: "#0f9d58",
          dark: "#0b8043",
          light: "#b7e1cd"
        },
        {
          // Blue
          color: "#5e97f6",
          dark: "#2a56c6",
          light: "#c6dafc"
        },
        {
          color: "#ab47bc",
          dark: "#6a1b9a",
          light: "#e1bee7"
        },
        {
          color: "#00acc1",
          dark: "#00838f",
          light: "#b2ebf2"
        },
        {
          color: "#ff7043",
          dark: "#e64a19",
          light: "#ffccbc"
        },
        {
          color: "#9e9d24",
          dark: "#827717",
          light: "#f0f4c3"
        },
        {
          color: "#5c6bc0",
          dark: "#3949ab",
          light: "#c5cae9"
        },
        {
          color: "#f06292",
          dark: "#e91e63",
          light: "#f8bbd0"
        },
        {
          color: "#00796b",
          dark: "#004d40",
          light: "#b2dfdb"
        },
        {
          color: "#c2185b",
          dark: "#880e4f",
          light: "#f48fb1"
        }
      ]
    }
  };

  var container = document.getElementById("chart_div");
  var chart = new google.visualization.Gantt(
    container
  );

  // declare these variables to be used in addMarker function
  var dateRangeStart = data.getColumnRange(3);
  var dateRangeEnd = data.getColumnRange(4);
  var formatDate = new google.visualization.DateFormat({
    pattern: 'yyyy-MM-dd'
  });

  // adds the vertical line
  function addMarker(markerDate) {
    var baseline;
    var baselineBounds;
    var chartElements;
    var markerLabel;
    var markerLine;
    var markerSpan;
    var svg;
    var timeline;
    var timelineUnit;
    var timelineWidth;
    var timespan;
  
    baseline = null;
    timeline = null;
    svg = null;
    markerLabel = null;
    chartElements = container.getElementsByTagName('svg');
    if (chartElements.length > 0) {
      svg = chartElements[0];
    }
    chartElements = container.getElementsByTagName('rect');
    if (chartElements.length > 0) {
      timeline = chartElements[0];
    }
    chartElements = container.getElementsByTagName('path');
    if (chartElements.length > 0) {
      baseline = chartElements[0];
    }
    chartElements = container.getElementsByTagName('text');
    if (chartElements.length > 0) {
      markerLabel = chartElements[0].cloneNode(true);
    }
    if ((svg === null) || (timeline === null) || (baseline === null) || (markerLabel === null) ||
        (markerDate.getTime() < dateRangeStart.min.getTime()) ||
        (markerDate.getTime() > dateRangeEnd.max.getTime())) {
      return;
    }
  
    // calculate placement
    timelineWidth = parseFloat(timeline.getAttribute('width'));
    baselineBounds = baseline.getBBox();
    timespan = dateRangeEnd.max.getTime() - dateRangeStart.min.getTime();
    timelineUnit = (timelineWidth - baselineBounds.x) / timespan;
    markerSpan = markerDate.getTime() - dateRangeStart.min.getTime();
  
    // add label
    markerLabel.setAttribute('fill', '#e91e63');
    markerLabel.setAttribute('y', options.height);
    markerLabel.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan) - 4));
    markerLabel.textContent = formatDate.formatValue(markerDate);
    svg.appendChild(markerLabel);
  
    // add line
    markerLine = timeline.cloneNode(true);
    markerLine.setAttribute('y', 0);
    markerLine.setAttribute('x', (baselineBounds.x + (timelineUnit * markerSpan)));
    markerLine.setAttribute('height', options.height);
    markerLine.setAttribute('width', 1);
    markerLine.setAttribute('stroke', 'none');
    markerLine.setAttribute('stroke-width', '0');
    markerLine.setAttribute('fill', '#e91e63');
    svg.appendChild(markerLine);
  }

  chart.draw(data, options);
  google.visualization.events.addListener(chart, 'ready', function () {
    // add marker for current date
    addMarker(new Date());
  });
}
