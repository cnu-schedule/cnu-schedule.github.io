new Vue({
  el: '#classapp',

  data: {
    classes: []
  },

  methods: {
    genClass: function(e) {
      var temp, rowData;
      var list = this.classes;
      Papa.parse("csv/201610.csv", {
        download: true,
        complete: function(results) {
          for (var row = 1; row < results.data.length; row++) {
            rowData = results.data[row];
            // console.log(rowData);
            temp = {
              crn :rowData[0],
              cour:rowData[1],
              sect:rowData[2],
              titl:rowData[3],
              hour:rowData[4],
              area:rowData[5],
              type:rowData[6],
              days:rowData[7],
              time:rowData[8],
              loct:rowData[9],
              ints:rowData[10]
            }
            list.push(temp);

            setTimeout(function() {
              componentHandler.upgradeDom('MaterialCheckbox');
            }, 0);
          }
        }
    });
    }
  }
})
