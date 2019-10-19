<template>
    <div class="main-content">
        <div class="section__content section__content--p30">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-12">
                        <div class="au-card au-card--no-shadow au-card--no-pad m-b-40">
                            <div class="au-card-title" style="background-image: url(&quot;images/bg-title-01.jpg&quot;);">
                                <div class="bg-overlay bg-overlay--blue"></div> 
                                <h3 class="title-1"><i class="zmdi zmdi-account-calendar"></i>Events</h3> 
                                <button class="au-btn-plus" id="eventModalButton" data-toggle="modal" style="display: none" data-target="#eventForm"><i class="zmdi zmdi-plus"></i></button>
                                <button class="au-btn-plus" @click.prevent="event={};" data-toggle="modal" data-target="#eventForm"><i class="zmdi zmdi-plus"></i></button>
                            </div>
                                
                            <!-- <div class="au-task js-list-load">
                                <div class="au-task-list js-scrollbar3" >
                                    <div v-if="events.length" class="scroller">
                                        <div :class="checkExpiry(event.date)" v-for="(event, i) in events" :key="i">
                                            <div class="au-task__item-inner" @click.prevent='checkEvent(event)'>
                                                <h5 class="time"> <a @click.prevent='checkEvent(event)'>{{ event.title }}</a></h5> 
                                                <div class="flex">
                                                    <span class="task">{{ timeFormat(event.date) }}</span>
                                                    <span class="task">{{ event.venue.includes(`17/19, Jacob Street`) ? 'Church Location' : event.venue }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div v-else>
                                        <h5 class="time no_events"> You have not created any events yet </h5> 
                                    </div>
                                </div>
                                    
                                <div class="au-task__footer" v-if="events.length">
                                    <button class="au-btn au-btn-load js-load-btn">load more</button>
                                </div>
                            </div> -->

                            <FullCalendar :events='events' @dateClick="handleDateClick" defaultView="dayGridMonth" :plugins="calendarPlugins" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EventForm :event='event' v-if="event" ref="eventModal"/>
    </div>
</template>

<script>
import EventForm from '@/components/admin/forms/Event'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Calendar } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';

export default {
    components: { EventForm, FullCalendar },
    data(){
        return {
            event: {},
            
            // events: [],
            calendarPlugins: [ dayGridPlugin, interactionPlugin ],
            pastClass: 'au-task__item au-task__item--danger',
            upcomingClass: 'au-task__item au-task__item--success',
        }
    },
    computed: {
        // ...mapState([
        //     'events'
        // ]),
        events(){
            return this.$store.getters.allEvents
        }
    },
    methods: {
        timeFormat(date){
            return moment(date).format("MMMM Do YYYY");
        },
        checkEvent(event) {
            this.event = event
            document.getElementById('eventModalButton').click()
        },
        checkExpiry(date) {
            date = moment(date) - moment.now()            
            return date < 0 ? 'au-task__item au-task__item--danger' : 'au-task__item au-task__item--success'
        },
        handleDateClick(arg) {
            let array = []
            for (let i in arg.view.props.eventStore.defs){
                array.push(arg.view.props.eventStore.defs[i])
            }
            array = array.map(element => {
                return { 
                    title: element.title, 
                    id: element.extendedProps._id, 
                    date: element.extendedProps.event_date, 
                    description: element.extendedProps.description,
                    duration: element.extendedProps.duration,
                    venue: element.extendedProps.venue,
                    image_url: element.extendedProps.image_url,
                }
            });
            
            let event = array.filter(key => {
                if(key.date){
                    return String(key.date.slice(0, 10)) === String(arg.dateStr)
                }
            })

            console.log(array)
            if(event.length==1) {
                this.event = event[0]
                document.getElementById('eventModalButton').click()
            }
            // else {
            //     this.multipleEvents = event
            //     this.date = arg.dateStr
            //     console.log(event)
            //     document.getElementById('eventModalTwo').click()
            // }
        }
    },
    created() {
        this.$store.dispatch('getAllEvents')
    }
}
</script>


<style scoped lang='scss'>

@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';

.main-content {
    padding: 0 30px;
    min-height: 100vh;
    padding-top: 115px;
    font-family: 'Poppins', sans-serif !important;
}

h1, h2, h3, h4, h5, h6, .title-1, .title-2, .title-3{
    font-family: 'Poppins', sans-serif !important;
}

@media (max-width: 991px) {
    .main-content {
        padding-top: 50px;
	    padding-bottom: 100px;
    }
}

// .fc-toolbar.fc-header-toolbar {
//     padding: 0px 40px;
// }

.au-card-title {
    margin-bottom: 2%;
}

.au-btn-plus{
    font-size: 14px;
    bottom: 45px;
    right: 45px;
}


.flex {
    display: flex;
    justify-content: space-between;
}

.au-task__item-inner{
    cursor: pointer;
}

.no_events {
    text-align: center;
    font-size: 20px;
    padding: 45px 0;
}

/* Let's get this party started */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
  background: #f5f5f5;
    box-shadow: inset 0 0 6px #f5f5f5; 
    -webkit-border-radius: 10px;
    border-radius: 15px;
}
 
/* Scroller */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 15px;
    background: rgba(49, 89, 253, 0.9); 
    box-shadow: inset 0 0 6px rgba(49, 89, 253, 0.9);
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(49, 89, 253, 0.9); 
}
.scroller{
    direction: ltr;
    padding: 5px 0;
    height: 100%;
    max-height: 450px;
    overflow-x: hidden;
    overflow-y: hidden;
}
    .scroller:hover{
    overflow-y: scroll;
  }
</style>  