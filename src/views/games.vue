<script setup>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
<body>
    
    <main>
        <h2>Oyunlar Bölümü</h2>
   <h4>Oyununu Seç</h4>
<div class="a">

    <img src="../assets/resim1.png" width="80" alt="">

   <div class="gamesLink">
    <a href="/adamAsmaca" class="gameLink">Adam Asmaca</a>
    <a href="/kelimeOyunu" class="gameLink">Kelime Oyunu</a>
    <img class="gameImg2" src="../assets/resim1.png" width="80" alt="">

   </div>
</div>
   
</main>

<div class="showPoints">
      <div class="game1">
     
         <h3>Kelime Oyunu  Sıralama</h3>
         <div class="table">
            <div class="rowH">
               <h4>Ad</h4>
               <h4>Puan</h4>

            </div>
            <div class="row" v-for="(item,index) in siralanmisDiziK">
            

               <h4 class="name">   <p v-if="index == 0">
                  <i class="fa-sharp fa-solid fa-crown"></i>
               </p> {{item.name}} </h4>
               <h4>{{item.point}}</h4>


            </div>
         </div>
      </div>
   </div>
</body>
   </template>
   <script>
export default{
   data(){
      return{
         nameK:"",
         pointK:0,
         diziK:[]
      }
   },
   computed: {
      siralanmisDiziK() {
         return this.diziK.sort((a, b) => {
            // Puan değerlerine göre sıralama
            if (b.point !== a.point) {
               return b.point - a.point;
            }
            // Puanlar eşitse alfabetik sıralama
            return a.name.localeCompare(b.name);
         });
      }
   },
   created(){
      axios.get("https://sunduzgamepuan-default-rtdb.firebaseio.com/data.json")
      .then(
         response=>{
            for (let key in response.data) {
              var a = response.data[key]
              this.diziK.push(a)

            }
         }

      )

   },
   methods:{
      goster(){
      console.log(this.siralanmisDiziK);
   }
   
   }

}
</script>
