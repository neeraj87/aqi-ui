<template>
  <v-row>
    <date-range-picker
        ref="picker"
        :locale-data="{ firstDay: 1, format: 'dd-mm-yyyy HH:mm:ss' }"
        
    >
        <template v-slot:input="picker" style="min-width: 350px;">
            {{ picker.startDate | date }} - {{ picker.endDate | date }}
        </template>
    </date-range-picker>

  </v-row>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: "HistoricAQIComponent",
  components: {
    DateRangePicker 
  },
  data: () => ({
    dates: [],
  })
};
</script>