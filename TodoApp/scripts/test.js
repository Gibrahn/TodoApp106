// class / constuctor

function objsTest() {
    console.log("Test for creating objects");


    // class 
    class Cat {
        constructor(name, color) {
            this.name = name;
            this.color = color;
        }
    }
    // object constructor

    function Dog(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }
    // object literal
    let dog = {
        name: "fido",
        age: 8,
    };
    console.log(dog);
}