import studyGroups from "./studyGroups";
import courses from "./courses";

type Course = {
    id:number;
    studyGroupId:number;
    title:string;
    keywords:string[];
    eventType:string;
}

type StudyGroup = {
    id:number;
    courseId:number;
    title:string;
    keywords:string[];
    eventType:string;
}

type searchEventOptions = {query:string, eventType:string}|{query:number, eventType:string}

function searchEvents(options:searchEventOptions){
    let events:(Course|StudyGroup)[]
    if(options.eventType === 'courses'){
        events = courses
    } else {
        events = studyGroups
    }
    let result = events.filter((event:Course|StudyGroup) =>{
        if(typeof options.query === 'number'){
            if(event.id === options.query){
                return true
            }
        } 
        else if(typeof options.query === 'string'){
            if(event.keywords.includes(options.query)){
                return true
            }
        }
    })
    return result
}

let enrolledEvents:(Course|StudyGroup)[] = []

function enroll(event:Course|StudyGroup){
    enrolledEvents = [...enrolledEvents, event]
}

let searchResults = searchEvents({query:'art', eventType:'2'})
enroll(searchResults[0])
console.log(searchResults)
console.log(enrolledEvents)