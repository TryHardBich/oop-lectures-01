import setTribe from './utility.js'

class TribeMember {
    constructor(name) {
        this.name = name;
        this.age = Math.round(Math.random() * 100);
        this.health = Math.round(Math.random() * 100);
        this.damage = Math.round(Math.random() * 10);
        this.iq = Math.round(Math.random() * 20);
    } 

    getInfo() { 
        console.log(`${this.name} в возрасте ${this.age} лет имеет ${this.health} здоровья и наносит ${this.damage} урона. IQ ${this.iq}`);
    }

    takeDamage(damage) {
        if (this.health <= 0) {
            console.log(`${this.name} уже умер`);
            return false;
        }
        this.health -= damage;
        if (this.health <= 0) {
            console.log(`${this.name} помер`);
            return true;
        } else {
            console.log(`${this.name} получил ${damage} урона. Осталось ${this.health} здоровья`);
            return false;
        }
    }
}

class SigmaBoss extends TribeMember {
    constructor(name) {
        super(name);
        this.weapons = [];
        if (this.iq > 10) {
            this.iq -= 8;
        }
        if (this.health < 60) {
            this.health += 40;
        }
        this.damage += 5;
    } 

    addWeapon(weapon) {
        this.weapons.push(weapon);
        console.log(`${this.name} теперь имеет оружие ${weapon.name} с уроном ${weapon.damage}`);
    }

    getInfoWeapons() {
        console.log(`${this.name} имеет оружие ${this.weapons.map(({name, damage}) => `${name} с уроном ${damage}`).join(', ')}`)
    }

    attack(target) {
        if (this.health <=0) {
            console.log(`${this.name} умер и не может продoлжать бой`);
            return false;
        }
        console.log(`${this.name} атакует ${target.name}`);
        if (this.weapons.length === 0) {
            console.log(`${this.name} атакует рукой`);
            target.takeDamage(this.damage);
        } else {
            const mainWeapon = this.weapons.at(0);
            const resultDamage = mainWeapon.damage + this.damage;
            if (mainWeapon.use() === true) {
                target.takeDamage(resultDamage);
            } else {
                this.weapons.shift();
                this.attack(target);
            }
        }
    }
}
 
class TumbaYumba extends TribeMember {
    constructor(name) {
        super(name);
        this.tools = [];
        this.dogs = [];
        this.secretPotato = '25 кг картошки';
        if (this.health > 20) {
            this.health -= 20
        } 
        this.iq += 40
    }
    addTool(tool) {
        this.tools.push(tool);
        console.log(`${this.name} теперь имеет инструмент ${tool.name} с уроном ${tool.damage}`)
    }
    getInfoTools() {
        console.log(`${this.name} имеет инструмент ${this.tools.map(({name, damage}) => `${name} с уроном ${damage}`).join(', ')}`)
    }
    getInfoDogs() {
        console.log(`${this.name} владеет собакой ${this.dogs.map(({name, damage}) => `${name} с уроном ${damage}`).join(', ')}`);
    }
    addDog(dog) {
        this.dogs.push(dog);
        console.log(`${this.name} теперь владеет ${dog.name}`);
    }
    dogTraining(dog) {
        if (Math.random() + this.iq / 100 > 0.7) {
            dog.train();
        }
    }
    attack(target) {
        if (this.health <=0) {
            console.log(`${this.name} умер и не может продoлжать бой`);
            return false;
        }
        console.log(`${this.name} атакует ${target.name}`);
        if (this.tools.length === 0) {
            console.log(`${this.name} атакует рукой`);
            target.takeDamage(this.damage);
        } else {
            const mainTool = this.tools.at(0);
            const resultDamage = mainTool.damage + this.damage;
            if (mainTool.use() === true) {
                target.takeDamage(resultDamage);
            } else {
                this.tools.shift();
                this.attack(target);
            }
        }
    }
    takeDamage(damage) {
        if (this.health <= 0) {
            console.log(`${this.name} уже умер`);
            return false;
        }
        if (this.dogs.length > 0) {
            if (this.dogs[0].takeDamage(damage) === true) {
                this.dogs.shift();
            }
        } else {
            this.health -= damage;
            if (this.health <= 0) {
                console.log(`${this.name} помер`);
                return true;
            } else {
                console.log(`${this.name} получил ${damage} урона. Осталось ${this.health} здоровья`);
                return false;
            }
        }
    }
}

class BattleDogs {
    constructor(name) {
        this.name = name;
        this.health = 5 + Math.round(Math.random(0) * 25);
        this.trainingLevel = 0;
        this.damage = 5;
    }
    train() {
        this.damage += 5;
    }
    attack(target) {
        console.log(`${this.name} атакует ${target.name}`);
        target.takeDamage(this.damage);
    }
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            console.log(`${this.name} помер`);
            return true;
        } else {
            console.log(`${this.name} получил ${damage} урона. Осталось ${this.health} здоровья`);
            return false;
        }
    }
}

class Items {
    constructor(name) {
        this.name = name;
        this.durability = 5 + Math.round(Math.random() * 5);
        this.damage = 5 + Math.round(Math.random() * 5);
    }
}

class Weapons extends Items {
    constructor(name) {
        super(name);
    }

    use() {
        this.durability -= 1;
        if (this.durability <= 0) {
            console.log(`Оружие ${this.name} сломалось`);
            return false;
        } else {
            console.log(`У оружия ${this.name} осталось  ${this.durability} прочности`);
            return true;
        }
    }
}

class Tools extends Items {
    constructor(name) {
        super(name);
        this.damage -= 3;
    }

    use() {
        this.durability -= 2;
        if (this.durability <= 0) {
            console.log(`Инструмент ${this.name} сломалось`);
            return false;
        } else {
            console.log(`У инструмента ${this.name} осталось ${this.durability} прочности`);
            return true;
        }
    }
}

const Ivan = new SigmaBoss('Ivan');
Ivan.getInfo();

const ArsenMarkaryan = new BattleDogs('ArsenMarkaryan');
const Mellstroy = new BattleDogs('Mellstroy');

const AshabTamaev = new TumbaYumba('AshabTamaev');

const Ubivator3000 = new Weapons('Ubivator3000')
const Excalibur = new Weapons('Excalibur')
const Kirka = new Tools('Kirka');
const ColaByBasta = new Tools('ColaByBasta')

Ivan.addWeapon(Ubivator3000);
Ivan.addWeapon(Excalibur);
Ivan.getInfoWeapons();
AshabTamaev.getInfo();
AshabTamaev.addDog(ArsenMarkaryan);
AshabTamaev.addDog(Mellstroy);
AshabTamaev.getInfoTools();
AshabTamaev.getInfoDogs();
AshabTamaev.addTool(Kirka);
AshabTamaev.addTool(ColaByBasta);
AshabTamaev.getInfoTools();
Ivan.attack(AshabTamaev);
AshabTamaev.attack(Ivan);
Ivan.attack(AshabTamaev);
AshabTamaev.attack(Ivan);
Ivan.attack(AshabTamaev);
AshabTamaev.attack(Ivan);
Ivan.attack(AshabTamaev);
AshabTamaev.attack(Ivan);

AshabTamaev.dogTraining(Mellstroy);
//setTribe(new TribeMember('Ilya'));