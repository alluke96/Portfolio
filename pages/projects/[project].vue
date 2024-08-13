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
      <a v-if="project.link" :href="project.link" target="_blank">{{ project.title }}</a>
      <p v-else>{{ $t('no_link') }}</p>
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

    <Button v-if="hasPreviousProject" @click="navigateToPreviousProject" class="nav-project left">
      <template #prepend>
        <MdiIcon icon="mdiArrowLeft" />
      </template>
    </Button>
    <Button v-if="hasNextProject" @click="navigateToNextProject" class="nav-project right">
      <template #prepend>
        <MdiIcon icon="mdiArrowRight" />
      </template>
    </Button>
  </main>
</template>


<script setup>
const route = useRoute();
const { t, locale } = useI18n();

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

const hasPreviousProject = computed(() => {
  const currentCategory = project.value.category;
  const categoryProjects = projectList.filter(p => p.category === currentCategory);
  return categoryProjects.findIndex(p => p.code === route.params.project) > 0;
});

const hasNextProject = computed(() => {
  const currentCategory = project.value.category;
  const categoryProjects = projectList.filter(p => p.category === currentCategory);
  return categoryProjects.findIndex(p => p.code === route.params.project) < categoryProjects.length - 1;
});

const navigateToPreviousProject = () => {
  const currentCategory = project.value.category;
  const categoryProjects = projectList.filter(p => p.category === currentCategory);
  const currentIndex = categoryProjects.findIndex(p => p.code === route.params.project);
  if (currentIndex > 0) {
    openProject(categoryProjects[currentIndex - 1].code);
  }
};

const navigateToNextProject = () => {
  const currentCategory = project.value.category;
  const categoryProjects = projectList.filter(p => p.category === currentCategory);
  const currentIndex = categoryProjects.findIndex(p => p.code === route.params.project);
  if (currentIndex < categoryProjects.length - 1) {
    openProject(categoryProjects[currentIndex + 1].code);
  }
};

const openProject = (project_code) => {
    navigateTo(`/${locale.value}/projects/${project_code}`);
}

