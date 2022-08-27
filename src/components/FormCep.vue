<template>
  <div class="container-fluid d-grid align-content-center">
    <div class="row justify-content-center">
      <div class="col-3 h-64">
        <div
          class="input-group rounded-pill bg-white p-1"
          :class="{ 'border border-danger': hasError }"
        >
          <input
            type="text"
            class="form-control input-cep custom-input rounded-pill"
            v-mask="'#####-###'"
            placeholder="Busca CEP"
            v-model="cep"
            @keyup.enter="searchCep"
          />
          <button
            class="btn btn-outline-secondary rounded-circle ms-1"
            type="button"
            @click="searchCep"
          >
            <i class="bi-search text-light"></i>
          </button>
        </div>
        <span class="text-danger ms-3 small" v-if="hasError"
          >Cep não encontrado</span
        >
      </div>
    </div>
    <div class="row mt-5 d-flex justify-content-center">
      <div class="col-5">
        <input
          id="name"
          class="form-control input-back text-white custom-input bg-transparent"
          type="text"
          v-model="data.logradouro"
          readonly
        />
      </div>
      <div class="col-5 ms-5">
        <input
          id="district"
          class="form-control input-back text-white custom-input bg-transparent"
          type="text"
          v-model="data.bairro"
          readonly
        />
      </div>
    </div>
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-5">
        <input
          id="city"
          class="form-control input-back text-white custom-input bg-transparent"
          type="text"
          v-model="data.localidade"
          readonly
        />
      </div>
      <div class="col-5 ms-5 text-white">
        <input
          id="district"
          class="form-control input-back text-white custom-input bg-transparent"
          type="text"
          v-model="data.uf"
          readonly
        />
        <div class="d-flex justify-content-end mt-5">
          <button class="btn custom text-white" @click="clear">Limpar</button>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-start">
      <div>
        <span class="text-white footer my-auto"></span>
        <span class="text-white my-auto ms-2"
          >Consulta de endereço pelo CEP</span
        >
        <span class="text-white footer my-auto ms-2"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import axios from 'axios';

export default {
  setup() {
    const data = ref('');
    const cep = ref(null);
    const hasError = ref(false);

    const searchCep = () => {
      const getCep = cep.value;
      const formatCep = getCep.replace('-', '');

      if (formatCep.length === 8) {
        axios
          .get(`https://viacep.com.br/ws/${formatCep}/json/`)

          .then((response) => {
            data.value = response.data;
          })
          .then(() => {
            if (Object.keys(data.value)[0] === 'erro') {
              hasError.value = true;
            } else {
              hasError.value = false;
            }
          })
          .catch((error) => console.log(error));
      }
    };

    const clear = () => {
      data.value = '';
      cep.value = '';
      hasError.value = false;
    };

    return {
      searchCep,
      data,
      cep,
      clear,
      hasError,
    };
  },
};
</script>

<style lang="scss" scoped>
$gray-900: #212529;
$teal: #20c997;
$gray-800: #343a40;
$border-radius-sm: 20px;
$border-radius-pill: 50px;
$border-none: none;
$box-shadow-none: none;

.input-back {
  border-top: $border-none;
  border-left: $border-none;
  border-right: $border-none;
  border-bottom: 1px solid $teal;
}

.input-cep {
  border: $border-none;
}

button:not(.custom) {
  background: $teal;
  border-radius: $border-radius-pill;
}

button:hover {
  background: $teal;
}

.box-cep {
  background: white;
}

.input-group {
  border-radius: $border-radius-sm;
}

.custom-input:focus {
  box-shadow: $box-shadow-none;
}

.footer {
  padding-right: 20px;
  background: $teal;
}

.custom {
  background: $teal;
}

.h-64 {
  height: 64px;
}
</style>
