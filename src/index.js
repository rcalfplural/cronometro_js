const a = function(as){

    const counterSpan = document.getElementById("number");
    const counterButton = document.getElementById("chronoButton");
    const resetButton = document.getElementById("resetButton");
    /**
     * @type {CSSStyleDeclaration}
     */
    const style = {};
    
    console.log("Loaded this file");
    
    let isRunning;
    let counter;
    let interval;
    
    let buttonStarted;

    function reset(){
        if(interval){
            clearInterval(interval);
        }
        style.color = "#ff1205";
        isRunning = false;
        counter = 0;
        interval = null;
        buttonStarted = false;
        updateCounter();
    }
    
    function updateCounter(){
        if(!isRunning && counter >= 8){
            style.color = "#05ff26";
            clearInterval(interval);
        }
    
        counterSpan.style.color = style.color;
        counterSpan.innerText = counter.toFixed(2).toString();
        counterButton.textContent = (isRunning)?"Stop":"Start";
    }
    function count(){
        if(!isRunning) return;
        counter += 0.1;
        if(counter > 7.9){
            isRunning = false;
            counter = 8;
        }
        updateCounter();
    }
    
    function startCounter(){
        
        isRunning = !isRunning;
        buttonStarted = true;
        updateCounter();
        if(interval) return;
        interval = setInterval(count, 100);
    }

    counterButton.addEventListener("click", startCounter);
    resetButton.addEventListener("click", reset);
    
    reset();
    console.log(as);
}(2);