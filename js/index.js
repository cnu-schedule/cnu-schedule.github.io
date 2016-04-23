var chkBoxFun = function() {
  $_lst = $(this).find("#list_str").text().split(",");
  $_bol = $(this).find("#chkBox").is(':checked');

  if ($_bol) {
    console.log("Adding");
    getDate($_lst);
  } else {
    console.log("Removing");
    $('#calendar').fullCalendar('removeEvents', $_lst[13]);
  }
};
var headFun = function() {
  $header = $(this);
  //getting the next element
  $content = $header.next();
  $content.slideToggle(250, function() {});
};

$(document).ready(function() {
  Papa.parse("https://raw.githubusercontent.com/cnu-schedule/cnu-schedule.github.io/master/csv/201610.csv", {
    download: true,
    complete: function(result) {
      var data = [],
        temp;
      for (var i = 1; i < result.data.length; i++) {
        result.data[13] = i;
        temp = row(result.data[i]);
        data.push({
          values: result.data[i],
          markup: temp,
          active: true
        });
      }
      
      console.log(result.data[0]);

      var clusterize = new Clusterize({
        rows: filterRows(data),
        scrollId: 'scrollArea',
        contentId: 'contentArea'
      });

      var search = document.getElementById('search');
      var onSearch = function() {
        for (var i = 0, ii = data.length; i < ii; i++) {
          var suitable = false;
          for (var j = 0, jj = data[i].values.length; j < jj; j++) {
            if (data[i].values[j].toString().indexOf(search.value) + 1)
              suitable = true;
          }
          data[i].active = suitable;
        }
        clusterize.update(filterRows(data));
        $('[id^="checkBox"]').unbind("click");
        $('.header').unbind("click");

        $('[id^="checkBox"]').click(chkBoxFun);
        $('.header').click(headFun);
      }
      search.oninput = onSearch;

      $('[id^="checkBox"]').click(chkBoxFun);
      $('.header').click(headFun);
    }
  });
});

$(function() {
  $('#calendar').fullCalendar({
    header: {
      ignoreTimezone: false
    },
    selectable: true,
    selectHelper: true,
    editable: true,
    eventSources: [],
    aspectRatio: 1.35,
    slotLabelFormat: 'H(:mm)',
    minTime: '07:00:00',
    maxTime: '22:00:00',
    allDaySlot: false,
    defaultView: 'agendaWeek',
    weekends: false
  });
  $('#calendar').fullCalendar('gotoDate', moment("2015-11-18"));
});

function filterRows(rows) {
  var _result = [];
  for (var _i = 0; _i < rows.length; _i++) {
    if (rows[_i].active)
      _result.push(rows[_i].markup);
  }
  return _result;
};

function getDate(_list) {
  console.log(_list);
  var days = _list[7].split("");
  console.log(days.length);
  var dateStr, dateEnd, time, hour, min, wkdy, title;
  for (var i = 0; i < days.length; i++) {
    switch (days[i]) {
      case "M":
        wkdy = 16;
        break;
      case "T":
        wkdy = 17;
        break;
      case "W":
        wkdy = 18;
        break;
      case "R":
        wkdy = 19;
        break;
      case "F":
        wkdy = 20;
        break;
    }
    hour = parseInt(_list[8].substr(0, 2));
    min = parseInt(_list[8].substr(2, 2));
    dateStr = date(wkdy,hour,min);
    hour = parseInt(_list[8].substr(5, 2));
    min = parseInt(_list[8].substr(7, 2));
    dateEnd = date(wkdy,hour,min);
    titleStr = _list[3];

    console.log({
      ds: dateStr,
      de: dateEnd,
      tl: titleStr
    });

    $('#calendar').fullCalendar('renderEvent', {
      id: _list[13],
      title: titleStr,
      start: dateStr, //2015-11-19T12:30:00
      end: dateEnd,
      editable: false
    }, true);
  }
};

function date(_day, _hour, _min) {
  if(_hour < 10)
    _hour = "0" + _hour;
  if(_min == 0)
    _min = "00";
  return "2015-11-" + _day + "T" + _hour + ":" + _min + ":00";
}

function row(_list) {
  return "" +
    "<div class='container'>" +
    "<div class='header'>" +
    "<table style='width:95%'> <tr>" +
    "<td id='checkBox'>" +
    "<input type='checkbox' id='chkBox'>" +
    "<p hidden id='list_str'>" + _list.toString() + "</p>" +
    "</input>" +
    "</td>" +
    "<td style='width:50%'>" + _list[3] + "</td>" +
    "<td style='width:20%'>" + _list[1] + "</td>" +
    "<td style='width:15%;text-align:right'> CRN: " + _list[0] + "</td>" +
    "<td style='width:15%;text-align:right'>" + _list[7] + "</td>" +
    "</tr> </table>" +
    "</div>" +
    "<div class='content'>" +
    "<table style='padding-left:5%;width:95%'>" +
    "<tr>" +
    "<td style=''> Hour(s): " + _list[4] + " </td>" +
    "<td style=''> Section: " + _list[2] + " </td>" +
    "<td style=''> Area of Inquery: " + _list[5] + " </td>" +
    "<td style=''> Type: " + _list[6] + " </td>" +
    "</tr>" +
    "<tr>" +
    "<td style=''> Time: " + _list[8] + " </td>" +
    "<td style=''> Location: " + _list[9] + " </td>" +
    "<td style=''> Teacher: " + _list[10] + " </td>" +
    "</tr>" +
    "<tr>" +
    "<td style=''> Status: " + _list[12] + " </td>" +
    "<td style=''> Seats: " + _list[11] + " </td>" +
    "</tr>" +
    "</table>" +
    "</div>" +
    "</div>";
};
