
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

        var newTrain = { 
        name: $("#formGroupExampleInput").val().trim(), 
        destination: $("#formGroupExampleInput2").val().trim(),
        trainTime: $("#formGroupExampleInput3").val().trim(),
        frequency: $("#formGroupExampleInput4").val().trim()

    
    };

        console.log("NEW TRAIN: ", newTrain)

        trainData.ref().push(newTrain)

      })

      //Show data from Firebase
      trainData.ref().on("child_added",function(snapshot){

                  var val = snapshot.val();
                 $('#table-data').append(
                    '<tr>'+
                   '<td>' + val.name + '</td>' +
                   '<td>' + val.destination + '</td>' +
                   '<td>' + val.frequency + '</td>' +
                   '<td>' + val.trainTime + '</td>' +
                   '</tr>'
              )      
              
      }, function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
        console.log("snapshot: ", snapshot.val());
        // use jquery to append data to table

        

      });
