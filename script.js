

let value1 = document.getElementById('value1')
let value2 = document.getElementById('value2')
let value3 = document.getElementById('value3')

let inpSpeed = document.getElementById('inpSpeed')
let btnStop = document.getElementById('btnStop')
let btnStart = document.getElementById('btnStart')
let imgCar = document.getElementById('imgCar')



let values = [
    '😃', '😇', '😋', '😂', '😎', '😭', '😡'
]

function getRandomValue() {
    
    return values[Math.floor(Math.random() * values.length)];
}

let animationId;

//by default also shuffle starts
let speed = getComputedStyle(document.documentElement)
    .getPropertyValue('--speed')

animationId = setInterval(() => {
        
    value1.innerText = getRandomValue()
    value2.innerText = getRandomValue()
    value3.innerText = getRandomValue()

}, 1000 / speed )
//by default also shuffle ends

function updateAnimation(newSpeed) {
    if (animationId) clearInterval(animationId)

    animationId = setInterval(() => {
        
        value1.innerText = getRandomValue()
        value2.innerText = getRandomValue()
        value3.innerText = getRandomValue()
        
    
    }, 1000 / newSpeed)
}

inpSpeed.onchange = function (ev) {

    //if updated speed is 0 , stop
    if((parseInt(ev.target.value))===0){
        promiseObj()
        inpSpeed.disabled = false; 
    }
    else{
         // document.documentElement => this is ":root" of css
    document.documentElement.style.setProperty('--speed',ev.target.value )
        updateAnimation(ev.target.value)
    // speed = getComputedStyle(document.documentElement)
    //     .getPropertyValue('--speed') OR
        speed = ev.target.value ;
    }
    
}

btnStop.onclick = function(){
    promiseObj().then(()=>{
if(value1.innerText ===value2.innerText && value1.innerText ===value3.innerText){
                    setTimeout(function(){
                        alert('Winner')
                        btnStart.onclick()
                    },200)
         }
         else{
            setTimeout(function(){
                alert('Better Luck Next Time')
                btnStart.onclick()
            },200)
         }
    })
}
var promiseObj = ()=>{

        return new Promise((resolve, reject)=>{
            clearInterval(animationId)  // Stop the current animation
            resolve();
        }).then(() => {
           
            document.documentElement.style.setProperty('--speed', 0.2);
            updateAnimation(0.1); 
            inpSpeed.disabled = true;
           
    })

}


btnStart.onclick = function (){
    inpSpeed.disabled = false; 
    document.documentElement.style.setProperty('--speed',speed)
    updateAnimation(speed)
}
