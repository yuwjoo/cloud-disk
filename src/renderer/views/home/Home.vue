<template>
  <div class="home">
    <div class="home__card-wrap">
      <TiltCard
        class="home__card"
        bg="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg"
      >
        <template v-slot:default>
          <h1>SYY</h1>
        </template>
      </TiltCard>
      <TiltCard
        class="home__card"
        bg="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg"
      >
        <template v-slot:default>
          <h1>BDY</h1>
        </template>
      </TiltCard>
      <TiltCard
        class="home__card"
        bg="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg"
      >
        <template v-slot:default>
          <h1>LZY</h1>
        </template>
      </TiltCard>
    </div>
  </div>
</template>

<script setup lang="ts" name="HomeView">
import TiltCard from './components/tiltCard/TiltCard.vue';
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .home__card-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .home__card {
    margin: 0 40px;
  }
}
</style>
