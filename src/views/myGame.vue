<template>
   <div>
     <main>
       <h2>Oyunlar Bölümü</h2>
       <h4>Oyununu Seç</h4>
       <div class="a">
         <img src="../assets/resim1.png" width="80" alt="">
         <div class="gamesLink">
           <RouterLink to="/adamAsmaca" class="gameLink">Adam Asmaca</RouterLink>
           <RouterLink to="/kelimeOyunu" class="gameLink">Kelime Oyunu</RouterLink>
           <img class="gameImg2" src="../assets/resim1.png" width="80" alt="">
         </div>
       </div>
     </main>
 
     <div class="showPoints">
       <div class="game1">
         <h3>Kelime Oyunu Sıralama</h3>
         <div class="table">
           <div class="rowH">
             <h4>Ad</h4>
             <h4>Puan</h4>
           </div>
           <div class="row" v-for="(item, index) in top10DiziK" :key="index">
             <div>
               <h4 class="name">
                 <p v-if="index === 0">
                   <i class="fa-sharp fa-solid fa-crown"></i>
                 </p>
                 {{ item.name }}
               </h4>
               <h4>{{ item.point }}</h4>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 <script setup>
 import { ref, computed, onMounted } from 'vue';
 import axios from 'axios';
 import { RouterLink, RouterView } from 'vue-router';
 
 // Reaktif veri tanımlama
 const diziK = ref([]);
 
 // Sıralama işlemi için computed kullanma
 const siralanmisDiziK = computed(() => {
   return [...diziK.value].sort((a, b) => {
     if (b.point !== a.point) {
       return b.point - a.point;
     }
     return a.name.localeCompare(b.name);
   });
 });
 
 // İlk 10 öğeyi almak için ayrı bir computed property
 const top10DiziK = computed(() => siralanmisDiziK.value.slice(0, 10));
 
 // Veri çekme işlemi (created hook yerine onMounted kullanıyoruz)
 onMounted(() => {
   axios.get("https://sunduzgamepuan-default-rtdb.firebaseio.com/data.json")
     .then(response => {
       for (let key in response.data) {
         diziK.value.push(response.data[key]);
       }
     });
 });
 
 // Örnek method
 function goster() {
   console.log(top10DiziK.value);
 }
 </script>
  