<template>
  <v-container fluid>
    <v-row>
      <v-col style="height: 20vh" cols="12" class="text-center">
        <h1>Générateur de souhait d'anniversaire</h1>
      </v-col>
      <v-col md="6" cols="12" offset-md="3">
        <v-card :loading="loading >= 100">
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-text-field outlined v-model.trim="name" label="Prénom" />
                  <v-textarea
                    outlined
                    v-model.trim="imgURL"
                    label="Lien photo de sa tronche"
                  />
                </v-col>
                <v-col cols="12" class="text-right">
                  <v-btn
                    @click="generate()"
                    depressed
                    color="primary"
                    :loading="loading > 0"
                    >Générer
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-center">
                  <span v-text="loadingText" />
                  <v-progress-linear :active="loading > 0" :value="loading" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  computed,
  reactive,
  watch,
  toRefs,
  getCurrentInstance
} from '@vue/composition-api'

export default {
  name: 'Setup',
  components: {},
  setup() {
    const vm = getCurrentInstance()

    const state = reactive({
      name: '',
      imgURL: '',
      loadingText: '',
      loading: 0
    })

    const generate = () => {
      setInterval(
        () => (state.loading = state.loading + Math.random() * 20),
        500
      )
    }

    watch(state, newVal => {
      if (newVal.loading >= 100) {
        // go to generated view
        vm.$router.push({
          name: 'GeneratedAnimation',
          query: {
            name: state.name,
            url: state.imgURL
          }
        })
      }
    })

    const loadingText = computed(() => {
      if (state.loading === 0) return ''
      if (state.loading < 30) return 'Génération de la tête...'
      if (state.loading < 50) return 'Calibration du chant...'
      if (state.loading < 70) return "Capture du moment de l'épisode..."
      if (state.loading < 90) return 'Génération du rebond...'
      if (state.loading < 100) return 'Lancement...'
      if (state.loading >= 100) return 'Prêt !'
    })

    return {
      ...toRefs(state),
      loadingText,
      generate
    }
  }
}
</script>
