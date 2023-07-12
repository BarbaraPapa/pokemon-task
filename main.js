  //* POKEMON BATTLE *//

  class Pokemon {
    constructor(name, health, magic) {
      this.name = name
      this.health = health
      this.magic = magic
      this.skills = [] // store skills
      this.counter = 0 // store numbers of battles
    }
  
    // add attack skill to skills array
    learnAttackSkill(newSkill) {
      this.skills.push(newSkill) 
    }
  
    // show status, including health and magic
    showStatus() { 
      console.log(`${this.name} => Health: ${this.health} - Magic: ${this.magic}`)// if counter is < 3 show this message
  
      if (this.counter >= 3) {  // if counter is >=3 show this message
        console.log(`${this.name} won!`)
      }
    }
  
    // increase magic randomly (between 0 and 20)
    getMagics() {  
      this.magic += Math.floor(Math.random() * 21)
    }
  
    //check if has enough magic to perform skills
    hasEnoughMagic(skillName) {

      //check if the attacker has the skill before the attack. 
      const skill = this.skills.find(el => el.attack === skillName)

      if (skill && this.magic >= skill.magic) { //if the variable skill and the value of the magic property of this object (the current Pokémon) >= value of the magic property of the skill object
        return true // if skill is defined and the pokemon has enough magic to use the skill => true
      }
      return false
    }
  
    isAlive() {  //check if is alive 
      return this.health > 0 
    }
  
  
//------- attack ----------------
  
    attack(skillName, opponent) {
      // find the skill and use it to calculate the magic       
      const skill = this.skills.find(el => el.attack === skillName)// find skill in the attack // If skill is found, it will be assigned to the skill variable - Otherwise, skill is undefined
      
      // if skill is not found
      if (skill === undefined) { 
        console.log(`Skill ${skillName} not found for ${this.name}`);
        return
      }

      // check if both pokemon are alive
      if (this.isAlive() === false || opponent.isAlive() === false) { 
        console.log(`Both Pokemon should be alive to attack, game over! Click reset to start a new game!`);
        return
      }
    
      // if magic is not enough
      if (this.hasEnoughMagic(skillName) === false) { 
        console.log(`${this.name} doesn't have enough magic to perform ${skillName}`)
        return
      }
 
      // subtract the magic cost of the skill from the attacking Pokemon's magic
      this.magic -= skill.magic
  
      // Reduce the opponent's health by the damage caused by the skill  
      opponent.health -= skill.damage
  
      // Increment the counter to keep track of the number of attacks 
      this.counter++
  
      // increment macic randomly 
      this.getMagics()
  
      // Display a message indicating the attack and its outcome
      console.log(`${this.name} attacked ${opponent.name} with ${skill.attack} causing ${skill.damage} damage` )
  
  
      // Display the status of both Pokemon after the attack
      this.showStatus()
      opponent.showStatus()
    }
  
  
    // reset pokemon (implemented with function resetAllPokemon)
    reset() {
      this.health = 100
      this.magic = 30
      this.skills = []
      this.counter = 0
    }

    // Random Attack 
     selectRandomAttack() {
      const randomIndex = Math.floor(Math.random() * this.skills.length)
      return this.skills[randomIndex] 
    }

  }

 // Attack skill
  class AttackSkill {
    constructor(attack, damage, magic) {
      this.attack = attack
      this.damage = damage
      this.magic = magic
    }
  }
  
  //Reset all Pokemon 
  function resetAllPokemon() {
    allPokemon.forEach(el => { el.reset()})
    console.log(`All pokemon have recovered all their energy. Let's start a new battle!`)
  }
  


// Pokemon instances
let pokemon1 = new Pokemon("Pikachu", 120, 80)
let pokemon2 = new Pokemon("Bulbasaur", 95, 105)

//test =====
// let pokemon1 = new Pokemon("Barbara", 120,80)
// let pokemon2 = new Pokemon("Javascript", 100,30)
//==========

  
// skill instances
let attackSkill1 = new AttackSkill("lightning", 40, 30)
let attackSkill2 = new AttackSkill("poisoning", 20, 20)
let attackSkill3 = new AttackSkill("scratch", 15, 10)
let attackSkill4 = new AttackSkill("fireball", 35, 25)
  
// pokemon1 (pikachu) learn skills
pokemon1.learnAttackSkill(attackSkill1)
pokemon1.learnAttackSkill(attackSkill2)
pokemon1.learnAttackSkill(attackSkill3)
pokemon1.learnAttackSkill(attackSkill4)
  
//pokemon2 (bulbasaur) learn skills
pokemon2.learnAttackSkill(attackSkill1)
pokemon2.learnAttackSkill(attackSkill2)
pokemon2.learnAttackSkill(attackSkill3)
pokemon2.learnAttackSkill(attackSkill4)
  
//store pokemon in an array (need it to reset)
let allPokemon = [pokemon1, pokemon2]
 
//* testing find skill
// console.log("") 
// pokemon2.attack("*TEST*", pokemon1)
  

//?====== start battle ========

//*using random attack
console.log("")
const randomAttack1 = pokemon1.selectRandomAttack()
pokemon1.attack(randomAttack1.attack, pokemon2)

console.log("")
const randomAttack2 = pokemon2.selectRandomAttack()
pokemon2.attack(randomAttack2.attack, pokemon1)

console.log("")
const randomAttack3 = pokemon1.selectRandomAttack()
pokemon1.attack(randomAttack3.attack, pokemon2)

console.log("")
const randomAttack4 = pokemon2.selectRandomAttack()
pokemon2.attack(randomAttack4.attack, pokemon1)


//* using normal attack 

console.log("")
pokemon1.attack("poisoning", pokemon2)

console.log("")
pokemon2.attack("lightning", pokemon1)



//* RESET POKEMON

console.log("")
resetAllPokemon()
