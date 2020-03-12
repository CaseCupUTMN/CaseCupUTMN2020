<template>
<f7-app :params="f7params" class="color-theme-teal">
  <f7-panel right>
    <f7-view>
      <f7-page>
        <f7-navbar>
          <f7-nav-title>Квест "Hidden Codes"</f7-nav-title>
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
        </f7-list>
        <f7-toolbar bottom no-shadow>
          <f7-block-footer class="no-margin-vertical">v.0.0.1. &copy;SEON Cloud</f7-block-footer>
        </f7-toolbar>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/">
    <!-- Top Navbar -->
    <f7-navbar sliding>
      <f7-nav-left :back-link="$f7 && $f7.views.main.router.currentRoute.url !== '/'" back-link-force>
      </f7-nav-left>
      <f7-nav-title>Квест "Hidden Codes"</f7-nav-title>
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
      saveLocal(){
          localStorage.username = this.username;
          localStorage.password = this.password;
          localStorage.token= this.token; 
          localStorage.flag=true;
      },
      
      tryLogin() {
       
        if(this.username=='' ||  this.password==''){
          this.$f7.dialog.alert("Одно из полей пустое");
        }
        else{
        this.$f7.request.postJSON('http://localhost:5000/users/login', {
          name: this.username,
          password: this.password
        }, (data) => {
          if (data.error) {
            return console.error(data.error);
          } 
          this.token='1';//=data.token;
          this.saveLocal();
          this.needLogin = false;
        });
        }
      },
      tryRegister() {
        if(this.username=='' ||  this.password==''){
          //Тут будет код для вывода ошибки
          
          this.$f7.dialog.alert("Одно из полей пустое");
        }
        else{
         /* this.$f7.request.postJSON('http://localhost:5000/users/register', {
          name: this.username,
          password: this.password
        }, (data) => {
          if (data.error) {
            return console.error(data.error);
          } 
          this.token='1';//=data.token;
          saveLocal();
          this.needRegister = false;
           this.needLogin = false;
        });*/
         this.token='1';//=data.token;
          this.saveLocal();
          this.needRegister = false;
           this.needLogin = false;
          }
       
      }
    },
    mounted() {
      this.$f7ready((f7) => {
       
        // Init cordova APIs (see cordova-app.js)
        if (Device.cordova) {
          cordovaApp.init(f7);
        }
        // Call F7 APIs here
        
        if(localStorage.username !='' && localStorage.password !='' && localStorage.token!='' && localStorage.flag){
          this.needRegister = false;
          this.needLogin = false;
         
        }
      });
    }
  }
</script>
