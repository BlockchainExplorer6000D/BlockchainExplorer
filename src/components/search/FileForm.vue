<template>
  <div id="fileForm" class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10">
    <div class="flex flex-wrap w-full justify-between">
      <div class="w-full md:w-64 md:mr-6">
        <InputNumber
          :label="$t('PAGES.TRADES.FIELDS.AMOUNT')"
          name="amount"
          min="0"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>

      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('PAGES.TRADES.FIELDS.SENDER')"
          name="sender"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputText, InputSelect, InputNumber } from "./input";
@Component({
  components: {
    InputText,
    InputSelect,
    InputNumber, 
  },
})
export default class FileForm extends Vue {
  private input = "";

  private onInputChange(event: any) {
    const { name, value } = event.target;
    this.input = value;

    this.emitInput({ name, value });
  }

  private emitInput(value: object) {
    this.$emit("formChange", value);
  }

  private onEnterKey(event: any) {
    this.$emit("commit");
  }
}
</script>
