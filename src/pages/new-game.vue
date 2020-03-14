<template>
  <f7-page name="new-game">
    <f7-block-title medium>Новая игра</f7-block-title>
    <f7-list no-hairlines>
      <f7-list-input
        label="Название"
        type="text"
        floating-label
        clear-button
        @input="namegame = $event.target.value"
      ></f7-list-input>

      <f7-list-input
        label="Дата проведения"
        type="datepicker"
        floating-label
        readonly
        @change="date = $event.target.value"
      ></f7-list-input>

      <f7-list-item title="Кол-во участников">
        <f7-stepper 
        :value="0" :min="0" :max="50" :step="1" :autorepeat="true" :autorepeat-dynamic="true" 
        @input="count_players = $event.target.value"
        ></f7-stepper>
      </f7-list-item>

      <f7-list-input
        type="textarea"
        label="Описание"
        floating-label
        resizable
        @input="description = $event.target.value"
      ></f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button large round fill @click="next">Далее</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          id: 'cloud.seon.app.encounterMe!', // App bundle ID
          name: 'EncounterMe!', // App name
          theme: 'md', // Material design for all platforms
          autoDarkTheme: true,

          // App routes
          routes: routes,

          // Input settings
          input: {
            scrollIntoViewOnFocus: Device.cordova && !Device.electron,
            scrollIntoViewCentered: Device.cordova && !Device.electron,
          },

          // Cordova Statusbar settings
          statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
          },
        
        },
        namegame: '',
        date: '',
        count_players:0,
        description:'',
      }
    },
    
    methods: {
      errorAlert(error){
          this.$f7.dialog.alert(error);
      },
      next(){
          if(this.namegame=='' || this.date=='' || this.count_players=='' || this.description==''){
              this.errorAlert('Не все поля заполнены!');
          }
      },
    },
    mounted() {
      this.$f7ready((f7) => {
       
  
      });
    }
  }
</script>
