
console.log("JS CONNECTED!")
    
        // Initialize Firebase
        var config = {
        apiKey: "AIzaSyAYUiijWTpQQAs-6bwTAYROWgNq1R5aIW4",
        authDomain: "train-app-5b413.firebaseapp.com",
        databaseURL: "https://train-app-5b413.firebaseio.com",
        projectId: "train-app-5b413",
        storageBucket: "train-app-5b413.appspot.com",
        messagingSenderId: "450510539465"


      };
      firebase.initializeApp(config);

      var trainData = firebase.database();
    //Add train with form
      $('#addTrain').on('click',function(event){
          event.preventDefault();
          console.log("ADD TRAIN CLICKED!!!")
        var date = new Date();
        var day = date.getDay();
        var month = date.getMonth();
        var year = date.getFullYear();
          var brokenOut = $("#formGroupExampleInput3").val().trim().split(":")
          var safeDate = dateFns.setHours(dateFns.setMinutes(new Date(), brokenOut[1]), brokenOut[0])
          
          console.log(safeDate)
        // var hours = $("#formGroupExampleInput3").val().trim().split(":")[0]
        // var minutes = $("#formGroupExampleInput3").val().trim().split(":")[1]
        // var nextTrainTime = dateFns.format(new Date(year, month, day, hours, minutes), "YYYY:MM:DD:hh:mm")
        var newTrain = {
        name: $("#formGroupExampleInput").val().trim(), 
        destination: $("#formGroupExampleInput2").val().trim(),
        nextTrainTime: safeDate.toString(),
        frequency: $("#formGroupExampleInput4").val().trim(),

      
    
    };
         

        console.log("NEW TRAIN: ", newTrain)

        trainData.ref().push(newTrain)

      })

      



      //Show data from Firebase
      trainData.ref().on("child_added",function(snapshot){

                var val = snapshot.val();
                // var nextTrainTime = dateFns.addMinutes(val.lastTrainTime, val.frequency)
                var minutesAway = dateFns.differenceInMinutes(new Date(), val.nextTrainTime)
                 $('#table-data').append(
                    '<tr>'+
                   '<td>' + val.name + '</td>' +
                   '<td>' + val.destination + '</td>' +
                   '<td>' + val.frequency + '</td>' +
                   '<td>' + dateFns.format(val.nextTrainTime, "HH:mm") + '</td>' +
                   '<td>' + minutesAway + '</td>' +
                   '</tr>'
              )      
          console.log("snapshot: ", snapshot.val());
 
        

      });
