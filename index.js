function checkLogin(db,username,password){
    const userData = db[username];

    if(userData === undefined){
        console.log("User not found");
        return false;
    }

    if(userData.isLocked){
        console.log("Account is blocked.Try again");
        return false;
    }

    if(userData.password === password){
        console.log("Successfull");
        userData.attempts = 0;
        return true;
    }
    else{
        userData.attempts++;
        console.log("Incorrect password.Try again");
        

        if(userData.attempts >= 5){
            userData.isLocked = true;
            console.log("Account is blocked");
        }
        return false;
    }
}

const db={
    "admin":{
        password:"admin123",
        attempts:0,
        isLocked:false
    },
    "noname":{
        password:"noname",
        attempts:0,
        isLocked:false
    }

};

/*2*/ 
function createTask() {
    let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

    return function(action, data) {
        if (action === "add") {
            tasks.push(data);
            localStorage.setItem('myTasks', JSON.stringify(tasks));
            console.log("Task added:", data);
        } 
        else if (action === "show") {
            console.log("Ваш список завдань:", tasks);
        }
    };
}


const myTodo = createTask();
myTodo("add", "Купити хліб");
myTodo("add", "Вивчити JS");
myTodo("show");



/*4*/ 
function createPromoService() {
    let promos = [
        { code: "SAVE", limit: 3 },
        { code: "FREE", limit: 1 }
    ];

    return {
        addPromo: function(newPromo) {
            promos = [...promos, newPromo];
            console.log("Промокод додано");
        },

        
        usePromo: function(codeName) {
            const promo = promos.find(p => p.code === codeName);

            if (!promo) {
                console.log("Промокод не знайдено");
            } else if (promo.limit > 0) {
                promo.limit--;
                console.log(` Залишилось використань: ${promo.limit}`);
            } else {
                console.log("Промокод недійсни");
            }
        },

     
        showPromos: function() {
            console.log("Список промокодів:", [...promos]); 
        }
    };
}

const myShop = createPromoService();

myShop.usePromo("FREE"); 
myShop.usePromo("FREE"); 
myShop.addPromo({ code: "SALE50", limit: 5 }); 
myShop.showPromos();


