<template>
  <f7-page name="home" tabs :page-content="false" animated @page:init="tabAllShow">
    <f7-toolbar tabbar bottom labels>
      <f7-link tab-link-active tab-link="#all-games" text="Все игры" icon-f7="layers_alt"></f7-link>
      <f7-link tab-link="#current-games" text="Я участник" icon-f7="person_crop_circle_badge_checkmark"></f7-link>
      <!--<f7-link tab-link="#user-score" text="Мои достижения" icon-f7="star_circle"></f7-link>-->
    </f7-toolbar>

    <f7-tabs animated swipeable>
      <f7-page-content tab tab-active id="all-games" infinite @infinite:refresh="refreshAll"> 
        <f7-fab position="right-bottom" color="orange" href="/new-game/" >
          <f7-icon f7="plus"></f7-icon>
        </f7-fab>
        
        <template v-if="!games.all.length">
          <f7-block>
            <f7-block-footer class="text-align-center">Не запланировано ни одной игры</f7-block-footer>
          </f7-block>
        </template>
        <template v-else>
          <f7-list media-list class="no-margin-vertical">
            <f7-list-item v-for="item in games.all" :key="item.id"
              :title="item.title"
              :link="`/game/${item.id}`"
              :after="`${item.players.current}/${item.players.max} чел.`"
              :subtitle="formatDate(item.startDate)"
              :text="item.description"
              chevron-center
            ></f7-list-item> 
           
          </f7-list>
          
        </template>
       
      </f7-page-content>

      <f7-page-content tab id="current-games" ptr @ptr:refresh="refreshCurrent">
        <template v-if="!games.current.length">
        <f7-block >
          <f7-block-footer class="text-align-center">Вы не зарегистрированы ни в одной игре</f7-block-footer>
        </f7-block>
        </template>
        <template v-else>
        
           <f7-list media-list class="no-margin-vertical">
            <f7-list-item v-for="item in games.current.all" :key="item.id"
              :title="item.title"
              :link="`/game/${item.id}`"
              :after="`${item.players.current}/${item.players.max} чел.`"
              :subtitle="formatDate(item.startDate)"
              :text="item.description"
              chevron-center
            ></f7-list-item>
          </f7-list>
       
        </template>
      </f7-page-content>
      
    </f7-tabs>
  </f7-page>
</template>
<style>
.fab{
      position: fixed;
}
</style>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      loadInProgress: false,
      games: {
        all: [
          {title:"Знакомство с Тюменью",
                      id:1,
                      players:{
                        current:1,
                        max:50
                      },
                      startDate:"03.15.2020",//(месяц,день,год)
                      description:"ВЫ пройдете все достопримечательности города Тюмени"
                    },
        ],
        current: [
          
        ]
      }
    }
  },

  methods: {
    tabAllShow() {},
    refreshPush(done){
      alert("YES");
      setTimeout(() => {
        
        for(let i=20;i<40;i++){
          this.games.all.push({title:"newgame2",
                      id:i+1*2,
                      players:{
                        current:i,
                        max:50
                      },
                      startDate:"02.02.2020",
                      description:"Просто текст"
                    });
        }
        
        done();
      }, 1000);
    },
    refreshAll(done) {
      setTimeout(() => {
        for(let i=0;i<19;i++){
          this.games.all.push({title:"newgame1",
                      id:i+1*2,
                      players:{
                        current:i,
                        max:50
                      },
                      startDate:"02.02.2020",
                      description:"Просто текст"
                    });
        }
        
        done();
      }, 1000);
    },



    formatDate(value) {
      
      //return value ? moment(value).format('DD.MM.YY в HH:mm') : 'дата неизвестна';
      return value ? moment(value).format('DD.MM.YY') : 'дата неизвестна';
    }
  },
  mounted() {
    this.$f7ready((f7) => {
       
    });
  }
}
</script>
