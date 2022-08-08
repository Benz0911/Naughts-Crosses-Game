let count = 1;
let start = false;

function horizontalCheck(arr,chunk){
    let tempArray = [];
    const chunked = [];

    for (let i = 0, j = arr.length; i < j; i += chunk) {
        tempArray = arr.slice(i, i + chunk);
        chunked.push(tempArray);
    }

    return chunked;
}

function diagonalCheck(arr){
    let diagonalRight = [];
    let diagonalLeft = [];
    for (let index = 0; index < 2; index++) {
        if(index == 0){
            for (let i = 0; i < arr.length; i++) {
                diagonalRight.push(arr[i][i]);      
            }
        }else{
            let k = 0;
            for (let j = arr.length - 1; j >= 0; j--) {
                diagonalLeft.push(arr[j][k]); 
                k++;
            }
        }
        
        
    }

    return [diagonalRight,diagonalLeft];
}

function verticalCheck(arr){
    let resultArray = [[],[],[]];
    for (let index = 0; index < resultArray.length; index++) {
        for (let i = 0; i < arr.length; i++) {
            resultArray[index].push(arr[i][index]);      
        }
    }
    
    return resultArray;
}

function checkWinner(){
    const squares = $(".square") 
    const checkSquares = [];
    const checkWinner = [];
    let index = 0;

    $.each(squares,function(i){
        checkSquares.push($(this).html());
    })

    const horizontal = horizontalCheck(checkSquares,3);
    const vertical = verticalCheck(horizontal);
    const diagonal = diagonalCheck(horizontal);
    const checkAll = [...horizontal,...vertical,...diagonal];

    $.each(checkAll,function(i,value){
        const allEqual = value.every( v => v == value[0] && v != '' )
        if(allEqual){
            alert('Congratulations!')
            start = false;
            $("#startGame").prop('disabled',false);
            return;
        }
    })

}

$(document).ready(function() {
    $("#startGame").prop('disabled',false);
    $(".square").click(function(){
        if(start){
            if($(this).html() == ''){
                if( count % 2 ){
                    $(this).text("X")
                }else{
                    $(this).text("O")
                }
                if(count => 5){
                    checkWinner();
                }  
            }

            count++;
        }else{
            alert("Click Start to Play!")
        }
    });

    $("#startGame").click(function(){
        start = true;
        $("#startGame").prop('disabled',true);
    });

    $("#restartGame").click(function(){
        start = true;
        $("#startGame").prop('disabled',true);
        $(".square").html("");
    });

});


