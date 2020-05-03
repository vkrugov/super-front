<template>
    <div v-if="galleryHero !== 0">
        <h1>
            Gallery
        </h1>
        <div v-if="gallery">
            <div class="gallery-list">
                <div v-for="image in gallery" :key="image.url" class="mb-2">
                    <img width="400" height="500" :src="image.url" alt="HeroImage">
                    <div v-if="user.id != null">
                        <button class="btn-del-img" :data-img="image.name" @click="deleteImage($event)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="user.id != null">
            <b-form @submit.prevent="uploadNewImage">
                <b-form-group label="Add New Image !" class="text-left">
                    <b-form-file
                            id="upload-input"
                            @change="setNewImage"
                            name="avatar"
                            type="file"
                    >
                    </b-form-file>
                </b-form-group>
                <b-form-group label="" class="text-left">
                    <div class="success-uploaded" v-if="uploadSuccess">
                        <p>
                            Image was Uploaded !!!
                        </p>
                    </div>
                    <div class="error-block" v-if="error">
                        {{ error }}
                    </div>
                </b-form-group>
                <div class="text-left">
                    <b-button type="submit" class="bg-success">Upload New Image</b-button>
                    .
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {DELETE_IMAGE, UPLOAD_IMAGE} from "../store/actions/hero.actions";

    export default {
        name: "Gallery",
        computed: mapState({
            error: (state) => state.hero.error,
            gallery: (state) => state.hero.gallery,
            user: (state) => state.auth.user,
            galleryHero: (state) => state.hero.heroToAction,
        }),
        data() {
            return {
                newImg: '',
                uploadSuccess: false,
            }
        },
        methods: {
            setNewImage(event) {
                this.newImg = event.target.files[0];
            },
            uploadNewImage() {
                const formData = new FormData();
                if (this.newImg) {
                    formData.append('id', this.$store.state.hero.heroToAction)
                    formData.append('image', this.newImg, this.newImg.fileName)
                    this.$store.dispatch(UPLOAD_IMAGE, formData).then(() => {
                        this.uploadSuccess = true;
                    })
                }
            },
            deleteImage(event) {
                this.$store.state.hero.imageToDel = event.target.dataset.img;
                this.$store.dispatch(DELETE_IMAGE)
            }
        }
    }
</script>

<style scoped>
    .btn-del-img {
        color: #eff7fd;
        background-color: #ff5b5b;
        padding: 10px;
        border-radius: 5px;
    }

    .gallery-list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: left;
    }
</style>