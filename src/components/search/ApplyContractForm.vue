<template>
  <div id="tradeForm" class="flex flex-wrap items-center mb-10 mx-5 sm:mx-10">
    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('PAGES.TRADES.FIELDS.SENDER')"
          name="sender"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('APPLY_CONTRACT_FORM.CONTRACT_ADDRESS')"
          name="contract_address"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('PAGES.TRADES.FIELDS.PUBLIC_KEY')"
          name="public_key"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
        <InputText
          :label="$t('PAGES.TRADES.FIELDS.PRIVATE_KEY')"
          name="private_key"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputNumber
          :label="$t('PAGES.TRADES.FIELDS.AMOUNT')"
          name="amount"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputNumber
          :label="$t('DEPLOY_CONTRACT_FORM.CARRY_FEE')"
          name="carry_fee"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('APPLY_CONTRACT_FORM.FUNCTION_NAME')"
          name="function_name"
          @input="onInputChange"
          @keyup.enter.native="onEnterKey"
        />
      </div>
    </div>

    <div class="flex flex-wrap w-full justify-between">
      <div class="flex-grow w-full md:w-auto">
        <InputText
          :label="$t('APPLY_CONTRACT_FORM.INPUT_DATA_AFTD')"
          name="input_data_afid"
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
  export default class ApplyContractForm extends Vue {
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
