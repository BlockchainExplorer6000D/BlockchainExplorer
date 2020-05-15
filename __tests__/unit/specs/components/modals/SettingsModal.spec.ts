import { mount, createLocalVue, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import merge from "lodash/merge";
import mixins from "@/mixins";
import ButtonSwitch from "@/components/ButtonSwitch";
import InputSelect from "@/components/input/InputSelect";
import SettingsModal from "@/components/modals/SettingsModal";
import { useI18n } from "../../../__utils__/i18n";

// mock crypto compare service to avoid querying api
jest.mock("@/services/crypto-compare");

describe("Components > Modals > SettingsModal", () => {
  let wrapper: Wrapper<Vue>;
  let dispatchMock: () => any;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          nightMode: false,
          priceChartOptions: {
            enabled: false,
          },
        },
        getters: {
          nightMode: () => false,
          priceChartOptions: () => {
            return { enabled: false };
          },
        },
      },
      network: {
        namespaced: true,
        state: {
          currencies: { BRL: "R$", EUR: "€", USD: "$" },
        },
        getters: {
          currencies: () => ({ BRL: "R$", EUR: "€", USD: "$" }),
        },
      },
    },
    strict: true,
  });

  const mountComponent = config => {
    return mount(
      SettingsModal,
      merge(
        {
          stubs: {
            ButtonSwitch: ButtonSwitch,
            InputSelect: InputSelect,
          },
          i18n,
          localVue,
          mixins,
          store,
        },
        config,
      ),
    );
  };

  it("should render SettingsModal", () => {
    wrapper = mountComponent();
    expect(wrapper.isVueInstance()).toBe(true);
  });

  describe("Currency", () => {
    it("should show the currencies", () => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__select__currency");

      expect(el.findAll("option")).toHaveLength(3);
      expect(el.findAll("option").at(0).text()).toBe("BRL");
      expect(el.findAll("option").at(1).text()).toBe("EUR");
      expect(el.findAll("option").at(2).text()).toBe("USD");
    });

    it("should change currency " => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__currency").vm.$emit("input", {
        target: {
          name: "currency",
          value: "EUR",
        }
      });

      expect(wrapper.vm.currencyName).toBe("EUR");
      expect(wrapper.vm.currencySymbol).toBe("€");
    });
  });

  describe("Dark Theme", () => {
    it("should toggle to night mode", done => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__toggle__darkTheme");
      el.trigger("click");

      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.nightMode).toBe(true);
        done();
      });
    });

    it("should toggle to day mode", () => {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__toggle__darkTheme").vm.$emit("change", false);

      expect(wrapper.vm.nightMode).toBe(false);
    });
  });

  describe("Price Chart", () => {
    it("should toggle the price chart", done => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__toggle__priceChart");
      el.trigger("click");

      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.chartMode).toBe(true);
        done();
      });
    });
  });

  describe("Language", () => {
    it("should show the languages", () => {
      wrapper = mountComponent();

      const el = wrapper.find(".SettingsModal__select__language");

      expect(el.findAll("option")).toHaveLength(7);
      expect(el.findAll("option").at(0).text()).toBe("English (UK)");
      expect(el.findAll("option").at(1).text()).toBe("English (US)");
      expect(el.findAll("option").at(2).text()).toBe("Italian");
      expect(el.findAll("option").at(3).text()).toBe("French");
      expect(el.findAll("option").at(4).text()).toBe("Nederlands");
      expect(el.findAll("option").at(5).text()).toBe("Polish");
      expect(el.findAll("option").at(6).text()).toBe("Portuguese (BR)");
    });

    it("should change language " => () {
      wrapper = mountComponent();

      wrapper.find(".SettingsModal__select__language").vm.$emit("input", {
        target: {
          name: "language",
          value: "en-GB",
        }
      });

      expect(wrapper.vm.language).toBe("en-GB");
    });
  });
});
