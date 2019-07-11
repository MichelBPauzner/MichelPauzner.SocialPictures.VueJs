<template>

  <div>
    <h1 class="centered">Cadastro</h1>
    <h2 v-if="photo._id" class="centered">Alterando</h2>
    <h2 v-else class="centered">Incluindo</h2>
    

    <form @submit.prevent="save()">
      <div class="control">
        <label for="title">TÍTULO</label>
        <input data-vv-as="Título" name="title" v-validate data-vv-rules="required|min:3|max:30" id="title" autocomplete="off" v-model="photo.titulo" >
        <!--<span class="error" v-show="errors.has('title')">Título obrigatório</span>-->
        <span class="error" v-show="errors.has('title')">{{ errors.first('title') }}</span>
      </div>

      <div class="control">
        <label for="url">URL</label>
        <input name="url"  v-validate data-vv-rules="required" id="url" autocomplete="off" 
            v-model="photo.url">
        <responsive-image v-show="photo.url" :url="photo.url" :title="photo.titulo"/>
        <span class="error" v-show="errors.has('url')">{{ errors.first('url') }}</span>
      </div>

      <div class="control">
        <label for="description">DESCRIÇÃO</label>
        <textarea id="description" autocomplete="off" 
            @input="photo.descricao = $event.target.value" :value="photo.descricao"></textarea>
      </div>

      <div class="centered">
        <main-button label="GRAVAR" type="submit"/>
        <router-link :to="{name: 'home'}"><main-button label="VOLTAR" type="button"/></router-link>
      </div>

    </form>
  </div>
</template>

<script>

import ResponsiveImage from '../shared/responsive-image/ResponsiveImage.vue'
import Button from '../shared/button/Button.vue';
import Photo from '../../domain/photo/Photo';
import PhotoService from '../../domain/photo/PhotoService';

export default {

  components: {

    'responsive-image': ResponsiveImage, 
    'main-button': Button
  },
   
   data(){
       return {
           photo: new Photo(),
           id : this.$route.params.id
       }
   },

   methods:{
       save(){
        //  this.$http
        //   .post('v1/fotos', this.photo)
        //   .then(()=> this.photo = new Photo(), err => console.log(err));

        // this.resource
        //   .save(this.photo)
        //   .then(()=> this.photo = new Photo(), err => console.log(err));

        this.$validator
          .validateAll()
          .then(success => {
            if(success){
              this.service
                .register(this.photo)
                .then(()=> {
                  if(this.id) this.$router.push({name: 'home'});
                  this.photo = new Photo();
                }, err => console.log(err));
            }
          });



       }

   },

   created(){
      //this.resource = this.$resource('v1/fotos');
      this.service = new PhotoService(this.$resource);
      if(this.id) {
        this.service
          .getById(this.id)
          .then(photo => this.photo = photo);
      }
    
   }
}

</script>
<style scoped>

  .centered {
    text-align: center;
  }
  .control {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .control label {
    display: block;
    font-weight: bold;
  }

 .control label + input, .control textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }

  .error {
    color: red;
  }

</style>