"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studyGroups_1 = require("./studyGroups");
const courses_1 = require("./courses");
function searchEvents(options) {
    let events;
    if (options.eventType === 'courses') {
        events = courses_1.default;
    }
    else {
        events = studyGroups_1.default;
    }
    let result = events.filter((event) => {
        if (typeof options.query === 'number') {
            if (event.id === options.query) {
                return true;
            }
        }
        else if (typeof options.query === 'string') {
            if (event.keywords.includes(options.query)) {
                return true;
            }
        }
    });
    return result;
}
let enrolledEvents = [];
function enroll(event) {
    enrolledEvents = [...enrolledEvents, event];
}
let searchResults = searchEvents({ query: 'art', eventType: '2' });
enroll(searchResults[0]);
console.log(searchResults);
console.log(enrolledEvents);
