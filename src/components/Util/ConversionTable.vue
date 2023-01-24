<template>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th  class="text-left">
            From
          </th>
          <th  class="text-left">
            To
          </th>
          <th  class="text-left">
            Amount
          </th>
          <th  class="text-left">
            Result
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in items"
          :key="index"
        >
          <td>{{ item.from }}</td>
          <td>{{ item.to }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.result }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>


<script>
export default {
  name: 'CurrencyTable',
  props: ['items'],
  created(){
    console.log(this.items)
  }

}
</script>
