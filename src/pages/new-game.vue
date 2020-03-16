<template>
  <f7-page name="new-game" tabs :page-content="false" animated >
         <f7-toolbar tabbar bottom labels>
          <f7-link tab-link-active tab-link="#info" text="Новая игра" icon-f7="plus_circle"></f7-link>
          <f7-link tab-link="#points" text="Точки" icon-f7="placemark"></f7-link>
        </f7-toolbar>
 
      <f7-tabs animated >
      <f7-page-content tab tab-active id="info">
        <f7-block-title medium>Новая игра</f7-block-title>
        
    <f7-fab position="right-bottom" color="orange">
    <f7-icon f7="plus"></f7-icon>
    <f7-icon f7="xmark"></f7-icon>
    <f7-fab-buttons position="top">
      <f7-fab-button @click="next" label="Создать"><f7-icon f7="plus"></f7-icon></f7-fab-button>
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
        <f7-stepper :value="0" :min="0" :max="50" :step="1" :autorepeat="true" :autorepeat-dynamic="true"
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
</f7-page-content>
 <f7-page-content tab id="points" >
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
  import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
  import cordovaApp from '../js/cordova-app.js';
  import routes from '../js/routes.js';


  let map = null;
  let metka=0;
  let coordinates=[];
  let codes=[];
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
          
          if(this.namegame=='' || this.date=='' || this.count_players=='' || this.description==''||  metka==0){
              this.errorAlert('Не все поля заполнены!');
          }
          else{
            let dat=new Date();
            let strdat=this.date.split('.');
            let tdate=new Date(strdat[2],strdat[0],strdat[1]);
           
            if(tdate < dat.getTime()){
                this.errorAlert('Нельзя выбрать прошедшую дату');
            }else{
                   //api
              /*
              codes-хранит коды для точки
              coordinates-хранит координаты точек 
              */ 
                
                this.$f7.dialog.alert("Вы успешно создали игру");
                this.$f7router.back();
                //window.location.href="/";
            }  
          }
         
      },
    },
    mounted() {
      this.$f7ready((f7) => {
         
          ymaps.ready(() =>{
            map = new ymaps.Map("map", {
              center: [57.153033, 65.534328],
              zoom: 12,
              controls: ['zoomControl']
            });
            
            var myCollection = new ymaps.GeoObjectCollection({}, {
        /*preset: 'islands#redIcon', //все метки красные
        draggable: true // и их можно перемещать*/
            });
            map.events.add('click', function (e) {

            
        // Получение координат щелчка
            var coords = e.get('coords');
            let code=prompt('Введите код ');
            if(code){
            metka+=1;
            var myGeoObject = new ymaps.GeoObject({
              geometry: {
                  type: "Point", // тип геометрии - точка
                  coordinates: [coords[0], coords[1]] // координаты точки
                }
            });

            coordinates.push([coords[0], coords[1]]);
            codes.push(code);
            myGeoObject.events.add('click', function (e) {
            // Получение координат щелчка
              var coords = e.get('coords');
              if(confirm("Удалить точку?")){
                metka-=1;
                let newcoordinates=[];
                let newcodes=[];
                for(let mas of coordinates){
                  if(mas[0]==coords[0] && mas[1]==coords[1]) continue;
                  newcoordinates.push(mas);
                  newcodes.push(code);
                }
                coordinates=newcoordinates;
                myCollection.add(myGeoObject);
                myCollection.removeAll();
              }
            });
              
              map.geoObjects.add(myGeoObject);
            }
          });
           });
      });
    }
  }
</script>
