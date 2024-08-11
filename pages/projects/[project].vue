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
      <h2>Link</h2>
      <a :href="project.link" target="_blank">{{ project.title }}</a>
    </div>

    <div class="right-side">
      <img v-for="(img, index) in project.images" :src="img" :key="index" alt="Project Image" @click="openModal(img, index)">
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <Button v-if="currentIndex > 0" @click="prevImage" class="nav-arrow left-arrow">
          <template #prepend>
            <MdiIcon icon="mdiArrowLeft" />
          </template>
        </Button>
        <img :src="selectedImage" alt="Project Image Enlarged">
        <Button v-if="currentIndex < project.images.length - 1" @click="nextImage" class="nav-arrow right-arrow">
          <template #prepend>
            <MdiIcon icon="mdiArrowRight" />
          </template>
        </Button>
      </div>
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
    link: '',
    images: [''],
});

const isModalOpen = ref(false);
const selectedImage = ref('');
const currentIndex = ref(0);

const openModal = (img, index) => {
  selectedImage.value = img;
  currentIndex.value = index;
  isModalOpen.value = true;
}

const closeModal = () => {
  isModalOpen.value = false;
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    selectedImage.value = project.value.images[currentIndex.value];
  }
}

const nextImage = () => {
  if (currentIndex.value < project.value.images.length - 1) {
    currentIndex.value++;
    selectedImage.value = project.value.images[currentIndex.value];
  }
}

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
        tecnologies: ['Unreal Engine'],
        os: ['Windows'],
        link: 'https://lucasschermak.itch.io/avidadeumgato',
        images: ['/img/games/a_vida_de_um_gato.png', '/img/games/a_vida_de_um_gato_2.png', '/img/games/a_vida_de_um_gato_3.png', '/img/games/a_vida_de_um_gato_4.png'],
    },
    {
        title: 'Anxiety Wires',
        code: 'anxiety_wires',
        tecnologies: ['Unity Engine', 'C#'],
        os: ['Windows'],
        link: 'https://pinkstrenhi.itch.io/anxiety-wires',
        images: ['/img/games/anxiety_wires.png', '/img/games/anxiety_wires_2.png', '/img/games/anxiety_wires_3.png', '/img/games/anxiety_wires_4.png'],
    },
    {
        title: 'Sweets vs Salts',
        code: 'sweets_vs_salts',
        tecnologies: ['Unity Engine', 'C#'],
        os: ['Windows', 'Android'],
        link: 'https://dunke.itch.io/sweetsxsalts',
        images: ['/img/games/sweets_vs_salts.png', '/img/games/sweets_vs_salts_2.png', '/img/games/sweets_vs_salts_3.png', '/img/games/sweets_vs_salts_4.png'],
    },
    {
        title: 'RPG²',
        code: 'rpg_ao_quadrado',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://lamers.itch.io/rpgaoquadrado',
        images: ['/img/games/rpg_ao_quadrado.png', '/img/games/rpg_ao_quadrado_2.png', '/img/games/rpg_ao_quadrado_3.png', '/img/games/rpg_ao_quadrado_4.png'],
    },
    {
        title: 'Memories of a Forgotten Time',
        code: 'memories_of_a_forgotten_time',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://dunke.itch.io/memories',
        images: ['/img/games/memories_of_a_forgotten_time.png', '/img/games/memories_of_a_forgotten_time_2.png', '/img/games/memories_of_a_forgotten_time_3.png', '/img/games/memories_of_a_forgotten_time_4.png'],
    },
    {
        title: 'Furious Fists',
        code: 'furious_fists',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://dunke.itch.io/furious-fists',
        images: ['/img/games/furious_fists.png', '/img/games/furious_fists_2.png', '/img/games/furious_fists_3.png', '/img/games/furious_fists_4.png'],
    },
    {
        title: 'Remember',
        code: 'remember',
        tecnologies: ["Ren'Py", 'Python'],
        os: ['Windows', 'MacOS'],
        link: 'https://dunke.itch.io/remember',
        images: ['/img/games/remember.png', '/img/games/remember_2.png', '/img/games/remember_3.png', '/img/games/remember_4.png'],
    },
    {
        title: 'Capture the Flags',
        code: 'capture_the_flags',
        tecnologies: ['Construct 2'],
        os: ['Web', 'Android'],
        link: 'https://lamers.itch.io/capture-the-flags',
        images: ['/img/games/capture_the_flags.png', '/img/games/capture_the_flags_2.png', '/img/games/capture_the_flags_3.png', '/img/games/capture_the_flags_4.png'],
    },
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
  width: 50%;
  border-radius: 4px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(2, minmax(50%, 1fr));
  grid-template-rows: repeat(2, minmax(50%, 1fr));
  gap: 10px;
}

.right-side img {
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: #4ADE80;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  width: auto;
  max-width: 80%;
  background: #333;
  padding: 4px;
  border-radius: 8px;
  position: relative;
  display: flex;
  justify-content: center;
}

.modal-content img {
  width: auto;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 4px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2em;
  color: whitesmoke;
  background: none;
  border: none;
  cursor: pointer;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>
