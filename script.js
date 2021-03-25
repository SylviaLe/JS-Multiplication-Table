//Sylvia Le, Adham Khalifa, Alexander Jutt
//PA03
//script.js
//Script for the html



function mul_table(){

    //GETTING THE INPUT
    var n = parseInt(document.getElementById("size").value);
    //check if the value is a number
    if (!Number.isInteger(n)){
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Please input an integer</div>'
        return; //exit the function
    }
    //check if the value is greater than 20
    else if (n > 20){
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Please enter an integer smaller than 20</div>'
        return; //exit the function
    }


    //CREATE THE TABLE
    $('#math_img').hide();      //hide the image
    var tab_index = 0;
    var result = '<td id="header">' +'x' + "</td>";     //create the very first cell
    //loop
    for (var i = 0; i < n+1; i++) {
        for (var j = 0; j < n+1; j++) {
            //create the 'header' row and column
            if(i == 0 && j > 0){
                result += '<td id="header">' + j  + '</td>';
            } 
            else if(j == 0 && i>0){
                result += '<td id="header">' + i  + '</td>';
            } 
            //create the normal table cell, each with a special id
            else if(i>0 && j>0){
                result += '<td id="t' + tab_index + '">' + (i*j) + '</td>';
                tab_index += 1;
            }
        }
        result = "<tr>" + result + '</tr>'  //concatenate the cell into a row
    }
    result = '<table id="mul_table">' + result + "</table>"     //table is completed



    //CHOOSE A RANDOM CELL AND PUT THE TEST INPUT BOX THERE
    $('#math_img').after(result);   //put the html of the table after the image

    var ran_cell = (Math.floor(Math.random() * Math.pow(n, 2))).toString();  //pick a random number in range of the number of cells
    var correct = document.getElementById("t"+ran_cell);    //get that cell
    var correct_val = parseInt(correct.innerText);          //get the correct value (the content of that cell)
    //console.log(correct_val);
    correct.innerHTML ='';              //reset the value of that cell to none

    //generate an input box and put it inside the currently empty cell
    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = '<input type="text" id="test"/>';
    correct.appendChild(div);
    
    
    //TIMER FOR THE TABLE COLOR ANIMATION
    var colortimer = setInterval(function() {

        $("tr:nth-child(even) td:nth-child(odd)").toggleClass("change");
        $("tr:nth-child(odd) td:nth-child(even)").toggleClass("change");
        $("tr:nth-child(even) td:nth-child(even)").toggleClass("change");
        $("tr:nth-child(odd) td:nth-child(odd)").toggleClass("change");
  
       }, 2000)


    
    //TIMER FOR THE TaBLE USER INPUT

    //different timeout for different n
    var count;
    if (n<8){
        count = 6;
    }
    else{
        count = 16;
    }
    var isCorrect = false;
    var tab_input = [];     //log the user input during allow time in a list (since they may change the answer)
    
    var tabletimer = setInterval(function(){
        count = count - 1;
        
        //when time is up
        if (count === 0){
            clearInterval(tabletimer);
            $("#mul_table" ).hide();  //hide the table
            $('#math_img').show();    //show the image
            $(".countDown").hide();   //hide the countdown noti

            //take the final answer and check if it's correct
            var finalans = tab_input[tab_input.length - 1];
            if (finalans == correct_val){
                isCorrect = true;
            }

            //Set the alert according to the correctness
            if (isCorrect == true){
                $('#alert').html('<div class="alert alert-success" role="alert">Correct!</div>');
            }
            if (isCorrect == false){
                $('#alert').html('<div class="alert alert-danger" role="alert">Incorrect!</div>')
            }
          }
        
        $(".countDown").html(count + " seconds left");  //reset the second 
        $('#test').keyup(function(){
            //console.log($(this).val());
            tab_input.push($(this).val()); //when the user press a key, log that in this list
        })
       }, 1000)
    
}


//Make the alert fades out on click, instead of letting it just stay there
$("div#alert").on("click", function(){
    $(this).fadeOut()
})

