new Vue({
  el: '#classapp',

  data: {
    classes: [{
      crn :"1234",
      cour:"ACCT 201",
      sect:"1",
      titl:"Prin of Account I: Financial",
      hour:"3",
      area:"",
      type:"Lec",
      days:"MWF",
      time:"0800-0850",
      loct:"LUTR 264",
      ints:"Lingenfelter, G "
    }]
  },

  methods: {
    genClass: function(e) {
      console.log("Hello World");

      Papa.parse("csv/201610.csv", {
        worker: true,
        download: true,
        setp: function(row) {
          console.log(row.data);
        },
        complete: function(results) {
          console.log("DONE");
        }
    });
    }
  }
})
