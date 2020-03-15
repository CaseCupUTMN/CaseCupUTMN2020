       <template>
  <f7-page name="new-game" tabs :page-content="false" animated >
         <f7-toolbar tabbar bottom labels>
      <f7-link tab-link-active tab-link="#info" text="Новая игра" icon-f7="plus_circle"></f7-link>
      <f7-link tab-link="#points" text="Точки" icon-f7="placemark"></f7-link>
    </f7-toolbar>
 
      <f7-tabs animated swipeable>
      <f7-page-content tab tab-active id="info">
        <f7-block-title medium>Новая игра</f7-block-title>
        
    <f7-fab position="right-bottom" color="orange">
    <f7-icon f7="plus"></f7-icon>
    <f7-icon f7="xmark"></f7-icon>
    <f7-fab-buttons position="top">
      <f7-fab-button @click="next" label="Создать">1</f7-fab-button>
    </f7-fab-buttons>
  </f7-fab>
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
        <f7-stepper :value="0" :min="0" :max="50" :step="1" :autorepeat="true" :autorepeat-dynamic="true"></f7-stepper>
      </f7-list-item>
      <f7-list-input
        type="textarea"
        label="Описание"
        floating-label
        resizable
        @input="description = $event.target.value"
      ></f7-list-input>
       </f7-list>
</f7-page-content>
 <f7-page-content tab id="points" @tab:show="onTabPointsShow" @tab:hide="onTabPointsHide">
        <div id="map" style="width: 100%; height: 100%"></div>
      </f7-page-content>
      </f7-tabs>

  </f7-page>
</template> 
<style lang="less" scoped>
  .place {
    font-size: 1.3em;
    line-height: 36px;
    text-align: center;
    border-radius: 50%;
    background: #dedede;
    width: 36px;
    height: 36px;
  }
</style>

<script>
let map = null;


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
        points: 14,
        rating: []
      }

    },
    
    methods: {
    onTabPointsShow() {
      ymaps.ready(() => {
        map = new ymaps.Map("map", {
          center: [57.153033, 65.534328],
          zoom: 12,
          controls: []
        });
      });
    },

    onTabPointsHide() {
      if (map) {
        map.destroy();
      }
    },
  
  
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