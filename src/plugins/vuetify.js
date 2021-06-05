import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#FDFDFD',
                textColor: '#1E1E1E',
                secondary: '#F76000',
                error: '#FF5252',
                success: '#4CAF50',
                warning: '#FFC107',
            },
        },
    },
});
