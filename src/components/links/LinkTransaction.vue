<template>
  <RouterLink :to="{ name: 'transaction', params: { id } }" class="flex items-center whitespace-no-wrap">
    <span v-if="hasDefaultSlot">
      <slot />
    </span>
    <template v-else>
      <span>
        <span v-tooltip="id">
          {{ truncate(id) }}
        </span>
      </span>
    </template>
  </RouterLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LinkTransaction extends Vue {
  @Prop({ required: true }) public id: string;

  get hasDefaultSlot(): boolean {
    return !!this.$slots.default;
  }
}
</script>
