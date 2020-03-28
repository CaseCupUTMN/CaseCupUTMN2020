<template>
<f7-app :params="f7params" class="color-theme-teal">
  <f7-panel right>
    <f7-view>
      <f7-page>
        <f7-navbar>
         
          <f7-nav-title>EncounterMe!</f7-nav-title>
          <f7-nav-right>
            <f7-link icon-f7="menu" panel-close="right"></f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-list no-hairlines class="no-margin-vertical" no-chevron>
          <f7-list-item view=".view-main" panel-close link="/" title="Список игр">
            <f7-icon slot="media" f7="layers_alt"></f7-icon>
          </f7-list-item>
          <f7-list-item view=".view-main" panel-close link="/profile/" title="Мой профиль">
            <f7-icon slot="media" f7="person"></f7-icon>
          </f7-list-item>
          <f7-list-item view=".view-main" panel-close link="/about/" title="О приложении">
            <f7-icon slot="media" f7="question_diamond"></f7-icon>
          </f7-list-item>
          <f7-list-item view=".view-main" panel-close link="/" @click="exit" title="Выйти из аккаунта">
            <f7-icon slot="media" f7="power"></f7-icon>
          </f7-list-item>
        </f7-list>
        <f7-toolbar bottom no-shadow>
          <f7-block-footer class="no-margin-vertical">v.1.0 &copy;EncounterMe!</f7-block-footer>
        </f7-toolbar>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/">
    <!-- Top Navbar -->
    <f7-navbar sliding>
      <f7-nav-left :back-link="$f7 && $f7.views.main.router.currentRoute.url !== '/'" back-link-force>
      
      <img src="/static/icons/EM.png" id="logo">
      </f7-nav-left>
      <f7-nav-title>EncounterMe!</f7-nav-title>
      <f7-nav-right>
        <f7-link icon-f7="menu" panel-open="right"></f7-link>
      </f7-nav-right>
    </f7-navbar>
  </f7-view>

  <f7-login-screen id="login-screen" :opened="needLogin">
    <f7-view>
      <f7-page name="login" login-screen>
        <f7-login-screen-title>Вход</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Пароль"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-block>
          <f7-button large fill @click="tryLogin">Войти</f7-button>
          <f7-block-footer>
            Ещё не создали аккаунт?<br><f7-link @click="needRegister = true">Зарегистрироваться</f7-link>
          </f7-block-footer>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-login-screen>

  <f7-login-screen id="register-screen" :opened="needRegister">
    <f7-view>
      <f7-page name="register" login-screen>
        <f7-login-screen-title>Регистрация</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Имя пользователя"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Пароль"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-block>
          <f7-button large fill @click="tryRegister">Зарегистрироваться</f7-button>
          <f7-block-footer>
            Уже есть аккаунт?<br><f7-link @click="needRegister = false">Войти</f7-link>
          </f7-block-footer>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-login-screen>

</f7-app>
</template>
<style lang="less" scoped>
  img{
        width: 100%;
  }.safe-areas .left{
    width: 10%;
    margin-left: 3%;
  }
  @media (max-width: 2560px){
    .safe-areas .left{
    width: 2%;
    margin-left: 1%;
    }
  }
  @media (max-width: 1440px){
    .safe-areas .left{
    width: 3%;
    margin-left: 1%;
    }
  }
  @media (max-width: 1024px){
    .safe-areas .left{
    width: 4%;
    margin-left: 1%;
    }
  }
  @media (max-width: 768px){
    .safe-areas .left{
    width: 5%;
    }
  }
  @media (max-width: 425px){
    .safe-areas .left{
    width: 10%;
    margin-left: 3%;
  }
  }
   @media (max-width: 320px){
    .safe-areas .left{
    width: 11%;
    margin-left: 4%;
  }
  }
  
</style>
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

        // Login screen data
        needLogin: true,
        needRegister: false,
        username: '',
        password: '',
        token:'',
        flag:false,
        
      }
    },
    
    methods: {
      exit(){
        localStorage.username = "";
        localStorage.password ="";
        localStorage.token= ""; 
        localStorage.user_uuid="";
        localStorage.uuid="";
        localStorage.namegame="";
        localStorage.startDate="";
        localStorage.maxPlayers="";
        localStorage.description="";
        localStorage.points="";
        localStorage.flag=false;
        this.flag=false;  
        this.username='';
        this.password='';
        this.token='';
        this.needLogin=true;
      },
      errorAlert(error){
          this.$f7.dialog.alert(error);
      },
      saveLocal(){
          localStorage.username = this.username;
          localStorage.password = this.password;
          localStorage.token= this.token; 
          localStorage.flag=true;
          
      },
      
      tryLogin() {
       
        if(this.username=='' ||  this.password==''){
            this.errorAlert("Одно из полей пустое");
        }else if(this.username.length<5 || this.password.length<5){
             this.errorAlert("Логин и пароль должны содержать как минимум 5 символов");
        }
        else{
        this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/login', {
          name: this.username,
          password: this.password
        }, (data) => {
          if (data.code) {
            this.errorAlert("Неверный логин или пароль");
            this.username='';
          this.password='';
          }else{
          this.token=data.user.token;
          localStorage.token=data.user.token;
          localStorage.user_uuid=data.profile.user_uuid;
          
          this.saveLocal();
          this.needLogin = false;
          } 
        },(error)=>{
          this.username='';
          this.password='';
          this.errorAlert("Неверный логин или пароль");
        });
        }
      },
      tryRegister() {
        if(this.username=='' ||  this.password==''){
          
          this.errorAlert("Одно из полей пустое");
        }else if(this.username.length<5 || this.password.length<5){
             this.errorAlert("Логин и пароль должны содержать как минимум 5 символов");
        }
        else{
         
          this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/register', {
          name: this.username,
          password : this.password
        }, (data) => {
          if (data.code) {
            
            return console.error(data.message);
          } 
          this.token=data.user.token;
          localStorage.user_uuid=data.profile.user_uuid;
          this.saveLocal();
          this.needRegister = false;
          this.needLogin = false;
        },(error)=>{
          this.username='';
          this.password='';
          this.errorAlert("Не возможно зарегистрироваться");
        });
         
          }
       
      }
    },
    mounted() {
      this.$f7ready((f7) => {
      document.getElementById("logo").style.display="none";
        
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
        
        if(localStorage.username !='' && localStorage.password !='' && localStorage.token!='' && localStorage.flag){
          this.$f7.request.postJSON('https://app.seon.cloud/hiddencodes/v1.0/login', {
            name:localStorage.username,
            password:localStorage.password
          }, (data) => {
          if (data.code) {
           this.errorAlert("Войдите заново");
           this.needLogin=true;
          }
          localStorage.user_uuid=data.profile.user_uuid;
          localStorage.uuid=data.profile.uuid;
          localStorage.token=data.user.token;
          this.token=data.user.token;
          this.needRegister = false;
          this.needLogin = false;
         
          console.log(data.user.token);
          
          
        },(error)=>{
          if (data.code) {
           this.errorAlert("Войдите заново");
           this.needLogin=true;
          }
        });
          
      localStorage.namegame="";
      localStorage.startDate="";
      localStorage.maxPlayers="";
      localStorage.description="";
      localStorage.points="";
         
        }
      });
    }
  }
</script>
