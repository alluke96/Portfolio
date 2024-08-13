<template>
    <main>
        <Carousel :images="images" />
    </main>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();

const images = [
    {
        src: "/img/apps/arte_sem_limites_thumb.png",
        onClick: () => openProject("arte_sem_limites"),
        title: "Arte sem limites",
    },
    {
        src: "/img/apps/atitudes_do_dia_a_dia_thumb.png",
        onClick: () => openProject("atitudes_do_dia_a_dia"),
        title: "Atitudes do dia a dia",
    },
    {
        src: "/img/apps/aventura_criativa_thumb.png",
        onClick: () => openProject("aventura_criativa"),
        title: "Aventura Criativa",
    },
    {
        src: "/img/apps/ciencia_da_natureza_thumb.png",
        onClick: () => openProject("ciencia_da_natureza"),
        title: "CiêncIA da Natureza",
    },
    {
        src: "/img/apps/coloria_thumb.png",
        onClick: () => openProject("coloria"),
        title: "ColorIA",
    },
    {
        src: "/img/apps/conexao_de_numeros_thumb.png",
        onClick: () => openProject("conexao_de_numeros"),
        title: "Conexão de números",
    },
    {
        src: "/img/apps/criativa_cores_thumb.png",
        onClick: () => openProject("criativa_cores"),
        title: "CrIAtiva Cores",
    },
    {
        src: "/img/apps/desafia_quebra_cabecas_thumb.png",
        onClick: () => openProject("desafia_quebra_cabecas"),
        title: "DesafIA Quebra-Cabecas",
    },
    {
        src: "/img/apps/desafia_quiz_thumb.png",
        onClick: () => openProject("desafia_quiz"),
        title: "DesafIA Quiz",
    },
    {
        src: "/img/apps/dinomagia_thumb.png",
        onClick: () => openProject("dinomagia"),
        title: "DinomagIA",
    },
    {
        src: "/img/apps/eco_lixo_thumb.png",
        onClick: () => openProject("eco_lixo"),
        title: "Eco Lixo",
    },
    {
        src: "/img/apps/emocao_expressa_thumb.png",
        onClick: () => openProject("emocao_expressa"),
        title: "Emocão Expressa",
    },
    {
        src: "/img/apps/encaixando_os_numeros_thumb.png",
        onClick: () => openProject("encaixando_os_numeros"),
        title: "Encaixando os números",
    },
    {
        src: "/img/apps/historia_thumb.png",
        onClick: () => openProject("historia"),
        title: "HistorIA",
    },
    {
        src: "/img/apps/jornada_espacial_thumb.png",
        onClick: () => openProject("jornada_espacial"),
        title: "Jornada EspacIAl",
    },
    {
        src: "/img/apps/juntando_emocoes_thumb.png",
        onClick: () => openProject("juntando_emocoes"),
        title: "Juntando Emocões",
    },
    {
        src: "/img/apps/junte_os_direitos_thumb.png",
        onClick: () => openProject("junte_os_direitos"),
        title: "Junte os Direitos",
    },
    {
        src: "/img/apps/letra_a_letra_thumb.png",
        onClick: () => openProject("letra_a_letra"),
        title: "Letra a Letra",
    },
    {
        src: "/img/apps/letrix_thumb.png",
        onClick: () => openProject("letrix"),
        title: "Letrix",
    },
    {
        src: "/img/apps/memoletras_thumb.png",
        onClick: () => openProject("memoletras"),
        title: "MemoLetras",
    },
    {
        src: "/img/apps/memorizando_coleta_seletiva_thumb.png",
        onClick: () => openProject("memorizando_coleta_seletiva"),
        title: "Memorizando Coleta Seletiva",
    },
    {
        src: "/img/apps/montando_os_gestos_thumb.png",
        onClick: () => openProject("montando_os_gestos"),
        title: "Montando os Gestos",
    },
    {
        src: "/img/apps/movimente_se_thumb.png",
        onClick: () => openProject("movimente_se"),
        title: "Movimente-se",
    },
    {
        src: "/img/apps/numeros_e_quantidades_thumb.png",
        onClick: () => openProject("numeros_e_quantidades"),
        title: "Números e Quantidades",
    },
    {
        src: "/img/apps/para_aprender_e_memorizar_thumb.png",
        onClick: () => openProject("para_aprender_e_memorizar"),
        title: "Para aprender e memorizar",
    },
    {
        src: "/img/apps/praticando_expressoes_faciais_thumb.png",
        onClick: () => openProject("praticando_expressoes_faciais"),
        title: "Praticando Expressões Faciais",
    },
    {
        src: "/img/apps/quiz_alfabetizacao_thumb.png",
        onClick: () => openProject("quiz_alfabetacao"),
        title: "Quiz Alfabetação",
    },
    {
        src: "/img/apps/quiz_animalia_thumb.png",
        onClick: () => openProject("quiz_animalia"),
        title: "Quiz AnimalIA",
    },
    {
        src: "/img/apps/quiz_artes_thumb.png",
        onClick: () => openProject("quiz_artes"),
        title: "Quiz Artes",
    },
    {
        src: "/img/apps/quiz_computacional_thumb.png",
        onClick: () => openProject("quiz_computacional"),
        title: "Quiz Computacional",
    },
    {
        src: "/img/apps/quiz_direito_das_criancas_thumb.png",
        onClick: () => openProject("quiz_direito_das_criancas"),
        title: "Quiz Direito das Criancas",
    },
    {
        src: "/img/apps/quiz_emocoes_thumb.png",
        onClick: () => openProject("quiz_emocoes"),
        title: "Quiz Emocões",
    },
    {
        src: "/img/apps/quiz_movimentos_thumb.png",
        onClick: () => openProject("quiz_movimentos"),
        title: "Quiz Movimentos",
    },
    {
        src: "/img/apps/quiz_numeros_thumb.png",
        onClick: () => openProject("quiz_numeros"),
        title: "Quiz Números",
    },
    {
        src: "/img/apps/quiz_reciclagem_thumb.png",
        onClick: () => openProject("quiz_reciclagem"),
        title: "Quiz Reciclagem",
    },
    {
        src: "/img/apps/super_agente_da_natureza_thumb.png",
        onClick: () => openProject("super_agente_da_natureza"),
        title: "Super Agente da Natureza",
    },
    {
        src: "/img/apps/viajante_curiosidades_do_mundo_thumb.png",
        onClick: () => openProject("viajante_curiosidades_do_mundo"),
        title: "VIAjante Curiosidades do Mundo",
    },
];

const openProject = (project: string) => {
    navigateTo(`/${locale.value}/projects/${project}`);
}
</script>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>