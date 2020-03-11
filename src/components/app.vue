<template>
<f7-app :params="f7params" >
   <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="EncouterMe"></f7-navbar>
        <f7-block>
           <f7-list>
  
     
      
   
    </f7-list>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>

  <f7-login-screen id="login-screen" theme-dark :opened="loginScreenOpened">
    <!--<f7-view>
      <f7-page login-screen>
       
        <f7-login-screen-title>Вход</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            placeholder="Имя пользователя или почта"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
         placeholder="Пароль"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-button fill @click="alertLoginData">Войти</f7-button>
          <f7-block-footer>
          Еще не создали аккаунт?<br><f7-button @click="viewOpen('#register-screen')">Зарегистрироваться</f7-button>
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>-->
    <f7-view id="login-screen"  url="/login/"></f7-view>
  </f7-login-screen>

  <f7-login-screen id="register-screen" theme-dark >
   <!-- <f7-view>
      <f7-page login-screen >
     
        <f7-login-screen-title>Регистрация</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
          placeholder="Имя пользователя или почта"
            
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
           placeholder="Пароль"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-button fill @click="alertRegisterData()">Зарегистрироваться</f7-button>
          <f7-block-footer>
            Уже есть аккаунт?<f7-button @click="viewOpen('#login-screen')">Войти</f7-button>
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>-->
    <f7-view id="register-screen" url="/register/"></f7-view>
  </f7-login-screen>
 <!-- Views/Tabs container -->
  <f7-views tabs class="safe-areas" theme-dark>
    <!-- Tabbar for switching views-tabs -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#view-home"  icon-ios="f7:person_crop_circle_badge_checkmark" icon-aurora="f7:person_crop_circle_badge_checkmark" icon-md="f7:person_crop_circle_badge_checkmark" text="Я участник"></f7-link>
      <f7-link tab-link="#allgames" icon-ios="f7:square_stack_3d_up" icon-aurora="f7:square_stack_3d_up" icon-md="f7:square_stack_3d_up" text="Все игры"></f7-link>
      
    </f7-toolbar>

    <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
    <f7-view id="view-home" main tab tab-active url="/"></f7-view>

    <!-- Catalog View -->
    <f7-view id="allgames" name="Все игры" tab url="/allgames/"></f7-view>

    

  </f7-views>

</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'EncounterMe!', // App name
          theme: 'auto', // Automatic theme detection


          // App routes
          routes: routes,
        },
        loginScreenOpened:true,
        // Login screen data
       
      }
    },
    mounted() {
    if (localStorage.username!='' && localStorage.password!='' && localStorage.flag) {
      this.username = localStorage.username;
       this.password = localStorage.password;
        this.$f7.loginScreen.close("#login-screen");
        this.$f7.loginScreen.close("#register-screen");
    }
    
  },
 
    
    mounted() {
      this.$f7ready((f7) => {
        if(localStorage.username!='' && localStorage.password!='' && localStorage.flag){
          this.$f7.loginScreen.close("#login-screen");
        this.$f7.loginScreen.close("#register-screen");
        }
        // Call F7 APIs here
      });
    }
  }
</script>
