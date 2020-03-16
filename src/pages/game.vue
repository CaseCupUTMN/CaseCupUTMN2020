<template>
  <f7-page name="game" tabs :page-content="false" animated>
    <f7-toolbar tabbar bottom labels>
      <f7-link tab-link-active tab-link="#info" text="Инфо" icon-f7="info_circle"></f7-link>
      <f7-link tab-link="#points" text="Точки" icon-f7="placemark"></f7-link>
      <f7-link tab-link="#rating" text="Рейтинг" icon-f7="stopwatch"></f7-link>
    </f7-toolbar>
    <f7-tabs animated>
      <f7-page-content tab tab-active id="info">
      <f7-block-title medium>Игра</f7-block-title>
  <f7-list accordion-list>
  <f7-list-item accordion-item title="Информация о игре">
    <f7-accordion-content>
      <f7-list>
        <f7-list-item title="Название игры:"></f7-list-item>
        <f7-list-item title="Дата проведения:"></f7-list-item>
        <f7-list-item title="Участники:"></f7-list-item>
        <f7-list-item title="Описание:"></f7-list-item>
      </f7-list>
    </f7-accordion-content>
  </f7-list-item>
</f7-list>
      </f7-page-content>
      <f7-page-content tab id="points" @tab:show="onTabPointsShow" @tab:hide="onTabPointsHide">
        <div id="map" style="width: 100%; height: 100%"></div>
      </f7-page-content>

      <f7-page-content tab id="rating">
        <template v-if="!rating.length">
          <f7-block>
            <f7-block-footer class="text-align-center">Нет участников</f7-block-footer>
          </f7-block>
        </template>
        <template v-else>
          <f7-list media-list class="no-margin-vertical">
            <f7-list-item v-for="(item, i) in rating" :key="item.id"
              :title="item.user"
              :after="item.time"
              :text="`${item.points}/${points} точек`"
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
</style>

<script>
let map = null;
let coordinates=[[57.153033, 65.534328],[57.154033, 65.534128]];
let codes=[12,11];
let isclick=[true,true];
export default {
  data() {
    return {
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
    }
  },
   mounted() {
     this.$f7ready((f7) => {
        ymaps.ready(() => {
          map = new ymaps.Map("map", {
            center: [57.153033, 65.534328],
            zoom: 12,
            controls: ['zoomControl']
          });
          var myCollection = new ymaps.GeoObjectCollection({}, {
            preset: 'islands#greenIcon', //все метки зеленые
            //draggable: true // и их можно перемещать
          });
          var myGeoObject;
          for(let i=0;i<coordinates.length;i++){ 
            myGeoObject = new ymaps.GeoObject({
              geometry: {
                  type: "Point", // тип геометрии - точка
                  coordinates: [coordinates[i][0], coordinates[i][1]] // координаты точки
                }
            });
            myGeoObject.events.add('click', function (e) {
              var coords = e.get('coords');
              if(isclick[i]){
              let code=prompt('Введите код ');
              if(code){
                if(code==codes[i]){
                  e.get('target').options.set('preset', 'islands#greenIcon');
                  //map.events.remove("click", onMapClick);
                  isclick[i]=false;
                }else{
                  e.get('target').options.set('preset', 'islands#redIcon');
                }
              }
              }
            });
            map.geoObjects.add(myGeoObject);
          }
         

        });
     });

   }
}
</script>
