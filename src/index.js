const a = function(as){

    const counterSpan = document.getElementById("number");
    const counterButton = document.getElementById("chronoButton");
    const resetButton = document.getElementById("resetButton");
    const rankContainer = document.getElementById("rankContainer");
    const rideBase = {
        rideLabel: "",
        complete: false,
        tempo: 0,
        bullScore: 0,
        riderScore: 0,
        getFinalScore: function(){
            if(this.riderScore == 0) return 0;
            return this.bullScore + this.riderScore;
        }
    };

    let rides = [];

    /**
     * @type {CSSStyleDeclaration}
     */
    const style = {};
    const TIMER_GOAL = 8;
    console.log("Loaded this file");
    
    let isRunning;
    let counter;
    let interval;
    let finished;
    
    let buttonStarted;

    function reset(){
        if(interval){
            clearInterval(interval);
        }
        counterButton.style.display = "block";
        style.color = "#ff1205";
        finished = false;
        isRunning = false;
        counter = 0;
        interval = null;
        buttonStarted = false;
        updateCounter();
    }
    
    function end(){
        isRunning = false;
        
        counterButton.style.display = "none";
        clearInterval(interval);
        const riderName = window.prompt("Informe o nome do competidor.");
        const bullName = window.prompt("Informe o nome do animal");

        const ride = Object.create(rideBase);
        ride.rideLabel = riderName.toString()+"_X_"+bullName.toString();

        ride.complete = counter >= TIMER_GOAL;
        ride.tempo = counter;
        ride.bullScore = Number(window.prompt("Informe a nota do marruco"));

        if(ride.complete){
            ride.riderScore = Number(window.prompt("Informe a nota do competidor"));
        }

        rides.push(ride);
        console.log(ride.getFinalScore());   
        //console.log(rides);  
        updateRank();
        
    }

    function updateRank(){
        clearRankContainer();
        rides = rides.sort((a, b)=>b.tempo - a.tempo);
        rides = rides.sort((a, b)=>b.getFinalScore() - a.getFinalScore());
        

        for(ride of rides){
            rankCellBuilder(ride);
        }
    }

    function updateCounter(){
        if(finished){
            style.color = "#05ff26";
        }else{
            style.color = "#ff1205";
        }
    
        counterSpan.style.color = style.color;
        counterSpan.innerText = counter.toFixed(2).toString();
        counterButton.textContent = (isRunning)?"Stop":"Start";
    }
    function count(){
        if(finished){
            end();
            return;
        }
        if(!isRunning) return;
        counter += 0.1;
        if(counter > TIMER_GOAL-0.1){
            counter = TIMER_GOAL;
            finished = true;
        }
        updateCounter();
    }
    
    function startCounter(){
        if(isRunning){
            console.log("HERs");
            end();
            return;
        }
        isRunning = true;
        updateCounter();
        if(interval) return;
        interval = setInterval(count, 100);
    }

    counterButton.addEventListener("click", startCounter);
    resetButton.addEventListener("click", reset);
    
    /* DOM FUNCTIONS */
    
    function clearRankContainer(){
        while(rankContainer.firstChild){
            rankContainer.removeChild(rankContainer.firstChild);
        }
    }

    function rankInfoBuilder(infoLabel, info){
        const pContainer = document.createElement("p");
        const label = document.createElement("strong");
        const infoElement = document.createElement("span");

        label.textContent = infoLabel;
        infoElement.textContent = info;

        pContainer.classList.add("rankInfo");
        pContainer.appendChild(label);
        pContainer.appendChild(infoElement);

        return pContainer;
    }

    function rankCellBuilder(ride){

        const rankDiv = document.createElement("div");
        const rankH4 = document.createElement("h4");

        rankH4.classList.add("rideTitle");
        rankH4.textContent = (rides.indexOf(ride)+1)+"º - "+((r)=>r.replace("_X_", " vs. "))(ride.rideLabel);

        rankDiv.classList.add("rank");
        rankDiv.appendChild(rankH4);

        rankContainer.appendChild(rankDiv);

        rankContainer.appendChild(rankInfoBuilder("Nota: ", ride.getFinalScore()));    
        rankContainer.appendChild(rankInfoBuilder("Tempo: ", ride.tempo.toFixed(2)));
    }
    
    
    
    reset();
    console.log(as);
}(2);