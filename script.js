function mul_table(){
    var n = parseInt(document.getElementById("size").value);
    if (!Number.isInteger(n)){
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Please input an integer</div>'
        return;
    }
    else if (n > 20){
        document.getElementById("alert").innerHTML = '<div class="alert alert-danger" role="alert">Please enter an integer smaller than 20</div>'
        return;
    }
    var tab_index = 0;
    var result = '<td id="header">' +'x' + "</td>";
    for (var i = 0; i < n+1; i++) {

        for (var j = 0; j < n+1; j++) {

            if(i == 0 && j > 0){
                result += '<td id="header">' + j  + '</td>';
            } 
            else if(j == 0 && i>0){
                result += '<td id="header">' + i  + '</td>';
            } 
            else if(i>0 && j>0){
                result += '<td id="t' + tab_index + '">' + (i*j) + '</td>';
                tab_index += 1;
            }
        }
        result = "<tr>" + result + '</tr>'
    }
    result = '<table>' + result + "</table>"

    document.getElementById("mul_table").innerHTML = result
    var ran_cell = (Math.floor(Math.random() * Math.pow(n, 2))).toString();
    var correct = document.getElementById("t"+ran_cell);
    var correct_val = parseInt(correct.innerText);
    //console.log(correct_val);
    correct.innerHTML ='';

    const div = document.createElement('div');
    div.className = 'row';
    div.innerHTML = '<input type="text" id="test"/>';

    correct.appendChild(div);
    
    
    var colortimer = setInterval(function() {

        $("tr:nth-child(even) td:nth-child(odd)").toggleClass("change");
        $("tr:nth-child(odd) td:nth-child(even)").toggleClass("change");
        $("tr:nth-child(even) td:nth-child(even)").toggleClass("change");
        $("tr:nth-child(odd) td:nth-child(odd)").toggleClass("change");
  
       }, 2000)

    var count;
    if (n<8){
        count = 6;
    }
    else{
        count = 13;
    }
    var isCorrect = false;
    var tab_input = [];
    var tabletimer = setInterval(function(){
        count = count - 1;
        if (count === 0){
            clearInterval(tabletimer);
            $("#mul_table" ).hide();
            $(".countDown").hide();

            var finalans = tab_input[tab_input.length - 1];
            if (finalans == correct_val){
                isCorrect = true;
            }
            if (isCorrect == true){
                $('#alert').html('<div class="alert alert-success" role="alert">Correct!</div>');
            }
            if (isCorrect == false){
                $('#alert').html('<div class="alert alert-danger" role="alert">Incorrect!</div>')
            }

          }
        $(".countDown").html(count + " SECONDS LEFT");
        $('#test').keyup(function(){
            console.log($(this).val());
            tab_input.push($(this).val());
        })
       }, 1000)
    
    

}

$("div#alert").on("click", function(){
    $(this).fadeOut()
})

