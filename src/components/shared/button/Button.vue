<template>
    <button @click="triggerAction()" class="button" :class="buttonStyle" :type="type">{{ label }}</button>

</template>

<script>
    export default {
        props: {
           type:{
               required:true,
               type: String
           },
           label:{
               required:true,
               type: String
           }
           ,
           confirm: Boolean,
           customStyle: String
        },

        methods: {
            triggerAction(){
                if(this.confirm){
                    if(confirm('Deseja remover?')){
                        this.$emit('activeButton');
                    }
                    return;
                }
                 this.$emit('activeButton'); 
            }
        },

        computed: {

            buttonStyle(){
                if(this.customStyle == 'default' || !this.customStyle) return 'button-default';
                if(this.customStyle == 'danger') return 'button-danger';
            }

        }
    }

</script>

<style scoped>
        .button {
            display: inline-block;
            padding: 10px;
            border-radius: 3px;
            margin: 10px;
            font-size: 1.2em;
        }
    
        .button-danger {
            background: firebrick;
            color: white;
        }
    
        .button-default {
            background: darkcyan;
            color: white;
        }
    
</style>