import Vue from 'vue';

Vue.directive('main-transform',{
    bind(el, binding, vnode){
        let current = 0;

        el.addEventListener('dblclick', function(){
            let increment = binding.value || 90;
            let efect;

            // if(binding.value){
            //     increment = binding.value.increment;
            //     hasTransition = binding.value.hasTransition;
            // }

            if(!binding.arg || binding.arg == 'rotate'){
                if(binding.modifiers.reverse){
                    current -= increment;
                } else {
                    current += increment;
                }
                efect = `rotate(${current}deg)`;
            } else if(binding.arg == 'scale') {
                efect = `scale(${increment})`;
            }

            el.style.transform = efect;
            if(binding.modifiers.hasTransition) el.style.transition= 'transform 0.5s';
        });
        

    }

});