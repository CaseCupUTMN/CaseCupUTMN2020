<template>
  <f7-page name="edit" tabs :page-content="false" animated >
         <f7-toolbar tabbar bottom labels>
          <f7-link tab-link-active tab-link="#info" text="Редактировать игру" icon-f7="plus_circle"></f7-link>
          <f7-link tab-link="#points" text="Точки" icon-f7="placemark"></f7-link>
        </f7-toolbar>
 <f7-fab position="right-bottom" color="#00bfad">
              <f7-icon f7="plus"></f7-icon>
              <f7-icon f7="xmark"></f7-icon>
              <f7-fab-buttons position="top">
               
               <f7-fab-button @click="editing"  label="Сохранить"><f7-icon f7="floppy_disk"></f7-icon></f7-fab-button>
               <f7-fab-button @click="deleting"  label="Удалить"><f7-icon f7="trash"></f7-icon></f7-fab-button>
              </f7-fab-buttons>
            </f7-fab>
      <f7-tabs animated >

        <f7-page-content tab tab-active id="info">
          
          <f7-block-title  medium>Редактировать игру</f7-block-title>
            
        <f7-list no-hairlines>
            <f7-list-input 
            label="Название"
            type="text"
            floating-label
            clear-button
            :value="namegame"
            @input="namegame = $event.target.value"
            ></f7-list-input>
          <f7-list-input
        label="Дата и время начала игры"
        type="datetime-local"
        @change="date = $event.target.value"
      ></f7-list-input>
       <f7-list-input
        label="Продолжительность игры"
        type="time"
        @change="time = $event.target.value"
      ></f7-list-input>
          <f7-list-item title="Кол-во участников">
          <f7-stepper  :min="0"   :max="50" :step="1" :autorepeat="true" :autorepeat-dynamic="true"
          @change="count_players = $event.target.value"
          ></f7-stepper>
          </f7-list-item>
          <f7-list-input
          type="textarea"
          label="Описание"
          floating-label
          resizable
          :value="description"
          @input="description = $event.target.value"
          ></f7-list-input>
          </f7-list>
        </f7-page-content>


    <f7-page-content tab id="points" @tab:show="onTabMapShow">
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
import moment from 'moment';

  let map = null;
  let metka=0;
  let points=[];
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
        time:'',
      }
    },
    
    methods: {
     formatDate(value) {
      
      //return value ? moment(value).format('DD.MM.YY в HH:mm') : 'дата неизвестна';
      return value ? moment(value).format('DD.MM.YYYY') : 'дата неизвестна';
    },
    deleting(){
        if(confirm("Вы точно хотите удалить игру?")){
            console.log("Удаление игры");
            console.log(this.$f7route.params.id);
            this.$f7.request({
              url :'https://app.seon.cloud/hiddencodes/v1.0/games/'+this.$f7route.params.id,
              method :"DELETE"}); 
            this.$f7.dialog.alert("Игра удалена");
            this.$f7router.back();  
            document.getElementById("logo").style.display="block"; 
        }
    },
    errorAlert(error){
          this.$f7.dialog.alert(error);
           
      },
    gettime(value){
       return value ? moment(value).format('DD.MM.YYYY HH:mm') : '-1';
    },
    getDateTime(value){
       return value ? moment(value).format('YYYY-MM-DD HH:mm') : '-1';
    },
    editing(){
        var app=this;
        console.log(this.gettime(this.date).split(' ')[0]);
      if(this.namegame=='' || this.date=='' || this.gettime(this.date)=='-1' || this.time==''|| this.count_players=='' || this.description==''||  metka==0){
              this.errorAlert('Не все поля заполнены!');
        }else{
           let dat=new Date();
            let strdat=this.formatDate(this.date).split('.');
            let tdate=new Date(strdat[2],strdat[1]-1,strdat[0],this.gettime(this.date).split(' ')[1].split(':')[0],this.gettime(this.date).split(' ')[1].split(':')[1]);
            
            if(tdate.getTime() < dat.getTime()){
                this.errorAlert('Нельзя выбрать прошедшую дату');
            }
            else{
              let enddate=new Date(strdat[2],strdat[1]-1,strdat[0],parseInt(this.gettime(this.date).split(' ')[1].split(":")[0])+parseInt(this.time.split(":")[0]),parseInt(this.gettime(this.date).split(' ')[1].split(":")[1])+parseInt(this.time.split(":")[1]));
            
            console.log('https://app.seon.cloud/hiddencodes/v1.0/games/'+this.$f7route.params.id);
            console.log(this.formatDate(tdate));
             console.log("endDate"+enddate);
            this.$f7.request({
              url:'https://app.seon.cloud/hiddencodes/v1.0/games/'+app.$f7route.params.id,
              method:"PUT", 
              data:{
                title:this.namegame,
                description:this.description,
                startDate:app.getDateTime(tdate),
                endDate:app.getDateTime(enddate),
                maxPlayers:this.count_players,
                points:points
              }
            });
            this.$f7.dialog.alert("Вы успешно отредактировали игру");
            this.$f7router.back();    
             document.getElementById("logo").style.display="block";
            }  
          }
    },
      errorAlert(error){
          this.$f7.dialog.alert(error);    
      },
     onTabMapShow(){
         
     }
    },
    mounted() {
        var app=this;
      this.$f7ready((f7) => {
        document.getElementById("logo").style.display="none";
          if(app.$f7route.params.id){
              this.namegame=localStorage.namegame;
              
              //this.count_players=parseInt(localStorage.maxPlayers);
              this.description=localStorage.description;
              points=JSON.parse(localStorage.points);
              
              
              
              }
          ymaps.ready(() =>{
            var inputSearch = new ymaps.control.SearchControl({
              options: {
              // Пусть элемент управления будет
              // в виде поисковой строки.
              size: 'small',
              // Включим возможность искать
              // не только топонимы, но и организации.
              provider: 'yandex#search'            
               }
            }),
            map = new ymaps.Map("map", {
              center: [57.153033, 65.534328],
              zoom: 12,
              controls: ['zoomControl',inputSearch]
            });
            
            var myCollection = new ymaps.GeoObjectCollection({}, {
        /*preset: 'islands#redIcon', //все метки красные
        draggable: true // и их можно перемещать*/
            });
          if(points){
              for(let item of points){
                  console.log(item);
                  metka+=1;
                  var myGeoObject = new ymaps.GeoObject({
                  geometry: {
                  type: "Point", // тип геометрии - точка
                  coordinates: [item.lat,item.lon] // координаты точки
                    }
                  });
                 myGeoObject.events.add('click', function (e) {
            // Получение координат щелчка
              //var coords = e.get('coords');
              if(confirm("Удалить точку?")){
                metka-=1;
                let newpoints=[];
                
                for(let mas of points){
                  if(mas.lat!=item.lat && mas.lon!=item.lon){
                    newpoints.push(mas);
                  }
                  
                }
                points=newpoints;
                
                myCollection.add(e.get('target'));
                myCollection.removeAll();
              }
            });
             map.geoObjects.add(myGeoObject);
              }
            }
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

            points.push({
              lat:coords[0], 
              lon:coords[1],
              code:code
              });
            myGeoObject.events.add('click', function (e) {
            // Получение координат щелчка
              //var coords = e.get('coords');
              if(confirm("Удалить точку?")){
                metka-=1;
                let newpoints=[];
                
                for(let mas of points){
                  if(mas.lat!=coords[0] && mas.lon!=coords[1]){
                    newpoints.push(mas);
                  }
                  
                }
                points=newpoints;
                
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
