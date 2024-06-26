import Vue from "vue";
import { AppearanceOptions } from "../common/config/appearance-options";
import { ColorThemeOptions } from "../common/config/color-theme-options";
import { VueEventChannels } from "./vue-event-channels";
import { vueEventDispatcher } from "./vue-event-dispatcher";

export const userStylesComponent = Vue.extend({
    props: ["appearance", "colortheme"],
    mounted() {
        vueEventDispatcher.$on(
            VueEventChannels.appearanceOptionsUpdated,
            (updatedAppearanceOptions: AppearanceOptions) => {
                this.appearance = updatedAppearanceOptions;
            },
        );

        vueEventDispatcher.$on(
            VueEventChannels.colorThemeOptionsUpdated,
            (updatedColorThemeOptions: ColorThemeOptions) => {
                this.colortheme = updatedColorThemeOptions;
            },
        );
    },
    template: `<style>
        :root {
            --font-family: {{ appearance.fontFamily }};

            --user-input--height: {{ appearance.userInputHeight }}px;
            --user-input--font-size: {{ appearance.userInputFontSize }};
            --user-input--font-weight: {{ appearance.userInputFontWeight }};
            --user-input--background-color: {{ colortheme.userInputBackgroundColor }};
            --user-input--color: {{ colortheme.userInputTextColor }};
            --user-input--border-radius: {{ appearance.userInputBorderRadius }};
            --user-input--bottom-margin: {{ appearance.userInputBottomMargin }}px;

            --search-results--background-color: {{ colortheme.searchResultsBackgroundColor }};
            --search-results--border-radius: {{ appearance.searchResultsBorderRadius }};

            --search-results--item-height: {{ appearance.searchResultHeight }}px;
            --search-results--item-active-background-color: {{ colortheme.searchResultsItemActiveBackgroundColor }};
            --search-results--item-active-text-color: {{ colortheme.searchResultsItemActiveTextColor }};
            --search-results--item-active-description-color: {{ colortheme.searchResultsItemActiveDescriptionColor }};
            --search-results--item-name-text-color: {{ colortheme.searchResultsItemNameTextcolor }};
            --search-results--item-name-font-size: {{ appearance.searchResultNameFontSize }};
            --search-results--item-name-font-weight:  {{ appearance.searchResultNameFontWeight }};
            --search-results--item-description-text-color: {{ colortheme.searchResultsItemDescriptionTextColor }};
            --search-results--item-description-font-size:  {{ appearance.searchResultDescriptionFontSize }};
            --search-results--item-description-font-weight:  {{ appearance.searchResultDescriptionFontWeight }};

            --scrollbar--foreground-color: {{ colortheme.scrollbarForegroundColor }};
            --scrollbar--background-color: {{ colortheme.scrollbarBackgroundColor }};
            --scrollbar--border-radius: {{ appearance.scrollbarBorderRadius }};
        }
    </style>`,
});
