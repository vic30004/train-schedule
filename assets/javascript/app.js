const firebaseConfig = {
    apiKey: "AIzaSyDYwYYfBVHmNXtHEob-BKCVtuhba8kvpvQ",
    authDomain: "train-schedu-83131.firebaseapp.com",
    databaseURL: "https://train-schedu-83131.firebaseio.com",
    projectId: "train-schedu-83131",
    storageBucket: "https://train-schedu-83131.firebaseio.com/",
    messagingSenderId: "489327113631",
    appId: "1:489327113631:web:3663169b7fca74d4"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();


$("#add-train-btn").on("click", function () {
    event.preventDefault();
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let startTime = moment($("#start-input").val().trim(), "HH:mm").subtract(1,"years").format("X");
    let freq = $("#frequency-input").val().trim();
    console.log(trainName)
    console.log(startTime)



    let trainInfo = {
        name: trainName,
        destination: destination,
        start: startTime,
        frequency: freq
    };
    console.log(trainInfo.name)


    database.ref().push(trainInfo);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(snapshot){
    console.log(snapshot);
    let trainName = snapshot.val().name;
    let destination=snapshot.val().destination;
    let startTime= snapshot.val().startTime;
    let frequency=snapshot.val().freq;

    console.log(trainName)

    let tableInfo = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(startTime),
        $("<td>").text(frequency),
    )
    $("#train-table").append(tableInfo);
});