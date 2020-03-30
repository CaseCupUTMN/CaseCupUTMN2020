<template>
  <f7-page name="game" tabs :page-content="false" animated >
    <f7-toolbar tabbar bottom labels>
      <f7-link tab-link-active tab-link="#info" text="Инфо" icon-f7="info_circle"></f7-link>
      <f7-link tab-link="#points" text="Точки" icon-f7="placemark" ></f7-link>
      <f7-link tab-link="#rating" text="Рейтинг" icon-f7="stopwatch"></f7-link>
    </f7-toolbar>
    <f7-tabs animated>
     <f7-page-content tab tab-active id="info" @tab:show="onTabInfoShow">
        <f7-block-title medium>Информация об игре</f7-block-title>
   <template>
    <f7-list v-for="item in data" :key="item.id">
      <f7-block class="information-box">
        Название: {{item.title}}
      </f7-block>
      <f7-block class="information-box">
      Дата и время проведения: {{formatDate(item.startDate)}} 
      </f7-block>
     <f7-block class="information-box">
      Дата и время окончания: {{formatDate(item.endDate)}} 
      </f7-block>
      <f7-block class="information-box">
      Участники: Участвует {{item.players.length}} / {{item.maxPlayers}} чел.
  
      </f7-block>

      
  <f7-block class="information-box"> Описание:
    {{item.description}}
  </f7-block>
<template v-if="!valStart">
     <f7-block class="information-box">Статус игры: Игра еще не началась!</f7-block>
   </template>
    </f7-list>
  </template>
   <f7-block v-if="valJoin">
<f7-button class="button" large round fill @click="join">Присоединиться к игре</f7-button>
   </f7-block>
   <f7-block v-else-if="!valAvtor">
<f7-button class="button" large round fill @click="leave">Покинуть игру</f7-button>
   </f7-block>
   <f7-block v-else>
     <f7-button class="button" large round fill @click="edit" >Редактировать игру</f7-button>
   </f7-block>
 </f7-page-content>
     <!-- <f7-page-content tab id="points" @tab:show="onTabPointsShow" @tab:hide="onTabPointsHide">
        <div id="map" style="width: 100%; height: 100%"></div>
      </f7-page-content>-->
      <f7-page-content tab id="points" @tab:show="onTabPointsShow" @tab:hide="onTabPointsHide">
        <div id="map" style="width: 100%; height: 100%"></div>
      </f7-page-content>

      <f7-page-content tab id="rating" @tab:show="onTabRatingShow">
        <template v-if="!rating.length">
          <f7-block>
            <f7-block-footer class="text-align-center">Нет информации о рейтинге</f7-block-footer>
          </f7-block>
        </template>
        <template v-else>
          <f7-list media-list class="no-margin-vertical">
            <f7-list-item v-for="(item, i) in rating" :key="item.id"
              :title="item.user"
              :after="item.time"
              :text="`${item.points}/${points.length} точек`"
            >
              <div class="place" slot="media">{{i+1}}</div>
            </f7-list-item>
          </f7-list>
        </template>
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
    
  .rectangle {
    font-size: 1.3em;
    line-height: 36px;
    text-indent: 10px;
    background: #dedede;
    height: 70px;
    border: 2px solid #000; /* Черная рамка */
    border-radius: 10px;
    
    }
  .information-box {
    font-size: 1.2em;
    font-weight: 500;
    color: #dbdbdb;
    line-height: 1.5;
    padding-top: 4px;
    padding-bottom: 4px;
    margin: 15px;
    background: #808080;
    min-height: 50px;
    border: 2px solid #333333; /* Черная рамка */
    border-radius: 10px;
  }
  .button {
    margin: 10px;
    text-align: center;
  }
</style>


