<template>
  <f7-page name="home" tabs :page-content="false" animated @page:init="tabAllShow">
    <f7-toolbar tabbar bottom labels>
      <f7-link tab-link-active tab-link="#all-games" text="Все игры" icon-f7="layers_alt"></f7-link>
      <f7-link tab-link="#current-games" text="Я участник" icon-f7="person_crop_circle_badge_checkmark"></f7-link>
      
    </f7-toolbar>

    <f7-tabs animated swipeable>
      <f7-tab tab-active id="all-games">
      <f7-fab position="right-bottom" color="#00bfad" href="/new-game/" >
          <f7-icon f7="plus"></f7-icon>
        </f7-fab>
      <f7-page-content  ptr @ptr:refresh="refreshAll" infinite :infinite-distance="50" :infinite-preloader="loadInProgress" @infinite="loadMoreAll">
        
        
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
              :text="item.description.substr(0,(item.description.length > 50) ? 40 : item.description.length)"
              chevron-center
            ></f7-list-item> 
           
          </f7-list>
          
        </template>
       
      </f7-page-content>
      </f7-tab>
      <f7-page-content tab id="current-games" ptr @ptr:refresh="refreshCurrent" @tab:show="onTabCurrentShow">
        <template v-if="!games.current.length">
        <f7-block >
          <f7-block-footer class="text-align-center">Вы не зарегистрированы ни в одной игре</f7-block-footer>
        </f7-block>
        </template>
        <template v-else>
        
           <f7-list media-list class="no-margin-vertical">
            <f7-list-item v-for="item in games.current" :key="item.id"
              :title="item.title"
              :link="`/game/${item.id}`"
              :after="`${item.players.current}/${item.players.max} чел.`"
              :subtitle="formatDate(item.startDate)"
              :text="item.description.substr(0,(item.description.length > 50) ? 10 : item.description.length)"
              chevron-center
            ></f7-list-item>
          </f7-list>
       
        </template>
      </f7-page-content>
       
    </f7-tabs>
  </f7-page>
</template>
<style>

</style>
<script>
import moment from 'moment';
import routes from '../js/routes';
export default {
  data() {
    return {
      loadInProgress: false,
      hasMoreAll:true,
      countAll:0,
      games: {
        all: [
        ],
        current: [
          
        ]
      }
    }
  },

  methods: {
    async loadMoreAll(){
      
      if(!this.hasMoreAll)  return;
      this.loadInProgress=true;
      try{
        const gameDate=await this.$f7.request.promise.json('https://app.seon.cloud/hiddencodes/v1.0/games',{
          skip:this.games.all.length,
          sort:"-startDate"
        });
        /*this.countAll+=1;
        this.hasMoreAll=gameDate.data.total > this.countAll;*/
        if(gameDate.data.data.length==0){
          this.hasMoreAll=false;
          this.loadInProgress=false;
          return;
        }
        for(let item of gameDate.data.data){
         
             this.games.all.push({
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },
                      startDate:this.getNormDate(item.startDate),
                      description:item.description
        });
        }
       console.log(gameDate);
        this.hasMoreAll=this.games.all.length < gameDate.data.meta.total;
        
      }
      catch({xhr}){
        
        this.$f7.dialog.alert("Ошибка");
      };
      this.loadInProgress=false;
    },
    
    
    tabAllShow() {
      
      this.onTabAllShow();
    },
    onTabAllShow(){
      var app=this;
      this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games' ,{
        sort:"-startDate"
      },function  (res){
          if (res.message) {
            
            return console.error(res.message);
          }
          app.games.all=[];
          for(let item of res.data){
           
            app.games.all.push({
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },

                      startDate:app.getNormDate(item.startDate),
                      description:item.description
                    });
          }
          
       });
    },
    refreshAll(done) {
      
      setTimeout(() => {
        var app=this;
      this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games' ,
      {
        sort:"-startDate"
      },function  (res){
          if (res.message) {
            
            return console.error(res.message);
          }
          delete app.games.all;
          app.games.all=[];
          for(let item of res.data){
            
            app.games.all.push({
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },

                      startDate:app.getNormDate(item.startDate),
                      description:item.description
                    });
          }
       });
        done();
      }, 1000);
    },
    onTabCurrentShow(){
       var app=this;
         this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games?filter={"players":"'+localStorage.user_uuid+'"}' ,function  (res){
          if (res.message) {
            
            return console.error(res.message);
          }
          app.games.current=[];
          for(let item of res.data){
                app.games.current.push(
                  {
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },

                      startDate:app.getNormDate(item.startDate),
                      description:item.description
                    }
                );
             
            
        }
        });
    },
    refreshCurrent(done) {
      setTimeout(() => {
       this.onTabCurrentShow();
        done();
      }, 1000);
    },
    getNormDate(value){
        return new Date(value.split("-")[0],value.split("-")[1]-1,value.split("-")[2].split("T")[0],value.split("-")[2].split("T")[1].split(":")[0],value.split("-")[2].split("T")[1].split(":")[1]);
    },
    formatDate(value) {
      
      return value ? moment(value).format('DD.MM.YY в HH:mm') : 'дата неизвестна';
     // return value ? moment(value).format('DD.MM.YY') : 'дата неизвестна';
    }
  },
  mounted() {
    this.$f7ready((f7) => {
      
      document.getElementById("logo").style.display="block";
      localStorage.idgame='';
          var app=this;
          app.onTabAllShow();
          app.onTabCurrentShow();
          /*this.$f7.request.json('https://app.seon.cloud/hiddencodes/v1.0/games' ,function  (res){
          if (res.message) {
            
            return console.error(res.message);
          }
        
          for(let item of res.data){
            
            app.games.all.push({
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },

                      startDate:item.startDate,
                      description:item.description
                    });
            for(let player of item.players){
              console.log(player);
              if(player===localStorage.user_uuid){
                app.games.current.push(
                  {
                      title:item.title,
                      id:item._id,
                      players:{
                        current:item.players.length,
                        max:item.maxPlayers
                      },

                      startDate:item.startDate,
                      description:item.description
                    }
                );
              }
            }
        }
        });*/
    });
  }
}
</script>
