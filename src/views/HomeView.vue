<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>
<template>
 <section class="intro">
    <div class="video-container">
        <video src="../assets/video1.mp4" autoplay loop playsinline muted></video>
    </div>
    <div class="content">
        <h1>Okurun Köşesine Hoşgeldiniz</h1>
        <h4>Edebiyatla İlgili Etkinlikler Ve Oyunlar</h4>
        <a href="/games" class="read-more">Git!</a>
    </div>  
</section>

</template>
