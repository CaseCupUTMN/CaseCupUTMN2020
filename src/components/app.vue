<template>
<f7-app :params="f7params" >

  <!-- Left panel with cover effect-->
  <f7-panel left cover theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Left Panel"></f7-navbar>
        <f7-block>Left panel content goes here</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Right panel with reveal effect-->
  <f7-panel right reveal theme-dark>
    <f7-view>
      <f7-page>
        <f7-navbar title="Right Panel"></f7-navbar>
        <f7-block>Right panel content goes here</f7-block>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>


  <!-- Popup -->
  <f7-popup id="my-popup">
    <f7-view>
      <f7-page>
        <f7-navbar title="Popup">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Popup content goes here.</p>
        </f7-block>
      </f7-page>
    </f7-view>
  </f7-popup>
<!--:opened="loginScreenOpened" @loginscreen:opened="loginScreenOpened = true"-->
 <f7-login-screen id="login-screen" theme-dark >
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Login</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign In" @click="alertLoginData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
  <f7-login-screen id="register-screen" theme-dark>
    <f7-view>
      <f7-page login-screen>
        <f7-login-screen-title>Register</f7-login-screen-title>
        <f7-list form>
          <f7-list-input
            type="text"
            name="username"
            placeholder="Your username"
            
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            type="password"
            name="password"
            placeholder="Your password"
            
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <f7-list>
          <f7-list-button title="Sign Up" @click="alertRegisterData"></f7-list-button>
          <f7-block-footer>
            Some text about login information.<br>Click "Sign In" to close Login Screen
          </f7-block-footer>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-login-screen>
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
        username: '',
        password: '',
        list_username: [],
        list_password: [],
      }
    },
    methods: {
      alertLoginData() {
        let error=true;
      
        if(this.username=='' ||  this.password==''){
          //Тут будет код для вывода ошибки
          this.$f7.dialog.alert("Одно из полей пустое");
        }
        if(this.username && this.password){
          
          if(this.list_username.length!=0){
          for(let i=0;i<this.list_username.length;i++){
            if(this.username==this.list_username[i]){
              if(this.password==this.list_password[i]){
                error=false;
                this.$f7.dialog.alert('Вы успешно вошли', () => {
                   this.$f7.loginScreen.close();
                    });
              }else{
                 this.$f7.dialog.alert('Не верный пароль');
              }
            }
          }
          if(error){
            this.$f7.dialog.alert('Не верный логин или пароль');
          }
          }else{
           
             this.$f7.dialog.alert('База данных пуста Зарегистрируйтесь', () => {
         
              this.$f7.loginScreen.close();
        });
        }
        }
       
      },
      alertRegisterData() {
        let error=false;
        if(this.username=='' ||  this.password==''){
          //Тут будет код для вывода ошибки
          this.$f7.dialog.alert("Одно из полей пустое");
        }
      if(this.username && this.password){
          if(this.list_username.length!=0){
          for(let i=0;i<this.list_username.length;i++){
            if(this.username==this.list_username[i]){
              //Вывести о том что такой пользователь есть
              error=true;
              
               this.$f7.dialog.alert('Пользователь с ником '+this.username+' уже есть');
               break;
            }
          }
          if(!error){
            this.list_username.push(this.username);
            this.list_password.push(this.password);
               this.$f7.dialog.alert('Вы успешно зарегистрировались Ваши данные <br>Username: ' + this.username + '<br>Password: ' + this.password, () => {
                this.$f7.loginScreen.close();
                });
          }
          }else{
            this.list_username.push(this.username);
            this.list_password.push(this.password);
             this.$f7.dialog.alert('Вы успешно зарегистрировались Ваши данные <br>Username: ' + this.username + '<br>Password: ' + this.password, () => {
                this.$f7.loginScreen.close();
                });
        }
        }
      }
    },
    mounted() {
      this.$f7ready((f7) => {
        
        // Call F7 APIs here
      });
    }
  }
</script>