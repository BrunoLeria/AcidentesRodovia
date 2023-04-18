<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto px-6 py-8 bg-grey-darken-3">
          <v-card-title class="d-flex justify-center text-h5">
            Loading...
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-progress-circular color="blue-lighten-3" indeterminate :size="65" :width="10" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>