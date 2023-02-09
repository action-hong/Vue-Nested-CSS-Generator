<script>
export default {
  data() {
    return {
      items: [],
      flag: false,
    }
  },
}
const flag = false
</script>

<template>
  <div class="container">
    <header v-if="flag" class="title">
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </header>
    <main v-else>
      <Transition>
        <KeepAlive>
          <p>
            <button class="btn">
              hello
            </button>
          </p>
        </KeepAlive>
      </Transition>
    </main>
  </div>
</template>
