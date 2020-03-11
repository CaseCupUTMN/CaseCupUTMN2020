<template>
   <!-- <f7-login-screen id="login-screen" theme-dark :opened="loginScreenOpened">
    <f7-view>-->
        
      <f7-page name="singup" theme-dark login-screen id="register-screen" >
     
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
        //loginScreenOpened:true,
        // Login screen data
        username: '',
        password: '',
        flag:false,
        list_username: [],
        list_password: [],
      }
    },
   
 
    methods: {
      persist() {
      localStorage.username = this.username;
      localStorage.password = this.password;
      localStorage.flag=this.flag;
    },
     signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
          router.back();
        });
      },
      viewOpen(str){ 
        
          this.$f7.loginScreen.close("#register-screen",false);
       this.$f7.loginScreen.open(str,false);
        
        
     
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
              this.flag=false;
               this.$f7.dialog.alert('Пользователь с ником '+this.username+' уже есть');
               break;
            }
          }
          if(!error){
            this.list_username.push(this.username);
            this.list_password.push(this.password);
             this.flag=true;
               this.$f7.dialog.alert('Вы успешно зарегистрировались Ваши данные <br>Username: ' + this.username + '<br>Password: ' + this.password, () => {
                this.persist();
                this.$f7.loginScreen.close();
                });
          }
          }else{
            this.list_username.push(this.username);
            this.list_password.push(this.password);
            this.flag=true;
            
             this.$f7.dialog.alert('Вы успешно зарегистрировались Ваши данные <br>Username: ' + this.username + '<br>Password: ' + this.password, () => {
               this.persist();
               this.$f7.loginScreen.close();
                });
        }
        }
      }
       
      

    },
    mounted() {
      this.$f7ready((f7) => {
        /*if(localStorage.username!='' && localStorage.password!='' && localStorage.flag){
          this.$f7.loginScreen.close("#login-screen");
        this.$f7.loginScreen.close("#register-screen");
        }*/
        // Call F7 APIs here
      });
    }
  }
</script>

