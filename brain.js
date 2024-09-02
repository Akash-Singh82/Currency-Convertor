import{countryList} from './codes.js';
const BASE_URL="https://api.exchangerate-api.com/v4/latest/USD";

// we are accessing the two dropdowns by using dropdown select 

const dropdowns=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        
        if(select.name==="from"  && currCode==="USD"){
            newOption.selected="selected"; 
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.appendChild(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
           
        });

}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};

let fromcurrency=document.querySelector("#from");
let tocurrency=document.querySelector("#to");

btn.addEventListener("click",(evt)=>{
    // when we click the button in the form tag it automatically refresh the page
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval < 1){
        amtval=1;
        amount.value="1";
    }
    let fromcurr = fromcurrency.value;
    let tocurr = tocurrency.value;
  
 
 let num;
 let denom;
 fetch("https://api.exchangerate-api.com/v4/latest/USD")
 .then(response => response.json())
 .then(data => {
     console.log(data);
     num=data.rates[tocurr];
     denom=data.rates[fromcurr];
     let result=(parseFloat(amtval) * (num / denom)).toFixed(2);
     document.querySelector("#msg").innerText=`${amtval}${fromcurr}=${result}${tocurr}`;
 })
 .catch(error => {
     console.log(error);
 });

//  let result=(parseFloat(amtval) * (num / denom)).toFixed(2);
//  document.querySelector("#msg").innerText=`${amtval}${fromcurr}=${result}${tocurr}`;
    
});

