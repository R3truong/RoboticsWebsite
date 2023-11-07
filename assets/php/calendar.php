


<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $databasename = "roboticsdatabase";

    $conn = mysqli_connect($servername, $username, $password, $databasename);
    
    #Checking database connection
    if($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    else


    #Receiving Date, Time, and Event Name from Database

    $sql1 = "SELECT `Event Date`, `Event Name`, `Event Description`, `Event Start Time`, `Event End Time` FROM `calendar` ORDER BY `Event Date` ASC";
    $calendarquery = $conn->query($sql1);


    if($calendarquery->num_rows >= 0)
    {
        $events = array();
        while($row = $calendarquery->fetch_assoc())
        {
            $events[] = array(
                "date" => $row["Event Date"],
                "event" => $row["Event Name"],
                "description" => $row["Event Description"],
                "start_time" => $row["Event Start Time"],
                "end_time" => $row["Event End Time"]
            );
        }
        
        echo trim(json_encode($events));
    }
    else
    {
        echo "Database Empty.";
    }

    $conn->close();




?>


    