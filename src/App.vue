<template>
  <div id="app" :style="GetWindowHeight">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      GetWindowHeight: {
        height: ''
      }
    }
  },
  created () {
    window.addEventListener('resize', this.getHeight)
    this.getHeight() 
  },
  destroyed () {
    window.removeEventListener('resize', this.getHeight)
  }, 
  methods: {
    getHeight () {
      this.GetWindowHeight.height = window.innerHeight -20 + 'px'
    }
  }
}
</script>

<style>
</style>