<script>
import moment from 'moment';
import routes from '../js/routes.js';
let map = null;
let points=[];
let mypoints=[];
export default {
  data() {
    return {
      valJoin:true,
      valAvtor:false,
      valStart:false,
      rating: [],
      routes:routes,
      data:[],
     
    }
  },

  methods: {
    join(){
     
        this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/games/'+ this.$f7route.params.id+'/join',{
          userId:localStorage.user_uuid
        },(data)=>{
          if (data.message) {
            
            return console.error(data.message);
          }
          
        });
        
        this.valJoin=false;
        this.onTabInfoShow();
      
    },
    leave(){
     
        this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/games/'+ this.$f7route.params.id+'/leave',{
          userId:localStorage.user_uuid
        },(item)=>{
          if (item.message) {
            
            return console.error(item.message);
          }
          
          
         
        });
        this.valJoin=true;
        this.onTabInfoShow();
    },
    edit(){
      
      localStorage.namegame=this.data[0].title;
      localStorage.startDate=this.data[0].startDate;
      localStorage.maxPlayers=this.data[0].maxPlayers;
      localStorage.description=this.data[0].description;
      localStorage.points=JSON.stringify(points);
      this.$f7router.navigate('/edit/'+this.$f7route.params.id,{reloadCurrent :true});
      //this.$f7router.back();
      
      //редактирование игры
      /* var app=this;
        this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/games/'+ this.$f7route.params.id+'/leave',{
          userId:localStorage.user_uuid
        },function  (item){
          if (item.message) {
            
            return console.error(item.message);
          }
          app.valJoin=true;
        });*/
    },
    onTabPointsShow(){
      
      var app=this;
     
        ymaps.ready(() => {
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
            preset: 'islands#greenIcon', //все метки зеленые
            //draggable: true // и их можно перемещать
          });
         
          if(!app.valJoin && app.valStart)
          for(let item of points){
            
             if(mypoints.includes(item.id)){
               var myGeoObject = new ymaps.GeoObject({
              geometry: {
                  type: "Point", // тип геометрии - точка
                  coordinates: [item.lat,item.lon] ,// координаты точки
                  preset:"islands#greenIcon"
                },
            
            });
            item.click=false;
             }else{
               var myGeoObject = new ymaps.GeoObject({
                geometry: {
                  type: "Point", // тип геометрии - точка
                  coordinates: [item.lat,item.lon] // координаты точки
                },
            
              });
              }
            
            
            myGeoObject.events.add('click', function (e) {
              var coords = e.get('coords');
              if(app.valAvtor){
                app.$f7.dialog.alert("Код точки: "+ item.code);  
              }
              else if(item.click){
              let code=prompt('Введите код ');
              console.log(app.$f7route.params.id);
              console.log(localStorage.user_uuid);
              console.log(item.id);
              console.log(item.code);
              if(code){
                if(code==item.code){
                    
                   app.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/games/'+ app.$f7route.params.id+'/verify',{
                     userId :localStorage.user_uuid,
                     pointId :item.id,
                     code :item.code
                   }, (data) => {
                if (data.message) {
               
                return console.error(data.message);
               }
            
              });
                  e.get('target').options.set('preset', 'islands#greenIcon'); 
                  item.click=false;
                }else{
                  e.get('target').options.set('preset', 'islands#redIcon');
                }
              }
              }
            });
            map.geoObjects.add(myGeoObject);
          }
         console.log(localStorage.user_uuid);

        });
    },
    onTabInfoShow() {
      let app=this;
      
      this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games/'+ app.$f7route.params.id,function  (item){
          if (item.message) {
            
            return console.error(item.message);
          }
          
          app.data.splice(0,1,{
                      
                      title:item.title,
                      players:[item.players],
                      maxPlayers:item.maxPlayers,
                      startDate:item.startDate,
                      endDate:item.endDate,
                      description:item.description
                    });

        });
    },
    onTabRatingShow(){
      this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games/'+ this.$f7route.params.id,function  (item){
          if (item.message) {
            
            return console.error(item.message);
          }
          for(let rat in item.results){
            this.rating.push({
              user:rat.user,
              time:rat.time,
              points:rat.reachedPoints.length
            });
          }

        });
    },
    formatDate(value) {
      
      //return value ? moment(value).format('DD.MM.YY в HH:mm') : 'дата неизвестна';
      return value ? moment(value).format('DD.MM.YYYY в HH:mm') : 'дата неизвестна';
    },
    gettime(value){
       return value ? moment(value).format('HH:mm') : '-1';
    },
    formatDate1(value) {
      
      //return value ? moment(value).format('DD.MM.YY в HH:mm') : 'дата неизвестна';
      return value ? moment(value).format('DD.MM.YYYY') : 'дата неизвестна';
    },
    onTabPointsHide() {
      if (map) {
        map.destroy();
      }
    },
    getNormDate(value){
        return new Date(value.split("-")[0],value.split("-")[1]-1,value.split("-")[2].split("T")[0],value.split("-")[2].split("T")[1].split(":")[0],value.split("-")[2].split("T")[1].split(":")[1]);
    },
  },
  
   mounted() {
     this.$f7ready((f7) => {
        var app=this;
        points=[];
        document.getElementById("logo").style.display="none";
         console.log(app.$f7route.params.id);
          this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games/'+ app.$f7route.params.id,function  (item){
          if (item.message) {
            
            return console.error(item.message);
          }
          
          
          let dat=new Date();
          console.log(item.startDate.split("-"));
          let strdat=app.formatDate1(item.startDate).split('.');
          console.log(item.startDate);
          console.log(item.endDate);
          let tdate=app.getNormDate(item.startDate);
            //new Date(item.startDate.split("-")[0],item.startDate.split("-")[1]-1,item.startDate.split("-")[2].split("T")[0],item.startDate.split("-")[2].split("T")[1].split(":")[0],item.startDate.split("-")[2].split("T")[1].split(":")[1]);
          console.log(tdate);
          console.log(tdate.getTime()+" "+dat.getTime());
          app.data.push({
                      title:item.title,
                      id:item._id,
                      players:item.players,
                      maxPlayers:item.maxPlayers,
                      endDate:app.getNormDate(item.endDate),
                      startDate:app.getNormDate(item.startDate),
                      description:item.description
                    });
          if(tdate.getTime() <= dat.getTime()){
               app.valStart=true;
            }else{
              app.valStart=false;
            }
          
          for(let point of item.points){
           points.push({
              id:point._id,
              lat:point.lat,
              lon:point.lon,
              code:point.code,
              click:true
            });
          }
          for(let point of item.results){
            if(point.user===localStorage.user_uuid){
                mypoints=point.reachedPoints;
            }
          }
         
          for(let player of item.players){
              if(player===localStorage.user_uuid){
                  //если участвует то...
                  app.valJoin=false;
              }
          }
          
            if(localStorage.user_uuid===item.author){
              //если автор игры то...
              console.log("AUTHOR");
              app.valAvtor=true;
              app.valJoin=false;
              app.valStart=true;
            }
        
        });
        console.log(points);
     });

   }
}
</script>
