var allPizzas = new Array();

var pizzasWithMeatList = new Array();
var pizzasWithMeatPercentage = 0;
var pizzasWithMeatCheapest;

var pizzasWithMoreTypesOfCheeseList = new Array();
var pizzasWithMoreTypesOfCheesePercentage = 0;
var pizzasWithMoreTypesOfCheeseCheapest;

var pizzasWithMeatAndOlivesList = new Array();
var pizzasWithMeatAndOlivesPercentage = 0;
var pizzasWithMeatAndOlivesCheapest;

var pizzasWithMozzarelaAndMushroomsList = new Array();
var pizzasWithMozzarelaAndMushroomsPercentage = 0;
var pizzasWithMozzarelaAndMushroomsCheapest;

var json = require('./pizzas.json');
mainFunction(json);

function mainFunction(data){
    var pizzasJSON = data.pizzas;
    var pizzaObj;
    var ingredients;

    for(var i=0;i<pizzasJSON.length;i++){
        var seccondKey = false;    
        for(key in pizzasJSON[i]){
            if(seccondKey === false && key != "nil"){
                pizzaObj = new Object();
                ingredients = new Array();
                pizzaObj.ime = key;
                pizzaObj.ingredients = pizzasJSON[i][key].ingredients;
                seccondKey = true;
            }else{
                if(key != "nil"){
                    pizzaObj.cena = pizzasJSON[i][key];
                    allPizzas.push(pizzaObj);
                }
            }                                       
        }
    }
    
    pizzasWithMeat(allPizzas);
    pizzasWithMoreTypesOfCheese(allPizzas);
    pizzasWithMeatAndOlives(pizzasWithMeatList);
    pizzasWithMozzarelaAndMushrooms(allPizzas);
    createJSON(pizzasWithMeatCheapest, pizzasWithMeatPercentage, pizzasWithMoreTypesOfCheeseCheapest, pizzasWithMoreTypesOfCheesePercentage, pizzasWithMeatAndOlivesCheapest, pizzasWithMeatAndOlivesPercentage, pizzasWithMozzarelaAndMushroomsCheapest, pizzasWithMozzarelaAndMushroomsPercentage);
}

function pizzasWithMeat(listaSvihPica){
    for(var i =0; i<listaSvihPica.length;i++){
        for(var j=0;j<listaSvihPica[i].ingredients.length;j++){
            sastojak = listaSvihPica[i].ingredients[j];
            if(sastojak.includes("sausages") || sastojak.includes("ham") || sastojak.includes("salami") || sastojak.includes("meat") || sastojak.includes("kebab") || sastojak.includes("beef")){
                pizzasWithMeatList.push(listaSvihPica[i]);
                break;
            }   
        }
    }
    
    pizzasWithMeatPercentage = pizzasWithMeatList.length / listaSvihPica.length * 100;
    pizzasWithMeatCheapest = najjeftinijaPica(pizzasWithMeatList);
}

function pizzasWithMoreTypesOfCheese(listaSvihPica){
    for(var i =0; i<listaSvihPica.length;i++){
        var sir = 0;
        for(var j=0;j<listaSvihPica[i].ingredients.length;j++){
            sastojak = listaSvihPica[i].ingredients[j];
            if(sastojak.includes("cheese") && sir ==0){
                sir ++;
            }else{
                if(sastojak.includes("cheese") && sir ==1){
                    pizzasWithMoreTypesOfCheeseList.push(listaSvihPica[i]);
                    sir = 0;
                    break;
                }   
            }
        }
    }
    
    pizzasWithMoreTypesOfCheesePercentage = pizzasWithMoreTypesOfCheeseList.length / listaSvihPica.length * 100;
    pizzasWithMoreTypesOfCheeseCheapest = najjeftinijaPica(pizzasWithMoreTypesOfCheeseList);
}

function pizzasWithMeatAndOlives(pizzasWithMeatList){
    for(var i =0; i<pizzasWithMeatList.length;i++){
        for(var j=0;j<pizzasWithMeatList[i].ingredients.length;j++){
            sastojak = pizzasWithMeatList[i].ingredients[j];
            if(sastojak.includes("olives")){
                pizzasWithMeatAndOlivesList.push(pizzasWithMeatList[i]);
                break;
            }   
        }
    }
    
    pizzasWithMeatAndOlivesPercentage = pizzasWithMeatAndOlivesList.length / allPizzas.length * 100;
    pizzasWithMeatAndOlivesCheapest = najjeftinijaPica(pizzasWithMeatAndOlivesList);
}

function pizzasWithMozzarelaAndMushrooms(listaSvihPica){
    for(var i =0; i<listaSvihPica.length;i++){
        var jednakomponenta = false;
        for(var j=0;j<listaSvihPica[i].ingredients.length;j++){
            sastojak = listaSvihPica[i].ingredients[j];
            if((sastojak.includes("mushrooms") || sastojak.includes("mozzarella")) && jednakomponenta == false){
                jednakomponenta = true;
            }else{
                if((sastojak.includes("mushrooms") || sastojak.includes("mozzarella")) && jednakomponenta == true){
                    pizzasWithMozzarelaAndMushroomsList.push(listaSvihPica[i]);
                    break;
                }   
            }
        }
    }
    
    pizzasWithMozzarelaAndMushroomsPercentage = pizzasWithMozzarelaAndMushroomsList.length / allPizzas.length * 100;
    pizzasWithMozzarelaAndMushroomsCheapest = najjeftinijaPica(pizzasWithMozzarelaAndMushroomsList);
}

function najjeftinijaPica(list){
    var najjeftinija = list[0];
    for(var i=1;i<list.length;i++){
        if(list[i].cena< najjeftinija.cena)
            najjeftinija = list[i];
    }

    return najjeftinija;
}

function createJSON(pmeatCheapest,pmeatPercentage, pcheeseCheapest, pcheesePercentage, pmeatOliveCheapest, pmeatOlivePercentage, pmozzarelaMushroomsCheapest, pmozzarelaMushroomsPercentage){
    var finalJson = new Object();
    var info = new Object();
    info.full_name = "Zlatan Precanica";
    info.email = "zlatanprecanica@gmail.com";
    info.code_link = "https://github.com/zlatanp/coding-challenge.renderedtext";
    
    var answer = new Array();
    var groupIndex = 1;
    var paramList = new Array();
    paramList.push(pmeatCheapest);
    paramList.push(pmeatPercentage);
    paramList.push(pcheeseCheapest);
    paramList.push(pcheesePercentage);
    paramList.push(pmeatOliveCheapest);
    paramList.push(pmeatOlivePercentage);
    paramList.push(pmozzarelaMushroomsCheapest);
    paramList.push(pmozzarelaMushroomsPercentage);
    
    for(var i=0;i<paramList.length;i+=2){
        var groupObj = new Object();
        var group = new Object();
        var tempPizza = new Object();
        var tempIngredients = new Object();
        group.percentage = paramList[i+1] + "%";
        tempIngredients.ingredients = paramList[i].ingredients;
        tempPizza[paramList[i].ime]= tempIngredients;
        tempPizza.price = paramList[i].cena;
        group.cheapest = tempPizza;
        var imeGrupe = "group_" + groupIndex;
        groupObj[imeGrupe] = group;
        answer.push(groupObj);
        groupIndex++;
    }
    
    finalJson.personal_info = info;
    finalJson.answer = answer;
    console.log(JSON.stringify(finalJson));

    var request = require('request');
        request({
            url: "http://coding-challenge.renderedtext.com/submit",
            json: true,
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: finalJson
        }, function(error, response, body) {
            console.log(response);
        });
}