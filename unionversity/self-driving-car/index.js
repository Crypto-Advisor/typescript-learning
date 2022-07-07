"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const computer_vision_1 = require("./computer-vision");
class Car {
    constructor(props) {
        this.isRunning = props.isRunning;
        this.steeringControl = props.steeringControl;
    }
    respond(events) {
        if (this.isRunning) {
            Object.keys(events).forEach(event => {
                if (events[event]) {
                    if (event === 'ObstacleLeft') {
                        this.steeringControl.turn('right');
                    }
                    else if (event === 'ObstacleRight') {
                        this.steeringControl.turn('left');
                    }
                }
                else {
                    return;
                }
            });
        }
        else {
            console.log("The car is off.");
        }
    }
}
class SteeringControl {
    execute(command) {
        console.log('Executing:' + command);
    }
    turn(direction) {
        this.execute(direction);
    }
}
let steering = new SteeringControl();
let autonomousCar = new Car({ isRunning: true, steeringControl: steering });
autonomousCar.respond((0, computer_vision_1.getObstacleEvents)());
