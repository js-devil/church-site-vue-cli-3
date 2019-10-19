<template>
    <div class="modal fade" id="eventForm" tabindex="-1" role="dialog" aria-labelledby="scrollmodalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-body">
					<div class="card">
                        <div class="card-header">Event Form

                            <button type="button" id="modalDismiss" class="close" data-dismiss="modal" aria-label="Close">
							    <span aria-hidden="true">&times;</span>
							</button>
                        </div>
                        
                        <div class="card-body">
                            <div class="card-title">
                                <h3 class="text-center title-2" v-if="event.id">Update this event</h3>
                                <h3 class="text-center title-2" v-else>Add a New Event</h3>

                            </div>
                            
                            <hr>

                            <form @submit.prevent="addEvent" novalidate="novalidate">
                                <div class="form-group">
                                    <label for="title" class="control-label mb-1">Event Title</label>
                                    <input id="title" type="text" class="form-control" v-model="event.title">
                                </div>
                                
                                <div class="form-group">
                                    <label for="description" class="control-label mb-1">Event Description</label>
                                    <textarea id="description" rows="5" placeholder="Event Description..." class="form-control" v-model="event.description"></textarea>
                                </div>
                                
                                <div class="form-group">
                                    <label for="venue" class="control-label mb-1">Event Venue</label>
                                    <input type="text" id="venue" :disabled='locationDisabled' placeholder="Event Venue" v-model="event.venue" class="form-control">
                                </div>
                                <div style="position: relative; top: -10px;">
                                    <span style="color: #6c757d">Use church location as venue?</span>
                                    <label class="switch switch-text switch-primary switch-pill" >
                                        <input type="checkbox" class="switch-input" v-model="churchLocation">
                                        <span data-on="Yes" data-off="No" class="switch-label"></span>
                                        <span class="switch-handle"></span>
                                    </label> 
                                </div>
                                    
                        
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="event_date" class="control-label mb-1">Event Date</label>
                                            <input type="date" id="event_date" placeholder="Event Date" v-model='event.date' class="form-control">
                                        </div>
                                    </div>
                                    
                                    <div class="col-6">
                                        <label for="duration" class="control-label mb-1">Duration of Event</label>
                                        <div class="input-group">
                                            <input id="duration" type="text" class="form-control" v-model="event.duration" />
                                        </div>
                                    </div>
                                    
                                    <div class="col-3"></div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label for="image_url" class="control-label mb-1">Event Image</label>
                                            <div class="card">
                                                <img class="card-img-top" src='https://res.cloudinary.com/tejuosho4sq/image/upload/v1560445125/footer-logo.png' style="max-height: 250px;" />
                                                <!-- <img class="card-img-top" :src="event.image_url" v-else-if="event.image_url" style="max-height: 250px;" /> -->

                                                <div class="card-body">
                                                    <p class="card-text">
                                                        <button @click.prevent="uploadClick($event)" class="au-btn au-btn-load js-load-btn" style="width: 100%;">Upload</button>
                                                        <input type="file" style="display: none" accept="image/*" @change="uploadPicture($refs.image_url)"  ref="image_url" id="image_url" class="form-control-file">
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div class="col-3"></div>
                                </div>
                                
                                <div>
                                    <button id="payment-button" type="submit" class="btn btn-md btn-success" @click.prevent="addEvent" v-if="event.id">
                                        <i class="zmdi zmdi-check-all zmdi-hc-fw"></i>&nbsp;
                                        <span id="payment-button-amount" v-if="addText==='Create Event'">Update Event</span>
                                        
                                    </button>
                                    
                                    <button type="reset" class="btn btn-danger btn-md" @click.prevent="deleteEvent(event.id)" v-if="event.id">
                                        <i class="zmdi zmdi-delete zmdi-hc-fw"></i> Delete
                                    </button>

                                    <button id="payment-button" type="submit" class="btn btn-lg btn-info btn-block" @click.prevent="addEvent" v-else>
                                        <i class="zmdi zmdi-dot-circle zmdi-hc-fw"></i>&nbsp;
                                        <span id="payment-button-sending">{{ addText }}</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
	<!-- end modal scroll -->
</template>

<script>
export default {
    data(){
        return {
            churchLocation: false,
            locationDisabled: false,
            // disabled: false,
            addText: 'Create Event',
            image_url: '',
            user_token: '1234567890',
        }
    },
    props: {
        event: {
            type: Object
        },
    },
    methods: {
        addEvent() {
            console.log(this.event)
            if(this.event.title && this.event.date && this.event.venue && this.event.duration) {
                let payload = {
                    event: this.event,
                    token: this.user_token
                }

                if(this.event.id) {
                    this.$store.dispatch("editEvent", payload);
                }else {
                    this.$store.dispatch("addEvent", payload);
                }
                
            } else{
                Toast.fire({
                    type: 'error',
                    title: 'Fill in all the required fields'
                })
            }
        },
        uploadPicture(image){
            
            if(image.files && image.files[0]){
                if( /\.(jpe?g|png|gif)$/i.test(image.files[0].name)){
                    var reader = new FileReader();
    
                    reader.onload = function(e) {
                        // this.image_url = e.target.result
                        this.image_url = 'https://res.cloudinary.com/tejuosho4sq/image/upload/v1560445125/footer-logo.png'
                        console.log(this.image_url)
                    }
                    
                    reader.readAsDataURL(image.files[0]);
                    // this.uploadImageToDB(image.files[0])
                }
                else {
                    Toast.fire({
                        type: 'error',
                        title: 'Image format should either be JPEG, PNG or GIF'
                    })
                }   
            }
        },
        uploadImageToDB(image){
            let formData = new FormData();   
            formData.append('file', image);
            formData.append('upload_preset', 'cp84jvyk')

            axios({
                url: `https://api.cloudinary.com/v1_1/tejuosho4sq/upload`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            }).then((response) => {
                this.event.image_url = response.data.secure_url
            }).catch((error) => {
                Toast.fire({
                    type: 'error',
                    title: 'An error occured while uploading this image'
                })
                console.log(error)
            })
        },
        uploadClick(event){
            document.getElementById('image_url').click()
        },
        deleteEvent(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    let payload = {
                        id,
                        token: this.user_token
                    }

                    console.log(payload)
                    // send payload to deleteEvent action in vuex store
                    this.$store.dispatch("deleteEvent", payload);
                }
            })
        }
    },
    mounted(){
        let details = JSON.parse(sessionStorage.getItem('user'))
        this.user_token = details.token
    },
    watch: {
        churchLocation(){
            if(this.churchLocation==true){
                this.event.venue = `17/19, Jacob Street, Off Martins Street, along Ojuelegba Road, Tejuosho, Yaba, Lagos`
                this.locationDisabled = true
            } else {
                this.event.venue = ``
                this.locationDisabled = false
            }
        }
    }
}
</script>

<style scoped>
.modal-body {
    padding: 0;
}

.form-control {
    color: #000;
}
</style>
