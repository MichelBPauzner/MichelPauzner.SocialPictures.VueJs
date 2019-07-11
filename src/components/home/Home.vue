
/* v-bind:xxx => :xxx  */
/* v-on:xxx => @xxx  */
<template>
  <div>
    <h1 class="centered">{{ title }}</h1>
    <p v-show="message" class="centered">{{ message }}</p>
    <input type="search" v-on:input="filter = $event.target.value" class="filter" placeholder="Filtre pelo título">
    <ul class="photo-list">
      <li class="photo-list-item" v-for="photo of filteredPhotos">
        <main-panel :title="photo.titulo" >
          <!-- <responsive-img  v-main-transform="{increment: 90, hasTransition: true}" :url="photo.url" :title="photo.titulo"/>-->
          <!-- <responsive-img  v-main-transform:rotate.hasTransition="90" :url="photo.url" :title="photo.titulo"/>-->
          <responsive-img  v-main-transform:scale.hasTransition="1.1" :url="photo.url" :title="photo.titulo"/>
         <router-link :to="{name: 'update', params: {id: photo._id} }"><main-button type="button" 
            label="ALTERAR" 
          /></router-link>
          <main-button type="button" 
            label="REMOVER" 
            @activeButton="remove(photo)"
            :confirm="true"
            customStyle="danger"
          />

        </main-panel>
      </li>
    </ul>
  </div>
</template>

<script>
import Panel from '../shared/panel/Panel.vue';
import ResponsiveImage from '../shared/responsive-image/ResponsiveImage.vue';
import Button from '../shared/button/Button.vue';
import PhotoService from '../../domain/photo/PhotoService';

export default {
  components:{
    'main-panel': Panel,
    'responsive-img': ResponsiveImage,
    'main-button': Button
  },

  data() {
    return {
      title: 'Social Pictures - Vue.js',
      photos: [],
      filter: '',
      message: ''
    }
  },

  computed:{
    filteredPhotos(){
      if(this.filter){
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.photos.filter(photo => exp.test(photo.titulo));
      } else {
        return this.photos;
      }

    }
  },

  methods:{
    remove(photo){

      this.service
        .remove(photo._id)
        .then(()=> {
          let index = this.photos.indexOf(photo);
          this.photos.splice(index, 1);
          this.message = 'Foto removida com sucesso!';
          }, 
        err=> {
          console.log(err);
          this.message = 'Não foi possível remover a foto';
        });

      // this.resource
      //   .delete({ id : photo._id})
      //   .then(()=> {
      //     let index = this.photos.indexOf(photo);
      //     this.photos.splice(index, 1);
      //     this.message = 'Foto removida com sucesso!';
      //     }, 
      //   err=> {
      //     console.log(err);
      //     this.message = 'Não foi possível remover a foto';
      //   });



      //  this.$http
      //   .delete(`v1/fotos/${photo._id}`)
      //   .then(()=> {
      //     let index = this.photos.indexOf(photo);
      //     this.photos.splice(index, 1);
      //     this.message = 'Foto removida com sucesso!';
      //     }, 
      //   err=> {
      //     console.log(err);
      //     this.message = 'Não foi possível remover a foto';
      //   });
    }
  },

  created() {

    this.service = new PhotoService(this.$resource);

    this.service
      .getAll()
      .then(photos => this.photos =  photos, err => this.message = err.message);

    // this.resource = this.$resource('v1/fotos{/id}');
    // this.resource
    //   .query()
    //   .then(res => res.json())
    //   .then(photos => this.photos =  photos, err => console.log(err));

    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(photos => this.photos =  photos, err => console.log(err));
  }
 
}
</script>

<style>

  .centered{
    text-align: center;
  }

  .photo-list{
    list-style: none;
  }

  .photo-list .photo-list-item{
    display: inline-block;
  }

  .filter{
    display: block;
    width: 100%;
  }


</style>
