<template>
  <main>
    <div class="left-side">
      <h1>{{ project.title }}</h1>
      <h2>{{ $t('tecnologies') }}</h2>
      <ul>
        <li v-for="tecnology in project.tecnologies" :key="tecnology">
          {{ tecnology }}
        </li>
      </ul>
      <h2>{{ $t('os') }}</h2>
      <ul>
        <li v-for="os in project.os" :key="os">
          <MdiIcon icon="mdiAndroid" v-if="os === 'Android'" />
          <MdiIcon icon="mdiMicrosoftWindows" v-if="os === 'Windows'" />
          <MdiIcon icon="mdiLinux" v-if="os === 'Linux'" />
          <MdiIcon icon="mdiApple" v-if="os === 'MacOS'" />
          <MdiIcon icon="mdiWeb" v-if="os === 'Web'" />
          {{ os }}
        </li>
      </ul>
    </div>
    <div class="right-side">
      <img :src="project.image" alt="Project Image">
    </div>
  </main>
</template>

<script setup>
const route = useRoute();

const project = ref({
    title: '',
    code: '',
    tecnologies: [],
    os: [],
    image: '',
});

const getProject = () => {
    project.value = projectList.find((project) => project.code === route.params.project);
}

onMounted(() => {
    getProject();
})

const projectList = [
    {
        title: 'A Vida de um Gato',
        code: 'a_vida_de_um_gato',
        tecnologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
        os: ['Windows'],
        image: '/img/games/a_vida_de_um_gato.png',
    }
]
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 50vw;
  height: 80vh;
  gap: 20px;
}

.left-side {
  width: 40%;
  padding: 20px;
  color: whitesmoke;
  background-color: #333;
  border-radius: 4px;
}

.left-side h1 {
  margin: 0;
  font-size: 2em;
}

.left-side h2 {
  margin: 10px 0;
  font-size: 1.5em;
  color: #ccc; /* Um tom de cinza mais escuro */
}

.left-side ul {
  list-style: none;
  padding: 0;
}

.left-side li {
  margin: 5px 0;
}

.right-side {
  width: 40%;
  height: 50%;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  border-radius: 4px;
}

.right-side img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
}
</style>
