import { getObstacleEvents } from './computer-vision';

interface Control {
    execute: (command:string) => void;
}

interface Steering extends Control {
    turn: (direction:string) => void;
}

interface Events {
    [key: string]: boolean;
}

interface AutonomousCar {
    isRunning?: boolean;
    respond: (events:Events) => void;
}

interface AutonomousCarProps {
    isRunning?: boolean;
    steeringControl:Steering;
}

class Car implements AutonomousCar {
    isRunning:boolean;
    steeringControl:Steering;
    constructor(props:AutonomousCarProps){
        this.isRunning = props.isRunning
        this.steeringControl = props.steeringControl
    }

    respond(events:Events){
        if(this.isRunning){
            Object.keys(events).forEach(event =>{
                if(events[event]){
                    if(event === 'ObstacleLeft'){
                        this.steeringControl.turn('right')
                    }
                    else if(event === 'ObstacleRight'){
                        this.steeringControl.turn('left')
                    }
                } else{
                    return
                }
            })
        } else{
            console.log("The car is off.")
        }
    }
}

class SteeringControl implements Steering {
    execute(command:string){
        console.log('Executing:' + command)
    }

    turn(direction:string){
        this.execute(direction)
    }
}

let steering = new SteeringControl()
let autonomousCar = new Car({isRunning: true, steeringControl:steering})


autonomousCar.respond(getObstacleEvents())