const projectList = [
    // Games
    {
        category: 'Games',
        title: 'A Vida de um Gato',
        code: 'a_vida_de_um_gato',
        tecnologies: ['Unreal Engine'],
        os: ['Windows'],
        link: 'https://lucasschermak.itch.io/avidadeumgato',
        images: ['/img/games/a_vida_de_um_gato.png', '/img/games/a_vida_de_um_gato_2.png', '/img/games/a_vida_de_um_gato_3.png', '/img/games/a_vida_de_um_gato_4.png'],
    },
    {
        category: 'Games',
        title: 'Anxiety Wires',
        code: 'anxiety_wires',
        tecnologies: ['Unity Engine', 'C#'],
        os: ['Windows'],
        link: 'https://pinkstrenhi.itch.io/anxiety-wires',
        images: ['/img/games/anxiety_wires.png', '/img/games/anxiety_wires_2.png', '/img/games/anxiety_wires_3.png', '/img/games/anxiety_wires_4.png'],
    },
    {
        category: 'Games',
        title: 'Sweets vs Salts',
        code: 'sweets_vs_salts',
        tecnologies: ['Unity Engine', 'C#'],
        os: ['Windows', 'Android'],
        link: 'https://dunke.itch.io/sweetsxsalts',
        images: ['/img/games/sweets_vs_salts.png', '/img/games/sweets_vs_salts_2.png', '/img/games/sweets_vs_salts_3.png', '/img/games/sweets_vs_salts_4.png'],
    },
    {
        category: 'Games',
        title: 'RPG²',
        code: 'rpg_ao_quadrado',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://lamers.itch.io/rpgaoquadrado',
        images: ['/img/games/rpg_ao_quadrado.png', '/img/games/rpg_ao_quadrado_2.png', '/img/games/rpg_ao_quadrado_3.png', '/img/games/rpg_ao_quadrado_4.png'],
    },
    {
        category: 'Games',
        title: 'Memories of a Forgotten Time',
        code: 'memories_of_a_forgotten_time',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://dunke.itch.io/memories',
        images: ['/img/games/memories_of_a_forgotten_time.png', '/img/games/memories_of_a_forgotten_time_2.png', '/img/games/memories_of_a_forgotten_time_3.png', '/img/games/memories_of_a_forgotten_time_4.png'],
    },
    {
        category: 'Games',
        title: 'Furious Fists',
        code: 'furious_fists',
        tecnologies: ['Construct 2'],
        os: ['Web'],
        link: 'https://dunke.itch.io/furious-fists',
        images: ['/img/games/furious_fists.png', '/img/games/furious_fists_2.png', '/img/games/furious_fists_3.png', '/img/games/furious_fists_4.png'],
    },
    {
        category: 'Games',
        title: 'Remember',
        code: 'remember',
        tecnologies: ["Ren'Py", 'Python'],
        os: ['Windows', 'MacOS'],
        link: 'https://dunke.itch.io/remember',
        images: ['/img/games/remember.png', '/img/games/remember_2.png', '/img/games/remember_3.png', '/img/games/remember_4.png'],
    },
    {
        category: 'Games',
        title: 'Capture the Flags',
        code: 'capture_the_flags',
        tecnologies: ['Construct 2'],
        os: ['Web', 'Android'],
        link: 'https://lamers.itch.io/capture-the-flags',
        images: ['/img/games/capture_the_flags.png', '/img/games/capture_the_flags_2.png', '/img/games/capture_the_flags_3.png', '/img/games/capture_the_flags_4.png'],
    },

    // Apps
    {
        category: 'Apps',
        title: 'Arte sem limites',
        code: 'arte_sem_limites',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.arte_sem_limites',
        images: ['/img/apps/arte_sem_limites.png', '/img/apps/arte_sem_limites_2.png', '/img/apps/arte_sem_limites_3.png', '/img/apps/arte_sem_limites_4.png'],
    },
    {
        category: 'Apps',
        title: 'Atitudes do dia a dia',
        code: 'atitudes_do_dia_a_dia',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.atitudes_do_dia_a_dia',
        images: ['/img/apps/atitudes_do_dia_a_dia.png', '/img/apps/atitudes_do_dia_a_dia_2.png', '/img/apps/atitudes_do_dia_a_dia_3.png', '/img/apps/atitudes_do_dia_a_dia_4.png'],
    },
    {
        category: 'Apps',
        title: 'Aventura Criativa',
        code: 'aventura_criativa',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.story_choices_multi_game',
        images: ['/img/apps/aventura_criativa.png', '/img/apps/aventura_criativa_2.png', '/img/apps/aventura_criativa_3.png', '/img/apps/aventura_criativa_4.png'],
    },
    {
        category: 'Apps',
        title: 'CiêncIA da Natureza',
        code: 'ciencia_da_natureza',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_botany',
        images: ['/img/apps/ciencia_da_natureza.png', '/img/apps/ciencia_da_natureza_2.png', '/img/apps/ciencia_da_natureza_3.png', '/img/apps/ciencia_da_natureza_4.png'],
    },
    {
        category: 'Apps',
        title: 'ColorIA',
        code: 'coloria',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.draw',
        images: ['/img/apps/coloria.png', '/img/apps/coloria_2.png', '/img/apps/coloria_3.png', '/img/apps/coloria_4.png'],
    },
    {
        category: 'Apps',
        title: 'Conexão de números',
        code: 'conexao_de_numeros',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.conexao_de_numeros_numeros_cadentes',
        images: ['/img/apps/conexao_de_numeros.png', '/img/apps/conexao_de_numeros_2.png', '/img/apps/conexao_de_numeros_3.png', '/img/apps/conexao_de_numeros_4.png'],
    },
    {
        category: 'Apps',
        title: 'CrIAtiva Cores',
        code: 'criativa_cores',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.color',
        images: ['/img/apps/criativa_cores.png', '/img/apps/criativa_cores_2.png', '/img/apps/criativa_cores_3.png', '/img/apps/criativa_cores_4.png'],
    },
    {
        category: 'Apps',
        title: 'DesafIA Quebra-Cabeças',
        code: 'desafia_quebra_cabecas',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.puzzle',
        images: ['/img/apps/desafia_quebra_cabecas.png', '/img/apps/desafia_quebra_cabecas_2.png', '/img/apps/desafia_quebra_cabecas_3.png', '/img/apps/desafia_quebra_cabecas_4.png'],
    },
    {
        category: 'Apps',
        title: 'DesafIA Quiz',
        code: 'desafia_quiz',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.ai_desafia_quiz',
        images: ['/img/apps/desafia_quiz.png', '/img/apps/desafia_quiz_2.png', '/img/apps/desafia_quiz_3.png', '/img/apps/desafia_quiz_4.png'],
    },
    {
        category: 'Apps',
        title: 'DinomagIA',
        code: 'dinomagia',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.curiosity_dinos',
        images: ['/img/apps/dinomagia.png', '/img/apps/dinomagia_2.png', '/img/apps/dinomagia_3.png', '/img/apps/dinomagia_4.png'],
    },
    {
        category: 'Apps',
        title: 'Eco Lixo',
        code: 'eco_lixo',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.eco_lixo',
        images: ['/img/apps/eco_lixo.png', '/img/apps/eco_lixo_2.png', '/img/apps/eco_lixo_3.png', '/img/apps/eco_lixo_4.png'],
    },
    {
        category: 'Apps',
        title: 'Emoção Expressa',
        code: 'emocao_expressa',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.emocao_expressa_jogo_expressoes',
        images: ['/img/apps/emocao_expressa.png', '/img/apps/emocao_expressa_2.png', '/img/apps/emocao_expressa_3.png', '/img/apps/emocao_expressa_4.png'],
    },
    {
        category: 'Apps',
        title: 'Encaixando os números',
        code: 'encaixando_os_numeros',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.encaixando_os_numeros',
        images: ['/img/apps/encaixando_os_numeros.png', '/img/apps/encaixando_os_numeros_2.png', '/img/apps/encaixando_os_numeros_3.png', '/img/apps/encaixando_os_numeros_4.png'],
    },
    {
        category: 'Apps',
        title: 'HistórIA',
        code: 'historia',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.historIA',
        images: ['/img/apps/historia.png', '/img/apps/historia_2.png', '/img/apps/historia_3.png', '/img/apps/historia_4.png'],
    },
    {
        category: 'Apps',
        title: 'Jornada EspacIAl',
        code: 'jornada_espacial',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.curiosity_space',
        images: ['/img/apps/jornada_espacial.png', '/img/apps/jornada_espacial_2.png', '/img/apps/jornada_espacial_3.png', '/img/apps/jornada_espacial_4.png'],
    },
    {
        category: 'Apps',
        title: 'Juntando Emoções',
        code: 'juntando_emocoes',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.juntando_emocoes',
        images: ['/img/apps/juntando_emocoes.png', '/img/apps/juntando_emocoes_2.png', '/img/apps/juntando_emocoes_3.png', '/img/apps/juntando_emocoes_4.png'],
    },
    {
        category: 'Apps',
        title: 'Junte os Direitos',
        code: 'junte_os_direitos',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.junte_os_direitos',
        images: ['/img/apps/junte_os_direitos.png', '/img/apps/junte_os_direitos_2.png', '/img/apps/junte_os_direitos_3.png', '/img/apps/junte_os_direitos_4.png'],
    },
    {
        category: 'Apps',
        title: 'Letra a Letra',
        code: 'letra_a_letra',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.letra_a_letra',
        images: ['/img/apps/letra_a_letra.png', '/img/apps/letra_a_letra_2.png', '/img/apps/letra_a_letra_3.png', '/img/apps/letra_a_letra_4.png'],
    },
    {
        category: 'Apps',
        title: 'Letrix',
        code: 'letrix',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.letrix',
        images: ['/img/apps/letrix.png', '/img/apps/letrix_2.png', '/img/apps/letrix_3.png', '/img/apps/letrix_4.png'],
    },
    {
        category: 'Apps',
        title: 'MemoLetras',
        code: 'memoletras',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.memoletras',
        images: ['/img/apps/memoletras.png', '/img/apps/memoletras_2.png', '/img/apps/memoletras_3.png', '/img/apps/memoletras_4.png'],
    },
    {
        category: 'Apps',
        title: 'Memorizando Coleta Seletiva',
        code: 'memorizando_coleta_seletiva',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.memorizando_coleta_seletiva',
        images: ['/img/apps/memorizando_coleta_seletiva.png', '/img/apps/memorizando_coleta_seletiva_2.png', '/img/apps/memorizando_coleta_seletiva_3.png', '/img/apps/memorizando_coleta_seletiva_4.png'],
    },
    {
        category: 'Apps',
        title: 'Montando os Gestos',
        code: 'montando_os_gestos',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.montando_os_gestos',
        images: ['/img/apps/montando_os_gestos.png', '/img/apps/montando_os_gestos_2.png', '/img/apps/montando_os_gestos_3.png', '/img/apps/montando_os_gestos_4.png'],
    },
    {
        category: 'Apps',
        title: 'Movimente-se',
        code: 'movimente_se',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.movimente_se',
        images: ['/img/apps/movimente_se.png', '/img/apps/movimente_se_2.png', '/img/apps/movimente_se_3.png', '/img/apps/movimente_se_4.png'],
    },
    {
        category: 'Apps',
        title: 'Números e Quantidades',
        code: 'numeros_e_quantidades',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.numeros_e_quantidades',
        images: ['/img/apps/numeros_e_quantidades.png', '/img/apps/numeros_e_quantidades_2.png', '/img/apps/numeros_e_quantidades_3.png', '/img/apps/numeros_e_quantidades_4.png'],
    },
    {
        category: 'Apps',
        title: 'Para aprender e memorizar',
        code: 'para_aprender_e_memorizar',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.para_aprender_e_memorizar',
        images: ['/img/apps/para_aprender_e_memorizar.png', '/img/apps/para_aprender_e_memorizar_2.png', '/img/apps/para_aprender_e_memorizar_3.png', '/img/apps/para_aprender_e_memorizar_4.png'],
    },
    {
        category: 'Apps',
        title: 'Praticando Expressões Faciais',
        code: 'praticando_expressoes_faciais',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.praticando_expressoes_faciais',
        images: ['/img/apps/praticando_expressoes_faciais.png', '/img/apps/praticando_expressoes_faciais_2.png', '/img/apps/praticando_expressoes_faciais_3.png', '/img/apps/praticando_expressoes_faciais_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Alfabetização',
        code: 'quiz_alfabetizacao',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_alfabetizacao',
        images: ['/img/apps/quiz_alfabetizacao.png', '/img/apps/quiz_alfabetizacao_2.png', '/img/apps/quiz_alfabetizacao_3.png', '/img/apps/quiz_alfabetizacao_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz AnimalIA',
        code: 'quiz_animalia',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_animal',
        images: ['/img/apps/quiz_animalia.png', '/img/apps/quiz_animalia_2.png', '/img/apps/quiz_animalia_3.png', '/img/apps/quiz_animalia_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Artes',
        code: 'quiz_artes',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_artes',
        images: ['/img/apps/quiz_artes.png', '/img/apps/quiz_artes_2.png', '/img/apps/quiz_artes_3.png', '/img/apps/quiz_artes_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Computacional',
        code: 'quiz_computacional',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_computacao',
        images: ['/img/apps/quiz_computacional.png', '/img/apps/quiz_computacional_2.png', '/img/apps/quiz_computacional_3.png', '/img/apps/quiz_computacional_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Direito das Criancas',
        code: 'quiz_direito_das_criancas',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_direito_das_criancas',
        images: ['/img/apps/quiz_direito_das_criancas.png', '/img/apps/quiz_direito_das_criancas_2.png', '/img/apps/quiz_direito_das_criancas_3.png', '/img/apps/quiz_direito_das_criancas_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Emoções',
        code: 'quiz_emocoes',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_juntando_emocoes',
        images: ['/img/apps/quiz_emocoes.png', '/img/apps/quiz_emocoes_2.png', '/img/apps/quiz_emocoes_3.png', '/img/apps/quiz_emocoes_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Movimentos',
        code: 'quiz_movimentos',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_movimentos',
        images: ['/img/apps/quiz_movimentos.png', '/img/apps/quiz_movimentos_2.png', '/img/apps/quiz_movimentos_3.png', '/img/apps/quiz_movimentos_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Numeros',
        code: 'quiz_numeros',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_numeros',
        images: ['/img/apps/quiz_numeros.png', '/img/apps/quiz_numeros_2.png', '/img/apps/quiz_numeros_3.png', '/img/apps/quiz_numeros_4.png'],
    },
    {
        category: 'Apps',
        title: 'Quiz Reciclagem',
        code: 'quiz_reciclagem',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.quiz_reciclagem',
        images: ['/img/apps/quiz_reciclagem.png', '/img/apps/quiz_reciclagem_2.png', '/img/apps/quiz_reciclagem_3.png', '/img/apps/quiz_reciclagem_4.png'],
    },
    {
        category: 'Apps',
        title: 'Super Agente da Natureza',
        code: 'super_agente_da_natureza',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.super_agente_natureza_coleta_seletiva',
        images: ['/img/apps/super_agente_da_natureza.png', '/img/apps/super_agente_da_natureza_2.png', '/img/apps/super_agente_da_natureza_3.png', '/img/apps/super_agente_da_natureza_4.png'],
    },
    {
        category: 'Apps',
        title: 'VIAjante Curiosidades do Mundo',
        code: 'viajante_curiosidades_do_mundo',
        tecnologies: ['Flutter', 'Dart', 'ChatGPT', 'Dall-E'],
        os: ['Android'],
        link: 'https://play.google.com/store/apps/details?id=com.quinyx.curiosity_world',
        images: ['/img/apps/viajante_curiosidades_do_mundo.png', '/img/apps/viajante_curiosidades_do_mundo_2.png', '/img/apps/viajante_curiosidades_do_mundo_3.png', '/img/apps/viajante_curiosidades_do_mundo_4.png'],
    },

    // Web
    {
        category: 'Web',
        title: 'Mesinha Digital',
        code: 'mesinha_digital',
        tecnologies: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js'],
        os: ['Web'],
        link: 'https://mesinhadigital.com.br/',
        images: ['/img/web/mesinha_digital.png', '/img/web/mesinha_digital_2.png', '/img/web/mesinha_digital_3.png', '/img/web/mesinha_digital_4.png'],
    },
    {
        category: 'Web',
        title: 'Traceboard',
        code: 'traceboard',
        tecnologies: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js'],
        os: ['Web'],
        link: 'https://traceboardbrasil.com.br/',
        images: ['/img/web/traceboard.png', '/img/web/traceboard_2.png', '/img/web/traceboard_3.png', '/img/web/traceboard_4.png'],
    },
    {
        category: 'Web',
        title: 'Portal Mesinha Digital',
        code: 'portalmd',
        tecnologies: ['Bubble.io'],
        os: ['Web'],
        link: 'https://portalmd.quinyxcompany.com.br/',
        images: ['/img/web/portal_md.png'],
    },
    {
        category: 'Web',
        title: 'Vino & Mare',
        code: 'vino',
        tecnologies: ['AWS S3', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js', 'MongoDB', 'Express', 'Node.js'],
        os: ['Web'],
        images: ['/img/web/vino.png', '/img/web/vino_2.png'],
    },
    {
        category: 'Web',
        title: 'Parceiros SIEG-AD',
        code: 'parceiros',
        tecnologies: ['Bubble.io'],
        os: ['Web'],
        link: 'https://parceiros.sieg-ad.com.br/',
        images: ['/img/web/parceiros.png', '/img/web/parceiros_2.png'],
    },
    {
        category: 'Web',
        title: 'Reserva de Oportunidades',
        code: 'bookings',
        tecnologies: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js', 'PostgresSQL', 'Express', 'Node.js'],
        os: ['Web'],
        link: 'https://bookings.quinyxcompany.com/',
        images: ['/img/web/bookings.png', '/img/web/bookings_2.png', '/img/web/bookings_3.png', '/img/web/bookings_4.png'],
    },

    // Government
    {
        category: 'Government',
        title: '(SESC-PR) Leminskiando Palavras',
        code: 'leminskiando_palavras',
        tecnologies: ['Flutter', 'Dart'],
        os: ['Android', 'Windows'],
        images: ['/img/government/leminskiando.png', '/img/government/leminskiando_2.png', '/img/government/leminskiando_3.png', '/img/government/leminskiando_4.png'],
    },
    {
        category: 'Government',
        title: '(SESC-PR) Literacon',
        code: 'literacon',
        tecnologies: ['Electron', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js', 'PostgresSQL', 'Express', 'Node.js'],
        os: ['Web', 'Windows'],
        images: ['/img/government/literacon.png', '/img/government/literacon_2.png'],
    },
    {
        category: 'Government',
        title: '(CAGEPA) Maquete Virtual',
        code: 'maquete_virtual',
        tecnologies: ['Electron','Vue.js', 'JavaScript', 'HTML', 'CSS'],
        os: ['Web', 'Windows'],
        link: 'https://maquetes-cagepa-9.netlify.app/#/',
        images: ['/img/government/maquete_virtual.png', '/img/government/maquete_virtual_2.png', '/img/government/maquete_virtual_3.png', '/img/government/maquete_virtual_4.png'],
    },
    {
        category: 'Government',
        title: '(CAGEPA) Quiz Meio Ambiente',
        code: 'quiz_meio_ambiente',
        tecnologies: ['Electron','Vue.js', 'JavaScript', 'HTML', 'CSS'],
        os: ['Web', 'Windows'],
        link: 'https://quiz-cagepa-9.netlify.app/#/',
        images: ['/img/government/quiz_meio_ambiente.png', '/img/government/quiz_meio_ambiente_2.png', '/img/government/quiz_meio_ambiente_3.png', '/img/government/quiz_meio_ambiente_4.png'],
    },
    {
        category: 'Government',
        title: '(TJRR) Centro de Memória e Cultura',
        code: 'tjrr',
        tecnologies: ['Electron', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js', 'MySQL', 'Express', 'Node.js'],
        os: ['Web', 'Windows'],
        images: ['/img/government/tjrr.png'],
    },
    {
        category: 'Government',
        title: '(SEBRAE-SC) Sebrae Hub',
        code: 'sebraehub',
        tecnologies: ['Electron', 'Vue.js', 'JavaScript', 'HTML', 'CSS', 'Nuxt.js', 'MySQL', 'Express', 'Node.js'],
        os: ['Web', 'Windows', 'Android'],
        images: ['/img/government/sebraehub.png'],
    }

    // Systems
]
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 80vmax;
  height: 70vmax;
  gap: 20px;
  overflow: auto;
  position: absolute;
}

@media screen and (max-width: 600px) {
  main {
    flex-direction: column;
    width: auto;
  }

  .left-side {
    width: 65% !important;
  }
  .right-side {
    width: 80% !important;
  }
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
  max-width: 80vw;
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

.nav-project {
  font-size: 1rem;
}

.nav-project.left {
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.nav-project.right {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
